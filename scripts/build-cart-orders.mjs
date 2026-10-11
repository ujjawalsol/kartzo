import { page, productCard, products, crumbs, icon } from "./shared.mjs";

export function buildCartOrders() {
  // ---------------------------------------------------------------------------
  // 05. SHOPPING CART PAGE (cart.html)
  // ---------------------------------------------------------------------------
  page("cart.html", "Your Shopping Cart — Kartzo", "Review and manage items in your Kartzo bag with free express delivery and coupon savings.", "shop", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Shopping Cart" }])}

    <div class="pad site-max py-5 sm:py-8">
      <div class="mb-5 flex flex-row items-end justify-between gap-3 border-b border-slate-200/80 pb-4 sm:mb-8 sm:pb-6">
        <div>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
            ${icon("cart", "h-3.5 w-3.5")}
            Order Preparation
          </span>
          <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
            Shopping Cart
          </h1>
          <p id="cart-item-count-label" class="mt-1 text-xs sm:text-sm text-slate-500">2 items in your cart</p>
        </div>
        <a href="products.html" class="inline-flex shrink-0 items-center gap-1 pb-1 text-xs sm:text-sm font-bold text-brand hover:underline">
          <span>Continue</span>
          ${icon("arrow-right", "h-3.5 w-3.5")}
        </a>
      </div>

      <!-- Free Shipping Meter -->
      <div class="mb-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 sm:mb-8 sm:p-5">
        <div class="flex items-center justify-between text-xs font-bold text-brand-ink">
          <span class="flex items-center gap-2">
            ${icon("truck", "h-4 w-4 text-emerald-600")}
            <span>You qualify for <strong>Free Express Delivery!</strong> (Orders above ₹499)</span>
          </span>
          <span class="text-emerald-700 font-extrabold hidden sm:inline">100% Unlocked</span>
        </div>
        <div class="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div class="h-full rounded-full bg-emerald-600 transition-all duration-300" style="width: 100%;"></div>
        </div>
      </div>

      <div id="cart-content-wrapper" class="grid gap-8 lg:grid-cols-[1fr_380px]">
        <!-- Cart Items List -->
        <div class="space-y-4" id="cart-items">
          ${[
            ["assets/p-headphones.webp", "Wireless Headphones Pro", "Space Black • Bluetooth 5.3", "₹2,799", "1"],
            ["assets/p-watch.webp", "Smart Watch AMOLED", "Midnight Blue • AMOLED Display", "₹3,499", "1"]
          ].map(([img, name, sub, price, qty]) => `
          <article class="cart-item flex gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:gap-4 sm:p-5" data-price="${price.replace(/[₹,]/g, "")}">
            <a href="product.html" class="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FB] p-1.5 sm:h-24 sm:w-24 sm:p-2">
              <img src="${img}" alt="${name}" class="h-16 w-auto object-contain sm:h-20" width="800" height="800">
            </a>
            <div class="min-w-0 flex-1 flex flex-col justify-between">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <a href="product.html" class="text-sm sm:text-base font-extrabold text-brand-ink hover:text-brand transition">${name}</a>
                  <p class="text-xs text-slate-500 mt-0.5">${sub}</p>
                  <p class="mt-1 hidden items-center gap-1 text-[11px] font-bold text-emerald-600 sm:inline-flex">
                    ${icon("check", "h-3 w-3")}
                    In Stock • Dispatches in 24 hrs
                  </p>
                </div>
                <button type="button" class="remove-item rounded-xl p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition" aria-label="Remove ${name}">
                  ${icon("trash", "h-4 w-4")}
                </button>
              </div>

              <div class="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:mt-4">
                <div data-qty data-min="1" data-max="5" class="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50">
                  <button type="button" class="qty-btn qty-minus flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900" aria-label="Decrease quantity">
                    ${icon("minus", "h-3.5 w-3.5")}
                  </button>
                  <span data-qty-value class="min-w-[1.75rem] text-center text-xs font-bold text-brand-ink">${qty}</span>
                  <button type="button" class="qty-btn qty-plus flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900" aria-label="Increase quantity">
                    ${icon("plus", "h-3.5 w-3.5")}
                  </button>
                </div>
                <div class="text-right">
                  <span class="block text-sm sm:text-base font-black text-brand-ink line-total">${price}</span>
                  <span class="hidden text-[11px] text-slate-400 sm:block">Unit: ${price}</span>
                </div>
              </div>
            </div>
          </article>`).join("")}

          <!-- Delivery Note Input -->
          <div class="hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:block">
            <label for="order-note" class="text-xs font-extrabold text-brand-ink">Delivery Instructions / Address Landmark (Optional)</label>
            <textarea id="order-note" rows="2" placeholder="e.g. Please leave with security desk if unreachable by phone." class="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition"></textarea>
          </div>
        </div>

        <!-- Order Summary Aside -->
        <aside class="h-fit rounded-2xl border-0 bg-transparent p-0 shadow-none sm:border sm:border-slate-200/80 sm:bg-white sm:p-6 sm:shadow-sm">
          <h2 class="hidden text-base font-extrabold text-brand-ink sm:block">Order Summary</h2>

          <!-- Promo Code Input -->
          <form id="coupon-form" class="mt-4 border-b border-slate-100 pb-4">
            <label for="coupon-input" class="text-xs font-bold text-slate-500">Discount Code / Voucher</label>
            <div class="mt-2 flex gap-2">
              <input id="coupon-input" type="text" placeholder="Try KARTZO10" class="min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-bold text-brand-ink uppercase outline-none focus:border-brand focus:bg-white">
              <button type="submit" class="min-h-10 shrink-0 rounded-xl bg-brand px-4 text-xs font-bold text-white hover:bg-brand-dark transition">Apply</button>
            </div>
            <p id="coupon-msg" class="mt-1.5 text-xs font-semibold"></p>
          </form>

          <dl class="mt-4 space-y-2.5 text-xs sm:text-sm">
            <div class="flex justify-between"><dt class="text-slate-500">Cart Subtotal</dt><dd id="subtotal" class="font-extrabold text-brand-ink">₹6,298</dd></div>
            <div class="flex justify-between"><dt class="text-slate-500">Express Delivery</dt><dd class="font-bold text-emerald-600">FREE</dd></div>
            <div class="flex justify-between" id="discount-row"><dt class="text-slate-500">Applied Discount</dt><dd id="discount-val" class="font-bold text-emerald-600">₹0</dd></div>
            <div class="flex justify-between border-t border-slate-100 pt-3 text-base sm:text-lg"><dt class="font-black text-brand-ink">Total Payable</dt><dd id="total" class="font-black text-brand">₹6,298</dd></div>
          </dl>
          <p class="mt-1 text-[11px] text-slate-400">All applicable taxes included. GST invoice generated.</p>

          <a href="checkout.html" class="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand text-sm font-bold text-white shadow-md hover:bg-brand-dark transition active:scale-[0.98]">
            <span>Proceed to Checkout</span>
            ${icon("arrow-right", "h-4 w-4")}
          </a>

          <!-- Trust Badges -->
          <div class="mt-6 hidden border-t border-slate-100 pt-4 space-y-2 text-xs font-semibold text-slate-500 sm:block">
            <div class="flex items-center gap-2">
              <span class="text-emerald-600">${icon("shield-check", "h-4 w-4")}</span>
              <span>256-Bit Bank Grade Encrypted Checkout</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-brand">${icon("refresh", "h-4 w-4")}</span>
              <span>7-Day Doorstep Replacement Guarantee</span>
            </div>
          </div>
        </aside>
      </div>

      <!-- Empty Cart State -->
      <div id="cart-empty-state" class="hidden rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
          ${icon("cart", "h-8 w-8")}
        </div>
        <h2 class="mt-4 text-lg font-extrabold text-brand-ink">Your Shopping Cart is Empty</h2>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Looks like you haven't added anything to your cart yet.</p>
        <div class="mt-6 flex justify-center gap-3">
          <a href="products.html" class="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-6 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-brand-dark transition">
            <span>Explore All Products</span>
            ${icon("arrow-right", "h-4 w-4")}
          </a>
          <a href="deals.html" class="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-6 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
            View Flash Deals
          </a>
        </div>
      </div>

      <!-- Recommended Add-ons Section -->
      <div class="mt-8 sm:mt-16">
        <h2 class="mb-6 text-xl sm:text-2xl font-extrabold text-brand-ink">Popular Recommendations</h2>
        <div class="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
          ${products.slice(4, 8).map(productCard).join("\n          ")}
        </div>
      </div>
    </div>
`, `<script>
  (function () {
    function format(n) { return "₹" + n.toLocaleString("en-IN"); }
    var couponApplied = false;

    function recalc() {
      var total = 0, items = 0;
      var itemRows = document.querySelectorAll(".cart-item");
      itemRows.forEach(function (row) {
        var price = parseInt(row.getAttribute("data-price"), 10) || 0;
        var qty = parseInt(row.querySelector("[data-qty-value]").textContent, 10) || 1;
        var line = price * qty;
        total += line;
        items += qty;
        row.querySelector(".line-total").textContent = format(line);
      });

      var discount = couponApplied ? Math.round(total * 0.1) : 0;
      var finalTotal = Math.max(0, total - discount);

      document.getElementById("subtotal").textContent = format(total);
      document.getElementById("discount-val").textContent = couponApplied ? "- " + format(discount) : "₹0";
      document.getElementById("total").textContent = format(finalTotal);
      
      var countLabel = document.getElementById("cart-item-count-label");
      if (countLabel) countLabel.textContent = items + (items === 1 ? " item" : " items") + " in your cart";

      if (items === 0) {
        document.getElementById("cart-content-wrapper").classList.add("hidden");
        document.getElementById("cart-empty-state").classList.remove("hidden");
      }
      if (window.Kartzo) Kartzo.setCart(items);
    }

    var cartContainer = document.getElementById("cart-items");
    if (cartContainer) cartContainer.addEventListener("qtychange", recalc);

    document.querySelectorAll(".remove-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.closest(".cart-item").remove();
        recalc();
        if (window.Kartzo) Kartzo.toast("Item removed from cart", "cart");
      });
    });

    var couponForm = document.getElementById("coupon-form");
    if (couponForm) {
      couponForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var code = document.getElementById("coupon-input").value.trim().toUpperCase();
        var msg = document.getElementById("coupon-msg");
        if (code === "KARTZO10") {
          couponApplied = true;
          msg.textContent = "Coupon KARTZO10 applied! 10% discount subtracted.";
          msg.className = "mt-1.5 text-xs font-bold text-emerald-600";
          recalc();
        } else {
          msg.textContent = "Invalid coupon code. Try 'KARTZO10'";
          msg.className = "mt-1.5 text-xs font-semibold text-rose-500";
        }
      });
    }
  })();
