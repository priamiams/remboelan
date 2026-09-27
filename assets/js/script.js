document.addEventListener("DOMContentLoaded", function () {
  // 1. Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
      }, 500);
    });
  }

  // 2. Sticky Navbar & Back to Top
  const navbar = document.querySelector(".navbar");
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add("sticky-active");
      if (backToTop) backToTop.classList.add("active");
    } else {
      if (navbar) navbar.classList.remove("sticky-active");
      if (backToTop) backToTop.classList.remove("active");
    }
  });

  // Back to top functionality
  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 3. Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
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
