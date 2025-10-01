// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ✅ Replace with your Firebase config
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

// Handle Login
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // ✅ Successful login → redirect
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Login Failed: " + error.message);
    });
});