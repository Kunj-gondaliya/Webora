// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ✅ Same Firebase config as login
  /* Firebase Config */
  const firebaseConfig = {
    apiKey: "AIzaSyB8F-3r-4iPmacTlGrcNNCxpHiGswoaQ5g",
    authDomain: "webora-core-16d65.firebaseapp.com",
    projectId: "webora-core-16d65",
    storageBucket: "webora-core-16d65.appspot.com",
    messagingSenderId: "734418138539",
    appId: "1:734418138539:web:d4b6e2cf73662e6f1f4eee"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Registration
document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const name = document.getElementById("regName").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Update profile with name
      return updateProfile(userCredential.user, {
        displayName: name
      });
    })
    .then(() => {
      alert("Registration successful ✅ Redirecting to login...");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Registration Failed: " + error.message);
    });
});