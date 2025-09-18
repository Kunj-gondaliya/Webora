// =============================
// Webora Company Website Script
// =============================

// ======== NAVIGATION ========

// Smooth scrolling for nav links
document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", function (e) {
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth",
        });
      }
    }
  });
});

// Highlight active section in navbar on scroll
window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 65;
  document.querySelectorAll("nav ul li a").forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (
      section &&
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Sticky navbar effect
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ======== SUBSCRIPTION ========

const subForm = document.querySelector("#subscription-form");
if (subForm) {
  subForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector("input[type='email']").value.trim();
    const responseBox = document.createElement("p");
    responseBox.className = "form-response";

    if (!email.includes("@") || email.length < 5) {
      responseBox.textContent = "Please enter a valid email address.";
      responseBox.style.color = "red";
    } else {
      // Store subscriber in localStorage
      let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));
      }

      responseBox.textContent =
        "Subscription successful! Thank you for joining Webora.";
      responseBox.style.color = "green";
      this.reset();
    }

    this.appendChild(responseBox);
    setTimeout(() => responseBox.remove(), 3000);
  });
}


// ======== CONTACT FORM ========

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector("input[name='name']").value.trim();
    const email = this.querySelector("input[name='email']").value.trim();
    const message = this.querySelector("textarea[name='message']").value.trim();

    const responseBox = document.createElement("p");
    responseBox.className = "form-response";

    if (name.length < 2 || !email.includes("@") || message.length < 5) {
      responseBox.textContent = "Please fill out all fields correctly.";
      responseBox.style.color = "red";
    } else {
      responseBox.textContent =
        "Your message has been sent! We'll get back to you soon.";
      responseBox.style.color = "green";
      this.reset();
    }

    this.appendChild(responseBox);
    setTimeout(() => responseBox.remove(), 4000);
  });
}


// ======== SCROLL TO TOP BUTTON ========

const scrollBtn = document.createElement("button");
scrollBtn.textContent = "↑";
scrollBtn.id = "scrollTopBtn";
document.body.appendChild(scrollBtn);

scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "20px";
scrollBtn.style.right = "20px";
scrollBtn.style.display = "none";
scrollBtn.style.padding = "10px 15px";
scrollBtn.style.background = "#0066cc";
scrollBtn.style.color = "white";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "5px";
scrollBtn.style.cursor = "pointer";

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// ======== SCROLL REVEAL ANIMATIONS ========

const revealElements = document.querySelectorAll("section, footer, .hero");
const revealOnScroll = () => {
  let windowHeight = window.innerHeight;
  let revealPoint = 100;

  revealElements.forEach((el) => {
    let elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
function openModal(id) {
  document.getElementById("modal-" + id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById("modal-" + id).style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
  let modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
// Toggle Contact Us Side Panel
function toggleContact() {
  document.getElementById("contact-panel").classList.toggle("active");
}
gsap.from(".testimonial-card", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".testimonials",
    start: "top 80%"
  } 
}
// Dark Mode Toggle
const toggleSwitch = document.getElementById("darkModeToggle");

// Load saved theme (if any)
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleSwitch.checked = true;
}

// Listen for toggle click
toggleSwitch.addEventListener("change", () => {
  if (toggleSwitch.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});