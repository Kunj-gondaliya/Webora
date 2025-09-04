// Contact form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Thank you for contacting Webora! We'll reply soon.");
      form.reset();
    });
  }
});