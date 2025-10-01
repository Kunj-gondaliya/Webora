// Page load animation
window.addEventListener("load", () => {
  // Fade in body
  gsap.from("body", {
    duration: 1,
    opacity: 0,
    ease: "power2.out"
  });

  // Animate navbar links
  gsap.from(".navbar a", {
    duration: 1,
    y: -20,
    opacity: 0,
    stagger: 0.15,
    ease: "back.out(1.7)"
  });

  // Animate headings
  gsap.from("h2", {
    duration: 1,
    x: -50,
    opacity: 0,
    delay: 0.5,
    ease: "power2.out"
  });

  // Animate profile cards or profile-section divs
  gsap.from(".profile-card, .profile-section", {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    delay: 0.7,
    ease: "power2.out"
  });

  // Animate save button
  gsap.from(".save-btn", {
    duration: 0.8,
    scale: 0,
    opacity: 0,
    delay: 1,
    ease: "back.out(1.7)"
  });

  // Animate dark mode toggle
  gsap.from(".theme-toggle", {
    duration: 1,
    y: 20,
    opacity: 0,
    delay: 1.1,
    ease: "power2.out"
  });
});

// Button hover animation
const buttons = document.querySelectorAll(".save-btn, .navbar a");
buttons.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { scale: 1.05, duration: 0.2, ease: "power1.out" });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
  });
});

// Card hover animation (profile cards)
const cards = document.querySelectorAll(".profile-card, .profile-section");
cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)", duration: 0.3 });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { y: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", duration: 0.3 });
  });
});

// Dark mode toggle animation
const toggle = document.querySelector("#darkModeToggle");
if (toggle) {
  toggle.addEventListener("change", () => {
    gsap.to("body", { duration: 0.5, backgroundColor: toggle.checked ? "#121212" : "#f9f9f9" });
  });
}