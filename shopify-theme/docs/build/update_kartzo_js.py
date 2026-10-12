import os

kartzo_js_path = r'c:\Users\ujjaw\Documents\Github\kartzo\shopify-theme\assets\kartzo.js'
with open(kartzo_js_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update allOverlays and OVERLAY_SEL to include #wishlist-drawer
code = code.replace(
    "return document.querySelectorAll('#cart-drawer, #search-modal, #mobile-menu-drawer, #filter-drawer');",
    "return document.querySelectorAll('#cart-drawer, #search-modal, #mobile-menu-drawer, #filter-drawer, #wishlist-drawer');"
)
code = code.replace(
    "var OVERLAY_SEL = '#cart-drawer, #search-modal, #mobile-menu-drawer, #filter-drawer';",
    "var OVERLAY_SEL = '#cart-drawer, #search-modal, #mobile-menu-drawer, #filter-drawer, #wishlist-drawer';"
)

# 2. Add click handlers for wishlist-drawer
wishlist_click_handlers = """    var wishOpener = e.target.closest('[data-wishlist-drawer-open]');
    if (wishOpener) {
      e.preventDefault();
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
      .then(function () { openOverlay(getOverlay('cart-drawer')); })
      .catch(function () {
        showToast('Please visit the product page to select options', 'cart');
      })
      .finally(function () {
        wishAddBtn.disabled = false;
        wishAddBtn.textContent = 'Add to Cart';
      });
      return;
    }
"""

if 'data-wishlist-drawer-open' not in code:
    code = code.replace(
        "var opener = e.target.closest('[data-cart-drawer-open]');",
        wishlist_click_handlers + "\n    var opener = e.target.closest('[data-cart-drawer-open]');"
    )

# 3. Add renderWishlistDrawer function right above renderWishlistGrid
render_wishlist_drawer_fn = """  function renderWishlistDrawer() {
    var wrap = document.querySelector('[data-wishlist-items]');
    if (!wrap) return;
    var list = getWishlist();
    wrap.innerHTML = '';
    if (!list.length) {
      wrap.innerHTML =
        '<div class=\"flex h-full flex-col items-center justify-center gap-3 py-10 text-center\">' +
          '<div class=\"flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500\">' +
            '<svg class=\"h-7 w-7\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z\"/></svg>' +
          '</div>' +
          '<p class=\"text-base font-extrabold text-brand-ink\">Your Wishlist is Empty</p>' +
          '<p class=\"max-w-xs text-xs text-slate-500\">Tap the heart on any product to save it here for later.</p>' +
        '</div>';
      return;
    }
    list.forEach(function (entry) {
      var item = document.createElement('article');
      item.className = 'flex gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm items-center justify-between';
      item.innerHTML =
        '<a href=\"' + (entry.url || '#') + '\" class=\"flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-1.5\">' +
          (entry.image ? '<img src=\"' + entry.image + '\" alt=\"\" class=\"max-h-full max-w-full object-contain\" loading=\"lazy\">' : '<div class=\"h-6 w-6 text-slate-300\">★</div>') +
        '</a>' +
        '<div class=\"min-w-0 flex-1 px-1\">' +
          '<a href=\"' + (entry.url || '#') + '\" class=\"block truncate text-xs sm:text-sm font-bold text-brand-ink hover:text-brand transition\">' + entry.title + '</a>' +
          '<p class=\"mt-0.5 text-xs font-extrabold text-brand-ink\">' + (entry.price || '') + '</p>' +
        '</div>' +
        '<div class=\"flex items-center gap-2 shrink-0\">' +
          (entry.id ? '<button type=\"button\" class=\"wishlist-quick-add rounded-lg bg-brand px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-brand-dark transition\" data-wish-id=\"' + entry.id + '\">Add to Cart</button>' : '') +
          '<button type=\"button\" class=\"wishlist-drawer-remove text-slate-400 hover:text-rose-500 transition p-1\" data-wish-remove=\"' + entry.id + '\" aria-label=\"Remove\">' +
            '<svg class=\"h-4 w-4\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><path d=\"M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13\"/></svg>' +
          '</button>' +
        '</div>';
      wrap.appendChild(item);
    });
  }
"""

if 'function renderWishlistDrawer()' not in code:
    code = code.replace(
        "  function renderWishlistGrid() {",
        render_wishlist_drawer_fn + "\n  function renderWishlistGrid() {"
    )

# 4. In document.addEventListener('submit', function (e) { ... })
# Broaden form selector to include any form that posts to /cart/add
code = code.replace(
    "var form = e.target.closest('form[data-product-form]');",
    "var form = e.target.closest('form[data-product-form], form[action*=\"/cart/add\"], form[data-type=\"add-to-cart-form\"]');"
)
code = code.replace(
    "var btn = form.querySelector('[type=\"submit\"][name=\"add\"]');",
    "var btn = form.querySelector('[type=\"submit\"][name=\"add\"], button.add-cart, button[type=\"submit\"]');"
)
code = code.replace(
    ".then(function () { openOverlay(getOverlay('cart-drawer')); })",
    """.then(function () {
        var cartOverlay = getOverlay('cart-drawer');
        if (cartOverlay) {
          openOverlay(cartOverlay);
        } else {
          window.location.href = routes.cart || '/cart';
        }
      })"""
)

with open(kartzo_js_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated kartzo.js successfully.")
