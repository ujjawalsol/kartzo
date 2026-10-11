import { page, productCard, products, cats, crumbs, icon, stars } from "./shared.mjs";

export function buildShop() {
  // ---------------------------------------------------------------------------
  // 01. COLLECTION / PRODUCTS CATALOG PAGE (products.html)
  // ---------------------------------------------------------------------------
  page("products.html", "Shop All Products — Kartzo", "Browse verified electronics, lifestyle accessories, footwear, and home essentials with fast doorstep delivery across India.", "shop", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Shop All Products" }])}
    
    <div class="pad site-max py-5 sm:py-8">
      <!-- Collection Header -->
      <div class="mb-5 flex flex-col gap-3 border-b border-slate-200/80 pb-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-6">
        <div>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
            ${icon("sparkles", "h-3.5 w-3.5")}
            Curated Catalog
          </span>
          <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
            All Products
          </h1>
          <p class="mt-1 text-xs sm:text-sm text-slate-500">
            Showing <span id="catalog-count" class="font-bold text-brand-ink">12</span> verified products • Free express delivery above ₹499
          </p>
        </div>
        
        <!-- Controls: Filter Button + Custom Sort Dropdown -->
        <div class="flex items-center gap-2 sm:gap-2.5">
          <button type="button" data-filter-drawer-open class="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-brand-ink shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:flex-none lg:hidden" aria-label="Open filter options">
            ${icon("filter", "h-4 w-4 text-brand")}
            <span>Filters</span>
          </button>
          
          <div class="relative flex-1 sm:w-56 sm:flex-none" data-sort-wrap>
            <button type="button" id="sort-btn" aria-haspopup="listbox" aria-expanded="false" class="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs sm:text-sm font-bold text-brand-ink shadow-sm transition hover:border-brand/40">
              <span class="flex min-w-0 items-center gap-2">
                <svg class="h-4 w-4 shrink-0 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M7 12h10m-8 6h6"/></svg>
                <span id="sort-label" class="truncate">Most Popular</span>
              </span>
              ${icon("chevron-down", "h-4 w-4 shrink-0 text-slate-400")}
            </button>
            <ul id="sort-menu" role="listbox" aria-label="Sort products" class="absolute inset-x-0 top-full z-30 mt-2 hidden overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
              ${[["popular", "Most Popular"], ["price-asc", "Price: Low to High"], ["price-desc", "Price: High to Low"], ["newest", "Newest Arrivals"], ["rating", "Highest Rated"]].map(([v, l], i) => `
              <li><button type="button" role="option" data-sort="${v}" aria-selected="${i === 0 ? "true" : "false"}" class="sort-option flex min-h-11 w-full items-center justify-between gap-2 px-4 text-xs sm:text-sm font-bold transition ${i === 0 ? "bg-brand-soft text-brand" : "text-slate-600 hover:bg-slate-50"}">
                <span>${l}</span>
                <svg class="sort-tick h-4 w-4 shrink-0 ${i === 0 ? "" : "hidden"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
              </button></li>`).join("")}
            </ul>
          </div>
        </div>
      </div>

      <!-- Active Filter Chips -->
      <div id="active-filters-bar" class="mb-4 flex flex-wrap items-center gap-2 text-xs sm:mb-6">
        <span class="font-bold text-slate-400 uppercase tracking-wider text-[11px]">Active Filters:</span>
        <span id="active-cat-chip" class="inline-flex items-center gap-1.5 rounded-lg bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          Category: <span id="chip-cat-name">All</span>
        </span>
        <button type="button" id="clear-all-filters" class="text-xs font-bold text-slate-400 hover:text-brand transition underline">Reset All</button>
      </div>

      <!-- Layout: Desktop Sidebar + Product Grid -->
      <div class="grid gap-8 lg:grid-cols-[260px_1fr]">
        
        <!-- Desktop Aside Filter -->
        <aside class="hidden lg:block h-fit rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 class="text-xs font-extrabold uppercase tracking-wider text-brand-ink">Filter Catalog</h2>
            <button type="button" id="reset-desktop-filters" class="text-xs font-bold text-brand hover:underline">Reset</button>
          </div>

          <!-- Category Filter -->
          <div class="mt-4">
            <h3 class="text-xs font-extrabold text-brand-ink uppercase tracking-wider">Categories</h3>
            <div class="mt-2.5 space-y-1" id="filters">
              ${["All", "Electronics", "Fashion", "Kitchen", "Beauty", "Bags", "Home"].map((c, i) => `
              <label class="flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                <span class="flex items-center gap-2.5">
                  <input type="radio" name="cat" value="${c.toLowerCase()}" class="accent-brand h-4 w-4" ${i === 0 ? "checked" : ""}>
                  <span>${c}</span>
                </span>
              </label>`).join("")}
            </div>
          </div>

          <!-- Price Range Filter -->
          <div class="mt-5 border-t border-slate-100 pt-4">
            <h3 class="text-xs font-extrabold text-brand-ink uppercase tracking-wider">Price Range</h3>
            <div class="mt-2.5 space-y-2 text-xs font-semibold text-slate-600">
              <label class="flex cursor-pointer items-center gap-2.5"><input type="checkbox" class="accent-brand h-4 w-4"> Under ₹2,000</label>
              <label class="flex cursor-pointer items-center gap-2.5"><input type="checkbox" class="accent-brand h-4 w-4"> ₹2,000 - ₹5,000</label>
              <label class="flex cursor-pointer items-center gap-2.5"><input type="checkbox" class="accent-brand h-4 w-4"> Above ₹5,000</label>
            </div>
          </div>

          <!-- Availability & Rating -->
          <div class="mt-5 border-t border-slate-100 pt-4">
            <h3 class="text-xs font-extrabold text-brand-ink uppercase tracking-wider">Quality &amp; Stock</h3>
            <div class="mt-2.5 space-y-2 text-xs font-semibold text-slate-600">
              <label class="flex cursor-pointer items-center gap-2.5"><input type="checkbox" checked class="accent-brand h-4 w-4"> In Stock Only</label>
              <label class="flex cursor-pointer items-center gap-2.5"><input type="checkbox" class="accent-brand h-4 w-4"> 4.0+ Star Rating</label>
              <label class="flex cursor-pointer items-center gap-2.5"><input type="checkbox" class="accent-brand h-4 w-4"> Discount 25%+</label>
            </div>
          </div>
        </aside>

        <!-- Product Grid Area -->
        <div>
          <div id="search-empty" class="mb-6 hidden rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center" role="status">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              ${icon("search", "h-6 w-6")}
            </div>
            <h3 class="mt-3 text-sm font-bold text-brand-ink">No matching products found</h3>
            <p class="mt-1 text-xs text-slate-500">Try adjusting your category selection or clear filters.</p>
          </div>

          <div id="product-grid" class="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 xl:grid-cols-4">
            ${products.map(productCard).join("\n            ")}
          </div>

          <!-- Bottom Editorial / SEO Information -->
          <div class="mt-8 hidden border-t border-slate-200/80 pt-8 text-xs text-slate-500 sm:mt-16 sm:block sm:pt-10 sm:text-sm">
            <h2 class="text-sm sm:text-base font-bold text-brand-ink">Authentic Quality Guarantees at Kartzo</h2>
            <p class="mt-2 leading-relaxed">
              Every item featured in the Kartzo catalog is sourced directly from verified manufacturer hubs and authorized distributors. We rigorously test consumer electronics for battery retention and acoustics, apparel for tensile seam strength, and home goods for ergonomics. All purchases include our 7-Day Doorstep Replacement Guarantee and official brand tax invoices.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Filter Drawer -->
    <div id="filter-drawer" class="drawer-backdrop fixed inset-0 z-[80] bg-slate-950/60 backdrop-blur-sm lg:hidden" role="dialog" aria-modal="true" aria-labelledby="filter-drawer-title">
      <div class="drawer-panel ml-auto flex h-full w-full max-w-xs flex-col bg-white shadow-2xl">
        <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 id="filter-drawer-title" class="text-base font-extrabold text-brand-ink">Filters</h2>
            <p class="mt-0.5 text-xs text-slate-500"><span id="drawer-count">12</span> products found</p>
          </div>
          <button type="button" data-filter-drawer-close class="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition" aria-label="Close filters">
            ${icon("close", "h-4 w-4")}
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-4 space-y-5">
          <div>
            <h3 class="px-1 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Categories</h3>
            <div class="mt-2 space-y-1">
              ${["All", "Electronics", "Fashion", "Kitchen", "Beauty", "Bags", "Home"].map((c, i) => `
              <label class="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-xs font-bold text-slate-700 transition hover:bg-brand-soft">
                <input type="radio" name="cat-mobile" value="${c.toLowerCase()}" class="accent-brand h-4 w-4" ${i === 0 ? "checked" : ""}>
                <span>${c}</span>
              </label>`).join("")}
            </div>
          </div>
        </div>
        <div class="flex gap-2 border-t border-slate-200 p-4">
          <button type="button" id="reset-mobile-filters" class="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 transition hover:bg-slate-50">
            Reset
          </button>
          <button type="button" data-filter-drawer-close class="flex min-h-11 flex-[2] items-center justify-center rounded-xl bg-brand text-xs font-bold text-white shadow-md hover:bg-brand-dark transition">
            Show Results
          </button>
        </div>
      </div>
    </div>
`, `<script>
  (function () {
    var params = new URLSearchParams(location.search);
    var q = (params.get("q") || "").trim().toLowerCase();
    var empty = document.getElementById("search-empty");
    var chipName = document.getElementById("chip-cat-name");
    var countEl = document.getElementById("catalog-count");

    function apply() {
      var cat = (document.querySelector('input[name="cat"]:checked') || {}).value || "all";
      if (chipName) chipName.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      var shown = 0;
      document.querySelectorAll("#product-grid .product-card").forEach(function (card) {
        var name = (card.getAttribute("data-name") || "").toLowerCase();
        var matchQ = !q || name.indexOf(q) !== -1;
        var matchC = cat === "all" || name.indexOf(cat) !== -1;
        var show = matchQ && matchC;
        card.classList.toggle("hidden", !show);
        if (show) shown += 1;
      });
      if (countEl) countEl.textContent = shown;
      var drawerCount = document.getElementById("drawer-count");
      if (drawerCount) drawerCount.textContent = shown;
      if (shown === 0) {
        if (empty) empty.classList.remove("hidden");
      } else {
        if (empty) empty.classList.add("hidden");
      }
    }

    document.querySelectorAll('input[name="cat"]').forEach(function (r) {
      r.addEventListener("change", apply);
    });

    document.querySelectorAll('input[name="cat-mobile"]').forEach(function (r) {
      r.addEventListener("change", function () {
        var target = document.querySelector('input[name="cat"][value="' + r.value + '"]');
        if (target) { target.checked = true; apply(); }
      });
    });

    var clearBtn = document.getElementById("clear-all-filters");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        var allRadio = document.querySelector('input[name="cat"][value="all"]');
        if (allRadio) { allRadio.checked = true; apply(); }
      });
    }

    var resetMobile = document.getElementById("reset-mobile-filters");
    if (resetMobile) {
      resetMobile.addEventListener("click", function () {
        var firstMobile = document.querySelector('input[name="cat-mobile"][value="all"]');
        if (firstMobile) { firstMobile.checked = true; firstMobile.dispatchEvent(new Event("change")); }
      });
    }

    // Custom sort dropdown + real sorting
    var sortWrap = document.querySelector('[data-sort-wrap]');
    var sortBtn = document.getElementById("sort-btn");
    var sortMenu = document.getElementById("sort-menu");
    var sortLabel = document.getElementById("sort-label");
    var grid = document.getElementById("product-grid");
    var originalOrder = grid ? Array.prototype.slice.call(grid.querySelectorAll(".product-card")) : [];
    function priceOf(card) {
      var m = (card.textContent || "").match(/₹([\d,]+)/);
      return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
    }
    function ratingOf(card) {
      var spans = card.querySelectorAll("span");
      for (var i = 0; i < spans.length; i++) {
        var t = (spans[i].textContent || "").trim();
        if (/^\\d\\.\\d$/.test(t)) return parseFloat(t);
      }
      return 0;
    }
    function sortCards(mode) {
      if (!grid) return;
      var list = originalOrder.slice();
      if (mode === "price-asc") list.sort(function (a, b) { return priceOf(a) - priceOf(b); });
      else if (mode === "price-desc") list.sort(function (a, b) { return priceOf(b) - priceOf(a); });
      else if (mode === "rating") list.sort(function (a, b) { return ratingOf(b) - ratingOf(a); });
      list.forEach(function (c) { grid.appendChild(c); });
      if (sortLabel) {
        var opt = document.querySelector('.sort-option[data-sort="' + mode + '"] span');
        if (opt) sortLabel.textContent = opt.textContent;
      }
      document.querySelectorAll(".sort-option").forEach(function (o) {
        var on = o.getAttribute("data-sort") === mode;
        o.setAttribute("aria-selected", on ? "true" : "false");
        o.classList.toggle("bg-brand-soft", on);
        o.classList.toggle("text-brand", on);
        o.classList.toggle("text-slate-600", !on);
        var tick = o.querySelector(".sort-tick");
        if (tick) tick.classList.toggle("hidden", !on);
      });
    }
    if (sortBtn && sortMenu) {
      sortBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = sortMenu.classList.toggle("hidden");
        sortBtn.setAttribute("aria-expanded", open ? "false" : "true");
      });
      document.addEventListener("click", function (e) {
        if (sortWrap && !sortWrap.contains(e.target)) { sortMenu.classList.add("hidden"); sortBtn.setAttribute("aria-expanded", "false"); }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { sortMenu.classList.add("hidden"); sortBtn.setAttribute("aria-expanded", "false"); }
      });
      document.querySelectorAll(".sort-option").forEach(function (o) {
        o.addEventListener("click", function () { sortCards(o.getAttribute("data-sort")); sortMenu.classList.add("hidden"); sortBtn.setAttribute("aria-expanded", "false"); });
      });
    }

    var resetDesk = document.getElementById("reset-desktop-filters");
    if (resetDesk) {
      resetDesk.addEventListener("click", function () {
        var allRadio = document.querySelector('input[name="cat"][value="all"]');
        if (allRadio) { allRadio.checked = true; apply(); }
      });
    }

    // Drawer triggers
    var drawer = document.getElementById("filter-drawer");
    document.querySelectorAll("[data-filter-drawer-open]").forEach(function(b) {
      b.addEventListener("click", function() { if (drawer) drawer.classList.add("active"); });
    });
    document.querySelectorAll("[data-filter-drawer-close]").forEach(function(b) {
      b.addEventListener("click", function() { if (drawer) drawer.classList.remove("active"); });
    });
    if (drawer) {
      drawer.addEventListener("click", function(e) {
        if (e.target === drawer) drawer.classList.remove("active");
      });
    }

    apply();
  })();