</script>`);

  // ---------------------------------------------------------------------------
  // 06. CHECKOUT FLOW (checkout.html)
  // ---------------------------------------------------------------------------
  page("checkout.html", "Secure Checkout — Kartzo", "Securely complete your Kartzo order with verified delivery address and instant payment options.", "shop", `
    ${crumbs([{ href: "index.html", label: "Home" }, { href: "cart.html", label: "Shopping Cart" }, { label: "Checkout" }])}

    <div class="pad site-max py-5 sm:py-8">
      <div class="mb-5 border-b border-slate-200/80 pb-4 sm:mb-8 sm:pb-6">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("lock", "h-3.5 w-3.5")}
          256-Bit SSL Encrypted
        </span>
        <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
          Order Checkout
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Enter your delivery details and choose your preferred payment option.</p>
      </div>

      <form id="checkout-form" class="grid gap-5 lg:grid-cols-[1fr_380px] lg:gap-8" novalidate>
        <div class="space-y-4 sm:space-y-6">
          
          <!-- Step 1: Delivery Address -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-7">
            <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-black text-white">1</span>
              <h2 class="text-sm sm:text-base font-extrabold text-brand-ink">Shipping &amp; Delivery Address</h2>
            </div>
            <div class="mt-4 grid gap-3 sm:mt-5 sm:gap-4 sm:grid-cols-2">
              <label class="block text-xs font-bold text-slate-600 sm:col-span-1">Full Name *
                <input required name="name" class="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition" value="Rahul Mehta">
              </label>
              <label class="block text-xs font-bold text-slate-600 sm:col-span-1">Mobile Number (For Courier SMS) *
                <input required name="phone" class="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition" value="+91 98765 43210">
              </label>
              <label class="block text-xs font-bold text-slate-600 sm:col-span-2">Flat / House No., Apartment &amp; Street Address *
                <textarea required name="address" rows="2" class="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition">Flat 402, Royal Palms, MG Road, Vijay Nagar</textarea>
              </label>
              <label class="block text-xs font-bold text-slate-600">City / District *
                <input required name="city" class="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition" value="Indore">
              </label>
              <label class="block text-xs font-bold text-slate-600">State *
                <input required name="state" class="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition" value="Madhya Pradesh">
              </label>
              <label class="block text-xs font-bold text-slate-600 sm:col-span-2">Postal PIN Code *
                <input required name="pin" maxlength="6" class="mt-1.5 min-h-11 w-full sm:w-1/2 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition" value="452010">
              </label>
            </div>
          </div>

          <!-- Step 2: Shipping Option -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-7">
            <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-black text-white">2</span>
              <h2 class="text-sm sm:text-base font-extrabold text-brand-ink">Delivery Method</h2>
            </div>
            <div class="mt-4 space-y-2.5">
              <label class="flex cursor-pointer items-center justify-between rounded-xl border-2 border-brand bg-brand-soft/40 p-3 transition sm:p-4">
                <div class="flex items-center gap-3">
                  <input type="radio" name="shipping" value="free" checked class="accent-brand h-4 w-4">
                  <div>
                    <span class="block text-xs sm:text-sm font-bold text-brand-ink">Standard Express Delivery (Blue Dart / Delhivery)</span>
                    <span class="block text-[11px] text-slate-500">Delivered within 2–4 business days</span>
                  </div>
                </div>
                <span class="text-xs font-black text-emerald-700">FREE</span>
              </label>
            </div>
          </div>

          <!-- Step 3: Payment Method -->
          <div class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-7">
            <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-black text-white">3</span>
              <h2 class="text-sm sm:text-base font-extrabold text-brand-ink">Payment Mode</h2>
            </div>
            <div class="mt-4 space-y-2.5">
              <label class="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3 hover:bg-slate-50 transition sm:p-4">
                <div class="flex items-center gap-3">
                  <input type="radio" name="payment" value="upi" checked class="accent-brand h-4 w-4">
                  <div>
                    <span class="block text-xs sm:text-sm font-bold text-brand-ink">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                    <span class="block text-[11px] text-slate-500">Instant verification • Zero convenience fees</span>
                  </div>
                </div>
                <span class="text-xs font-bold text-brand">Popular</span>
              </label>
              <label class="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3 hover:bg-slate-50 transition sm:p-4">
                <div class="flex items-center gap-3">
                  <input type="radio" name="payment" value="card" class="accent-brand h-4 w-4">
                  <div>
                    <span class="block text-xs sm:text-sm font-bold text-brand-ink">Credit / Debit Card (Visa, RuPay, Mastercard)</span>
                    <span class="block text-[11px] text-slate-500">Secure bank redirect with OTP</span>
                  </div>
                </div>
              </label>
              <label class="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3 hover:bg-slate-50 transition sm:p-4">
                <div class="flex items-center gap-3">
                  <input type="radio" name="payment" value="cod" class="accent-brand h-4 w-4">
                  <div>
                    <span class="block text-xs sm:text-sm font-bold text-brand-ink">Cash on Delivery (COD)</span>
                    <span class="block text-[11px] text-slate-500">Pay cash or scan QR at your doorstep</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Checkout Aside Summary -->
        <aside class="h-fit rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
          <h2 class="text-base font-extrabold text-brand-ink">Review &amp; Pay</h2>
          
          <div class="mt-4 divide-y divide-slate-100 border-b border-slate-100 pb-4">
            <div class="flex items-center gap-3 py-2.5">
              <img src="assets/p-headphones.webp" alt="Headphones" class="h-12 w-12 rounded-lg bg-[#F6F8FB] object-contain p-1">
              <div class="flex-1 min-w-0">
                <p class="truncate text-xs font-bold text-brand-ink">Wireless Headphones Pro</p>
                <p class="text-[11px] text-slate-400">Qty: 1 • Space Black</p>
              </div>
              <p class="text-xs font-black text-brand-ink">₹2,799</p>
            </div>
            <div class="flex items-center gap-3 py-2.5">
              <img src="assets/p-watch.webp" alt="Watch" class="h-12 w-12 rounded-lg bg-[#F6F8FB] object-contain p-1">
              <div class="flex-1 min-w-0">
                <p class="truncate text-xs font-bold text-brand-ink">Smart Watch AMOLED</p>
                <p class="text-[11px] text-slate-400">Qty: 1 • Midnight Blue</p>
              </div>
              <p class="text-xs font-black text-brand-ink">₹3,499</p>
            </div>
          </div>

          <dl class="mt-4 space-y-2 text-xs sm:text-sm">
            <div class="flex justify-between"><dt class="text-slate-500">Items Subtotal</dt><dd class="font-extrabold text-brand-ink">₹6,298</dd></div>
            <div class="flex justify-between"><dt class="text-slate-500">Delivery Fee</dt><dd class="font-bold text-emerald-600">FREE</dd></div>
            <div class="flex justify-between border-t border-slate-100 pt-3 text-base sm:text-lg"><dt class="font-black text-brand-ink">Total Payable</dt><dd class="font-black text-brand">₹6,298</dd></div>
          </dl>

          <button type="submit" id="place-order-btn" class="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-bold text-white shadow-md hover:bg-brand-dark transition active:scale-[0.98]">
            ${icon("lock", "h-4 w-4")}
            <span>Place Order (₹6,298)</span>
          </button>

          <p class="mt-3 text-center text-[11px] text-slate-400">By placing this order, you agree to Kartzo's Terms &amp; Return Policy.</p>
        </aside>
      </form>
    </div>
