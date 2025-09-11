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

// 🔹 Your Firebase Config (replace with your project’s keys)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ================= SIGNUP =================
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Signup successful ✅");
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  });
}

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login successful ✅");
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  });
}

// ================= GOOGLE LOGIN =================
const googleBtn = document.getElementById("googleLogin");
if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        alert("Logged in with Google ✅ " + result.user.displayName);
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  });
}

// ================= LOGOUT =================
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      alert("Logged out ✅");
      window.location.href = "login.html";
    });
  });
}

// ================= PROTECT DASHBOARD =================
if (window.location.pathname.includes("dashboard.html")) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html"; // not logged in
    } else {
      const userEmail = document.getElementById("userEmail");
      if (userEmail) {
        userEmail.textContent = "Logged in as: " + user.email;
      }
    }
  });
}