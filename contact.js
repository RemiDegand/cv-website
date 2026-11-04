// Contact page (redesigned 3 Nov 2026, web design pass): copy the email address, and the
// business card tilting towards the mouse. Styles in contact.css.
(() => {
  // 1. "Copy" button next to the email (shown only when the browser can copy)
  const copy = document.querySelector(".ct-copy");
  const toast = document.querySelector(".ct-toast");
  if (copy && navigator.clipboard) {
    copy.hidden = false;
    let timer = 0;
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copy.dataset.copy);
        copy.textContent = "Copied ✓";
        copy.classList.add("is-done");
        if (toast) { toast.textContent = "Email address copied"; toast.classList.add("is-shown"); }
      } catch {
        if (toast) { toast.textContent = "Couldn't copy: select the address above"; toast.classList.add("is-shown"); }
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        copy.textContent = "Copy";
        copy.classList.remove("is-done");
        if (toast) toast.classList.remove("is-shown");
      }, 2200);
    });
  }

  // 2. Business card: tilts towards the mouse anywhere over the top of the page, with a moving light
  const card = document.querySelector(".ct-card");
  const area = document.querySelector(".ct-hero");
  if (!card || !area || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let frame = 0;
  area.addEventListener("pointermove", (e) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const r = card.getBoundingClientRect();
      const x = Math.min(Math.max((e.clientX - r.left) / r.width, -0.5), 1.5);
      const y = Math.min(Math.max((e.clientY - r.top) / r.height, -0.5), 1.5);
      card.style.setProperty("--ry", ((x - 0.5) * 16).toFixed(2) + "deg");
      card.style.setProperty("--rx", ((0.5 - y) * 12).toFixed(2) + "deg");
      card.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
      card.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
    });
  });
  area.addEventListener("pointerleave", () => {
    cancelAnimationFrame(frame);
    ["--rx", "--ry", "--gx", "--gy"].forEach((p) => card.style.removeProperty(p));   // back to its resting angle
  });
})();
