const toggleSwitch = document.getElementById("darkModeToggle");
const profileNameInput = document.getElementById("profileName");
const saveBtn = document.querySelector(".save-btn");

// Load saved profile name
if (localStorage.getItem("profileName")) {
  profileNameInput.value = localStorage.getItem("profileName");
}

// Save profile name
saveBtn.addEventListener("click", () => {
  localStorage.setItem("profileName", profileNameInput.value);
  alert("Profile name saved!");
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