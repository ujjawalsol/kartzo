import { page, crumbs, icon } from "./shared.mjs";

export function buildInfoSupport() {
  // ---------------------------------------------------------------------------
  // 10. ABOUT US (about.html)
  // ---------------------------------------------------------------------------
  page("about.html", "About Us — Kartzo", "Learn about Kartzo's mission to deliver premium electronics, lifestyle, and home goods at direct honest pricing across India.", "about", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "About Us" }])}

    <div class="pad site-max py-5 sm:py-8">
      <!-- Hero Intro -->
      <div class="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
            ${icon("sparkles", "h-3.5 w-3.5")}
            Our Purpose
          </span>
          <h1 class="mt-3 text-[1.7rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-5xl">
            Precision Essentials, Honestly Priced.
          </h1>
          <p class="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
            Kartzo was established to cut through inflated retail markups and counterfeit uncertainty. We partner directly with verified component manufacturers to bring premium audio, smart wearables, lifestyle gear, and home goods directly to customers across India.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a href="products.html" class="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand px-6 text-xs sm:text-sm font-bold text-white shadow-[0_8px_20px_rgba(26,86,240,0.28)] hover:bg-brand-dark transition">
              <span>Explore Collection</span>
              ${icon("arrow-right", "h-4 w-4")}
            </a>
            <a href="contact.html" class="inline-flex min-h-12 items-center rounded-xl border border-slate-200 bg-white px-6 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
              Contact Support
            </a>
          </div>
        </div>
        <div class="overflow-hidden rounded-3xl bg-[#F6F8FB] p-6 shadow-sm">
          <img src="assets/hero.webp" alt="Kartzo Lifestyle Collection" class="h-full w-full object-contain" width="1536" height="1024">
        </div>
      </div>

      <!-- Core Brand Values (Clean Editorial Grid, Not Generic AI Boxes) -->
      <div class="mt-10 border-t border-slate-200/80 pt-8 sm:mt-20 sm:pt-14">
        <div class="max-w-xl">
          <span class="text-xs font-bold uppercase tracking-wider text-brand">Our Commitments</span>
          <h2 class="mt-1 text-2xl sm:text-3xl font-extrabold text-brand-ink">Built for Every Indian Shopper</h2>
          <p class="mt-2 text-xs sm:text-sm text-slate-500">How we maintain product integrity and customer trust at scale.</p>
        </div>
        
        <div class="mt-5 grid gap-3 sm:mt-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
              ${icon("shield-check", "h-5 w-5")}
            </div>
            <h3 class="mt-4 text-base font-extrabold text-brand-ink">Direct Factory Sourcing</h3>
            <p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500">Every item is sourced directly from original manufacturers, eliminating intermediary markups and guaranteeing genuine factory seals.</p>
          </div>
          <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
              ${icon("refresh", "h-5 w-5")}
            </div>
            <h3 class="mt-4 text-base font-extrabold text-brand-ink">7-Day Doorstep Returns</h3>
            <p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500">If your purchase fails to meet expectations or sustains shipping transit damage, our logistics courier will pick it up directly from your door.</p>
          </div>
          <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
              ${icon("truck", "h-5 w-5")}
            </div>
            <h3 class="mt-4 text-base font-extrabold text-brand-ink">Pan-India Express Dispatch</h3>
            <p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500">Orders are packed within 24 hours from regional fulfillment hubs in Mumbai and Delhi, reaching over 19,000 postal codes rapidly.</p>
          </div>
        </div>
      </div>

      <!-- Trust Metrics Strip -->
      <div class="mt-10 rounded-2xl bg-brand-ink p-5 text-white sm:mt-16 sm:p-12">
        <div class="grid gap-6 grid-cols-2 md:grid-cols-4 text-center">
          <div><span class="block text-3xl sm:text-4xl font-black text-white">100K+</span><span class="mt-1 block text-xs text-white/70">Verified Orders</span></div>
          <div><span class="block text-3xl sm:text-4xl font-black text-white">1,200+</span><span class="mt-1 block text-xs text-white/70">Tested Products</span></div>
          <div><span class="block text-3xl sm:text-4xl font-black text-white">99.4%</span><span class="mt-1 block text-xs text-white/70">On-Time Deliveries</span></div>
          <div><span class="block text-3xl sm:text-4xl font-black text-white">4.8 / 5</span><span class="mt-1 block text-xs text-white/70">Average Customer Rating</span></div>
        </div>
      </div>
    </div>
