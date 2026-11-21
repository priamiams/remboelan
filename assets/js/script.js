document.addEventListener("DOMContentLoaded", function () {
  // 1. Preloader - Dismiss smoothly without blocking FCP/LCP
  const preloader = document.getElementById("preloader");
  if (preloader) {
    const hidePreloader = function () {
      preloader.style.pointerEvents = "none";
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.3s ease";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 300);
    };

    if (document.readyState === "complete") {
      hidePreloader();
    } else {
      window.addEventListener("load", hidePreloader);
      // Fallback timeout so preloader never blocks slow connections/Lighthouse
      setTimeout(hidePreloader, 400);
    }
  }

  // 2. Sticky Navbar & Back to Top (with passive listener for smooth scrolling)
  const navbar = document.querySelector(".navbar");
  const backToTop = document.getElementById("back-to-top");
  const navToggler = document.querySelector(".navbar-toggler");
  const togglerIcon = document.querySelector(".toggler-icon i");
  const navCollapse = document.getElementById("navbarNav");

  function handleNavScroll() {
    if (window.scrollY > 30) {
      if (navbar) navbar.classList.add("sticky-active");
      if (backToTop) backToTop.classList.add("active");
    } else {
      if (navbar) navbar.classList.remove("sticky-active");
      if (backToTop) backToTop.classList.remove("active");
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll();

  // Back to top functionality
  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Mobile menu icon toggle (hamburger <-> close X) & auto-close on link click
  if (navToggler && togglerIcon && navCollapse) {
    navCollapse.addEventListener('show.bs.collapse', function () {
      togglerIcon.classList.remove('bi-list');
      togglerIcon.classList.add('bi-x-lg');
      if (navbar) navbar.classList.add('menu-open');
    });

    navCollapse.addEventListener('hide.bs.collapse', function () {
      togglerIcon.classList.remove('bi-x-lg');
      togglerIcon.classList.add('bi-list');
      if (navbar) navbar.classList.remove('menu-open');
    });

    const mobileNavLinks = navCollapse.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992 && typeof bootstrap !== 'undefined') {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }

  // 3. Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: window.innerWidth < 768, // Smooth mobile performance without layout displacement
    });
  }

  // 4. Initialize Swiper for Testimonials
  if (typeof Swiper !== 'undefined') {
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        }
      }
    });
  }

  // 5. Dynamic WhatsApp Link - update href based on form input (optional enhancement)
  const btnWA = document.getElementById("btnWA");
  const nField = document.getElementById("nama");
  const hField = document.getElementById("nohp");
  const pField = document.getElementById("pesan");
  
  // Update WA link dynamically as user types (no mandatory click validation)
  function updateWALink() {
    if (!btnWA) return;
    const nama = nField ? nField.value.trim() : '';
    const nohp = hField ? hField.value.trim() : '';
    const pesan = pField ? pField.value.trim() : '';
    
    let msg = 'Halo Admin REMBOELAN, saya ingin bertanya mengenai layanan ambulance.';
    if (nama || nohp || pesan) {
      msg = `Halo Admin REMBOELAN, saya ingin bertanya mengenai layanan ambulance.\n\nNama: ${nama || '-'}\nNo. HP: ${nohp || '-'}\nPesan: ${pesan || '-'}`;
    }
    btnWA.href = `https://wa.me/6285196139136?text=${encodeURIComponent(msg)}`;
  }
  
  if (nField) nField.addEventListener('input', updateWALink);
  if (hField) hField.addEventListener('input', updateWALink);
  if (pField) pField.addEventListener('input', updateWALink);
});