`, `<script>
  (function () {
    var form = document.getElementById("checkout-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = document.getElementById("place-order-btn");
        if (btn) {
          btn.disabled = true;
          btn.innerHTML = "Processing Order...";
        }
        setTimeout(function () {
          window.location.href = "orders.html?placed=1";
        }, 800);
      });
    }
  })();
</script>`);

  // ---------------------------------------------------------------------------
  // 07. CUSTOMER ORDERS DASHBOARD (orders.html)
  // ---------------------------------------------------------------------------
  page("orders.html", "My Orders — Kartzo", "View and track all past orders, delivery status, invoices, and doorstep return requests on Kartzo.", "orders", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "My Orders" }])}

    <div class="pad site-max py-5 sm:py-8">
      <div class="mb-5 flex flex-col border-b border-slate-200/80 pb-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-6">
        <div>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
            ${icon("package", "h-3.5 w-3.5")}
            Customer Account
          </span>
          <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
            My Orders
          </h1>
          <p class="mt-1 text-xs sm:text-sm text-slate-500">Track current deliveries, view GST invoices, and reorder past favorites.</p>
        </div>

        <!-- Filter Tabs -->
        <div class="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-0 sm:flex-wrap sm:overflow-visible sm:pb-0">
          ${["All", "Active", "Delivered", "Cancelled"].map((t, i) => `
          <button type="button" data-filter="${t.toLowerCase()}" class="order-filter min-h-10 shrink-0 rounded-xl px-4 text-xs font-bold transition ${i === 0 ? "bg-brand text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}">${t}</button>`).join("")}
        </div>
      </div>

      <!-- Placed Success Notification Banner -->
      <div id="placed-banner" class="mb-6 hidden rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs sm:text-sm font-bold text-emerald-800">
        Order placed successfully! We have dispatched a confirmation email &amp; SMS with your tracking details.
      </div>

      <div class="space-y-4" id="orders-list">
        ${[
          { id: "KZ-10482", date: "6 Oct 2026", status: "shipped", label: "In Transit", items: [["assets/p-headphones.webp", "Wireless Headphones Pro", "₹2,799"]], total: "₹2,799", active: true },
          { id: "KZ-10391", date: "28 Sep 2026", status: "delivered", label: "Delivered", items: [["assets/p-shoes.webp", "Men's Running Shoes", "₹2,399"], ["assets/p-backpack.webp", "Laptop Backpack 25L", "₹1,299"]], total: "₹3,698", active: false },
          { id: "KZ-10255", date: "12 Sep 2026", status: "processing", label: "Processing", items: [["assets/p-earbuds.webp", "TWS Earbuds Active", "₹1,999"]], total: "₹1,999", active: true },
          { id: "KZ-10110", date: "2 Aug 2026", status: "cancelled", label: "Cancelled", items: [["assets/p-perfume.webp", "Premium Perfume 100ml", "₹1,299"]], total: "₹1,299", active: false }
        ].map(o => `
        <article class="order-card rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:shadow-card sm:p-6" data-status="${o.status}" data-active="${o.active ? "1" : "0"}">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p class="text-sm font-black text-brand-ink">${o.id}</p>
              <p class="text-xs text-slate-500">Placed on ${o.date}</p>
            </div>
            <span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
              o.status === "delivered" ? "bg-emerald-50 text-emerald-700" :
              o.status === "shipped" ? "bg-brand-soft text-brand" :
              o.status === "cancelled" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-700"
            }">
              <span class="h-1.5 w-1.5 rounded-full ${
                o.status === "delivered" ? "bg-emerald-600" :
                o.status === "shipped" ? "bg-brand" :
                o.status === "cancelled" ? "bg-rose-600" : "bg-amber-600"
              }"></span>
              ${o.label}
            </span>
          </div>

          <ul class="my-4 space-y-3">
            ${o.items.map(([img, name, price]) => `
            <li class="flex items-center gap-3.5">
              <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FB] p-1 sm:h-16 sm:w-16">
                <img src="${img}" alt="${name}" class="h-10 w-auto object-contain sm:h-12" width="800" height="800">
              </span>
              <div class="min-w-0 flex-1">
                <span class="block truncate text-xs sm:text-sm font-extrabold text-brand-ink">${name}</span>
                <span class="text-xs font-bold text-slate-500">${price}</span>
              </div>
            </li>`).join("")}
          </ul>

          <div class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p class="text-sm font-extrabold text-brand-ink">Order Total: <span class="text-brand font-black">${o.total}</span></p>
            <div class="flex flex-wrap gap-2">
              ${o.status === "shipped" || o.status === "processing" ? `<a href="tracking.html" class="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-brand px-4 text-xs font-bold text-white hover:bg-brand-dark transition">${icon("truck", "h-3.5 w-3.5")}<span>Track Package</span></a>` : ""}
              ${o.status === "delivered" ? `<a href="product.html" class="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-brand px-4 text-xs font-bold text-white hover:bg-brand-dark transition">${icon("cart", "h-3.5 w-3.5")}<span>Buy Again</span></a>` : ""}
              <a href="product.html" class="inline-flex min-h-10 items-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 transition">View Details</a>
            </div>
          </div>
        </article>`).join("")}
      </div>
    </div>
