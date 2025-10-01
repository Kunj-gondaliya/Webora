const toggleSwitch = document.getElementById("darkModeToggle");
const profileNameInput = document.getElementById("profileNameDisplay");
const ageInput = document.getElementById("ageNameDisplay");
const emailInput = document.getElementById("emailDisplay");
const phoneInput = document.getElementById("phoneDisplay");
const genderInput = document.getElementById("genderDisplay");
const saveBtn = document.querySelector(".save-btn");

// Load saved profile info
profileNameInput.value = localStorage.getItem("profileNameDisplay") || "";
ageInput.value = localStorage.getItem("ageNameDisplay") || "";
emailInput.value = localStorage.getItem("emailDisplay") || "";
phoneInput.value = localStorage.getItem("phoneDisplay") || "";
genderInput.value = localStorage.getItem("genderDisplay") || "";

// Save profile info
saveBtn.addEventListener("click", () => {
  localStorage.setItem("profileNameDisplay", profileNameInput.value);
  localStorage.setItem("ageNameDisplay", ageInput.value);
  localStorage.setItem("emailDisplay", emailInput.value);
  localStorage.setItem("phoneDisplay", phoneInput.value);
  localStorage.setItem("genderDisplay", genderInput.value);
  
  alert("Profile information saved!");
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleSwitch.checked = true;
}

// Theme toggle
toggleSwitch.addEventListener("change", () => {
  if (toggleSwitch.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});