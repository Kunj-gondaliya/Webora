// account.js

// ✅ Dropdown animation
const userBtn = document.getElementById("userBtn");
const dropdown = document.querySelector(".user-menu .dropdown");

userBtn.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!userBtn.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove("show");
  }
});

// ✅ Firebase Logout
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYiz4RH6VE0N0MR7RnOQwpHuPqP2Q7uTc",
  authDomain: "webora-core.firebaseapp.com",
  projectId: "webora-core",
  storageBucket: "webora-core.firebasestorage.app",
  messagingSenderId: "253670284180",
  appId: "1:253670284180:web:fe64f6cc575373dc198d81",
  measurementId: "G-SY1LC7S53G"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Logout button
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "login.html"; // redirect to login page
    })
    .catch((error) => {
      console.error("Logout Error:", error);
      alert("Failed to log out. Try again.");
    });
});