`, `<script>
  (function () {
    if (new URLSearchParams(location.search).get("placed") === "1") {
      var banner = document.getElementById("placed-banner");
      if (banner) banner.classList.remove("hidden");
    }
    var buttons = document.querySelectorAll(".order-filter");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.className = "order-filter min-h-10 shrink-0 rounded-xl px-4 text-xs font-bold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition";
        });
        btn.className = "order-filter min-h-10 shrink-0 rounded-xl px-4 text-xs font-bold bg-brand text-white shadow-sm transition";
        var f = btn.getAttribute("data-filter");
        document.querySelectorAll(".order-card").forEach(function (card) {
          var show = f === "all" || (f === "active" && card.getAttribute("data-active") === "1") || (f === card.getAttribute("data-status"));
          card.classList.toggle("hidden", !show);
        });
      });
    });
  })();
</script>`);

  // ---------------------------------------------------------------------------
  // 08. SHIPMENT TRACKING EXPERIENCE (tracking.html)
  // ---------------------------------------------------------------------------
  page("tracking.html", "Track Your Order — Kartzo", "Real-time shipment tracking for all Kartzo deliveries with live checkpoint status.", "orders", `
    ${crumbs([{ href: "index.html", label: "Home" }, { href: "orders.html", label: "Orders" }, { label: "Track Package" }])}

    <div class="pad site-max py-5 sm:py-8 max-w-4xl mx-auto">
      <div class="mb-5 border-b border-slate-200/80 pb-4 text-center sm:mb-8 sm:pb-6">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("truck", "h-3.5 w-3.5")}
          Courier Tracking
        </span>
        <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
          Track Your Shipment
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Enter your Order ID and registered phone number to look up live status.</p>
      </div>

      <!-- Tracking Lookup Form -->
      <form class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-7">
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block text-xs font-bold text-slate-600">Order ID (e.g. KZ-10482)
            <input required class="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white" value="KZ-10482">
          </label>
          <label class="block text-xs font-bold text-slate-600">Mobile Number / Email
            <input required class="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white" value="+91 98765 43210">
          </label>
        </div>
        <button type="button" class="mt-4 flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand px-6 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-brand-dark transition">
          ${icon("search", "h-4 w-4")}
          <span>Track Order Details</span>
        </button>
      </form>

      <!-- Active Shipment Status Card -->
      <div class="mt-5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:mt-8 sm:p-8">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <span class="rounded bg-brand-soft px-2.5 py-0.5 text-xs font-bold text-brand">Shipped via Blue Dart Express</span>
            <h2 class="mt-1.5 text-base sm:text-lg font-black text-brand-ink">Order KZ-10482 • AWB: BD-84920482</h2>
            <p class="text-xs text-slate-500 mt-0.5">Estimated Delivery: <strong class="text-brand-ink">Friday, 10 Oct 2026</strong></p>
          </div>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
            <span class="h-2 w-2 rounded-full bg-brand animate-pulse"></span>
            In Transit
          </span>
        </div>

        <!-- 4-Step Progress Milestone -->
        <ol class="mt-5 grid gap-2.5 grid-cols-2 sm:mt-8 sm:gap-4 sm:grid-cols-4">
          <li class="rounded-xl bg-emerald-50 p-3 text-center sm:p-4">
            <span class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
              ${icon("check", "h-4 w-4")}
            </span>
            <span class="mt-2 block text-xs font-extrabold text-emerald-800">Order Confirmed</span>
            <span class="block text-[10px] text-slate-500">6 Oct, 10:30 AM</span>
          </li>
          <li class="rounded-xl bg-emerald-50 p-3 text-center sm:p-4">
            <span class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
              ${icon("check", "h-4 w-4")}
            </span>
            <span class="mt-2 block text-xs font-extrabold text-emerald-800">Packed &amp; Dispatched</span>
            <span class="block text-[10px] text-slate-500">6 Oct, 04:15 PM</span>
          </li>
          <li class="rounded-xl bg-brand-soft p-3 text-center sm:p-4 ring-2 ring-brand/30">
            <span class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white text-xs font-bold">
              ${icon("truck", "h-4 w-4")}
            </span>
            <span class="mt-2 block text-xs font-extrabold text-brand">In Transit</span>
            <span class="block text-[10px] text-slate-500">Hub Mumbai</span>
          </li>
          <li class="rounded-xl bg-slate-50 p-3 text-center sm:p-4">
            <span class="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-400 text-xs font-bold">
              ${icon("package", "h-4 w-4")}
            </span>
            <span class="mt-2 block text-xs font-extrabold text-slate-400">Out for Delivery</span>
            <span class="block text-[10px] text-slate-400">Expected 10 Oct</span>
          </li>
        </ol>

        <!-- Checkpoints Table -->
        <div class="mt-5 border-t border-slate-100 pt-4 sm:mt-8 sm:pt-6">
          <h3 class="text-xs font-extrabold uppercase tracking-wider text-brand-ink">Milestone History</h3>
          <div class="mt-4 space-y-3 text-xs">
            <div class="flex items-start gap-4">
              <span class="w-28 font-bold text-slate-400 shrink-0">8 Oct, 06:40 AM</span>
              <p class="font-bold text-brand-ink">Departed Mumbai Sorting Facility (En route to Indore Hub)</p>
            </div>
            <div class="flex items-start gap-4">
              <span class="w-28 font-bold text-slate-400 shrink-0">7 Oct, 09:12 PM</span>
              <p class="text-slate-500">Arrived at Mumbai Central Logistics Center</p>
            </div>
            <div class="flex items-start gap-4">
              <span class="w-28 font-bold text-slate-400 shrink-0">6 Oct, 05:00 PM</span>
              <p class="text-slate-500">Package scanned and picked up by Blue Dart courier</p>
            </div>
          </div>
        </div>
      </div>
    </div>
