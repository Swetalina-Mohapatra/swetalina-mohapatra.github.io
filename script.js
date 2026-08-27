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
// Certificate Filtering Logic
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Update the active button styling
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 2. Get the filter value (e.g., 'all', 'ai-tech', 'hr', 'finance')
      const filterValue = btn.getAttribute('data-filter');

      // 3. Show or hide cards based on the filter
      certCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block'; // Show all
        } else {
          const cardCategory = card.getAttribute('data-category');
          if (cardCategory === filterValue) {
            card.style.display = 'block'; // Show matching category
          } else {
            card.style.display = 'none'; // Hide non-matching
          }
        }
      });
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
