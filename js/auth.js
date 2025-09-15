// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDYiz4RH6VE0N0MR7RnOQwpHuPqP2Q7uTc",
  authDomain: "webora-core.firebaseapp.com",
  projectId: "webora-core",
  storageBucket: "webora-core.firebasestorage.app",
  messagingSenderId: "253670284180",
  appId: "1:253670284180:web:fe64f6cc575373dc198d81",
  measurementId: "G-SY1LC7S53G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// -------------------- Signup --------------------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
        role: "user"
      });
      
      alert("Signup successful ✅ Profile created!");
      window.location.replace("index.html");
    } catch (err) {
      alert(err.message);
    }
  });
}

// -------------------- Login --------------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful ✅");
      window.location.replace("index.html");
    } catch (err) {
      alert(err.message);
    }
  });
}

// -------------------- Google Login --------------------
const googleBtn = document.getElementById("googleLogin");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Create Firestore profile if new user
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
        role: "user"
      }, { merge: true });
      
      alert("Logged in with Google ✅ " + user.displayName);
      window.location.replace("index.html");
    } catch (err) {
      alert(err.message);
    }
  });
}

// -------------------- Logout --------------------
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    alert("Logged out ✅");
    window.location.replace("login.html");
  });
}

// -------------------- Force Login on All Pages --------------------
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  const isLoginOrSignup = path.endsWith("login.html") || path.endsWith("signup.html");
  
  if (!user && !isLoginOrSignup) {
    window.location.replace("login.html");
  }
  if (user && isLoginOrSignup) {
    window.location.replace("index.html");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const userBtn = document.getElementById("userBtn");
  const dropdown = document.querySelector(".user-menu .dropdown");

  if (userBtn && dropdown) {
    userBtn.addEventListener("click", () => {
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!userBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }
});