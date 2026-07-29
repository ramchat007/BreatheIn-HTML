/* assets/js/main.js */

$(document).ready(function () {
  // ==========================================
  // Mobile Navigation Logic
  // ==========================================
  const $mobileNavOverlay = $("#mobileNavOverlay");
  const $body = $("body");

  function openNav() {
    // Unhide element and set flex
    $mobileNavOverlay.removeClass("hidden").addClass("flex");

    // Slight delay to allow display change to register before fading in
    setTimeout(function () {
      $mobileNavOverlay
        .removeClass("opacity-0 pointer-events-none")
        .addClass("opacity-100 pointer-events-auto");
    }, 10);

    $body.addClass("overflow-hidden"); // Lock scroll
  }

  function closeNav() {
    // Fade out
    $mobileNavOverlay
      .removeClass("opacity-100 pointer-events-auto")
      .addClass("opacity-0 pointer-events-none");

    // Wait for CSS transition (duration-300) before hiding
    setTimeout(function () {
      $mobileNavOverlay.removeClass("flex").addClass("hidden");
    }, 300);

    $body.removeClass("overflow-hidden"); // Unlock scroll
  }

  // Bind events
  $("#openMobileNav").on("click", function (e) {
    e.preventDefault();
    openNav();
  });

  $("#closeMobileNav, #mobileNavOverlay nav a").on("click", function (e) {
    if ($(this).attr("id") === "closeMobileNav") e.preventDefault();
    closeNav();
  });

  // ==========================================
  // UI Interactions
  // ==========================================
  $("#themeToggle").on("click", function (e) {
    e.preventDefault();
    console.log("Dark Mode toggle initiated.");
  });

  $("#cartBtn").on("click", function (e) {
    e.preventDefault();
    console.log("Mini-cart opened.");
  });

  // ==========================================
  // Hero Swiper Carousel Initialization
  // ==========================================
  const heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    effect: "fade", // Gives a premium fade transition between slides
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      // Trigger custom CSS transitions when slide becomes active
      slideChangeTransitionStart: function () {
        // Reset all animations
        $(
          ".swiper-slide .slide-content, .swiper-slide .slide-product, .swiper-slide .slide-widget",
        ).removeClass("!opacity-100 !translate-y-0 !translate-x-0");
      },
      slideChangeTransitionEnd: function () {
        // Animate elements in the active slide
        $(".swiper-slide-active .slide-content").addClass(
          "!opacity-100 !translate-y-0",
        );
        $(".swiper-slide-active .slide-product").addClass(
          "!opacity-100 !translate-y-0",
        );
        $(".swiper-slide-active .slide-widget").addClass(
          "!opacity-100 !translate-x-0",
        );
      },
      init: function () {
        // Trigger animation for the first slide on load
        setTimeout(() => {
          $(".swiper-slide-active .slide-content").addClass(
            "!opacity-100 !translate-y-0",
          );
          $(".swiper-slide-active .slide-product").addClass(
            "!opacity-100 !translate-y-0",
          );
          $(".swiper-slide-active .slide-widget").addClass(
            "!opacity-100 !translate-x-0",
          );
        }, 100);
      },
    },
  });

  // ==========================================
  // Smart Hide/Show Header on Scroll
  // ==========================================
  let lastScrollTop = 0;
  const $header = $("#smart-header");

  $(window).on("scroll", function () {
    let currentScroll = $(this).scrollTop();

    // Safeguard for mobile elastic scrolling (rubber-band effect at the top)
    if (currentScroll <= 0) {
      $header.removeClass("-translate-y-full").addClass("translate-y-0");
      lastScrollTop = currentScroll;
      return;
    }

    // If scrolling down AND passed the first 100px of the page
    if (currentScroll > lastScrollTop && currentScroll > 100) {
      // Slide up out of view
      $header.removeClass("translate-y-0").addClass("-translate-y-full");
    } else {
      // Scrolling up - Slide back down into view
      $header.removeClass("-translate-y-full").addClass("translate-y-0");
    }

    // Update the last scroll position for the next calculation
    lastScrollTop = currentScroll;
  });

  // ==========================================
  // Scroll Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealOptions = {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px", // Triggers slightly before it hits the bottom of the screen
  };

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        // Remove the hidden/translated state classes to trigger the CSS transition
        entry.target.classList.remove("opacity-0", "translate-y-8");
        // Stop observing once it has animated in
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // ==========================================
  // Product Matcher Slider Logic
  // ==========================================
  const $roomSlider = $("#roomAreaSlider");
  const $roomValue = $("#roomAreaValue");

  $roomSlider.on("input", function () {
    // Get current value of the range slider
    let currentValue = $(this).val();

    // Update the text in the UI
    $roomValue.text(currentValue);

    /*
     * Future WordPress Integration Note:
     * You can easily expand this later to swap out the product card image,
     * title, and price dynamically based on whether the `currentValue`
     * is < 400 (Small Room), 400-800 (Medium), or > 800 (Large).
     */
  });

  // ==========================================
  // Back to Top Button Logic
  // ==========================================
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Smooth scroll to the top of the window
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Initialize the Benefits Swiper
  const benefitsSwiper = new Swiper(".benefitsSwiper", {
    // Default parameters (Mobile)
    slidesPerView: 1,
    spaceBetween: 8, // Small gap for mobile swiping
    grabCursor: true,

    // Pagination (Only visible on mobile due to our md:hidden class)
    pagination: {
      el: ".benefitsSwiper .swiper-pagination",
      clickable: true,
    },

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 768px (Tailwind 'md')
      768: {
        slidesPerView: 2,
        spaceBetween: 6, // Matches Tailwind's gap-1.5 (6px)
        grabCursor: true,
      },
      // when window width is >= 1024px (Tailwind 'lg')
      1024: {
        slidesPerView: 4,
        spaceBetween: 6, // Matches Tailwind's gap-1.5 (6px)
        grabCursor: false,
        allowTouchMove: false, // Disables swiping on desktop so it acts like a normal static grid
      },
    },
  });
});
