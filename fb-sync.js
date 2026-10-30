// Firebase-Anbindung für das gemeinsame Prüfprotokoll (Realtime Database + Anmeldung per PIN).
// Hier stehen KEINE Zugangsdaten: die Konfiguration kommt aus firebase-config.js, das erst beim
// Veröffentlichen aus dem GitHub-Secret FIREBASE_CONFIG erzeugt wird (siehe FIREBASE-SETUP.md).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getDatabase, ref, update, remove, onValue, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const MAILDOMAIN = '@ffw-loeschwasser.de'; // Pro Feuerwehr ein Konto: <wehr-id>@ffw-loeschwasser.de, Passwort = PIN
const FB = { ok: false };
window.FB = FB;

(async () => {
  try {
    const { firebaseConfig } = await import('./firebase-config.js');
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app), auth = getAuth(app);
    FB.wehrId = () => {
      const m = auth.currentUser && auth.currentUser.email;
      return m && m.endsWith(MAILDOMAIN) ? m.slice(0, -MAILDOMAIN.length) : '';
    };
    FB.login = (wehr, pin) => signInWithEmailAndPassword(auth, wehr + MAILDOMAIN, pin);
    FB.logout = () => signOut(auth);
    FB.onAuth = cb => onAuthStateChanged(auth, cb);
    FB.connected = cb => onValue(ref(db, '.info/connected'), s => cb(s.val() === true));
    FB.listen = (ot, cb, err) => onValue(ref(db, 'protokolle/' + ot), s => cb(s.val() || {}), err); // gibt "abbestellen" zurück
    FB.push = (ot, key, fields) => update(ref(db, 'protokolle/' + ot + '/' + key), Object.assign({}, fields, { t: serverTimestamp() })).catch(() => {});
    FB.drop = (ot, key) => remove(ref(db, 'protokolle/' + ot + '/' + key)).catch(() => {});
    FB.ok = true;
  } catch (e) {
    FB.ok = false; // keine Konfiguration oder offline ohne Cache: App läuft lokal weiter
  }
  window.dispatchEvent(new Event('fbsync-ready'));
})();