`);

  // ---------------------------------------------------------------------------
  // 11. CONTACT US (contact.html)
  // ---------------------------------------------------------------------------
  page("contact.html", "Contact Customer Support — Kartzo", "Get in touch with the Kartzo team for order tracking, returns assistance, corporate inquiries, and support.", "contact", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Contact Us" }])}

    <div class="pad site-max py-5 sm:py-8">
      <div class="mb-5 border-b border-slate-200/80 pb-4 sm:mb-8 sm:pb-6">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("help", "h-3.5 w-3.5")}
          Customer Help Desk
        </span>
        <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
          We're Here to Help
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Have a question regarding your order, delivery timeline, or returns? Reach out anytime.</p>
      </div>

      <div class="grid gap-5 lg:grid-cols-[1fr_380px] lg:gap-8">
        
        <!-- Contact Form -->
        <div class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-8">
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink">Send Us a Message</h2>
          <p class="mt-1 text-xs text-slate-500">Our customer care team typically responds within 2 business hours.</p>

          <form id="contact-form" class="mt-6 space-y-4" novalidate>
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block text-xs font-bold text-slate-600">Full Name *
                <input required name="name" class="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition" placeholder="e.g. Rahul Sharma">
              </label>
              <label class="block text-xs font-bold text-slate-600">Email Address *
                <input required type="email" name="email" class="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition" placeholder="e.g. rahul@example.com">
              </label>
            </div>
            
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block text-xs font-bold text-slate-600">Phone Number (Optional)
                <input name="phone" class="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition" placeholder="+91 98765 43210">
              </label>
              <label class="block text-xs font-bold text-slate-600">Order ID (If Applicable)
                <input name="order_id" class="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition" placeholder="e.g. KZ-10482">
              </label>
            </div>

            <label class="block text-xs font-bold text-slate-600">Subject *
              <input type="hidden" name="subject" id="subject-input" value="tracking">
              <span class="relative mt-1.5 block" data-subject-wrap>
                <button type="button" id="subject-btn" aria-haspopup="listbox" aria-expanded="false" class="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none transition focus:border-brand focus:bg-white">
                  <span id="subject-label" class="truncate">Order Tracking &amp; Delivery Inquiry</span>
                  ${icon("chevron-down", "h-4 w-4 shrink-0 text-slate-400")}
                </button>
                <span id="subject-menu" role="listbox" aria-label="Message subject" class="absolute inset-x-0 top-full z-30 mt-2 hidden overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                  ${[["tracking", "Order Tracking & Delivery Inquiry"], ["return", "Return or Doorstep Replacement"], ["warranty", "Product Warranty Claim"], ["billing", "Payment or Invoice Assistance"], ["general", "General Feedback"]].map(([v, l], i) => `
                  <button type="button" role="option" data-subject="${v}" aria-selected="${i === 0 ? "true" : "false"}" class="subject-option flex min-h-11 w-full items-center justify-between gap-2 px-3.5 text-xs sm:text-sm font-semibold transition ${i === 0 ? "bg-brand-soft text-brand" : "text-slate-600 hover:bg-slate-50"}">
                    <span class="truncate">${l}</span>
                    <svg class="subject-tick h-4 w-4 shrink-0 ${i === 0 ? "" : "hidden"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                  </button>`).join("")}
                </span>
              </span>
            </label>

            <label class="block text-xs font-bold text-slate-600">Message Details *
              <textarea required name="message" rows="4" class="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs sm:text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:bg-white transition" placeholder="Describe your inquiry in detail..."></textarea>
            </label>

            <button type="submit" id="contact-submit" class="flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand px-8 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-brand-dark transition active:scale-[0.98]">
              <span>Send Message</span>
              ${icon("arrow-right", "h-4 w-4")}
            </button>
            <p id="contact-success" class="mt-3 hidden text-xs font-bold text-emerald-600">Thank you! Your message has been received. Ticket #KZ-HELP-2819 opened.</p>
          </form>
        </div>

        <!-- Contact Channels Aside -->
        <aside class="space-y-4">
          <div class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">
            <h3 class="text-xs font-extrabold uppercase tracking-wider text-brand-ink">Direct Support Channels</h3>
            <div class="mt-4 space-y-4 text-xs sm:text-sm text-slate-600">
              <div class="flex items-start gap-3">
                <span class="text-brand shrink-0 mt-0.5">${icon("mail", "h-4 w-4")}</span>
                <div>
                  <p class="font-bold text-brand-ink">Email Support</p>
                  <a href="mailto:support@kartzo.com" class="text-brand hover:underline">support@kartzo.com</a>
                  <p class="text-[11px] text-slate-400">Response within 2-4 hours</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <span class="text-brand shrink-0 mt-0.5">${icon("phone", "h-4 w-4")}</span>
                <div>
                  <p class="font-bold text-brand-ink">Helpline</p>
                  <a href="tel:+918001234567" class="text-brand hover:underline">+91 800-123-4567</a>
                  <p class="text-[11px] text-slate-400">Mon - Sat, 9:00 AM - 7:00 PM IST</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <span class="text-brand shrink-0 mt-0.5">${icon("map-pin", "h-4 w-4")}</span>
                <div>
                  <p class="font-bold text-brand-ink">Corporate Office</p>
                  <p class="text-slate-500 leading-relaxed">Kartzo Technologies Pvt. Ltd.<br>Tower B, 4th Floor, Tech Hub, Mumbai 400051</p>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Shortcut Box -->
          <div class="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6">
            <h3 class="text-sm font-bold text-brand-ink">Quick Answers</h3>
            <p class="mt-1 text-xs text-slate-500">Need instant answers about tracking, refunds, or PIN coverage?</p>
            <a href="faq.html" class="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline">
              <span>Visit our Help Center &amp; FAQs</span>
              ${icon("arrow-right", "h-3.5 w-3.5")}
            </a>
          </div>
        </aside>
      </div>
    </div>
