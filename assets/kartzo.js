(function () {
  // Cart state management
  var cartEl = document.getElementById("cart-count");
  var cartDrawerCountEl = document.getElementById("drawer-cart-count");
  var cartCount = cartEl ? parseInt(cartEl.textContent, 10) || 0 : 2;

  var wishEl = document.getElementById("wishlist-count");
  var wishCount = wishEl ? parseInt(wishEl.textContent, 10) || 0 : 4;

  function setCart(count) {
    cartCount = Math.max(0, count);
    if (cartEl) cartEl.textContent = String(cartCount);
    if (cartDrawerCountEl) cartDrawerCountEl.textContent = String(cartCount);
    document.querySelectorAll(".mobile-bottom-cart-count").forEach(function (el) {
      el.textContent = String(cartCount);
    });
    var cartLinks = document.querySelectorAll(".cart-trigger");
    cartLinks.forEach(function (link) {
      link.setAttribute("aria-label", "Cart, " + cartCount + (cartCount === 1 ? " item" : " items"));
    });
    updateFreeShipping();
  }

  function setWishlist(count) {
    wishCount = Math.max(0, count);
    if (wishEl) wishEl.textContent = String(wishCount);
    document.querySelectorAll(".mobile-bottom-wishlist-count").forEach(function (el) {
      el.textContent = String(wishCount);
    });
  }

  // Toast notification
  function showToast(message, type) {
    var container = document.getElementById("kartzo-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "kartzo-toast-container";
      document.body.appendChild(container);
    }
    var toast = document.createElement("div");
    toast.className = "kartzo-toast";
    var iconSvg = type === "wishlist"
      ? '<svg class="h-5 w-5 text-red-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z"/></svg>'
      : '<svg class="h-5 w-5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>';
    toast.innerHTML = iconSvg + '<span class="flex-1">' + message + '</span>';
    container.appendChild(toast);
    setTimeout(function () { toast.classList.add("show"); }, 10);
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.remove(); }, 300);
    }, 2600);
  }

  // Cart Drawer Controls
  var cartDrawer = document.getElementById("cart-drawer");
  function openCartDrawer() {
    if (cartDrawer) {
      cartDrawer.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }
  function closeCartDrawer() {
    if (cartDrawer) {
      cartDrawer.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  document.querySelectorAll("[data-cart-drawer-open]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openCartDrawer();
    });
  });
  document.querySelectorAll("[data-cart-drawer-close]").forEach(function (btn) {
    btn.addEventListener("click", closeCartDrawer);
  });
  if (cartDrawer) {
    cartDrawer.addEventListener("click", function (e) {
      if (e.target === cartDrawer) closeCartDrawer();
    });
  }

  // Free shipping progress calculation (Threshold: ₹499)
  function updateFreeShipping() {
    var progressBar = document.getElementById("drawer-shipping-progress");
    var progressText = document.getElementById("drawer-shipping-text");
    if (!progressBar || !progressText) return;
    // Calculate drawer total
    var total = 0;
    document.querySelectorAll(".drawer-item").forEach(function (item) {
      var price = parseInt(item.getAttribute("data-price"), 10) || 0;
      var qty = parseInt((item.querySelector("[data-qty-value]") || {}).textContent || "1", 10);
      total += price * qty;
    });
    var threshold = 499;
    if (total >= threshold || total === 0) {
      progressBar.style.width = "100%";
      progressText.innerHTML = total === 0 ? "Add items to unlock <strong>Free Shipping</strong> on ₹499+" : "🎉 You have unlocked <strong>FREE Delivery!</strong>";
    } else {
      var pct = Math.min(100, Math.round((total / threshold) * 100));
      progressBar.style.width = pct + "%";
      progressText.innerHTML = "Add <strong>₹" + (threshold - total) + "</strong> more for <strong>FREE Delivery</strong>";
    }
  }

  // Add to cart buttons
  document.querySelectorAll(".add-cart").forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.getAttribute("data-added") === "1") return;
      button.setAttribute("data-added", "1");
      var original = button.textContent;
      button.textContent = "Added to Cart";
      setCart(cartCount + 1);
      showToast("Item added to your cart", "cart");

      // Check if product card name exists
      var productCard = button.closest(".product-card") || button.closest(".product");
      var productName = productCard ? (productCard.querySelector("h3") || productCard.querySelector("a.font-bold") || {}).textContent : "Product";

      window.setTimeout(function () {
        button.setAttribute("data-added", "0");
        button.textContent = original.indexOf("Buy") !== -1 ? original : "Add to Cart";
      }, 1500);
    });
  });

  // Wishlist toggle
  document.querySelectorAll(".wish").forEach(function (button) {
    button.addEventListener("click", function () {
      var on = button.getAttribute("aria-pressed") === "true";
      button.setAttribute("aria-pressed", on ? "false" : "true");
      setWishlist(on ? wishCount - 1 : wishCount + 1);
      showToast(on ? "Removed from wishlist" : "Saved to your wishlist", "wishlist");
    });
  });

  // Search Modal Controls
  var searchModal = document.getElementById("search-modal");
  var searchInput = document.getElementById("search-modal-input");
  function openSearchModal() {
    if (searchModal) {
      searchModal.classList.add("active");
      document.body.style.overflow = "hidden";
      if (searchInput) {
        setTimeout(function () { searchInput.focus(); }, 100);
      }
    }
  }
  function closeSearchModal() {
    if (searchModal) {
      searchModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  document.querySelectorAll("[data-search-modal-open]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openSearchModal();
    });
  });
  document.querySelectorAll("[data-search-modal-close]").forEach(function (btn) {
    btn.addEventListener("click", closeSearchModal);
  });
  if (searchModal) {
    searchModal.addEventListener("click", function (e) {
      if (e.target === searchModal) closeSearchModal();
    });
  }

  // Live filter in search modal
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var val = searchInput.value.trim().toLowerCase();
      var resultsEl = document.getElementById("modal-search-results");
      var emptyEl = document.getElementById("modal-search-empty");
      var recentEl = document.getElementById("modal-recent-searches");
      if (!resultsEl) return;
      if (val.length === 0) {
        if (recentEl) recentEl.classList.remove("hidden");
        resultsEl.classList.remove("hidden");
        if (emptyEl) emptyEl.classList.add("hidden");
        resultsEl.querySelectorAll(".modal-search-item").forEach(function (item) {
          item.classList.remove("hidden");
        });
        return;
      }
      if (recentEl) recentEl.classList.add("hidden");
      var matches = 0;
      resultsEl.querySelectorAll(".modal-search-item").forEach(function (item) {
        var text = (item.getAttribute("data-search") || item.textContent || "").toLowerCase();
        var match = text.indexOf(val) !== -1;
        item.classList.toggle("hidden", !match);
        if (match) matches++;
      });
      if (emptyEl) {
        emptyEl.classList.toggle("hidden", matches > 0);
      }
    });
  }

  // Global Esc key listener
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeSearchModal();
      closeFilterDrawer();
      closeMobileMenu();
    }
  });

  // Modern Mobile Menu Drawer Controls
  var mobileMenuDrawer = document.getElementById("mobile-menu-drawer");
  function openMobileMenu() {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }
  function closeMobileMenu() {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
  document.querySelectorAll("[data-mobile-menu-open]").forEach(function (btn) {
    btn.addEventListener("click", openMobileMenu);
  });
  document.querySelectorAll("[data-mobile-menu-close]").forEach(function (btn) {
    btn.addEventListener("click", closeMobileMenu);
  });
  if (mobileMenuDrawer) {
    mobileMenuDrawer.addEventListener("click", function (e) {
      if (e.target === mobileMenuDrawer) closeMobileMenu();
    });
    mobileMenuDrawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  // Mobile search toggle (opens modern search modal or toggles mobile search row)
  document.querySelectorAll("[data-mobile-search-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var mobileSearch = document.getElementById("mobile-search-bar");
      if (mobileSearch) {
        var isHidden = mobileSearch.classList.toggle("hidden");
        var input = mobileSearch.querySelector("input");
        if (input && !isHidden) input.focus();
      } else {
        openSearchModal();
      }
    });
  });

  // Mobile navigation (legacy fallback if present)
  var menuBtn = document.getElementById("menu-btn");
  var mobileNav = document.getElementById("mobile-nav");
  if (menuBtn && mobileNav && !mobileMenuDrawer) {
    menuBtn.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("hidden") === false;
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Mobile Filter Drawer Controls
  var filterDrawer = document.getElementById("filter-drawer");
  function openFilterDrawer() {
    if (filterDrawer) {
      filterDrawer.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }
  function closeFilterDrawer() {
    if (filterDrawer) {
      filterDrawer.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
  document.querySelectorAll("[data-filter-drawer-open]").forEach(function (btn) {
    btn.addEventListener("click", openFilterDrawer);
  });
  document.querySelectorAll("[data-filter-drawer-close]").forEach(function (btn) {
    btn.addEventListener("click", closeFilterDrawer);
  });
  if (filterDrawer) {
    filterDrawer.addEventListener("click", function (e) {
      if (e.target === filterDrawer) closeFilterDrawer();
    });
  }

  // Quantity +/- controls
  document.querySelectorAll(".qty-minus, .qty-plus").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wrap = btn.closest("[data-qty]");
      if (!wrap) return;
      var valueEl = wrap.querySelector("[data-qty-value]");
      var min = parseInt(wrap.getAttribute("data-min") || "1", 10);
      var max = parseInt(wrap.getAttribute("data-max") || "10", 10);
      var value = parseInt(valueEl.textContent, 10) || 1;
      if (btn.classList.contains("qty-plus")) value = Math.min(max, value + 1);
      else value = Math.max(min, value - 1);
      valueEl.textContent = String(value);
      wrap.dispatchEvent(new CustomEvent("qtychange", { detail: { value: value }, bubbles: true }));
      updateFreeShipping();
    });
  });

  // Drawer Remove Item
  document.querySelectorAll(".drawer-remove-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".drawer-item");
      if (item) {
        item.remove();
        setCart(cartCount - 1);
        updateFreeShipping();
        showToast("Item removed from cart", "cart");
      }
    });
  });

  // PDP Image Gallery Thumbnail Switcher
  document.querySelectorAll("[data-gallery-thumb]").forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      var mainImg = document.getElementById("main-product-img");
      if (mainImg) {
        var newSrc = thumb.getAttribute("data-gallery-thumb");
        mainImg.src = newSrc;
        document.querySelectorAll("[data-gallery-thumb]").forEach(function (t) {
          t.classList.remove("border-brand", "ring-2", "ring-brand");
          t.classList.add("border-[#e6eefb]");
        });
        thumb.classList.add("border-brand", "ring-2", "ring-brand");
        thumb.classList.remove("border-[#e6eefb]");
      }
    });
  });

  // PDP Color Swatches Switcher
  document.querySelectorAll("[data-color-swatch]").forEach(function (swatch) {
    swatch.addEventListener("click", function () {
      var colorName = swatch.getAttribute("data-color-name");
      var label = document.getElementById("selected-color-label");
      if (label && colorName) label.textContent = colorName;
      document.querySelectorAll("[data-color-swatch]").forEach(function (s) {
        s.classList.remove("ring-2", "ring-brand", "ring-offset-2");
      });
      swatch.classList.add("ring-2", "ring-brand", "ring-offset-2");
    });
  });

  // PDP Size Swatches Switcher
  document.querySelectorAll("[data-size-swatch]").forEach(function (swatch) {
    swatch.addEventListener("click", function () {
      document.querySelectorAll("[data-size-swatch]").forEach(function (s) {
        s.classList.remove("bg-brand", "text-white", "border-brand");
        s.classList.add("border-[#d9e4f7]", "bg-[#f3f7ff]", "text-brand-ink");
      });
      swatch.classList.add("bg-brand", "text-white", "border-brand");
      swatch.classList.remove("border-[#d9e4f7]", "bg-[#f3f7ff]", "text-brand-ink");
    });
  });

  // PDP Pincode Checker
  var pincodeBtn = document.getElementById("pincode-check-btn");
  if (pincodeBtn) {
    pincodeBtn.addEventListener("click", function () {
      var input = document.getElementById("pincode-input");
      var result = document.getElementById("pincode-result");
      if (!input || !result) return;
      var val = input.value.trim();
      if (/^\d{6}$/.test(val)) {
        result.innerHTML = '<span class="text-[#059669] font-bold flex items-center gap-1.5"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg> Delivery by Friday • Free Shipping • COD Available to ' + val + '</span>';
        result.classList.remove("hidden");
      } else {
        result.innerHTML = '<span class="text-red-500 font-semibold">Please enter a valid 6-digit PIN code.</span>';
        result.classList.remove("hidden");
      }
    });
  }

  // Sticky Mobile Add-to-Cart Observer on PDP
  var pdpMainCta = document.getElementById("pdp-main-cta");
  var stickyMobileBar = document.getElementById("sticky-mobile-bar");
  if (pdpMainCta && stickyMobileBar && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        stickyMobileBar.classList.toggle("active", !entry.isIntersecting);
      });
    }, { threshold: 0.1 });
    observer.observe(pdpMainCta);
  }

  // Coupon Code Application
  var couponForm = document.getElementById("coupon-form");
  if (couponForm) {
    couponForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("coupon-input");
      var msg = document.getElementById("coupon-msg");
      if (!input || !msg) return;
      var code = input.value.trim().toUpperCase();
      if (code === "KARTZO10") {
        msg.textContent = "Coupon KARTZO10 applied! 10% discount added.";
        msg.className = "mt-2 text-xs font-bold text-[#059669]";
        showToast("Coupon KARTZO10 applied!", "cart");
      } else if (code.length === 0) {
        msg.textContent = "Please enter a promo code.";
        msg.className = "mt-2 text-xs font-semibold text-red-500";
      } else {
        msg.textContent = "Invalid promo code. Try 'KARTZO10'";
        msg.className = "mt-2 text-xs font-semibold text-red-500";
      }
    });
  }

  // Newsletter form submission
  var newsletter = document.getElementById("newsletter-form");
  if (newsletter) {
    var email = document.getElementById("newsletter-email");
    var message = document.getElementById("newsletter-msg");
    newsletter.addEventListener("submit", function (event) {
      event.preventDefault();
      var value = (email ? email.value : "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        if (message) {
          message.textContent = "Enter a valid email address.";
          message.className = "mt-2 text-xs font-semibold text-amber-300";
        }
        if (email) {
          email.setAttribute("aria-invalid", "true");
          email.focus();
        }
        return;
      }
      if (email) email.setAttribute("aria-invalid", "false");
      if (message) {
        message.textContent = "🎉 Subscribed! Check your inbox for exclusive deals.";
        message.className = "mt-2 text-xs font-semibold text-white";
      }
      showToast("Thank you for subscribing to Kartzo!", "cart");
      if (email) email.value = "";
    });
  }

  // Homepage featured commerce carousel
  var heroCarousel = document.querySelector("[data-hero-carousel]");
  if (heroCarousel && heroCarousel.querySelector("[data-hero-slide]") && !heroCarousel.__kartzoHeroInitialized) {
    heroCarousel.__kartzoHeroInitialized = true;
    heroCarousel.setAttribute("data-hero-initialized", "true");

    var heroSlides = Array.prototype.slice.call(heroCarousel.querySelectorAll("[data-hero-slide]"));
    var heroDots = heroCarousel.querySelector("[data-hero-dots]");
    var heroIndex = 0;
    var heroTimer = null;
    var heroHovered = heroCarousel.matches(":hover");
    var heroFocused = heroCarousel.contains(document.activeElement);
    var heroMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    var reducedMotion = heroMotionQuery ? heroMotionQuery.matches : false;

    function renderHeroDots() {
      if (!heroDots) return;
      heroDots.querySelectorAll(".hero-dot").forEach(function (dot) { dot.remove(); });
      heroSlides.forEach(function (_, index) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-dot";
        dot.setAttribute("aria-label", "Show featured slide " + (index + 1));
        dot.addEventListener("click", function () {
          showHeroSlide(index);
          syncHeroAutoplay();
        });
        heroDots.appendChild(dot);
      });
    }

    function showHeroSlide(nextIndex) {
      if (!heroSlides.length) return;
      heroIndex = (nextIndex + heroSlides.length) % heroSlides.length;
      heroSlides.forEach(function (slide, index) {
        var active = index === heroIndex;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
        slide.inert = !active;
        if (active) slide.removeAttribute("inert");
        else slide.setAttribute("inert", "");
      });
      if (heroDots) {
        heroDots.querySelectorAll(".hero-dot").forEach(function (dot, index) {
          var active = index === heroIndex;
          dot.classList.toggle("is-active", active);
          dot.setAttribute("aria-current", active ? "true" : "false");
        });
      }
    }

    function stopHeroAutoplay() {
      if (heroTimer) {
        window.clearInterval(heroTimer);
        heroTimer = null;
      }
    }

    function syncHeroAutoplay() {
      stopHeroAutoplay();
      if (!heroHovered && !heroFocused && !document.hidden && !reducedMotion && heroSlides.length > 1) {
        heroTimer = window.setInterval(function () { showHeroSlide(heroIndex + 1); }, 6000);
      }
    }

    function setHeroReducedMotion(event) {
      reducedMotion = !!event.matches;
      syncHeroAutoplay();
    }

    if (heroSlides.length) {
      renderHeroDots();
      showHeroSlide(0);
      heroCarousel.addEventListener("mouseenter", function () {
        heroHovered = true;
        syncHeroAutoplay();
      });
      heroCarousel.addEventListener("mouseleave", function () {
        heroHovered = false;
        syncHeroAutoplay();
      });
      heroCarousel.addEventListener("focusin", function () {
        heroFocused = true;
        syncHeroAutoplay();
      });
      heroCarousel.addEventListener("focusout", function (event) {
        if (!heroCarousel.contains(event.relatedTarget)) {
          heroFocused = false;
          syncHeroAutoplay();
        }
      });
      document.addEventListener("visibilitychange", syncHeroAutoplay);
      if (heroMotionQuery) {
        if (heroMotionQuery.addEventListener) heroMotionQuery.addEventListener("change", setHeroReducedMotion);
        else if (heroMotionQuery.addListener) heroMotionQuery.addListener(setHeroReducedMotion);
      }
      syncHeroAutoplay();
    }
  }

  // Global window API
  window.Kartzo = {
    setCart: setCart,
    getCartCount: function () { return cartCount; },
    openCart: openCartDrawer,
    closeCart: closeCartDrawer,
    openSearch: openSearchModal,
    closeSearch: closeSearchModal,
    toast: showToast
  };
})();
