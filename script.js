// --- Modal Open/Close Logic ---
function openModal(imageSrc, captionText) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");

  if (!modal || !modalImg) return;

  modalImg.src = imageSrc;
  if (modalCaption) {
    modalCaption.textContent = captionText || "";
  }

  modal.style.display = "flex";
  // Force browser reflow before adding the active transition class
  void modal.offsetWidth;
  modal.classList.add("active");

  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");

  if (!modal) return;

  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
    if (modalImg) modalImg.src = "";
  }, 200);

  document.body.style.overflow = "";
}

// Make functions globally available for inline events if needed
window.openModal = openModal;
window.closeModal = closeModal;

// Close modal on 'Escape' key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// --- Main DOM Initialization ---
// --- Main DOM Initialization ---

document.addEventListener("DOMContentLoaded", () => {
  // 1. Attach Click Listeners to all Certificate Cards
  const certCards = document.querySelectorAll(".cert-card");
  certCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Prioritize data-img, fallback to the inner <img> src attribute
      const innerImg = card.querySelector("img");
      const imageSrc = card.getAttribute("data-img") || (innerImg ? innerImg.currentSrc || innerImg.src : "");
      
      const titleElem = card.querySelector("h4");
      const subtitleElem = card.querySelector(".issuer");
      let fallbackCaption = "";
      if (titleElem && subtitleElem) {
        fallbackCaption = `${titleElem.textContent.trim()} — ${subtitleElem.textContent.trim()}`;
      }

      const captionText = card.getAttribute("data-caption") || fallbackCaption;

      if (imageSrc) {
        openModal(imageSrc, captionText);
      }
    });
  });

  // 2. Certificate Category Filter Tabs
  const filterBtns = document.querySelectorAll(".cert-filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");
      certCards.forEach((card) => {
        // Exclude the Tata steel project preview card from filtering
        if (card.classList.contains("project-cert-card")) return;

        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
  // 2. Dark / Light Mode Logic
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeIcon) themeIcon.textContent = "☀️";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeIcon) themeIcon.textContent = "🌙";
  }

  if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
    });
  }

  // 3. Mobile Hamburger Menu Logic
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // 4. Back to Top Logic
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 5. Cookie Consent Banner Logic
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptCookiesBtn = document.getElementById("acceptCookies");
  const declineCookiesBtn = document.getElementById("declineCookies");

  if (cookieBanner) {
    const cookieChoice = localStorage.getItem("cookieConsent");
    if (!cookieChoice) {
      setTimeout(() => {
        cookieBanner.classList.add("show");
      }, 800);
    }

    if (acceptCookiesBtn) {
      acceptCookiesBtn.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "accepted");
        cookieBanner.classList.remove("show");
      });
    }

    if (declineCookiesBtn) {
      declineCookiesBtn.addEventListener("click", () => {
        localStorage.setItem("cookieConsent", "declined");
        cookieBanner.classList.remove("show");
      });
    }
  }
});
// ==========================================
// Dynamic Copyright Year
// ==========================================
document.getElementById('year').textContent = new Date().getFullYear();