`, `<script>
  (function () {
    var form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = document.getElementById("contact-success");
        var btn = document.getElementById("contact-submit");
        if (btn) btn.disabled = true;
        if (msg) msg.classList.remove("hidden");
        form.reset();
        var subjLabel = document.getElementById("subject-label");
        var subjInput = document.getElementById("subject-input");
        if (subjLabel) subjLabel.textContent = "Order Tracking & Delivery Inquiry";
        if (subjInput) subjInput.value = "tracking";
        document.querySelectorAll(".subject-option").forEach(function (o) {
          var on = o.getAttribute("data-subject") === "tracking";
          o.setAttribute("aria-selected", on ? "true" : "false");
          o.classList.toggle("bg-brand-soft", on);
          o.classList.toggle("text-brand", on);
          o.classList.toggle("text-slate-600", !on);
          var tick = o.querySelector(".subject-tick");
          if (tick) tick.classList.toggle("hidden", !on);
        });
      });
    }

    var subjWrap = document.querySelector("[data-subject-wrap]");
    var subjBtn = document.getElementById("subject-btn");
    var subjMenu = document.getElementById("subject-menu");
    if (subjBtn && subjMenu) {
      subjBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = subjMenu.classList.toggle("hidden");
        subjBtn.setAttribute("aria-expanded", open ? "false" : "true");
      });
      document.addEventListener("click", function (e) {
        if (subjWrap && !subjWrap.contains(e.target)) { subjMenu.classList.add("hidden"); subjBtn.setAttribute("aria-expanded", "false"); }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") { subjMenu.classList.add("hidden"); subjBtn.setAttribute("aria-expanded", "false"); }
      });
      document.querySelectorAll(".subject-option").forEach(function (o) {
        o.addEventListener("click", function () {
          var label = document.getElementById("subject-label");
          var input = document.getElementById("subject-input");
          if (label) label.textContent = o.querySelector("span").textContent;
          if (input) input.value = o.getAttribute("data-subject");
          document.querySelectorAll(".subject-option").forEach(function (x) {
            var on = x === o;
            x.setAttribute("aria-selected", on ? "true" : "false");
            x.classList.toggle("bg-brand-soft", on);
            x.classList.toggle("text-brand", on);
            x.classList.toggle("text-slate-600", !on);
            var tick = x.querySelector(".subject-tick");
            if (tick) tick.classList.toggle("hidden", !on);
          });
          subjMenu.classList.add("hidden");
          subjBtn.setAttribute("aria-expanded", "false");
        });
      });
    }
  })();
