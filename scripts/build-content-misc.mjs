import { page, productCard, products, crumbs, icon } from "./shared.mjs";

export function buildContentMisc() {
  // ---------------------------------------------------------------------------
  // 23. BLOG LISTING (blog.html)
  // ---------------------------------------------------------------------------
  page("blog.html", "The Kartzo Journal — Tech, Audio & Lifestyle Guides", "Expert buying guides, consumer tech reviews, and smart online shopping advice from the Kartzo editorial team.", "blog", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Journal & Guides" }])}

    <div class="pad site-max py-8">
      <div class="mb-10 border-b border-slate-200/80 pb-6 text-center max-w-xl mx-auto">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("sparkles", "h-3.5 w-3.5")}
          Stories &amp; Buying Advice
        </span>
        <h1 class="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-ink">
          The Kartzo Journal
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">In-depth laboratory comparisons, warranty breakdowns, and tech reviews.</p>
      </div>

      <!-- Featured Story Banner -->
      <article class="group mb-12 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-card">
        <div class="grid items-center lg:grid-cols-2">
          <a href="article.html" class="block h-64 sm:h-80 overflow-hidden bg-[#F6F8FB]">
            <img src="assets/blog-shopping.webp" alt="Smart shopping tips 2026" width="2136" height="684" class="h-full w-full object-cover transition duration-300 group-hover:scale-105">
          </a>
          <div class="p-6 sm:p-10">
            <span class="rounded bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand">Featured Guide</span>
            <h2 class="mt-3 text-xl sm:text-2xl font-black text-brand-ink leading-tight group-hover:text-brand transition">
              <a href="article.html">5 Smart Shopping Tips to Maximize Value in 2026</a>
            </h2>
            <p class="mt-2.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Decoding return windows, identifying genuine verified brand distributors, and utilizing bundle deals to save up to 40% on quality electronics and home appliances.
            </p>
            <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
              <div class="flex items-center gap-2.5">
                <img src="assets/avatar-priya.webp" alt="Priya Sharma" class="h-7 w-7 rounded-full object-cover">
                <span class="font-bold text-brand-ink">Priya Sharma</span>
                <span>• 6 min read</span>
              </div>
              <a href="article.html" class="inline-flex items-center gap-1 font-bold text-brand hover:underline">
                <span>Read Story</span>
                ${icon("arrow-right", "h-3.5 w-3.5")}
              </a>
            </div>
          </div>
        </div>
      </article>

      <!-- Articles Grid -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article class="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-card">
          <a href="article.html" class="block h-48 overflow-hidden bg-[#F6F8FB]">
            <img src="assets/blog-gadgets.webp" alt="Wireless Audio Gadgets" width="2136" height="673" class="h-full w-full object-cover transition duration-300 group-hover:scale-105">
          </a>
          <div class="p-5">
            <span class="rounded bg-brand-soft px-2.5 py-0.5 text-[10px] font-extrabold text-brand">Audio &amp; Gadgets</span>
            <h3 class="mt-2 text-sm sm:text-base font-extrabold text-brand-ink leading-snug group-hover:text-brand transition">
              <a href="article.html">Top Wireless Audio Devices Worth Every Rupee</a>
            </h3>
            <p class="mt-1.5 text-xs text-slate-500 line-clamp-2">Our laboratory test comparing latency, battery degradation, and ANC microphones across top-selling Bluetooth models.</p>
            <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
              <span>8 Oct 2026</span>
              <a href="article.html" class="inline-flex items-center gap-1 font-bold text-brand hover:underline">
                <span>Read Story</span>
                ${icon("arrow-right", "h-3.5 w-3.5")}
              </a>
            </div>
          </div>
        </article>

        <article class="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-card">
          <a href="article.html" class="block h-48 overflow-hidden bg-[#F6F8FB]">
            <img src="assets/blog-home.webp" alt="Budget Home Living" width="2152" height="705" class="h-full w-full object-cover transition duration-300 group-hover:scale-105">
          </a>
          <div class="p-5">
            <span class="rounded bg-brand-soft px-2.5 py-0.5 text-[10px] font-extrabold text-brand">Home Living</span>
            <h3 class="mt-2 text-sm sm:text-base font-extrabold text-brand-ink leading-snug group-hover:text-brand transition">
              <a href="article.html">Transform Your Work-From-Home Space on a Budget</a>
            </h3>
            <p class="mt-1.5 text-xs text-slate-500 line-clamp-2">Ergonomic seating, wire concealment trays, and compact USB blenders for productive remote workstations.</p>
            <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
              <span>4 Oct 2026</span>
              <a href="article.html" class="inline-flex items-center gap-1 font-bold text-brand hover:underline">
                <span>Read Story</span>
                ${icon("arrow-right", "h-3.5 w-3.5")}
              </a>
            </div>
          </div>
        </article>

        <article class="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-card">
          <a href="article.html" class="block h-48 overflow-hidden bg-[#F6F8FB]">
            <img src="assets/deals.webp" alt="Fitness Wearables" width="2150" height="439" class="h-full w-full object-cover transition duration-300 group-hover:scale-105">
          </a>
          <div class="p-5">
            <span class="rounded bg-brand-soft px-2.5 py-0.5 text-[10px] font-extrabold text-brand">Fitness &amp; Health</span>
            <h3 class="mt-2 text-sm sm:text-base font-extrabold text-brand-ink leading-snug group-hover:text-brand transition">
              <a href="article.html">AMOLED vs LCD Smartwatches: Which Should You Buy?</a>
            </h3>
            <p class="mt-1.5 text-xs text-slate-500 line-clamp-2">Evaluating outdoor sunlight legibility, battery drain in always-on display mode, and sensor accuracy.</p>
            <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
              <span>28 Sep 2026</span>
              <a href="article.html" class="inline-flex items-center gap-1 font-bold text-brand hover:underline">
                <span>Read Story</span>
                ${icon("arrow-right", "h-3.5 w-3.5")}
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
`);

  // ---------------------------------------------------------------------------
  // 24. ARTICLE DETAIL (article.html)
  // ---------------------------------------------------------------------------
  page("article.html", "5 Smart Shopping Tips to Maximize Value in 2026 — Kartzo Blog", "Complete guide to smart online shopping, decoding warranties, and securing verified discounts on Kartzo.", "blog", `
    ${crumbs([
      { href: "index.html", label: "Home" },
      { href: "blog.html", label: "Journal" },
      { label: "5 Smart Shopping Tips" }
    ])}

    <article class="pad site-max py-8 max-w-3xl mx-auto">
      <div class="mb-6">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("sparkles", "h-3.5 w-3.5")}
          Shopping Guide
        </span>
        <h1 class="mt-3 text-2xl sm:text-4xl font-extrabold text-brand-ink leading-tight">
          5 Smart Shopping Tips to Maximize Value in 2026
        </h1>
        <div class="mt-4 flex items-center gap-3 border-y border-slate-100 py-3 text-xs text-slate-500">
          <img src="assets/avatar-priya.webp" alt="Priya Sharma" class="h-9 w-9 rounded-full object-cover">
          <div>
            <p class="font-bold text-brand-ink">Priya Sharma</p>
            <p>Senior E-Commerce Analyst • Published 8 Oct 2026 • 6 min read</p>
          </div>
        </div>
      </div>

      <div class="overflow-hidden rounded-2xl bg-[#F6F8FB] mb-8 shadow-sm">
        <img src="assets/blog-shopping.webp" alt="Online Shopping Setup" class="h-auto w-full object-cover" width="2136" height="684">
      </div>

      <div class="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-600 space-y-6">
        <p class="text-sm sm:text-base font-semibold leading-relaxed text-brand-ink">
          The digital marketplace has evolved rapidly. With thousands of products launched every month, consumer value is no longer just about clicking the lowest price tag — it is about verified durability, transparent brand warranties, and prompt doorstep return support.
        </p>

        <h2 class="text-base sm:text-lg font-black text-brand-ink mt-6 border-b border-slate-100 pb-2">1. Decode Manufacturer Serial Numbers and Warranties</h2>
        <p>
          Always ensure that the product comes with an authorized brand warranty card and a GST-compliant tax invoice. Grey-market imported electronics often fail to qualify for local warranty claims. On Kartzo, every audio and tech product is dispatched directly from authorized brand hubs.
        </p>

        <blockquote class="my-6 rounded-2xl border-l-4 border-brand bg-brand-soft p-4 font-semibold italic text-brand-dark">
          "A cheap gadget with zero after-sales warranty is often the most expensive purchase you will make."
        </blockquote>

        <h2 class="text-base sm:text-lg font-black text-brand-ink mt-6 border-b border-slate-100 pb-2">2. Leverage Verified Sourcing Over Marketplace Arbitrage</h2>
        <p>
          Marketplaces with open, unvetted third-party sellers frequently suffer from counterfeit mixing in shared warehouse bins. Dedicated curated catalogs that source directly from verified brand hubs guarantee authentic factory seals.
        </p>

        <!-- Embedded Spotlight Card in Editorial Content -->
        <div class="my-8 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm flex items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <img src="assets/p-headphones.webp" alt="Headphones" class="h-16 w-16 object-contain bg-[#F6F8FB] rounded-xl p-1.5">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-brand">Featured in this guide</span>
              <h3 class="text-xs sm:text-sm font-extrabold text-brand-ink">Wireless Headphones Pro</h3>
              <p class="text-xs font-black text-brand">₹2,799 <span class="text-[11px] text-slate-400 line-through font-normal">₹3,999</span></p>
            </div>
          </div>
          <a href="product.html" class="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-xl bg-brand px-4 text-xs font-bold text-white hover:bg-brand-dark transition">
            <span>View Product</span>
            ${icon("arrow-right", "h-3.5 w-3.5")}
          </a>
        </div>

        <h2 class="text-base sm:text-lg font-black text-brand-ink mt-6 border-b border-slate-100 pb-2">3. Check Doorstep Pickup Policies Before Checking Out</h2>
        <p>
          Ensure the retailer offers doorstep pickup rather than demanding self-shipment to a distant warehouse. Kartzo's 7-Day Doorstep Replacement guarantees that couriers pick up eligible returns directly from your home address.
        </p>
      </div>

      <!-- Social Share Controls -->
      <div class="mt-8 border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span class="font-bold text-brand-ink">Share this article:</span>
        <div class="flex gap-2">
          <button type="button" class="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 font-bold text-slate-600 hover:border-brand hover:text-brand transition">
            ${icon("share", "h-3.5 w-3.5")}
            <span>Share Link</span>
          </button>
        </div>
      </div>
    </article>
`);

  // ---------------------------------------------------------------------------
  // 25. SEARCH RESULTS (search.html)
  // ---------------------------------------------------------------------------
  page("search.html", "Search Results — Kartzo", "Search results for products, categories, and shopping guides on Kartzo.", "shop", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Search Results" }])}

    <div class="pad site-max py-8">
      <div class="mb-8 border-b border-slate-200/80 pb-6">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("search", "h-3.5 w-3.5")}
          Catalog Search
        </span>
        <h1 class="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-ink">
          Results for <span id="search-query-term" class="text-brand">"Headphones"</span>
        </h1>
        <p id="search-results-count" class="mt-1 text-xs sm:text-sm text-slate-500">Showing 12 matching products</p>
      </div>

      <!-- Search Refinement Input -->
      <form class="mb-8 max-w-xl flex gap-2" action="search.html" method="get" role="search">
        <div class="relative flex-1">
          <input name="q" id="search-page-input" type="search" placeholder="Search by product name, category, or keyword..." class="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition" value="Headphones">
          <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            ${icon("search", "h-4 w-4")}
          </span>
        </div>
        <button type="submit" class="min-h-11 shrink-0 rounded-xl bg-brand px-6 text-xs sm:text-sm font-bold text-white hover:bg-brand-dark transition shadow-sm">
          Search
        </button>
      </form>

      <div id="search-grid" class="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
        ${products.map(productCard).join("\n        ")}
      </div>
      
      <!-- Empty Search State -->
      <div id="search-none" class="hidden rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
          ${icon("search", "h-8 w-8")}
        </div>
        <h2 class="mt-4 text-lg font-extrabold text-brand-ink">No matching products found</h2>
        <p class="mt-1 text-xs text-slate-500">Try checking for spelling errors or searching for broader terms like "audio" or "fashion".</p>
        <div class="mt-6 flex justify-center gap-3">
          <a href="products.html" class="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-6 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-brand-dark transition">
            <span>Browse Catalog</span>
            ${icon("arrow-right", "h-4 w-4")}
          </a>
          <a href="categories.html" class="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-6 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
            View Categories
          </a>
        </div>
      </div>
    </div>
`, `<script>
  (function () {
    var params = new URLSearchParams(location.search);
    var q = (params.get("q") || "").trim();
    if (q) {
      var termEl = document.getElementById("search-query-term");
      var inputEl = document.getElementById("search-page-input");
      if (termEl) termEl.textContent = '"' + q + '"';
      if (inputEl) inputEl.value = q;
      var qLower = q.toLowerCase();
      var count = 0;
      document.querySelectorAll("#search-grid .product-card").forEach(function (card) {
        var name = (card.getAttribute("data-name") || "").toLowerCase();
        var match = name.indexOf(qLower) !== -1;
        card.classList.toggle("hidden", !match);
        if (match) count++;
      });
      var countEl = document.getElementById("search-results-count");
      if (countEl) countEl.textContent = "Showing " + count + " matching products";
      if (count === 0) {
        var grid = document.getElementById("search-grid");
        var none = document.getElementById("search-none");
        if (grid) grid.classList.add("hidden");
        if (none) none.classList.remove("hidden");
      }
    }
  })();
</script>`);

  // ---------------------------------------------------------------------------
  // 26. 404 NOT FOUND (404.html)
  // ---------------------------------------------------------------------------
  page("404.html", "Page Not Found (404) — Kartzo", "The page you requested could not be found. Return to Kartzo home or explore top deals.", "home", `
    <div class="pad site-max py-16 sm:py-24 max-w-xl mx-auto text-center">
      <span class="rounded-full bg-brand-soft px-3.5 py-1 text-xs font-bold text-brand uppercase tracking-wider">
        Error 404
      </span>
      <h1 class="mt-4 text-3xl sm:text-5xl font-black text-brand-ink">Page Not Found</h1>
      <p class="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
        The link you clicked may be broken, out of date, or moved to another section of the store.
      </p>

      <form action="search.html" method="get" class="mt-6 flex gap-2">
        <input name="q" placeholder="Search for products or brands..." class="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition">
        <button type="submit" class="min-h-11 shrink-0 rounded-xl bg-brand px-6 text-xs sm:text-sm font-bold text-white hover:bg-brand-dark transition">Search</button>
      </form>

      <div class="mt-8 flex justify-center gap-3">
        <a href="index.html" class="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-6 text-xs sm:text-sm font-bold text-white hover:bg-brand-dark transition shadow-sm">
          <span>Return to Homepage</span>
          ${icon("arrow-right", "h-4 w-4")}
        </a>
        <a href="products.html" class="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-6 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
          Browse Catalog
        </a>
      </div>
    </div>
`);

  // ---------------------------------------------------------------------------
  // 27. HOLDING / PASSWORD PAGE (password.html)
  // ---------------------------------------------------------------------------
  page("password.html", "Opening Soon — Kartzo", "Kartzo is launching precision consumer essentials soon. Subscribe to receive VIP opening access.", "home", `
    <div class="min-h-[80vh] flex items-center justify-center pad site-max py-16">
      <div class="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
        <div class="flex justify-center mb-6">
          <img src="assets/logo.webp" alt="Kartzo" width="541" height="168" class="h-9 w-auto">
        </div>
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("sparkles", "h-3.5 w-3.5")}
          Grand Launch
        </span>
        <h1 class="mt-3 text-2xl font-extrabold text-brand-ink">Opening Very Soon</h1>
        <p class="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
          We are currently stocking our fulfillment warehouses with verified electronics and lifestyle goods. Enter your email for VIP early access and 15% off launch coupon.
        </p>

        <form id="pass-form" class="mt-6 space-y-3" novalidate>
          <input required type="email" placeholder="Enter your email address" class="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition">
          <button type="submit" class="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-xs sm:text-sm font-bold text-white shadow-md hover:bg-brand-dark transition active:scale-[0.98]">
            <span>Notify Me on Launch</span>
            ${icon("arrow-right", "h-4 w-4")}
          </button>
          <p id="pass-msg" class="text-xs font-bold text-emerald-600 hidden">You're on the VIP list! We will notify you first.</p>
        </form>

        <p class="mt-6 text-[11px] text-slate-400">© 2026 Kartzo Technologies Pvt. Ltd. All rights reserved.</p>
      </div>
    </div>
`, `<script>
  (function () {
    var form = document.getElementById("pass-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = document.getElementById("pass-msg");
        if (msg) msg.classList.remove("hidden");
        form.querySelector("input").disabled = true;
        form.querySelector("button").disabled = true;
      });
    }
  })();
</script>`);
}
