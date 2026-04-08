// ── LOADER ──────────────────────────────
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 2000);
});

// ── CURSOR ──────────────────────────────
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
let mouseX = 0,
  mouseY = 0,
  ringX = 0,
  ringY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";
});
function animRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + "px";
  ring.style.top = ringY + "px";
  requestAnimationFrame(animRing);
}
animRing();
document
  .querySelectorAll("a, button, .service-card, .project-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.opacity = "0.6";
      dot.style.transform = "translate(-50%,-50%) scale(1.5)";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.opacity = "1";
      dot.style.transform = "translate(-50%,-50%) scale(1)";
    });
  });

// ── NAV ──────────────────────────────────
const nav = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// ── SCROLL REVEAL ────────────────────────
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add("visible"), delay);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
);
revealEls.forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  observer.observe(el);
});

// ── COUNT UP ─────────────────────────────
function animCountUp(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".count-up").forEach(animCountUp);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);
document
  .querySelectorAll(".counter-strip, #hero")
  .forEach((el) => countObserver.observe(el));

// ── FORM SUBMIT ────────────────────────
document.getElementById("submitBtn").addEventListener("click", function () {
  this.textContent = "✓ Enquiry Sent!";
  this.style.background = "#2e7d32";
  this.style.color = "#fff";
  this.disabled = true;
  setTimeout(() => {
    this.textContent = "Send Enquiry";
    this.style.background = "";
    this.style.color = "";
    this.disabled = false;
  }, 3000);
});

// ── SMOOTH NAV CLICK ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
