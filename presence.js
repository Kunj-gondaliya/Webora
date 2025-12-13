import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onDisconnect,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYiz4RH6VE0N0MR7RnOQwpHuPqP2Q7uTc",
  authDomain: "webora-core.firebaseapp.com",
  projectId: "webora-core",
  storageBucket: "webora-core.firebasestorage.app",
  messagingSenderId: "253670284180",
  appId: "1:253670284180:web:fe64f6cc575373dc198d81",
  measurementId: "G-SY1LC7S53G"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// unique session id
const sessionId = crypto.randomUUID();

// detect device
const device = window.innerWidth < 768 ? "mobile" : "desktop";

// viewer ref
const viewerRef = ref(db, `realtime_viewers/${sessionId}`);

// set presence
set(viewerRef, {
  page: location.pathname,
  device: device,
  userAgent: navigator.userAgent,
  lastActive: Date.now()
});

// remove when disconnected
onDisconnect(viewerRef).remove();

// update activity
setInterval(() => {
  set(viewerRef, {
    page: location.pathname,
    device: device,
    userAgent: navigator.userAgent,
    lastActive: Date.now()
  });
}, 10000);