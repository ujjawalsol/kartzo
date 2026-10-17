/* Kartzo theme JS — plain JavaScript, no dependencies.
 * Wired to real Shopify state via the Ajax API (locale-aware routes).
 * Preserves the original site's UI behaviours (drawers, toasts, hero, steppers).
 */
(function () {
  'use strict';

  var cfg = window.KartzoSettings || {};
  var routes = cfg.routes || { root: '/', cart: '/cart', search: '/search', account: '/account' };
  var thresholdMinor = parseInt(cfg.freeShippingThreshold, 10) || 49900;
  var currency = cfg.currency || 'INR';

  function money(minor) {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency }).format((minor || 0) / 100);
    } catch (e) {
      return String((minor || 0) / 100);
    }
  }

  /* ---------- Toast ---------- */
  function showToast(message, type) {
    var container = document.getElementById('kartzo-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'kartzo-toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = 'kartzo-toast';
    var iconSvg =
      type === 'wishlist'
        ? '<svg class="h-5 w-5 text-red-500 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z"/></svg>'
        : '<svg class="h-5 w-5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
    toast.innerHTML = iconSvg + '<span class="flex-1"></span>';
    toast.querySelector('span').textContent = message;
    container.appendChild(toast);
    setTimeout(function () { toast.classList.add('show'); }, 10);
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, 2600);
  }

  /* ---------- Overlays: open/close + focus trap + Esc ---------- */
  var lastFocus = null;
  function trapFocus(container, e) {
    if (e.key !== 'Tab') return;
    var focusable = container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function openOverlay(el) {
    if (!el || el.classList.contains('active')) return;
    lastFocus = document.activeElement;
    el.classList.add('active');
    document.body.style.overflow = 'hidden';
    var panel = el.querySelector('.drawer-panel, .drawer-panel-left, .modal-panel');
    var target = (panel && panel.querySelector('button, a[href], input')) || el;
    setTimeout(function () { try { target.focus({ preventScroll: true }); } catch (err) {} }, 60);
  }
  function closeOverlay(el) {
    if (!el || !el.classList.contains('active')) return;
    el.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocus && document.contains(lastFocus)) { try { lastFocus.focus({ preventScroll: true }); } catch (err) {} }
    lastFocus = null;
  }
  function allOverlays() {
    return document.querySelectorAll('#cart-drawer, #search-modal, #mobile-menu-drawer, #filter-drawer, #wishlist-drawer');
  }

  /* Delegated overlay controls: survive Theme Editor section re-renders
     (docs: shopify:section:load re-runs init below; direct bindings would die). */
  var OVERLAY_SEL = '#cart-drawer, #search-modal, #mobile-menu-drawer, #filter-drawer, #wishlist-drawer';
  function getOverlay(id) { return document.getElementById(id); }
  document.addEventListener('click', function (e) {
    var wishOpener = e.target.closest('[data-wishlist-drawer-open]');
    if (wishOpener) {
      e.preventDefault();
      closeOverlay(getOverlay('mobile-menu-drawer'));
      renderWishlistDrawer();
      openOverlay(getOverlay('wishlist-drawer'));
      return;
    }
    if (e.target.closest('[data-wishlist-drawer-close]')) {
      closeOverlay(getOverlay('wishlist-drawer'));
      return;
    }
    var wishRemoveBtn = e.target.closest('[data-wish-remove]');
    if (wishRemoveBtn) {
      var removeId = wishRemoveBtn.getAttribute('data-wish-remove');
      var list = getWishlist().filter(function (entry) { return String(entry.id) !== String(removeId); });
      setWishlist(list);
      renderWishlistDrawer();
      renderWishlistGrid();
      showToast('Removed from your wishlist', 'wishlist');
      return;
    }
    var wishAddBtn = e.target.closest('.wishlist-quick-add');
    if (wishAddBtn) {
      var wishProdId = wishAddBtn.getAttribute('data-wish-id');
      wishAddBtn.disabled = true;
      wishAddBtn.textContent = 'Adding...';
      fetch(cartRoot('cart/add.js'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: wishProdId, quantity: 1 })
      })
      .then(function (res) { if (!res.ok) throw new Error('add'); return res.json(); })
      .then(function () {
        showToast('Item added to your cart', 'cart');
        closeOverlay(getOverlay('wishlist-drawer'));
        return refreshCart();
      })
      .then(function () {
        var cartOverlay = getOverlay('cart-drawer');
        if (cartOverlay) {
          openOverlay(cartOverlay);
        } else {
          window.location.href = routes.cart || '/cart';
        }
      })
      .catch(function () {
        showToast('Please visit the product page to select options', 'cart');
      })
      .finally(function () {
        wishAddBtn.disabled = false;
        wishAddBtn.textContent = 'Add to Cart';
      });
      return;
    }

    var opener = e.target.closest('[data-cart-drawer-open]');
    if (opener) {
      e.preventDefault();
      refreshCart().finally(function () { openOverlay(getOverlay('cart-drawer')); });
      return;
    }
    if (e.target.closest('[data-cart-drawer-close]')) { closeOverlay(getOverlay('cart-drawer')); return; }
    var searchOpener = e.target.closest('[data-search-modal-open]');
    if (searchOpener) {
      e.preventDefault();
      openOverlay(getOverlay('search-modal'));
      var si = document.getElementById('search-modal-input');
      if (si) si.focus();
      return;
    }
    if (e.target.closest('[data-search-modal-close]')) { closeOverlay(getOverlay('search-modal')); return; }
    var menuOpener = e.target.closest('[data-mobile-menu-open]');
    if (menuOpener) {
      menuOpener.setAttribute('aria-expanded', 'true');
      openOverlay(getOverlay('mobile-menu-drawer'));
      return;
    }
    if (e.target.closest('[data-mobile-menu-close]')) {
      closeOverlay(getOverlay('mobile-menu-drawer'));
      document.querySelectorAll('[data-mobile-menu-open]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      return;
    }
    if (e.target.closest('[data-filter-drawer-open]')) { openOverlay(getOverlay('filter-drawer')); return; }
    if (e.target.closest('[data-filter-drawer-close]')) { closeOverlay(getOverlay('filter-drawer')); return; }
    var menuLink = e.target.closest('#mobile-menu-drawer a');
    if (menuLink) { closeOverlay(getOverlay('mobile-menu-drawer')); return; }
    var wishLink = e.target.closest('#wishlist-drawer a');
    if (wishLink && !wishLink.hasAttribute('data-wishlist-drawer-close')) { closeOverlay(getOverlay('wishlist-drawer')); }
    var backdrop = e.target.closest(OVERLAY_SEL);
    if (backdrop && e.target === backdrop) closeOverlay(backdrop);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll(OVERLAY_SEL).forEach(closeOverlay);
      return;
    }
    if (e.key === 'Tab') {
      var ov = e.target.closest ? e.target.closest(OVERLAY_SEL) : null;
      if (ov && ov.classList.contains('active')) trapFocus(ov, e);
    }
  });

  /* ---------- Wishlist (device-local) ---------- */
  var WISH_KEY = 'kartzo-wishlist-v1';
  function getWishlist() {
    try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch (e) { return []; }
  }
  function setWishlist(list) {
    try { localStorage.setItem(WISH_KEY, JSON.stringify(list)); } catch (e) {}
    syncWishlistUI();
    document.dispatchEvent(new CustomEvent('kartzo:wishlistchange', { bubbles: true }));
  }
  function syncWishlistUI() {
    var list = getWishlist();
    document.querySelectorAll('[data-wishlist-count]').forEach(function (el) {
      el.textContent = String(list.length);
      el.classList.toggle('hidden', list.length === 0);
      el.classList.toggle('flex', list.length > 0);
      if (el.id === 'wishlist-count') {
        el.classList.toggle('hidden', list.length === 0);
      }
    });
    var ids = {};
    list.forEach(function (entry) { ids[String(entry.id)] = true; });
    document.querySelectorAll('[data-wishlist-toggle]').forEach(function (btn) {
      var on = !!ids[String(btn.getAttribute('data-wishlist-toggle'))];
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var pageCount = document.getElementById('wishlist-page-count');
    if (pageCount) pageCount.textContent = '(' + list.length + ' saved)';
  }
  function renderWishlistDrawer() {
    var wrap = document.querySelector('[data-wishlist-items]');
    if (!wrap) return;
    var list = getWishlist();
    wrap.innerHTML = '';
    if (!list.length) {
      wrap.innerHTML =
        '<div class="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">' +
          '<div class="flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500">' +
            '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z"/></svg>' +
          '</div>' +
          '<p class="text-base font-extrabold text-brand-ink">Your Wishlist is Empty</p>' +
          '<p class="max-w-xs text-xs text-slate-500">Tap the heart on any product to save it here for later.</p>' +
        '</div>';
      return;
    }
    list.forEach(function (entry) {
      var itemUrl = (entry.url && entry.url !== '#' && entry.url.indexOf('javascript') === -1)
        ? entry.url
        : ((window.Shopify && window.Shopify.routes && window.Shopify.routes.root) ? window.Shopify.routes.root + 'collections/all' : '/collections/all');
      var item = document.createElement('article');
      item.className = 'flex gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm items-center justify-between';
      item.innerHTML =
        '<a href="' + itemUrl + '" class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-1.5">' +
          (entry.image ? '<img src="' + entry.image + '" alt="" class="max-h-full max-w-full object-contain" loading="lazy">' : '<div class="h-6 w-6 text-slate-300">★</div>') +
        '</a>' +
        '<div class="min-w-0 flex-1 px-1">' +
          '<a href="' + itemUrl + '" class="block truncate text-xs sm:text-sm font-bold text-brand-ink hover:text-brand transition">' + entry.title + '</a>' +
          '<p class="mt-0.5 text-xs font-extrabold text-brand-ink">' + (entry.price || '') + '</p>' +
        '</div>' +
        '<div class="flex items-center gap-2 shrink-0">' +
          (entry.id ? '<button type="button" class="wishlist-quick-add rounded-lg bg-brand px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-brand-dark transition" data-wish-id="' + entry.id + '">Add to Cart</button>' : '') +
          '<button type="button" class="wishlist-drawer-remove text-slate-400 hover:text-rose-500 transition p-1" data-wish-remove="' + entry.id + '" aria-label="Remove">' +
            '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></svg>' +
          '</button>' +
        '</div>';
      wrap.appendChild(item);
    });
  }

  function renderWishlistGrid() {
    var grid = document.getElementById('wishlist-grid');
    if (!grid) return;
    var emptyState = document.getElementById('wishlist-empty');
    var list = getWishlist();
    grid.innerHTML = '';
    if (!list.length) {
      if (emptyState) emptyState.hidden = false;
      return;
    }
    if (emptyState) emptyState.hidden = true;
    list.forEach(function (entry) {
      var card = document.createElement('article');
      card.className = 'product-card product relative flex flex-col rounded-2xl border border-[#e6eefb] bg-white p-2.5 shadow-[0_2px_10px_rgba(15,50,120,0.04)] transition duration-200 hover:border-[#b9d0ff] hover:shadow-card';
      card.innerHTML =
        '<button type="button" class="wish absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-md" aria-pressed="true" data-wishlist-toggle="' + entry.id + '" aria-label="Remove from wishlist"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z"/></svg></button>' +
        '<a href="' + (entry.url || '#') + '" class="image-wrap flex h-28 items-center justify-center sm:h-32">' +
          (entry.image ? '<img src="' + entry.image + '" alt="" class="h-24 w-auto object-contain" loading="lazy">' : '') +
        '</a>' +
        '<h3 class="mt-1 text-[13px] font-bold leading-tight"><a href="' + (entry.url || '#') + '" class="hover:text-brand"></a></h3>' +
        '<p class="mt-1 text-[15px] font-extrabold">' + (entry.price || '') + '</p>' +
        '<a href="' + (entry.url || '#') + '" class="mt-2 inline-flex min-h-11 items-center justify-center rounded-lg bg-brand text-xs font-bold text-white hover:bg-brand-dark">View Product</a>';
      card.querySelector('h3 a').textContent = entry.title;
      grid.appendChild(card);
    });
    syncWishlistUI();
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-wishlist-toggle]');
    if (!btn) return;
    e.preventDefault();
    var id = btn.getAttribute('data-wishlist-toggle');
    var list = getWishlist();
    var idx = list.findIndex(function (entry) { return String(entry.id) === String(id); });
    if (idx >= 0) {
      list.splice(idx, 1);
      showToast('Removed from your wishlist', 'wishlist');
    } else {
      list.push({
        id: id,
        handle: btn.getAttribute('data-wish-handle') || '',
        title: btn.getAttribute('data-wish-title') || 'Product',
        image: btn.getAttribute('data-wish-image') || '',
        price: btn.getAttribute('data-wish-price') || '',
        url: btn.getAttribute('data-wish-url') || ''
      });
      showToast('Saved to your wishlist', 'wishlist');
    }
    setWishlist(list);
  });
  syncWishlistUI();

  /* ---------- Cart (Ajax API, locale-aware) ---------- */
  var cartSeq = 0; // guards overlapping requests: only the latest response paints
  function cartRoot(path) {
    var root = routes.root || '/';
    if (root.charAt(root.length - 1) !== '/') root += '/';
    return root + path.replace(/^\//, '');
  }
  function setCartCount(count) {
    count = Math.max(0, count || 0);
    document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = String(count); });
    document.querySelectorAll('.cart-trigger').forEach(function (link) {
      link.setAttribute('aria-label', 'Cart');
    });
  }
  function updateFreeShipping(subtotalMinor) {
    var bar = document.querySelector('[data-ship-bar]');
    var text = document.querySelector('[data-ship-text]');
    var goal = document.querySelector('[data-ship-goal]');
    if (!bar || !text) return;
    if (!subtotalMinor || subtotalMinor <= 0) {
      bar.style.width = '0%';
      text.innerHTML = '';
      var s = document.createElement('span');
      s.innerHTML = 'Add items to unlock <strong>Free Shipping</strong>';
      text.appendChild(s);
      if (goal) goal.textContent = money(thresholdMinor) + ' goal';
      return;
    }
    if (subtotalMinor >= thresholdMinor) {
      bar.style.width = '100%';
      text.innerHTML = '<span>You have unlocked <strong>FREE Delivery!</strong></span>';
      if (goal) goal.textContent = money(thresholdMinor) + ' goal met';
    } else {
      var pct = Math.min(100, Math.round((subtotalMinor / thresholdMinor) * 100));
      bar.style.width = pct + '%';
      text.textContent = '';
      var strong = document.createElement('strong');
      strong.textContent = money(thresholdMinor - subtotalMinor);
      text.appendChild(document.createTextNode('Add '));
      text.appendChild(strong);
      text.appendChild(document.createTextNode(' more for FREE Delivery'));
      if (goal) goal.textContent = money(thresholdMinor) + ' goal';
    }
  }
  /* Shopify CDN sizing that preserves cache-busting / signature query params. */
  function sizedImage(url, size) {
    if (!url) return '';
    var q = url.indexOf('?');
    var base = q >= 0 ? url.slice(0, q) : url;
    var query = q >= 0 ? url.slice(q) : '';
    return base.replace(/(\.[A-Za-z0-9]+)$/, '_' + size + '$1') + query;
  }
  function renderDrawerItems(items) {
    var wrap = document.querySelector('[data-cart-items]');
    if (!wrap) return;
    wrap.innerHTML = '';
    if (!items.length) {
      var empty = document.createElement('div');
      empty.className = 'flex h-full flex-col items-center justify-center gap-3 py-10 text-center';
      empty.setAttribute('data-cart-empty', '');
      empty.innerHTML = '<p class="text-sm font-bold text-brand-ink">Your Shopping Cart is Empty</p>';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-cart-drawer-close', '');
      btn.className = 'mt-1 inline-flex min-h-11 items-center rounded-xl bg-brand px-6 text-sm font-bold text-white hover:bg-brand-dark';
      btn.textContent = 'Continue shopping';
      btn.addEventListener('click', function () { closeOverlay(getOverlay('cart-drawer')); });
      empty.appendChild(btn);
      wrap.appendChild(empty);
      var footer = document.querySelector('[data-cart-footer]');
      if (footer) footer.hidden = true;
      return;
    }
    items.forEach(function (item) {
      var art = document.createElement('article');
      art.className = 'drawer-item flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm';
      art.setAttribute('data-key', item.key);
      var img = item.image
        ? '<a href="' + item.url + '" class="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2"><img src="' + sizedImage(item.image, '200x') + '" alt="" class="h-full w-auto object-contain" loading="lazy"></a>'
        : '';
      art.innerHTML =
        img +
        '<div class="flex min-w-0 flex-1 flex-col justify-between">' +
          '<div class="flex items-start justify-between gap-1"><div class="min-w-0">' +
            '<a href="' + item.url + '" class="block truncate text-xs sm:text-sm font-bold text-brand-ink hover:text-brand transition"></a>' +
            (item.options_with_values && item.options_with_values.length
              ? '<p class="text-[11px] text-slate-500">' + item.options_with_values.map(function (o) { return o.value; }).join(' / ') + '</p>'
              : '') +
          '</div>' +
          '<button type="button" class="drawer-remove-item text-slate-400 hover:text-rose-500 transition" aria-label="Remove item"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></svg></button></div>' +
          '<div class="mt-2.5 flex items-center justify-between">' +
            '<div data-qty data-min="0" data-max="10" data-key="' + item.key + '" class="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50">' +
              '<button type="button" class="qty-btn qty-minus flex h-7 w-7 items-center justify-center text-slate-600 hover:text-slate-900" aria-label="Decrease quantity">−</button>' +
              '<span data-qty-value class="min-w-[1.5rem] text-center text-xs font-bold text-brand-ink">' + item.quantity + '</span>' +
              '<button type="button" class="qty-btn qty-plus flex h-7 w-7 items-center justify-center text-slate-600 hover:text-slate-900" aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<p class="text-xs sm:text-sm font-extrabold text-brand-ink">' + money(item.final_line_price) + '</p>' +
          '</div>' +
        '</div>';
      art.querySelector('a.block').textContent = item.product_title || item.title;
      art.querySelector('[data-remove], .drawer-remove-item').setAttribute('data-remove', item.key);
      wrap.appendChild(art);
    });
    bindQtySteppers(wrap);
    bindRemoveButtons(wrap);
    var footerEl = document.querySelector('[data-cart-footer]');
    if (footerEl) footerEl.hidden = false;
  }
  function paintCart(cart) {
    setCartCount(cart.item_count);
    updateFreeShipping(cart.total_price);
    renderDrawerItems(cart.items || []);
    var sub = document.querySelector('[data-cart-subtotal]');
    if (sub) sub.textContent = money(cart.total_price);
    var total = document.querySelector('[data-cart-total]');
    if (total) total.textContent = money(cart.total_price);
    var mainCount = document.getElementById('cart-item-count-label');
    if (mainCount) mainCount.textContent = String(cart.item_count);
    document.dispatchEvent(new CustomEvent('kartzo:cartchange', { detail: cart, bubbles: true }));
  }
  function refreshCart() {
    var seq = ++cartSeq;
    return fetch(cartRoot('cart.js'), { headers: { Accept: 'application/json' } })
      .then(function (res) { if (!res.ok) throw new Error('cart'); return res.json(); })
      .then(function (cart) { if (seq === cartSeq) paintCart(cart); return cart; })
      .catch(function () { return null; });
  }
  function changeLine(key, quantity) {
    var seq = ++cartSeq;
    return fetch(cartRoot('cart/change.js'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity })
    })
      .then(function (res) { if (!res.ok) throw new Error('change'); return res.json(); })
      .then(function (cart) { if (seq === cartSeq) paintCart(cart); return cart; })
      .catch(function () {
        showToast('Something went wrong updating your cart. Please try again.', 'cart');
        return refreshCart();
      });
  }

  /* Product + quick-add forms (progressive enhancement: native submit still works) */
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('form[data-product-form], form[action*="/cart/add"], form[data-type="add-to-cart-form"]');
    if (!form) return;
    e.preventDefault();
    var btn = form.querySelector('[type="submit"][name="add"], button.add-cart, button[type="submit"]');
    var original = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Adding...'; }
    var data = new FormData(form);
    fetch(cartRoot('cart/add.js'), { method: 'POST', headers: { Accept: 'application/json' }, body: data })
      .then(function (res) { if (!res.ok) throw new Error('add'); return res.json(); })
      .then(function () {
        if (btn) { btn.textContent = 'Added to Cart'; }
        showToast('Item added to your cart', 'cart');
        return refreshCart();
      })
      .then(function () {
        var cartOverlay = getOverlay('cart-drawer');
        if (cartOverlay) {
          openOverlay(cartOverlay);
        } else {
          window.location.href = routes.cart || '/cart';
        }
      })
      .catch(function () { showToast('Something went wrong updating your cart. Please try again.', 'cart'); })
      .finally(function () {
        setTimeout(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        }, 1500);
      });
  });

  function bindRemoveButtons(scope) {
    (scope || document).querySelectorAll('[data-remove]').forEach(function (btn) {
      if (btn.__kzBound) return;
      btn.__kzBound = true;
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-remove');
        if (!key) return;
        btn.disabled = true;
        changeLine(key, 0).then(function () { showToast('Item removed from your cart', 'cart'); });
      });
    });
  }
  bindRemoveButtons(document);

  /* Quantity steppers (visual + drawer-Ajax; PDP/cart-page totals via qtychange) */
  function bindQtySteppers(scope) {
    (scope || document).querySelectorAll('[data-qty]:not([data-qty-bound])').forEach(function (wrap) {
      wrap.setAttribute('data-qty-bound', '1');
      var minus = wrap.querySelector('.qty-minus');
      var plus = wrap.querySelector('.qty-plus');
      var out = wrap.querySelector('[data-qty-value]');
      var input = wrap.querySelector('input[data-qty-input]');
      function current() {
        if (input) return parseInt(input.value, 10) || 1;
        return parseInt((out && out.textContent) || '1', 10);
      }
      function setValue(v) {
        var min = parseInt(wrap.getAttribute('data-min') || '1', 10);
        var max = parseInt(wrap.getAttribute('data-max') || '10', 10);
        v = Math.max(min, Math.min(max, v));
        if (input) input.value = String(v);
        if (out) out.textContent = String(v);
        wrap.dispatchEvent(new CustomEvent('qtychange', { detail: { value: v }, bubbles: true }));
        var key = wrap.getAttribute('data-key');
        if (key && wrap.closest('#cart-drawer, [data-cart-page]')) {
          changeLine(key, v);
        }
      }
      if (minus) minus.addEventListener('click', function () { setValue(current() - 1); });
      if (plus) plus.addEventListener('click', function () { setValue(current() + 1); });
    });
  }
  bindQtySteppers(document);

  /* ---------- Predictive search ---------- */
  var suggestInput = document.getElementById('search-modal-input');
  var suggestBox = document.querySelector('[data-suggest-results]');
  var suggestEmpty = document.querySelector('[data-suggest-empty]');
  var trending = document.querySelector('[data-trending]');
  var viewAll = document.querySelector('[data-suggest-view-all]');
  var suggestTimer = null;
  function paintSuggestions(items, query) {
    if (!suggestBox) return;
    suggestBox.innerHTML = '';
    var has = items && items.length > 0;
    if (suggestEmpty) suggestEmpty.classList.toggle('hidden', has || !query);
    (items || []).forEach(function (p) {
      var a = document.createElement('a');
      a.href = p.url;
      a.className = 'flex items-center gap-3.5 rounded-xl p-2.5 transition hover:bg-slate-50';
      a.setAttribute('role', 'option');
      /* No price here: suggest.json price magnitude cannot be verified without a
         live store, and a wrong price is worse than none. Price shows on the product page. */
      var img = p.featured_image
        ? '<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-50 p-1"><img src="' + sizedImage(p.featured_image.url, '100x') + '" alt="" class="h-9 w-auto object-contain" loading="lazy"></span>'
        : '';
      a.innerHTML =
        img +
        '<div class="min-w-0 flex-1"><p class="truncate text-xs sm:text-sm font-bold text-brand-ink"></p>' +
        '<p class="text-[11px] text-slate-500">' + (p.type || p.vendor || '') + '</p></div>';
      a.querySelector('div p').textContent = p.title;
      suggestBox.appendChild(a);
    });
    if (viewAll && query) viewAll.href = (routes.search || '/search') + '?q=' + encodeURIComponent(query);
    if (trending) trending.style.display = query ? 'none' : '';
  }
  if (suggestInput && suggestBox) {
    suggestInput.addEventListener('input', function () {
      var q = suggestInput.value.trim();
      suggestInput.setAttribute('aria-expanded', q ? 'true' : 'false');
      clearTimeout(suggestTimer);
      if (q.length < 2) { paintSuggestions([], ''); return; }
      suggestTimer = setTimeout(function () {
        fetch(cartRoot('search/suggest.json') + '?q=' + encodeURIComponent(q) + '&resources[type]=product&resources[limit]=6&resources[options][unavailable_products]=hide')
          .then(function (res) { if (!res.ok) throw new Error('suggest'); return res.json(); })
          .then(function (data) { paintSuggestions((data.resources && data.resources.results && data.resources.results.products) || [], q); })
          .catch(function () { paintSuggestions([], q); });
      }, 220);
    });
  }

  /* Inline header search fields hand off to the predictive modal (progressive
     enhancement: with JS disabled the inline forms submit to /search directly).
     blur() before opening avoids a focus-return loop on close. Delegated via
     focusin so header re-renders in the Theme Editor keep working. */
  document.addEventListener('focusin', function (e) {
    var t = e.target;
    if (!t || (t.id !== 'search' && t.id !== 'm-search')) return;
    var modal = getOverlay('search-modal');
    if (!modal || modal.classList.contains('active')) return;
    t.blur();
    openOverlay(modal);
  });

  /* ---------- Hero carousel (idempotent; re-runs on shopify:section:load) ---------- */
  function initHeroCarousels() {
  document.querySelectorAll('[data-hero-carousel]').forEach(function (root) {
    if (root.hasAttribute('data-hero-initialized')) return;
    root.setAttribute('data-hero-initialized', '1');
    var slides = Array.prototype.slice.call(root.querySelectorAll('[data-hero-slide]'));
    var dotsWrap = root.querySelector('[data-hero-dots]');
    if (!slides.length) return;
    var index = 0;
    var timer = null;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        var on = k === index;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', on ? 'false' : 'true');
        if (on) s.removeAttribute('inert'); else s.setAttribute('inert', '');
      });
      if (dotsWrap) {
        Array.prototype.forEach.call(dotsWrap.children, function (d, k) {
          d.classList.toggle('is-active', k === index);
          d.setAttribute('aria-current', k === index ? 'true' : 'false');
        });
      }
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() {
      stop();
      if (reduceMotion.matches || document.hidden || slides.length < 2) return;
      timer = setInterval(function () { show(index + 1); }, 6000);
    }
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach(function (_, k) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'hero-dot' + (k === 0 ? ' is-active' : '');
        d.setAttribute('aria-label', 'Show slide ' + (k + 1));
        d.addEventListener('click', function () { show(k); start(); });
        dotsWrap.appendChild(d);
      });
    }
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
    if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', start);
    show(0);
    start();
  });
  }
  initHeroCarousels();

  /* ---------- Product page: variants, gallery, sticky CTA ---------- */
  /* Idempotent: safe to call on load and on shopify:section:load (editor re-renders). */
  function initProductForm(productForm) {
    if (!productForm || productForm.dataset.kzInit) return;
    productForm.dataset.kzInit = '1';
    var productJson = null;
    try { productJson = JSON.parse(document.getElementById('product-json').textContent); } catch (e) {}
    var priceEl = document.querySelector('[data-product-price]');
    var compareEl = document.querySelector('[data-product-compare]');
    var addBtn = productForm.querySelector('[name="add"]');
    var variantInput = productForm.querySelector('input[name="id"]');
    function currentVariant() {
      if (!productJson) return null;
      var checked = Array.prototype.slice.call(productForm.querySelectorAll('input[type="radio"][name^="option"]:checked')).map(function (r) { return r.value; });
      if (!checked.length) {
        var sel = productForm.querySelector('select[name^="options"]');
        if (sel) checked = [sel.value];
      }
      return productJson.variants.find(function (v) {
        return v.options.every(function (opt, i) { return checked[i] === undefined || checked[i] === opt; });
      }) || null;
    }
    function paintVariant(v) {
      if (!v) return;
      if (variantInput) variantInput.value = v.id;
      if (priceEl) priceEl.textContent = money(v.price);
      if (compareEl) {
        if (v.compare_at_price && v.compare_at_price > v.price) {
          compareEl.textContent = money(v.compare_at_price);
          compareEl.hidden = false;
        } else { compareEl.textContent = ''; compareEl.hidden = true; }
      }
      var statusEl = document.querySelector('[data-variant-status]');
      if (statusEl) statusEl.textContent = v.available ? 'In stock' : 'Sold out';
      var saveBadge = document.querySelector('[data-save-badge]');
      if (saveBadge) {
        if (v.compare_at_price && v.compare_at_price > v.price) {
          saveBadge.textContent = 'Save ' + money(v.compare_at_price - v.price);
          saveBadge.hidden = false;
        } else { saveBadge.textContent = ''; saveBadge.hidden = true; }
      }
      var skuEl = document.querySelector('[data-variant-sku]');
      if (skuEl) skuEl.textContent = v.sku || '—';
      if (addBtn) {
        addBtn.disabled = !v.available;
        addBtn.textContent = v.available ? addBtn.getAttribute('data-add-label') || 'Add to Cart' : 'Sold out';
      }
      var media = v.featured_media_id && productJson.media
        ? productJson.media.find(function (m) { return m.id === v.featured_media_id; })
        : null;
      var mediaSrc = media && (media.src || (media.preview_image && media.preview_image.src));
      if (mediaSrc) {
        var main = document.getElementById('main-product-img');
        if (main) { main.src = mediaSrc; main.removeAttribute('srcset'); }
      }
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('variant', v.id);
        window.history.replaceState({}, '', url.toString());
      } catch (err) {}
    }
    productForm._kzPaint = function () { paintVariant(currentVariant()); };
    var initial = currentVariant();
    if (initial) paintVariant(initial);
  }
  initProductForm(document.querySelector('form[data-main-product-form]'));
  /* Delegated variant changes survive editor re-renders. */
  document.addEventListener('change', function (e) {
    var form = e.target.closest ? e.target.closest('form[data-main-product-form]') : null;
    if (!form) return;
    initProductForm(form);
    if (form._kzPaint) form._kzPaint();
  });
  /* Delegated gallery + swatch controls (editor re-render safe). */
  document.addEventListener('click', function (e) {
    var thumb = e.target.closest ? e.target.closest('[data-gallery-thumb]') : null;
    if (thumb) {
      var main = document.getElementById('main-product-img');
      var src = thumb.getAttribute('data-full') || (thumb.querySelector('img') || {}).src;
      if (main && src) { main.src = src; main.removeAttribute('srcset'); }
      document.querySelectorAll('[data-gallery-thumb]').forEach(function (t) {
        t.classList.remove('border-brand', 'ring-2', 'ring-brand');
        t.classList.add('border-[#e6eefb]');
      });
      thumb.classList.add('border-brand', 'ring-2', 'ring-brand');
      thumb.classList.remove('border-[#e6eefb]');
      return;
    }
    var sw = e.target.closest ? e.target.closest('[data-color-swatch]') : null;
    if (sw) {
      var group = sw.closest('[data-swatch-group]');
      if (group) group.querySelectorAll('[data-color-swatch]').forEach(function (s) { s.classList.remove('active'); s.removeAttribute('aria-checked'); });
      sw.classList.add('active');
      sw.setAttribute('aria-checked', 'true');
      var label = document.getElementById('selected-color-label');
      if (label) label.textContent = sw.getAttribute('data-color-name') || '';
    }
  });
  var pdpCta = document.getElementById('pdp-main-cta');
  var stickyBar = document.getElementById('sticky-pdp-bar');
  if (pdpCta && stickyBar && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { stickyBar.classList.toggle('active', !en.isIntersecting && en.boundingClientRect.top < 0); });
    }, { threshold: 0.1 }).observe(pdpCta);
  }

  /* ---------- Pincode checker (honest estimate copy) ---------- */
  var pinBtn = document.getElementById('pincode-check-btn');
  if (pinBtn) {
    pinBtn.addEventListener('click', function () {
      var input = document.getElementById('pincode-input');
      var out = document.getElementById('pincode-result');
      if (!input || !out) return;
      var pin = (input.value || '').trim();
      if (/^\d{6}$/.test(pin)) {
        out.hidden = false;
        out.innerHTML = '';
        var ok = document.createElement('p');
        ok.className = 'text-sm font-semibold text-emerald-700';
        ok.textContent = 'Delivery is available to ' + pin + '. Exact options and timing are shown at checkout.';
        out.appendChild(ok);
      } else {
        out.hidden = false;
        out.innerHTML = '';
        var err = document.createElement('p');
        err.className = 'text-sm font-semibold text-rose-600';
        err.textContent = 'Please enter a valid 6-digit pincode.';
        out.appendChild(err);
      }
    });
  }

  /* ---------- Discount-code reminder (codes apply at checkout) ---------- */
  document.querySelectorAll('form[data-discount-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[name="discount"]');
      var msg = form.querySelector('[data-discount-msg]');
      var code = input ? input.value.trim() : '';
      if (!code) return;
      fetch(cartRoot('cart/update.js'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ note: 'Discount code to apply at checkout: ' + code })
      }).finally(function () {
        if (msg) {
          msg.hidden = false;
          msg.textContent = 'Saved "' + code + '" — enter it on the checkout page to apply your discount.';
        }
        showToast('Discount code saved for checkout', 'cart');
      });
    });
  });

  /* ---------- Collection: sort + filters ---------- */
  /* Delegated: sort + filters submit natively (progressive enhancement intact). */
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('[data-sort-select]')) {
      var sortForm = t.closest('form');
      if (sortForm) sortForm.submit();
      return;
    }
    var filtersForm = t.closest('form[data-filters-form]');
    if (filtersForm && !t.closest('form[data-main-product-form]')) filtersForm.submit();
  });

  /* ---------- Newsletter feedback (native customer form posts; toast on success marker) ---------- */
  var nlOk = document.querySelector('[data-newsletter-success]');
  if (nlOk) showToast(nlOk.getAttribute('data-newsletter-success'), 'cart');

  /* ---------- Wishlist page render (re-renders on every change) ---------- */
  function renderWishlistDrawer() {
    var wrap = document.querySelector('[data-wishlist-items]');
    if (!wrap) return;
    var list = getWishlist();
    wrap.innerHTML = '';
    if (!list.length) {
      wrap.innerHTML =
        '<div class="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">' +
          '<div class="flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500">' +
            '<svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z"/></svg>' +
          '</div>' +
          '<p class="text-base font-extrabold text-brand-ink">Your Wishlist is Empty</p>' +
          '<p class="max-w-xs text-xs text-slate-500">Tap the heart on any product to save it here for later.</p>' +
        '</div>';
      return;
    }
    list.forEach(function (entry) {
      var item = document.createElement('article');
      item.className = 'flex gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm items-center justify-between';
      item.innerHTML =
        '<a href="' + (entry.url || '#') + '" class="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-1.5">' +
          (entry.image ? '<img src="' + entry.image + '" alt="" class="max-h-full max-w-full object-contain" loading="lazy">' : '<div class="h-6 w-6 text-slate-300">★</div>') +
        '</a>' +
        '<div class="min-w-0 flex-1 px-1">' +
          '<a href="' + (entry.url || '#') + '" class="block truncate text-xs sm:text-sm font-bold text-brand-ink hover:text-brand transition">' + entry.title + '</a>' +
          '<p class="mt-0.5 text-xs font-extrabold text-brand-ink">' + (entry.price || '') + '</p>' +
        '</div>' +
        '<div class="flex items-center gap-2 shrink-0">' +
          (entry.id ? '<button type="button" class="wishlist-quick-add rounded-lg bg-brand px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-brand-dark transition" data-wish-id="' + entry.id + '">Add to Cart</button>' : '') +
          '<button type="button" class="wishlist-drawer-remove text-slate-400 hover:text-rose-500 transition p-1" data-wish-remove="' + entry.id + '" aria-label="Remove">' +
            '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></svg>' +
          '</button>' +
        '</div>';
      wrap.appendChild(item);
    });
  }

  function renderWishlistGrid() {
    var grid = document.getElementById('wishlist-grid');
    if (!grid) return;
    var emptyState = document.getElementById('wishlist-empty');
    var entries = getWishlist();
    grid.innerHTML = '';
    if (!entries.length) {
      if (emptyState) emptyState.hidden = false;
      return;
    }
    if (emptyState) emptyState.hidden = true;
    entries.forEach(function (entry) {
      var card = document.createElement('article');
      card.className = 'product-card product relative flex flex-col rounded-2xl border border-[#e6eefb] bg-white p-2.5 shadow-[0_2px_10px_rgba(15,50,120,0.04)] transition duration-200 hover:border-[#b9d0ff] hover:shadow-card';
      card.innerHTML =
        '<button type="button" class="wish absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-md" aria-pressed="true" data-wishlist-toggle="' + entry.id + '" aria-label="Remove from wishlist"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z"/></svg></button>' +
        '<a href="' + (entry.url || '#') + '" class="image-wrap flex h-28 items-center justify-center sm:h-32">' +
          (entry.image ? '<img src="' + entry.image + '" alt="" class="h-24 w-auto object-contain" loading="lazy">' : '') +
        '</a>' +
        '<h3 class="mt-1 text-[13px] font-bold leading-tight"><a href="' + (entry.url || '#') + '" class="hover:text-brand"></a></h3>' +
        '<p class="mt-1 text-[15px] font-extrabold">' + (entry.price || '') + '</p>' +
        '<a href="' + (entry.url || '#') + '" class="mt-2 inline-flex min-h-11 items-center justify-center rounded-lg bg-brand text-xs font-bold text-white hover:bg-brand-dark">View Product</a>';
      card.querySelector('h3 a').textContent = entry.title;
      grid.appendChild(card);
    });
    syncWishlistUI();
  }
  renderWishlistGrid();
  document.addEventListener('kartzo:wishlistchange', function () { renderWishlistGrid(); });

  /* ---------- Promo countdown (merchant-set end time; hides past expiry) ---------- */
  function initCountdowns() {
  document.querySelectorAll('[data-countdown]').forEach(function (el) {
    if (el.dataset.kzCountdown) return;
    el.dataset.kzCountdown = '1';
    var end = new Date(el.getAttribute('data-countdown')).getTime();
    if (isNaN(end)) return;
    var hEl = el.querySelector('[data-cd-h]');
    var mEl = el.querySelector('[data-cd-m]');
    var sEl = el.querySelector('[data-cd-s]');
    function pad(n) { return String(n).padStart(2, '0'); }
    function tick() {
      var diff = end - Date.now();
      if (diff <= 0) { el.hidden = true; clearInterval(timer); return; }
      var total = Math.floor(diff / 1000);
      if (hEl) hEl.textContent = pad(Math.floor(total / 3600));
      if (mEl) mEl.textContent = pad(Math.floor((total % 3600) / 60));
      if (sEl) sEl.textContent = pad(total % 60);
    }
    var timer = setInterval(tick, 1000);
    tick();
  });
  }
  initCountdowns();

  /* ---------- Initial cart sync ---------- */
  refreshCart();

  /* Theme Editor: sections re-render without page reload — re-run section-scoped
     init so added/re-rendered sections work; document-level delegation (overlays,
     wishlist, forms, gallery, sort/filters) needs no re-binding. */
  document.addEventListener('shopify:section:load', function (e) {
    var section = e.target && e.target.querySelector ? e.target : document;
    bindQtySteppers(section);
    bindRemoveButtons(section);
    var pf = section.querySelector
      ? section.querySelector('form[data-main-product-form]')
      : document.querySelector('form[data-main-product-form]');
    initProductForm(pf);
    initHeroCarousels();
    initCountdowns();
    syncWishlistUI();
    renderWishlistGrid();
  });

  /* ---------- Accessibility DOM safeguards ---------- */
  function ensureImageAlts() {
    var imgs = document.querySelectorAll('.prose-kartzo img:not([alt])');
    if (!imgs.length) return;
    var heading = document.querySelector('h1');
    var fallback = (heading && heading.textContent.trim()) || 'Product detail image';
    imgs.forEach(function (img) {
      if (!img.getAttribute('alt')) {
        img.setAttribute('alt', fallback);
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureImageAlts);
  } else {
    ensureImageAlts();
  }

  window.Kartzo = {
    toast: showToast,
    openCart: function () { refreshCart().finally(function () { openOverlay(getOverlay('cart-drawer')); }); },
    closeCart: function () { closeOverlay(getOverlay('cart-drawer')); },
    refreshCart: refreshCart,
    getWishlist: getWishlist
  };
})();
