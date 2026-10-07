// Highlight the menu link of the section currently on screen.
const menuLinks = document.querySelectorAll(".menu nav a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    menuLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
    });
  });
}, { rootMargin: "-40% 0px -55% 0px" });

document.querySelectorAll("main section").forEach((section) => observer.observe(section));

// Later: chatbot window (Phase 2).
