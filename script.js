const navLinks = document.querySelectorAll(".site-nav a");
const currentPage = document.body.dataset.page || "index.html";

navLinks.forEach((link) => {
  const href = link.getAttribute("href") || "";
  if (href.endsWith(currentPage)) {
    link.classList.add("is-active");
  }
});

const lightbox = document.querySelector("#photo-lightbox");
const lightboxImage = document.querySelector(".photo-lightbox-image");
const lightboxClose = document.querySelector(".photo-lightbox-close");
const lightboxTriggers = document.querySelectorAll("[data-lightbox-src]");
let lastTrigger;

const closeLightbox = () => {
  if (!lightbox) {
    return;
  }

  lightbox.hidden = true;
  lightboxImage.src = "";
  lastTrigger?.focus();
};

lightboxTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lastTrigger = trigger;
    lightboxImage.src = trigger.dataset.lightboxSrc;
    lightboxImage.alt = trigger.dataset.lightboxAlt || "Enlarged photo";
    lightbox.hidden = false;
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) {
    closeLightbox();
  }
});
