
setInterval(updatePresence, 10000);import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  update,
  onDisconnect
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

console.log("✅ presence.js loaded");

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB8F-3r-4iPmacTlGrcNNCxpHiGswoaQ5g",
  authDomain: "webora-core-16d65.firebaseapp.com",
  databaseURL: "https://webora-core-16d65-default-rtdb.firebaseio.com",
  projectId: "webora-core-16d65",
  storageBucket: "webora-core-16d65.appspot.com",
  messagingSenderId: "734418138539",
  appId: "1:734418138539:web:d4b6e2cf73662e6f1f4eee"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🆔 Unique session per tab
const sessionId = crypto.randomUUID();
const viewerRef = ref(db, `realtime_viewers/${sessionId}`);

// 📱 Device detection
const device = window.innerWidth < 768 ? "mobile" : "desktop";

// 🔄 Presence updater
function updatePresence() {
  update(viewerRef, {
    page: location.pathname,
    device,
    userAgent: navigator.userAgent,
    lastActive: Date.now(),
    visible: document.visibilityState === "visible"
  })
  .then(() => console.log("👀 Presence heartbeat"))
  .catch(err => console.error("❌ Presence error:", err));
}

// ▶ Start
updatePresence();

// ❌ Remove when disconnected
onDisconnect(viewerRef).remove();

// ⏱ Heartbeat
setInterval(updatePresence, 10000);

// 👁 Tab visibility tracking
document.addEventListener("visibilitychange", updatePresence);

// 🔁 SPA page change safety
window.addEventListener("popstate", updatePresence);