const toggleSwitch = document.getElementById("darkModeToggle");
const profileNameInput = document.getElementById("profileNameDisplay");
const ageNameInput = document.getElementById("ageNameDisplay");
const saveBtn = document.querySelector(".save-btn");


// Load saved profile name
if (localStorage.getItem("profileNameDisplay")) {
  profileNameInput.value = localStorage.getItem("profileNameDisplay");
}
if (localStorage.getItem("ageNameDisplay")) {
  ageNameInput.value = localStorage.getItem("ageNameDisplay");
}

// Save profile name
saveBtn.addEventListener("click", () => {
  localStorage.setItem("profileNameDisplay", profileNameInput.value);
  alert("Profile name saved!");

  localStorage.setItem("ageNameDisplay", ageNameInput.value);
  alert("AGE saved!");
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleSwitch.checked = true;
}

toggleSwitch.addEventListener("change", () => {
  if (toggleSwitch.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});