`);

  // ---------------------------------------------------------------------------
  // 09. WISHLIST PAGE (wishlist.html)
  // ---------------------------------------------------------------------------
  page("wishlist.html", "My Wishlist — Kartzo", "Saved favorites and products on your Kartzo wishlist ready for quick checkout.", "shop", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "My Wishlist" }])}

    <div class="pad site-max py-5 sm:py-8">
      <div class="mb-5 flex flex-row items-end justify-between gap-3 border-b border-slate-200/80 pb-4 sm:mb-8 sm:pb-6">
        <div>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600">
            ${icon("heart", "h-3.5 w-3.5")}
            Saved Items
          </span>
          <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
            My Wishlist
          </h1>
          <p class="mt-1 text-xs sm:text-sm text-slate-500">
            <span id="wishlist-page-count" class="font-bold text-brand-ink">4</span> saved products ready to purchase.
          </p>
        </div>
        <a href="products.html" class="inline-flex shrink-0 items-center gap-1 pb-1 text-xs sm:text-sm font-bold text-brand hover:underline">
          <span>Discover More</span>
          ${icon("arrow-right", "h-3.5 w-3.5")}
        </a>
      </div>

      <!-- Wishlist Product Grid Using Canonical Master ProductCard Component -->
      <div id="wishlist-grid" class="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
        ${products.slice(0, 4).map(productCard).join("\n        ")}
      </div>

      <!-- Empty State -->
      <div id="wishlist-empty-state" class="hidden rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          ${icon("heart", "h-8 w-8")}
        </div>
        <h2 class="mt-4 text-lg font-extrabold text-brand-ink">Your Wishlist is Empty</h2>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Explore our catalog and click the heart icon on items you love.</p>
        <div class="mt-6">
          <a href="products.html" class="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-6 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-brand-dark transition">
            <span>Start Shopping</span>
            ${icon("arrow-right", "h-4 w-4")}
          </a>
        </div>
      </div>
    </div>
`);
}
