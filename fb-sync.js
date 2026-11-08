// Firebase-Anbindung für das gemeinsame Prüfprotokoll (Realtime Database + Anmeldung per PIN).
// Hier stehen KEINE Zugangsdaten: die Konfiguration kommt aus firebase-config.js, das erst beim
// Veröffentlichen aus dem GitHub-Secret FIREBASE_CONFIG erzeugt wird (siehe FIREBASE-SETUP.md).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { enableLogging, getDatabase, ref, update, set, remove, onValue, onDisconnect, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import * as DBNS from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const MAILDOMAIN = '@ffw-loeschwasser.de'; // Pro Feuerwehr ein Konto: <wehr-id>@ffw-loeschwasser.de, Passwort = PIN
const FB = { ok: false };
window.FB = FB;

const devId = () => {
  try { let id = localStorage.getItem('ffw_dev') || ''; if (!/^[a-z0-9]{6,32}$/.test(id)) { id = Array.from(crypto.getRandomValues(new Uint8Array(6))).map(b => b.toString(16).padStart(2, '0')).join(''); localStorage.setItem('ffw_dev', id); } return id; }
  catch (e) { return 'tmp' + Math.random().toString(16).slice(2, 12); }
};

(async () => {
  try {
    const { firebaseConfig } = await import('./firebase-config.js');
    const app = initializeApp(firebaseConfig);
    // Hat Firebase einmal einen WebSocket-Fehler gemerkt, bleibt es in dieser Sitzung bei Long-Polling. Merker löschen, damit WebSocket neu versucht wird.
    // Die Bibliothek speichert diesen Merker in localStorage (nicht sessionStorage) und bleibt danach dauerhaft bei Long-Polling,
    // das hier durch die Sicherheitsregeln (keine Frames) gesperrt ist. Merker löschen und WebSocket erzwingen.
    try { localStorage.removeItem('firebase:previous_websocket_failure'); sessionStorage.removeItem('firebase:previous_websocket_failure'); } catch (e) {}
    try { if (DBNS.forceWebSockets) DBNS.forceWebSockets(); } catch (e) {}
    // Verbindungsereignisse für die Diagnose mitschreiben (ohne Zugangsdaten und Nutzdaten)
    FB.log = [];
    enableLogging(m => { const t = String(m); if (/ebsocket|onnect|isconnect|imeout|ong.?poll|handshake|error/i.test(t) && !/cred|auth|token/i.test(t)) { FB.log.push(t.slice(0, 110)); if (FB.log.length > 30) FB.log.shift(); } });
    const db = getDatabase(app), auth = initializeAuth(app, { persistence: [indexedDBLocalPersistence, browserLocalPersistence] }); // ohne Popup-Weiterleitung: lädt keine Skripte von apis.google.com
    FB.wehrId = () => {
      const m = auth.currentUser && auth.currentUser.email;
      return m && m.endsWith(MAILDOMAIN) ? m.slice(0, -MAILDOMAIN.length) : '';
    };
    FB.token = async () => (auth.currentUser ? auth.currentUser.getIdToken() : null); // nur für die Diagnose
    FB.login = (wehr, pin) => signInWithEmailAndPassword(auth, wehr + MAILDOMAIN, pin);
    FB.logout = () => signOut(auth);
    FB.onAuth = cb => onAuthStateChanged(auth, cb);
    FB.connected = cb => onValue(ref(db, '.info/connected'), s => cb(s.val() === true));
    FB.listen = (ot, cb, err) => onValue(ref(db, 'protokolle/' + ot), s => cb(s.val() || {}), err); // gibt "abbestellen" zurück
    FB.push = (ot, key, fields) => update(ref(db, 'protokolle/' + ot + '/' + key), Object.assign({}, fields, { t: serverTimestamp() })).catch(() => {});
    FB.drop = (ot, key) => remove(ref(db, 'protokolle/' + ot + '/' + key)).catch(() => {});
    // Historie früherer Jahre je Brunnen (wird einmal geschrieben und danach nicht mehr überschrieben)
    FB.listenHist = (ot, cb, err) => onValue(ref(db, 'historie/' + ot), s => cb(s.val() || {}), err);
    FB.setHist = (ot, key, year, rec) => set(ref(db, 'historie/' + ot + '/' + key + '/' + year), rec).catch(() => {});
    // Anwesenheit: zeigt, wie viele Geräte gerade die App geöffnet haben (nur zufällige Gerätekennung, keine Namen)
    FB.presenceStart = (wehr, cb) => {
      let id = ''; try { id = localStorage.getItem('ffw_dev') || ''; if (!/^[a-z0-9]{6,32}$/.test(id)) { id = Array.from(crypto.getRandomValues(new Uint8Array(6))).map(b => b.toString(16).padStart(2, '0')).join(''); localStorage.setItem('ffw_dev', id); } } catch (e) { id = Math.random().toString(16).slice(2, 14).padEnd(12, '0'); }
      const mine = ref(db, 'praesenz/' + wehr + '/' + id);
      const mark = () => { if (!document.hidden) onDisconnect(mine).remove().then(() => set(mine, serverTimestamp())).catch(() => {}); };
      const stopConn = onValue(ref(db, '.info/connected'), s => { if (s.val() === true) mark(); });
      const stopCnt = onValue(ref(db, 'praesenz'), s => { const v = s.val() || {}; let all = 0; Object.keys(v).forEach(k => { all += Object.keys(v[k] || {}).length; }); cb(Object.keys(v[wehr] || {}).length, all); }, () => {});
      const vis = () => { if (document.hidden) remove(mine).catch(() => {}); else mark(); };
      document.addEventListener('visibilitychange', vis);
      return () => { try { stopConn(); stopCnt(); } catch (e) {} document.removeEventListener('visibilitychange', vis); remove(mine).catch(() => {}); };
    };
    // "Wird gerade geprüft": ein Gerät meldet einen Brunnen an, die anderen sehen es (verschwindet beim Trennen von selbst)
    FB.devId = devId;
    FB.listenActive = (ot, cb, err) => onValue(ref(db, 'aktiv/' + ot), s => cb(s.val() || {}), err);
    FB.claim = (ot, key) => { const r = ref(db, 'aktiv/' + ot + '/' + key); onDisconnect(r).remove().catch(() => {}); return set(r, { d: devId(), t: serverTimestamp() }).catch(() => {}); };
    FB.release = (ot, key) => remove(ref(db, 'aktiv/' + ot + '/' + key)).catch(() => {});
    FB.info = { dbUrl: firebaseConfig.databaseURL || '' }; // nur für die Diagnose im Menü
    try { FB.host = new URL(firebaseConfig.databaseURL).host; } catch (x) { FB.err = 'databaseURL fehlt in der Konfiguration'; }
    FB.ok = true;
  } catch (e) {
    FB.ok = false; // keine Konfiguration oder offline ohne Cache: App läuft lokal weiter
    FB.err = String((e && (e.code || e.message)) || e).slice(0, 120);
  }
  window.dispatchEvent(new Event('fbsync-ready'));
})();
