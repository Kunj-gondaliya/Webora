// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ✅ Replace with your Firebase config
  /* Firebase Config */
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

// Handle Login
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ✅ Successful login → redirect
      window.location.href = "official_page.html";
    })
    .catch((error) => {
      alert("Login Failed: " + error.message);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("resetBtn");

  if (!resetBtn) return; // Only run on forgot.html

  resetBtn.addEventListener("click", () => {
    const email = document.getElementById("resetEmail").value;

    if (!email) {
      document.querySelector(".input-box").classList.add("shake");
      setTimeout(() => {
        document.querySelector(".input-box").classList.remove("shake");
      }, 300);
      return;
    }

    // Show loading spinner
    resetBtn.classList.add("loading");

    // Firebase reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        resetBtn.classList.remove("loading");
        showPopup();
        setTimeout(() => portalRedirect("login.html"), 1400);
      })
      .catch((error) => {
        resetBtn.classList.remove("loading");
        alert(error.message);
      });
  });
});
// delete if needed by kunj
function showPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";
  popup.style.opacity = "0";

  gsap.to(popup, { opacity: 1, scale: 1, duration: 0.4 });
  gsap.to(popup, { opacity: 0, duration: 0.6, delay: 1 });
}
