/* ── Theme Toggle ── */
const html = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("idr-theme");

if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  html.setAttribute("data-theme", "dark");
}

toggleBtn.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", nextTheme);
  localStorage.setItem("idr-theme", nextTheme);
});

/* ── Nav scroll ── */
const nav = document.getElementById("main-nav");
const navCta = document.getElementById("nav-cta");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    nav.classList.add("scrolled");
    navCta.style.display = "inline-flex";
  } else {
    nav.classList.remove("scrolled");
    navCta.style.display = "none";
  }
});

/* ── Hamburger menu ── */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

hamburger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    navLinks.classList.toggle("open");
  }
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

/* ── Contact form ── */
const contactForm = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  contactForm.style.display = "none";
  formSuccess.style.display = "block";
});

/* ── Stat counter animation ── */
function animateCounters() {
  const statNumbers = document.querySelectorAll(".stat-num");

  statNumbers.forEach((el) => {
    const text = el.textContent.trim();
    const match = text.match(/[\d,]+/);

    if (!match) return;

    const target = parseInt(match[0].replace(/,/g, ""), 10);
    let current = 0;
    const step = target / 60;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.innerHTML = el.innerHTML.replace(/[\d,]+/, Math.round(current).toLocaleString());

      if (current >= target) {
        clearInterval(timer);
      }
    }, 20);
  });
}

let counted = false;

const statsSection = document.getElementById("stats");

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      animateCounters();
    }
  },
  { threshold: 0.3 }
);

observer.observe(statsSection);