</script>`);

  // ---------------------------------------------------------------------------
  // 02. ALL CATEGORIES & DEPARTMENTS (categories.html)
  // ---------------------------------------------------------------------------
  page("categories.html", "All Departments & Categories — Kartzo", "Explore all product collections on Kartzo with curated selections for electronics, fashion, home essentials and sports.", "categories", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Categories" }])}

    <div class="pad site-max py-5 sm:py-8">
      <div class="mb-6 hidden border-b border-slate-200/80 pb-6 sm:mb-8 sm:block">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("sparkles", "h-3.5 w-3.5")}
          Curated Departments
        </span>
        <h1 class="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-ink">
          Shop by Category
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">
          Find exactly what you need across our 10 verified product departments.
        </p>
      </div>

      <!-- Featured Hero Hub -->
      <div class="relative mb-6 overflow-hidden rounded-[1.4rem] bg-brand-ink text-white sm:mb-10 sm:rounded-3xl">
        <img src="assets/electronics.webp" alt="Electronics Featured Collection" width="2113" height="619" class="absolute inset-0 h-full w-full object-cover opacity-25">
        <div class="relative z-10 flex items-center p-5 sm:p-12">
          <div class="max-w-xl">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-sm">
              Featured Department
            </span>
            <h2 class="mt-2 text-[1.45rem] font-extrabold leading-tight sm:mt-3 sm:text-4xl">Electronics &amp; Smart Tech</h2>
            <p class="mt-1.5 hidden text-[13px] text-white/80 leading-relaxed sm:mt-2 sm:block sm:text-sm">
              Discover Bluetooth 5.3 wireless headphones, AMOLED smartwatches, and fast-charging accessories at honest direct prices.
            </p>
            <p class="mt-1.5 truncate text-[13px] font-medium text-white/80 sm:hidden">Top tech at honest prices.</p>
            <a href="products.html?q=electronics" class="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-brand-ink hover:bg-brand-soft hover:text-brand transition shadow-md sm:mt-5 sm:px-6">
              <span>Explore Collection</span>
              ${icon("arrow-right", "h-4 w-4")}
            </a>
          </div>
        </div>
      </div>

      <!-- View Tabs + Category Cards Grid -->
      <div class="mb-4 flex items-center justify-between gap-3">
        <p class="text-sm font-extrabold text-brand-ink">${cats.length} Departments</p>
        <div class="flex rounded-xl bg-[#f3f7ff] p-1" role="group" aria-label="Change layout">
          <button type="button" data-cat-view="grid" aria-pressed="true" class="flex min-h-9 items-center gap-1.5 rounded-lg bg-white px-3 text-xs font-bold text-brand shadow-sm transition">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
            Grid
          </button>
          <button type="button" data-cat-view="list" aria-pressed="false" class="flex min-h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-bold text-slate-500 transition">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none"/></svg>
            List
          </button>
        </div>
      </div>
      <div id="cat-grid" class="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-5">
        ${cats.map(([name, img, count, sub]) => `
        <a href="products.html?q=${name.toLowerCase().split(" ")[0]}" class="cat-card group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-2.5 transition duration-200 hover:border-brand/40 hover:shadow-card">
          <div class="cat-media overflow-hidden rounded-xl">
            <img src="${img}" alt="${name}" width="800" height="800" class="aspect-square w-full object-cover transition duration-200 group-hover:scale-105">
          </div>
          <div class="cat-body mt-2.5 px-1 pb-1 text-center">
            <h3 class="text-[13px] sm:text-sm font-bold text-brand-ink group-hover:text-brand transition">${name}</h3>
            <p class="mt-0.5 text-[11px] font-semibold text-brand">${count}</p>
            <p class="mt-1 hidden text-[10px] text-slate-400 line-clamp-1 sm:block">${sub}</p>
          </div>
          <span class="cat-arrow hidden h-9 w-9 flex-none items-center justify-center rounded-full bg-[#f3f7ff] text-brand" aria-hidden="true">${icon("chevron-right", "h-4 w-4")}</span>
        </a>`).join("")}
      </div>
    </div>
`, `<script>
  (function () {
    var grid = document.getElementById("cat-grid");
    var btns = Array.prototype.slice.call(document.querySelectorAll("[data-cat-view]"));
    if (!grid || !btns.length) return;
    function setView(view) {
      grid.classList.toggle("list-view", view === "list");
      btns.forEach(function (b) {
        var on = b.getAttribute("data-cat-view") === view;
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.classList.toggle("bg-white", on);
        b.classList.toggle("text-brand", on);
        b.classList.toggle("shadow-sm", on);
        b.classList.toggle("text-slate-500", !on);
      });
    }
    btns.forEach(function (b) { b.addEventListener("click", function () { setView(b.getAttribute("data-cat-view")); }); });
  })();
</script>`);

  // ---------------------------------------------------------------------------
  // 03. FLASH DEALS PAGE (deals.html)
  // ---------------------------------------------------------------------------
  page("deals.html", "Limited Time Deals & Offers — Kartzo", "Save up to 60% on high-demand electronics, shoes, and home goods during the Kartzo Flash Sale.", "deals", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Flash Deals" }])}

    <div class="pad site-max py-5 sm:py-8">
      <!-- Deals Countdown Banner -->
      <div class="relative mb-6 overflow-hidden rounded-[1.4rem] bg-brand-ink p-5 text-white shadow-xl sm:mb-10 sm:rounded-3xl sm:p-12">
        <img src="assets/deals.webp" alt="Deals banner" width="2150" height="439" class="absolute inset-0 h-full w-full object-cover object-right opacity-25">
        <div class="relative z-10 max-w-xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-sm">
            <span class="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            Flash Deals Live
          </div>
          <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight sm:mt-3 sm:text-4xl">
            Up to 60% OFF Top Picks
          </h1>
          <p class="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
            Exclusive daily promotional prices. Extra 10% instant discount applied at checkout with coupon <strong class="text-white">KARTZO10</strong>.
          </p>
          
          <!-- Countdown Clock -->
          <div class="mt-4 flex items-center gap-2 text-center text-xs font-extrabold sm:mt-6">
            <div class="flex items-center gap-1.5 mr-2 text-slate-300 font-semibold text-xs">
              ${icon("clock", "h-4 w-4 text-amber-400")}
              <span>Ends in:</span>
            </div>
            <div class="rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm border border-white/10"><span class="block text-base sm:text-lg font-black text-amber-300" id="deal-h">08</span><span class="text-[10px] text-white/60">HRS</span></div>
            <span class="text-base text-white/40">:</span>
            <div class="rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm border border-white/10"><span class="block text-base sm:text-lg font-black text-amber-300" id="deal-m">42</span><span class="text-[10px] text-white/60">MIN</span></div>
            <span class="text-base text-white/40">:</span>
            <div class="rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm border border-white/10"><span class="block text-base sm:text-lg font-black text-amber-300" id="deal-s">15</span><span class="text-[10px] text-white/60">SEC</span></div>
          </div>
        </div>
      </div>

      <!-- Deals Product Grid -->
      <div id="deals-grid" class="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
        ${products.slice(0, 8).map(p => productCard({ ...p, badge: p.badge || "SAVE 35%", badgeClass: "bg-[#ef3b3b]" })).join("\n        ")}
      </div>
    </div>
`, `<script>
  (function () {
    var h = 8, m = 42, s = 15;
    setInterval(function () {
      s--;
      if (s < 0) { s = 59; m--; }
      if (m < 0) { m = 59; h--; }
      if (h < 0) { h = 12; }
      var hEl = document.getElementById("deal-h");
      var mEl = document.getElementById("deal-m");
      var sEl = document.getElementById("deal-s");
      if (hEl) hEl.textContent = (h < 10 ? "0" : "") + h;
      if (mEl) mEl.textContent = (m < 10 ? "0" : "") + m;
      if (sEl) sEl.textContent = (s < 10 ? "0" : "") + s;
    }, 1000);
  })();
</script>`);

  // ---------------------------------------------------------------------------
  // 04. PRODUCT DETAIL EXPERIENCE (product.html)
  // ---------------------------------------------------------------------------
  page("product.html", "Wireless Headphones Pro — Kartzo", "Buy Wireless Headphones Pro with 40h battery, Bluetooth 5.3, active noise cancellation, and 1-year brand warranty on Kartzo.", "shop", `
    ${crumbs([
      { href: "index.html", label: "Home" },
      { href: "products.html", label: "Shop" },
      { href: "products.html?q=electronics", label: "Audio & Electronics" },
      { label: "Wireless Headphones Pro" }
    ])}

    <div class="pad site-max py-5 sm:py-8">
      <div class="grid gap-8 lg:grid-cols-2 lg:gap-14">
        
        <!-- Product Media Gallery -->
        <div class="space-y-4">
          <div class="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-[#F6F8FB] p-4 shadow-sm sm:p-8">
            <span class="absolute left-4 top-4 z-10 rounded-md bg-rose-500 px-2.5 py-1 text-[11px] font-black text-white shadow-sm">
              30% OFF
            </span>
            <button type="button" class="wish-btn absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition hover:text-rose-500" aria-pressed="false" aria-label="Add to wishlist">
              ${icon("heart", "h-5 w-5")}
            </button>
            <img id="main-product-img" src="assets/p-headphones.webp" alt="Wireless Headphones Pro view" width="800" height="800" class="max-h-[88%] w-auto object-contain transition duration-200">
          </div>

          <!-- Thumbnail Selector -->
          <div class="flex items-center gap-3">
            <button type="button" data-gallery-thumb="assets/p-headphones.webp" class="h-20 w-20 rounded-xl border-2 border-brand bg-[#F6F8FB] p-2 overflow-hidden transition" aria-label="Front view">
              <img src="assets/p-headphones.webp" alt="Front view" class="h-full w-full object-contain">
            </button>
            <button type="button" data-gallery-thumb="assets/p-earbuds.webp" class="h-20 w-20 rounded-xl border border-slate-200 bg-[#F6F8FB] p-2 overflow-hidden transition hover:border-brand/60" aria-label="Earcups view">
              <img src="assets/p-earbuds.webp" alt="Earcups view" class="h-full w-full object-contain">
            </button>
            <button type="button" data-gallery-thumb="assets/electronics.webp" class="h-20 w-20 rounded-xl border border-slate-200 bg-[#F6F8FB] p-2 overflow-hidden transition hover:border-brand/60" aria-label="Lifestyle view">
              <img src="assets/electronics.webp" alt="Lifestyle view" class="h-full w-full object-cover rounded-lg">
            </button>
            <button type="button" data-gallery-thumb="assets/hero.webp" class="h-20 w-20 rounded-xl border border-slate-200 bg-[#F6F8FB] p-2 overflow-hidden transition hover:border-brand/60" aria-label="Accessories view">
              <img src="assets/hero.webp" alt="Accessories view" class="h-full w-full object-contain">
            </button>
          </div>
        </div>

        <!-- Product Information & Purchase Column -->
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Audio • boAt Audio Series</span>
            <span class="text-slate-300">|</span>
            <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
              ${icon("check", "h-3.5 w-3.5")}
              In Stock
            </span>
          </div>

          <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-3xl">
            Wireless Headphones Pro
          </h1>
          <p class="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Bluetooth 5.3 • 40-Hour Battery Life • Hybrid Active Noise Cancellation
          </p>

          <!-- Rating Breakdown Summary -->
          <div class="mt-3.5 flex items-center gap-3 border-b border-slate-200/80 pb-4 text-xs sm:text-sm">
            <div class="flex items-center gap-1.5">
              ${stars(4.8)}
              <span class="font-extrabold text-brand-ink ml-1">4.8</span>
            </div>
            <span class="text-slate-300">|</span>
            <a href="#reviews" class="font-semibold text-slate-600 hover:text-brand transition">2,140 verified reviews</a>
            <span class="text-slate-300">|</span>
            <span class="text-slate-400">8,400+ bought this month</span>
          </div>

          <!-- Price Block -->
          <div class="mt-4 flex items-baseline gap-2.5 sm:mt-5 sm:gap-3">
            <span class="text-[1.7rem] font-black leading-none text-brand-ink sm:text-3xl">₹2,799</span>
            <span class="text-base text-slate-400 line-through font-medium">₹3,999</span>
            <span class="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-black text-emerald-700">Save ₹1,200</span>
          </div>
          <p class="mt-1 text-[11px] text-slate-400">Inclusive of all taxes. Free express shipping on this item.</p>

          <!-- Color Swatches -->
          <div class="mt-6 border-t border-slate-100 pt-5">
            <div class="flex items-center justify-between text-xs">
              <span class="font-extrabold text-brand-ink">Color: <span id="selected-color-label" class="text-brand font-black">Space Black</span></span>
              <span class="text-slate-400">3 Colors</span>
            </div>
            <div class="mt-3 flex items-center gap-3">
              <button type="button" data-color-swatch data-color-name="Space Black" class="swatch-btn active flex h-10 w-10 items-center justify-center rounded-xl border-2 border-brand bg-[#111] text-white shadow-sm ring-2 ring-brand/20 ring-offset-2" aria-label="Space Black">
                <span class="h-4 w-4 rounded-full bg-[#111]"></span>
              </button>
              <button type="button" data-color-swatch data-color-name="Glacier Silver" class="swatch-btn flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-200 text-slate-800 shadow-sm transition hover:border-slate-300" aria-label="Glacier Silver">
                <span class="h-4 w-4 rounded-full bg-slate-300"></span>
              </button>
              <button type="button" data-color-swatch data-color-name="Midnight Blue" class="swatch-btn flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-[#122b68] text-white shadow-sm transition hover:border-slate-300" aria-label="Midnight Blue">
                <span class="h-4 w-4 rounded-full bg-[#122b68]"></span>
              </button>
            </div>
          </div>

          <!-- Cushion Fit Selection -->
          <div class="mt-5 border-t border-slate-100 pt-4">
            <div class="flex items-center justify-between text-xs">
              <span class="font-extrabold text-brand-ink">Ear Cushions</span>
              <a href="size-guide.html" class="text-brand font-bold hover:underline">Fit Guide</a>
            </div>
            <div class="mt-2.5 flex gap-2">
              <button type="button" data-size-swatch class="rounded-xl border border-brand bg-brand px-4 py-2 text-xs font-bold text-white shadow-sm">
                Standard Ergonomic
              </button>
              <button type="button" data-size-swatch class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:border-slate-300 transition">
                Memory Foam Pro (+₹299)
              </button>
            </div>
          </div>

          <!-- Add to Cart CTA Area -->
          <div id="pdp-main-cta" class="mt-6 flex flex-wrap items-center gap-3">
            <div data-qty data-min="1" data-max="5" class="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50">
              <button type="button" class="qty-btn qty-minus flex h-12 w-12 items-center justify-center text-slate-600 hover:text-slate-900" aria-label="Decrease quantity">
                ${icon("minus", "h-4 w-4")}
              </button>
              <span data-qty-value class="min-w-[2.25rem] text-center text-sm font-extrabold text-brand-ink">1</span>
              <button type="button" class="qty-btn qty-plus flex h-12 w-12 items-center justify-center text-slate-600 hover:text-slate-900" aria-label="Increase quantity">
                ${icon("plus", "h-4 w-4")}
              </button>
            </div>
            <button type="button" class="add-cart quick-add-btn min-h-12 flex-1 rounded-xl bg-brand px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(26,86,240,0.28)] transition hover:bg-brand-dark active:scale-[0.98]">
              Add to Cart
            </button>
            <a href="checkout.html" class="inline-flex min-h-12 flex-1 sm:flex-none items-center justify-center rounded-xl border border-slate-200 bg-white px-7 text-sm font-bold text-brand-ink hover:border-slate-300 hover:bg-slate-50 transition active:scale-[0.98]">
              Buy Now
            </a>
          </div>

          <!-- Pincode Delivery Estimator -->
          <div class="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 sm:mt-6 sm:p-4">
            <label for="pincode-input" class="flex items-center gap-2 text-xs font-extrabold text-brand-ink">
              ${icon("truck", "h-4 w-4 text-brand")}
              <span>Check Delivery &amp; COD Availability</span>
            </label>
            <div class="mt-2.5 flex gap-2">
              <input id="pincode-input" type="text" maxlength="6" placeholder="Enter 6-digit PIN (e.g. 452010)" class="min-h-10 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-brand-ink outline-none focus:border-brand">
              <button type="button" id="pincode-check-btn" class="min-h-10 shrink-0 rounded-xl bg-brand px-5 text-xs font-bold text-white hover:bg-brand-dark transition">Check</button>
            </div>
            <div id="pincode-result" class="mt-2.5 hidden text-xs"></div>
          </div>

          <!-- 4 Core Trust Value Props -->
          <ul class="mt-6 grid grid-cols-2 gap-2.5 text-xs text-slate-600">
            <li class="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white p-3 font-semibold">
              <span class="text-brand">${icon("truck", "h-4 w-4")}</span>
              <span>Free Express Delivery</span>
            </li>
            <li class="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white p-3 font-semibold">
              <span class="text-brand">${icon("refresh", "h-4 w-4")}</span>
              <span>7-Day Doorstep Returns</span>
            </li>
            <li class="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white p-3 font-semibold">
              <span class="text-brand">${icon("shield-check", "h-4 w-4")}</span>
              <span>1-Year Brand Warranty</span>
            </li>
            <li class="flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white p-3 font-semibold">
              <span class="text-brand">${icon("check", "h-4 w-4")}</span>
              <span>100% Genuine Sealed Unit</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Product Specifications, In The Box, Shipping Accordions -->
      <div class="mt-8 space-y-3 max-w-4xl sm:mt-14">
        <details class="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm" open>
          <summary class="flex cursor-pointer items-center justify-between font-extrabold text-sm sm:text-base text-brand-ink">
            <span>Product Specifications &amp; Features</span>
            <span class="text-slate-400 group-open:rotate-180 transition duration-200">
              ${icon("chevron-down", "h-4 w-4")}
            </span>
          </summary>
          <div class="mt-4 border-t border-slate-100 pt-4 text-xs sm:text-sm text-slate-600 space-y-2.5">
            <div class="grid grid-cols-2 gap-2 py-1 border-b border-slate-100"><dt class="font-bold text-brand-ink">Driver Size</dt><dd>40mm High Definition Neodymium</dd></div>
            <div class="grid grid-cols-2 gap-2 py-1 border-b border-slate-100"><dt class="font-bold text-brand-ink">Bluetooth Version</dt><dd>5.3 with Low Latency Gaming Mode (45ms)</dd></div>
            <div class="grid grid-cols-2 gap-2 py-1 border-b border-slate-100"><dt class="font-bold text-brand-ink">Noise Cancellation</dt><dd>Up to 32dB Hybrid ANC + Transparency Ambient Mode</dd></div>
            <div class="grid grid-cols-2 gap-2 py-1 border-b border-slate-100"><dt class="font-bold text-brand-ink">Battery Playtime</dt><dd>40 Hours (ANC Off) / 30 Hours (ANC On)</dd></div>
            <div class="grid grid-cols-2 gap-2 py-1"><dt class="font-bold text-brand-ink">Fast Charging</dt><dd>10 min charge gives 5 hours playtime (USB-C)</dd></div>
          </div>
        </details>

        <details class="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <summary class="flex cursor-pointer items-center justify-between font-extrabold text-sm sm:text-base text-brand-ink">
            <span>What's In The Box?</span>
            <span class="text-slate-400 group-open:rotate-180 transition duration-200">
              ${icon("chevron-down", "h-4 w-4")}
            </span>
          </summary>
          <div class="mt-4 border-t border-slate-100 pt-4 text-xs sm:text-sm text-slate-600 space-y-2">
            <p>• 1 × Wireless Headphones Pro Unit</p>
            <p>• 1 × Braided USB-C Fast Charging Cable</p>
            <p>• 1 × 3.5mm Gold-Plated Audio Aux Cable</p>
            <p>• 1 × Protective Travel Carrying Pouch</p>
            <p>• 1 × Warranty Card &amp; User Quick-Start Guide</p>
          </div>
        </details>

        <details class="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <summary class="flex cursor-pointer items-center justify-between font-extrabold text-sm sm:text-base text-brand-ink">
            <span>Shipping, Doorstep Returns &amp; Warranty</span>
            <span class="text-slate-400 group-open:rotate-180 transition duration-200">
              ${icon("chevron-down", "h-4 w-4")}
            </span>
          </summary>
          <div class="mt-4 border-t border-slate-100 pt-4 text-xs sm:text-sm leading-relaxed text-slate-600 space-y-2">
            <p>All Kartzo orders are dispatched within 24 hours from verified warehouse fulfillment hubs. Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.</p>
            <p>We provide a <strong>7-Day Doorstep Replacement Guarantee</strong>. If you experience any physical damage or sound defect, our courier will pick up the item from your doorstep for an instant replacement.</p>
          </div>
        </details>
      </div>

      <!-- Customer Reviews & Rating Breakdown -->
      <section id="reviews" class="mt-8 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:mt-14 sm:p-10">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
          <div>
            <h2 class="text-xl font-extrabold sm:text-2xl text-brand-ink">Customer Reviews</h2>
            <div class="mt-2 flex items-center gap-3">
              <span class="text-3xl font-black text-brand-ink">4.8</span>
              <div>
                <div class="flex items-center">${stars(4.8)}</div>
                <p class="text-xs text-slate-500 mt-0.5">Based on 2,140 verified reviews</p>
              </div>
            </div>
          </div>
          <button type="button" class="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-6 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-brand-dark transition">
            Write a Review
          </button>
        </div>

        <!-- Rating Distribution Bars -->
        <div class="my-6 max-w-md space-y-2 text-xs font-bold text-slate-700">
          <div class="flex items-center gap-3">
            <span class="w-14">5 Stars</span>
            <div class="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden"><div class="h-full bg-amber-400 w-[84%] rounded-full"></div></div>
            <span class="w-8 text-right text-slate-400">84%</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="w-14">4 Stars</span>
            <div class="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden"><div class="h-full bg-amber-400 w-[11%] rounded-full"></div></div>
            <span class="w-8 text-right text-slate-400">11%</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="w-14">3 Stars</span>
            <div class="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden"><div class="h-full bg-amber-400 w-[3%] rounded-full"></div></div>
            <span class="w-8 text-right text-slate-400">3%</span>
          </div>
        </div>

        <!-- Review Cards Grid -->
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          <article class="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-brand-ink">Vikram Singhania</h3>
              <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Verified Purchase</span>
            </div>
            <div class="mt-1">${stars(5)}</div>
            <h4 class="mt-2 text-xs font-bold text-brand-ink">Exceptional noise cancelling for the price!</h4>
            <p class="mt-1 text-xs text-slate-500 leading-relaxed">The bass is deep without muddying the vocals. Comfortable to wear for 6+ hour office sessions. Battery easily lasts 4 full days.</p>
          </article>

          <article class="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-brand-ink">Neha Kapoor</h3>
              <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Verified Purchase</span>
            </div>
            <div class="mt-1">${stars(5)}</div>
            <h4 class="mt-2 text-xs font-bold text-brand-ink">Quick delivery and genuine product</h4>
            <p class="mt-1 text-xs text-slate-500 leading-relaxed">Came neatly packed with factory tamper seal. Tested serial number with official brand portal for 1-year warranty registration without issue.</p>
          </article>

          <article class="rounded-xl border border-slate-100 bg-slate-50/50 p-5">
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-extrabold text-brand-ink">Aakash Jain</h3>
              <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Verified Purchase</span>
            </div>
            <div class="mt-1">${stars(4)}</div>
            <h4 class="mt-2 text-xs font-bold text-brand-ink">Great Bluetooth range and microphone</h4>
            <p class="mt-1 text-xs text-slate-500 leading-relaxed">Works through 2 walls in my apartment without stuttering. Office calls sound crystal clear according to my colleagues.</p>
          </article>
        </div>
      </section>

      <!-- Related Products Grid -->
      <div class="mt-16">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-xl sm:text-2xl font-extrabold text-brand-ink">Similar Audio &amp; Lifestyle Picks</h2>
          <a href="products.html?q=electronics" class="text-xs sm:text-sm font-bold text-brand hover:underline inline-flex items-center gap-1">
            <span>View All</span>
            ${icon("arrow-right", "h-3.5 w-3.5")}
          </a>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
          ${products.slice(1, 5).map(productCard).join("\n          ")}
        </div>
      </div>
    </div>

    <!-- Mobile Sticky Add-to-Bag Action Bar -->
    <div id="sticky-pdp-bar" class="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 p-3.5 backdrop-blur-md sm:hidden shadow-lg transition-transform duration-200 translate-y-full">
      <div class="flex items-center justify-between gap-3">
        <div>
          <span class="block text-xs font-black text-brand-ink">₹2,799</span>
          <span class="block text-[10px] text-slate-400 line-through">₹3,999</span>
        </div>
        <button type="button" class="add-cart quick-add-btn flex min-h-11 flex-1 items-center justify-center rounded-xl bg-brand text-xs font-bold text-white hover:bg-brand-dark transition">
          Add to Cart
        </button>
      </div>
    </div>
`, `<script>
  (function () {
    // Gallery Switcher
    var mainImg = document.getElementById("main-product-img");
    document.querySelectorAll("[data-gallery-thumb]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = btn.getAttribute("data-gallery-thumb");
        if (mainImg) mainImg.src = src;
        document.querySelectorAll("[data-gallery-thumb]").forEach(function (b) {
          b.className = "h-20 w-20 rounded-xl border border-slate-200 bg-[#F6F8FB] p-2 overflow-hidden transition hover:border-brand/60";
        });
        btn.className = "h-20 w-20 rounded-xl border-2 border-brand bg-[#F6F8FB] p-2 overflow-hidden transition";
      });
    });

    // Color Swatches
    var colorLabel = document.getElementById("selected-color-label");
    document.querySelectorAll("[data-color-swatch]").forEach(function (sw) {
      sw.addEventListener("click", function () {
        var name = sw.getAttribute("data-color-name");
        if (colorLabel) colorLabel.textContent = name;
        document.querySelectorAll("[data-color-swatch]").forEach(function (s) {
          s.classList.remove("ring-2", "ring-brand/20", "ring-offset-2", "border-brand");
          s.classList.add("border-slate-200");
        });
        sw.classList.remove("border-slate-200");
        sw.classList.add("ring-2", "ring-brand/20", "ring-offset-2", "border-brand");
      });
    });

    // Pincode Checker
    var pinBtn = document.getElementById("pincode-check-btn");
    var pinInput = document.getElementById("pincode-input");
    var pinResult = document.getElementById("pincode-result");
    if (pinBtn && pinInput && pinResult) {
      pinBtn.addEventListener("click", function () {
        var val = pinInput.value.trim();
        if (val.length === 6 && /^\\d+$/.test(val)) {
          pinResult.className = "mt-2.5 text-xs font-bold text-emerald-600";
          pinResult.innerHTML = "Delivery available to " + val + " by <strong>Friday, 10 Oct</strong>. Cash on Delivery is active.";
          pinResult.classList.remove("hidden");
        } else {
          pinResult.className = "mt-2.5 text-xs font-bold text-rose-500";
          pinResult.textContent = "Please enter a valid 6-digit postal PIN code.";
          pinResult.classList.remove("hidden");
        }
      });
    }

    // Sticky PDP Bar Trigger on Mobile
    var cta = document.getElementById("pdp-main-cta");
    var stickyBar = document.getElementById("sticky-pdp-bar");
    if (cta && stickyBar) {
      window.addEventListener("scroll", function () {
        var rect = cta.getBoundingClientRect();
        if (rect.bottom < 0) {
          stickyBar.classList.remove("translate-y-full");
        } else {
          stickyBar.classList.add("translate-y-full");
        }
      }, { passive: true });
    }
  })();
</script>`);
}
