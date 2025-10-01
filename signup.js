// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ✅ Same Firebase config as login
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