</script>`);

  // ---------------------------------------------------------------------------
  // 12. FAQ (faq.html)
  // ---------------------------------------------------------------------------
  page("faq.html", "Frequently Asked Questions & Support — Kartzo", "Find answers to top questions about ordering, shipping timelines, doorstep returns, warranties, and payments on Kartzo.", "contact", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Help & FAQs" }])}

    <div class="pad site-max py-5 sm:py-8 max-w-4xl mx-auto">
      <div class="mb-8 border-b border-slate-200/80 pb-6 text-center">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("help", "h-3.5 w-3.5")}
          Knowledge Base
        </span>
        <h1 class="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-ink">
          Frequently Asked Questions
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Instant answers to the most common queries from Kartzo shoppers.</p>
      </div>

      <!-- FAQ Accordions -->
      <div class="space-y-3">
        ${[
          [
            "How long does delivery take across India?",
            "We dispatch all confirmed orders within 24 hours from regional fulfillment centers in Mumbai and Delhi. Metro deliveries typically arrive in 2-3 business days, while other regional destinations take 3-5 business days. You can track live parcel milestones on our <a href='tracking.html' class='text-brand font-bold hover:underline'>Order Tracking</a> page."
          ],
          [
            "How does the 7-Day Doorstep Replacement Guarantee work?",
            "If your product is physically damaged on arrival, defective in audio/function, or incorrect in size, you can initiate a doorstep return within 7 calendar days of delivery via your <a href='orders.html' class='text-brand font-bold hover:underline'>Orders page</a>. Our courier will inspect and pick up the item directly from your home address."
          ],
          [
            "Is Cash on Delivery (COD) supported?",
            "Yes! Cash on Delivery is supported across 19,000+ PIN codes in India for orders up to ₹10,000. You can also pay the delivery agent via UPI QR scan at your doorstep upon receiving the parcel."
          ],
          [
            "How do I claim brand warranty on electronics?",
            "All consumer electronics purchased on Kartzo are 100% genuine sealed retail units and include official manufacturer warranty cards. Simply keep your digital tax invoice (downloadable from your <a href='orders.html' class='text-brand font-bold hover:underline'>Orders page</a>) and present it at any authorized service center."
          ],
          [
            "How do I apply promotional coupon KARTZO10?",
            "During checkout or inside your <a href='cart.html' class='text-brand font-bold hover:underline'>Shopping Cart</a>, enter <strong>KARTZO10</strong> in the voucher code field and click Apply to instantly deduct 10% from your order total."
          ],
          [
            "What if I need to cancel my order before dispatch?",
            "You can cancel your order at zero charge prior to courier dispatch by navigating to <a href='orders.html' class='text-brand font-bold hover:underline'>My Orders</a> and clicking 'Cancel Order'. If already in transit, you may simply refuse delivery at your doorstep for an automatic refund."
          ]
        ].map(([q, a], idx) => `
        <details class="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition" ${idx === 0 ? "open" : ""}>
          <summary class="flex cursor-pointer items-center justify-between font-extrabold text-sm sm:text-base text-brand-ink">
            <span>${q}</span>
            <span class="text-slate-400 group-open:rotate-180 transition duration-200">
              ${icon("chevron-down", "h-4 w-4")}
            </span>
          </summary>
          <div class="mt-3.5 border-t border-slate-100 pt-3.5 text-xs sm:text-sm leading-relaxed text-slate-600">
            ${a}
          </div>
        </details>`).join("")}
      </div>

      <!-- Support Shortcut Box -->
      <div class="mt-12 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-8 text-center">
        <h2 class="text-base sm:text-lg font-extrabold text-brand-ink">Still have an unanswered question?</h2>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Our customer care team is standing by to resolve any issue.</p>
        <a href="contact.html" class="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand px-6 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-brand-dark transition">
          <span>Contact Customer Support</span>
          ${icon("arrow-right", "h-4 w-4")}
        </a>
      </div>
    </div>
`);

  // ---------------------------------------------------------------------------
  // 13. SIZE & FIT GUIDE (size-guide.html)
  // ---------------------------------------------------------------------------
  page("size-guide.html", "Size & Fit Guide — Kartzo", "Accurate sizing charts and measurement guidelines for apparel, footwear, and audio accessories on Kartzo.", "shop", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Size & Fit Guide" }])}

    <div class="pad site-max py-5 sm:py-8 max-w-4xl mx-auto">
      <div class="mb-5 border-b border-slate-200/80 pb-4 text-center sm:mb-8 sm:pb-6">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("sparkles", "h-3.5 w-3.5")}
          Measurement Precision
        </span>
        <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
          Size &amp; Fit Guide
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Find your exact measurements before ordering to ensure the ideal fit.</p>
      </div>

      <!-- Footwear Size Chart -->
      <div class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-8">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 class="text-sm sm:text-base font-extrabold text-brand-ink">Footwear Size Conversion (Men &amp; Women)</h2>
          <span class="text-xs text-slate-400">All sizes in standard UK/India</span>
        </div>
        <div class="mt-4 overflow-x-auto">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr class="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px] tracking-wider">
                <th class="py-3 px-3">India / UK</th>
                <th class="py-3 px-3">US</th>
                <th class="py-3 px-3">EU</th>
                <th class="py-3 px-3">Foot Length (cm)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-semibold text-brand-ink">
              <tr class="hover:bg-slate-50/50"><td class="py-3 px-3 font-bold text-brand">6</td><td class="py-3 px-3">7</td><td class="py-3 px-3">40</td><td class="py-3 px-3">25.0 cm</td></tr>
              <tr class="hover:bg-slate-50/50"><td class="py-3 px-3 font-bold text-brand">7</td><td class="py-3 px-3">8</td><td class="py-3 px-3">41</td><td class="py-3 px-3">25.8 cm</td></tr>
              <tr class="hover:bg-slate-50/50"><td class="py-3 px-3 font-bold text-brand">8</td><td class="py-3 px-3">9</td><td class="py-3 px-3">42</td><td class="py-3 px-3">26.7 cm</td></tr>
              <tr class="hover:bg-slate-50/50"><td class="py-3 px-3 font-bold text-brand">9</td><td class="py-3 px-3">10</td><td class="py-3 px-3">43</td><td class="py-3 px-3">27.5 cm</td></tr>
              <tr class="hover:bg-slate-50/50"><td class="py-3 px-3 font-bold text-brand">10</td><td class="py-3 px-3">11</td><td class="py-3 px-3">44</td><td class="py-3 px-3">28.3 cm</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Apparel Size Chart -->
      <div class="mt-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:mt-6 sm:p-8">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 class="text-sm sm:text-base font-extrabold text-brand-ink">Apparel &amp; Outerwear Sizing</h2>
          <span class="text-xs text-slate-400">Regular fit specs</span>
        </div>
        <div class="mt-4 overflow-x-auto">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr class="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px] tracking-wider">
                <th class="py-3 px-3">Tag Size</th>
                <th class="py-3 px-3">Chest (inches)</th>
                <th class="py-3 px-3">Waist (inches)</th>
                <th class="py-3 px-3">Length (inches)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 font-semibold text-brand-ink">
              <tr class="hover:bg-slate-50/50"><td class="py-3 px-3 font-bold text-brand">S</td><td class="py-3 px-3">38"</td><td class="py-3 px-3">30" - 32"</td><td class="py-3 px-3">27"</td></tr>
              <tr class="hover:bg-slate-50/50"><td class="py-3 px-3 font-bold text-brand">M</td><td class="py-3 px-3">40"</td><td class="py-3 px-3">32" - 34"</td><td class="py-3 px-3">28"</td></tr>
              <tr class="hover:bg-slate-50/50"><td class="py-3 px-3 font-bold text-brand">L</td><td class="py-3 px-3">42"</td><td class="py-3 px-3">34" - 36"</td><td class="py-3 px-3">29"</td></tr>
              <tr class="hover:bg-slate-50/50"><td class="py-3 px-3 font-bold text-brand">XL</td><td class="py-3 px-3">44"</td><td class="py-3 px-3">36" - 38"</td><td class="py-3 px-3">30"</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
`);
}
