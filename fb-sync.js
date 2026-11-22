// Firebase-Anbindung für das gemeinsame Prüfprotokoll (Realtime Database + Anmeldung per Wehr-Konto).
// Hier stehen KEINE Zugangsdaten: die Konfiguration kommt aus firebase-config.js (siehe FIREBASE-SETUP.md).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { enableLogging, getDatabase, ref, update, set, remove, onValue, onDisconnect, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import * as DBNS from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const MAILDOMAIN = '@ffw-loeschwasser.de'; // Pro Feuerwehr ein Konto: <wehr-id>@ffw-loeschwasser.de
const MAX_SESSION_MS = 12 * 3600 * 1000;    // Anmeldung läuft nach 12 Stunden ab
const LOGIN_KEY = 'ffw_login_at';           // nur Zeitstempel, kein Geheimnis
const FB = { ok: false };
window.FB = FB;

const loginAt = () => { try { return Number(localStorage.getItem(LOGIN_KEY)) || 0; } catch (e) { return 0; } };
const setLoginAt = v => { try { if (v) localStorage.setItem(LOGIN_KEY, String(v)); else localStorage.removeItem(LOGIN_KEY); } catch (e) {} };

const devId = () => {
  try {
    let id = localStorage.getItem('ffw_dev') || '';
    if (!/^[a-z0-9]{6,32}$/.test(id)) {
      id = Array.from(crypto.getRandomValues(new Uint8Array(6))).map(b => b.toString(16).padStart(2, '0')).join('');
      localStorage.setItem('ffw_dev', id);
    }
    return id;
  } catch (e) { return 'tmp' + Math.random().toString(16).slice(2, 12); }
};

(async () => {
  try {
    const { firebaseConfig } = await import('./firebase-config.js');
    const app = initializeApp(firebaseConfig);
    try { localStorage.removeItem('firebase:previous_websocket_failure'); sessionStorage.removeItem('firebase:previous_websocket_failure'); } catch (e) {}
    try { if (DBNS.forceWebSockets) DBNS.forceWebSockets(); } catch (e) {}
    FB.log = [];
    enableLogging(m => { const t = String(m); if (/ebsocket|onnect|isconnect|imeout|ong.?poll|handshake|error/i.test(t) && !/cred|auth|token/i.test(t)) { FB.log.push(t.slice(0, 110)); if (FB.log.length > 30) FB.log.shift(); } });
    const db = getDatabase(app);
    const auth = initializeAuth(app, { persistence: [indexedDBLocalPersistence, browserLocalPersistence] });

    // Sitzung nach MAX_SESSION_MS beenden (auch alte Sitzungen ohne Zeitstempel)
    onAuthStateChanged(auth, u => {
      if (u && Date.now() - loginAt() > MAX_SESSION_MS) { setLoginAt(0); signOut(auth).catch(() => {}); }
    });

    FB.wehrId = () => {
      const m = auth.currentUser && auth.currentUser.email;
      return m && m.endsWith(MAILDOMAIN) ? m.slice(0, -MAILDOMAIN.length) : '';
    };
    FB.login = async (wehr, pin) => {
      setLoginAt(Date.now()); // vor der Anmeldung setzen, sonst beendet der Listener die neue Sitzung sofort
      try { return await signInWithEmailAndPassword(auth, wehr + MAILDOMAIN, pin); }
      catch (e) { setLoginAt(0); throw e; }
    };
    FB.logout = () => { setLoginAt(0); return signOut(auth); };
    FB.onAuth = cb => onAuthStateChanged(auth, cb);
    FB.connected = cb => onValue(ref(db, '.info/connected'), s => cb(s.val() === true));
    FB.listen = (ot, cb, err) => onValue(ref(db, 'protokolle/' + ot), s => cb(s.val() || {}), err);
    FB.push = (ot, key, fields) => update(ref(db, 'protokolle/' + ot + '/' + key), Object.assign({}, fields, { t: serverTimestamp() })).catch(() => {});
    FB.drop = (ot, key) => remove(ref(db, 'protokolle/' + ot + '/' + key)).catch(() => {});
    FB.listenHist = (ot, cb, err) => onValue(ref(db, 'historie/' + ot), s => cb(s.val() || {}), err);
    FB.setHist = (ot, key, year, rec) => set(ref(db, 'historie/' + ot + '/' + key + '/' + year), rec).catch(() => {});

    // Anwesenheit: nur die eigene Wehr wird gelesen, es werden keine Namen gespeichert
    FB.presenceStart = (wehr, cb) => {
      const mine = ref(db, 'praesenz/' + wehr + '/' + devId());
      const mark = () => { if (!document.hidden) onDisconnect(mine).remove().then(() => set(mine, serverTimestamp())).catch(() => {}); };
      const stopConn = onValue(ref(db, '.info/connected'), s => { if (s.val() === true) mark(); });
      const stopCnt = onValue(ref(db, 'praesenz/' + wehr), s => { const n = Object.keys(s.val() || {}).length; cb(n, n); }, () => {});
      const vis = () => { if (document.hidden) remove(mine).catch(() => {}); else mark(); };
      document.addEventListener('visibilitychange', vis);
      return () => { try { stopConn(); stopCnt(); } catch (e) {} document.removeEventListener('visibilitychange', vis); remove(mine).catch(() => {}); };
    };

    FB.devId = devId;
    FB.listenActive = (ot, cb, err) => onValue(ref(db, 'aktiv/' + ot), s => cb(s.val() || {}), err);
    FB.claim = (ot, key) => { const r = ref(db, 'aktiv/' + ot + '/' + key); onDisconnect(r).remove().catch(() => {}); return set(r, { d: devId(), t: serverTimestamp() }).catch(() => {}); };
    FB.release = (ot, key) => remove(ref(db, 'aktiv/' + ot + '/' + key)).catch(() => {});
    FB.info = { dbUrl: firebaseConfig.databaseURL || '' };
    try { FB.host = new URL(firebaseConfig.databaseURL).host; } catch (x) { FB.err = 'databaseURL fehlt in der Konfiguration'; }
    FB.ok = true;
  } catch (e) {
    FB.ok = false;
    FB.err = String((e && (e.code || e.message)) || e).slice(0, 120);
  }
  window.dispatchEvent(new Event('fbsync-ready'));
})();
