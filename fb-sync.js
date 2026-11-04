// Firebase-Anbindung für das gemeinsame Prüfprotokoll (Realtime Database + Anmeldung per PIN).
// Hier stehen KEINE Zugangsdaten: die Konfiguration kommt aus firebase-config.js, das erst beim
// Veröffentlichen aus dem GitHub-Secret FIREBASE_CONFIG erzeugt wird (siehe FIREBASE-SETUP.md).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { enableLogging, getDatabase, ref, update, set, remove, onValue, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const MAILDOMAIN = '@ffw-loeschwasser.de'; // Pro Feuerwehr ein Konto: <wehr-id>@ffw-loeschwasser.de, Passwort = PIN
const FB = { ok: false };
window.FB = FB;

(async () => {
  try {
    const { firebaseConfig } = await import('./firebase-config.js');
    const app = initializeApp(firebaseConfig);
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
    FB.info = { dbUrl: firebaseConfig.databaseURL || '' }; // nur für die Diagnose im Menü
    FB.ok = true;
  } catch (e) {
    FB.ok = false; // keine Konfiguration oder offline ohne Cache: App läuft lokal weiter
  }
  window.dispatchEvent(new Event('fbsync-ready'));
})();
