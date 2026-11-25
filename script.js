const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}
menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal on scroll; fall back gracefully if IntersectionObserver is unavailable.
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}

// Current navigation section.
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));
}

// Desktop pointer tilt only; disabled on touch screens.
const heroVisual = document.getElementById("heroVisual");
const portrait = document.querySelector(".portrait-card");
if (heroVisual && portrait && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  heroVisual.addEventListener("pointermove", event => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portrait.style.transform = `rotateY(${x * 12 - 8}deg) rotateX(${y * -8 + 3}deg) rotateZ(-1deg)`;
  });
  heroVisual.addEventListener("pointerleave", () => {
    portrait.style.transform = "";
  });
}
