import { page, crumbs, icon } from "./shared.mjs";

export function buildPolicies() {
  const policyNav = (activeSlug) => {
    const list = [
      ["shipping-policy.html", "Shipping Policy", "shipping"],
      ["returns-policy.html", "Returns & Refunds", "returns"],
      ["cancellation-policy.html", "Order Cancellation", "cancellation"],
      ["privacy-policy.html", "Privacy Policy", "privacy"],
      ["terms-conditions.html", "Terms of Service", "terms"]
    ];
    return `
      <div class="mb-5 flex gap-2 overflow-x-auto no-scrollbar border-b border-slate-200/80 pb-4 sm:mb-8 sm:flex-wrap sm:overflow-visible sm:pb-4">
        ${list.map(([url, title, slug]) => `
          <a href="${url}" class="shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${activeSlug === slug ? "bg-brand text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}">${title}</a>
        `).join("")}
      </div>
    `;
  };

  // ---------------------------------------------------------------------------
  // 14. SHIPPING POLICY (shipping-policy.html)
  // ---------------------------------------------------------------------------
  page("shipping-policy.html", "Shipping & Delivery Policy — Kartzo", "Detailed information about shipping timeframes, free shipping thresholds, carrier partners, and order tracking on Kartzo.", "about", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Shipping Policy" }])}

    <div class="pad site-max py-5 sm:py-8 max-w-4xl mx-auto">
      ${policyNav("shipping")}

      <div class="mb-5 sm:mb-8">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("truck", "h-3.5 w-3.5")}
          Fulfillment Guidelines
        </span>
        <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
          Shipping &amp; Delivery Policy
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Last updated: October 2026 • Valid for all orders across India.</p>
      </div>

      <!-- Key Highlight Banner -->
      <div class="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-xs sm:text-sm leading-relaxed text-emerald-900">
        <div class="flex items-center gap-2 font-black text-emerald-800">
          ${icon("check", "h-4 w-4")}
          <span>Key Summary: Free Shipping on ₹499+</span>
        </div>
        <p class="mt-1.5">All orders exceeding ₹499 qualify for 100% Free Express Shipping. Orders below ₹499 incur a flat fee of ₹49. All shipments are dispatched within 24 hours.</p>
      </div>

      <!-- Cohesive Editorial Reading Content -->
      <article class="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-600 space-y-8">
        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">1. Delivery Network &amp; Fulfillment Speed</h2>
          <p class="mt-3">Kartzo ships across 19,000+ postal PIN codes throughout India. Our primary logistics partners include Blue Dart Express, Delhivery, Shadowfax, and DTDC. Orders placed before 3:00 PM IST on business days are packed and dispatched on the same day.</p>
          <ul class="mt-3 list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Tier-1 Metro Hubs (Mumbai, Delhi-NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> Delivered within 2 to 3 business days.</li>
            <li><strong>Tier-2 &amp; Tier-3 Cities:</strong> Delivered within 3 to 5 business days.</li>
            <li><strong>Regional &amp; North-Eastern Pin Codes:</strong> Delivered within 5 to 7 business days.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">2. Free Shipping Thresholds &amp; Courier Fees</h2>
          <p class="mt-3">We believe in transparent pricing. If your shopping cart reaches <strong>₹499 or more</strong>, shipping is complimentary. If your order total is less than ₹499, a nominal freight charge of ₹49 is added at checkout to cover regional transportation.</p>
        </section>

        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">3. Real-Time Tracking Milestones</h2>
          <p class="mt-3">Upon shipment handover to our courier partner, you will receive an SMS and Email notification containing your unique Air Waybill (AWB) number and direct tracking link. You can also view live milestone updates at any time via the <a href="tracking.html" class="text-brand font-bold hover:underline">Kartzo Order Tracker</a>.</p>
        </section>

        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">4. Damaged or Tampered Parcels</h2>
          <p class="mt-3">If you notice that the external tamper-evident polybag has been cut, damaged, or unsealed upon delivery, please do not accept the package from the courier agent. Inform our support team immediately at <a href="mailto:support@kartzo.com" class="text-brand font-bold hover:underline">support@kartzo.com</a> or via phone at <a href="tel:+918001234567" class="text-brand font-bold hover:underline">+91 800-123-4567</a>.</p>
        </section>
      </article>
    </div>
`);

  // ---------------------------------------------------------------------------
  // 15. RETURNS & REFUND POLICY (returns-policy.html)
  // ---------------------------------------------------------------------------
  page("returns-policy.html", "7-Day Return & Refund Policy — Kartzo", "Understand our 7-Day Doorstep Replacement and Refund Guarantee on Kartzo.", "about", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Returns Policy" }])}

    <div class="pad site-max py-5 sm:py-8 max-w-4xl mx-auto">
      ${policyNav("returns")}

      <div class="mb-5 sm:mb-8">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("refresh", "h-3.5 w-3.5")}
          Buyer Protection
        </span>
        <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
          7-Day Return &amp; Refund Policy
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Hassle-free doorstep pickup and verified instant refunds.</p>
      </div>

      <!-- Key Highlight Banner -->
      <div class="mb-8 rounded-2xl border border-brand/20 bg-brand-soft p-5 text-xs sm:text-sm leading-relaxed text-brand-ink">
        <div class="flex items-center gap-2 font-black text-brand">
          ${icon("shield-check", "h-4 w-4")}
          <span>Zero-Friction Doorstep Pickup</span>
        </div>
        <p class="mt-1.5 text-slate-600">You don't need to ship returns yourself. When you request a return, our logistics partner will collect the product directly from your address within 24 to 48 hours.</p>
      </div>

      <article class="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-600 space-y-8">
        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">1. Eligible Conditions for Return</h2>
          <p class="mt-3">All items purchased on Kartzo qualify for replacement or return within <strong>7 calendar days</strong> from the delivery timestamp under any of the following circumstances:</p>
          <ul class="mt-3 list-disc pl-5 space-y-1 text-slate-600">
            <li>The product arrived physically damaged or cosmetically defective.</li>
            <li>The device does not power on, function as described, or missing included in-box accessories.</li>
            <li>An incorrect size, variant, or colorway was dispatched relative to your order confirmation.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">2. How to Request a Return</h2>
          <ol class="mt-3 list-decimal pl-5 space-y-2 text-slate-600">
            <li>Log into your <a href="orders.html" class="text-brand font-bold hover:underline">Kartzo Account</a> and find the relevant order.</li>
            <li>Click <strong>Request Return / Replacement</strong> and select your reason.</li>
            <li>Attach a quick photo of the defective item or original packaging.</li>
            <li>Our team will approve the request within 4 business hours and schedule doorstep collection.</li>
          </ol>
        </section>

        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">3. Refund Processing Timelines</h2>
          <p class="mt-3">Once the returned package reaches our regional fulfillment depot and passes initial serial authentication, your refund is disbursed immediately:</p>
          <ul class="mt-3 list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>UPI &amp; NetBanking:</strong> Refunded directly to your originating bank account within 2 to 4 business hours.</li>
            <li><strong>Credit / Debit Cards:</strong> Settled within 3 to 5 business days per standard RBI banking clearing cycles.</li>
            <li><strong>Cash on Delivery:</strong> Transferred via instant IMPS/UPI upon providing your account details.</li>
          </ul>
        </section>
      </article>
    </div>
`);

  // ---------------------------------------------------------------------------
  // 16. ORDER CANCELLATION (cancellation-policy.html)
  // ---------------------------------------------------------------------------
  page("cancellation-policy.html", "Order Cancellation Policy — Kartzo", "Guidelines for cancelling orders before and after courier dispatch on Kartzo.", "about", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Cancellation Policy" }])}

    <div class="pad site-max py-5 sm:py-8 max-w-4xl mx-auto">
      ${policyNav("cancellation")}

      <div class="mb-5 sm:mb-8">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("clock", "h-3.5 w-3.5")}
          Order Management
        </span>
        <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
          Order Cancellation Policy
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Transparent guidelines on cancelling orders at any stage.</p>
      </div>

      <article class="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-600 space-y-8">
        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">1. Cancellation Prior to Courier Handover</h2>
          <p class="mt-3">You can cancel your order at <strong>100% zero charge</strong> before it has been handed over to the courier partner. Simply visit your <a href="orders.html" class="text-brand font-bold hover:underline">Orders Dashboard</a>, locate the order, and click the "Cancel Order" button. Any prepaid funds will be reversed immediately.</p>
        </section>

        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">2. Cancellation After Shipment Handover</h2>
          <p class="mt-3">If your parcel has already been assigned an AWB tracking code and dispatched from our warehouse, online one-click cancellation will no longer be available. In this case, you may simply refuse acceptance of the parcel when the delivery courier arrives at your address. Upon recorded return to our hub, full prepaid refund will be triggered.</p>
        </section>
      </article>
    </div>
`);

  // ---------------------------------------------------------------------------
  // 17. PRIVACY POLICY (privacy-policy.html)
  // ---------------------------------------------------------------------------
  page("privacy-policy.html", "Privacy Policy — Kartzo", "How Kartzo collects, uses, encrypts, and protects your personal and payment information.", "about", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Privacy Policy" }])}

    <div class="pad site-max py-5 sm:py-8 max-w-4xl mx-auto">
      ${policyNav("privacy")}

      <div class="mb-5 sm:mb-8">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("shield-check", "h-3.5 w-3.5")}
          Data Protection
        </span>
        <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
          Privacy Policy
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Effective Date: October 2026 • Compliant with Indian IT Act and DPDP guidelines.</p>
      </div>

      <article class="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-600 space-y-8">
        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">1. Information We Collect</h2>
          <p class="mt-3">Kartzo collects personal data strictly necessary to fulfill your transactions and provide customer assistance. This includes your name, shipping address, mobile phone number, email address, and order history.</p>
        </section>

        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">2. Payment Security and Encryption</h2>
          <p class="mt-3">Kartzo does not store raw credit card numbers, CVVs, or bank account passwords on its servers. All payments are securely tokenized through RBI-authorized payment aggregators utilizing end-to-end 256-bit SSL encryption.</p>
        </section>

        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">3. Zero Third-Party Data Selling</h2>
          <p class="mt-3">We never sell, rent, or monetize your contact information with external marketing agencies. Your phone number is only shared with our verified logistics couriers to facilitate parcel delivery coordination.</p>
        </section>
      </article>
    </div>
`);

  // ---------------------------------------------------------------------------
  // 18. TERMS & CONDITIONS (terms-conditions.html)
  // ---------------------------------------------------------------------------
  page("terms-conditions.html", "Terms of Service — Kartzo", "Terms and conditions governing website usage, product orders, and customer rights on Kartzo.", "about", `
    ${crumbs([{ href: "index.html", label: "Home" }, { label: "Terms of Service" }])}

    <div class="pad site-max py-5 sm:py-8 max-w-4xl mx-auto">
      ${policyNav("terms")}

      <div class="mb-5 sm:mb-8">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">
          ${icon("help", "h-3.5 w-3.5")}
          Legal Agreement
        </span>
        <h1 class="mt-2 text-[1.45rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl">
          Terms of Service
        </h1>
        <p class="mt-1 text-xs sm:text-sm text-slate-500">Applicable to all visitors and customers of Kartzo Technologies Pvt. Ltd.</p>
      </div>

      <article class="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-600 space-y-8">
        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">1. Acceptance of Terms</h2>
          <p class="mt-3">By browsing or ordering items from Kartzo, you agree to comply with these terms, our Shipping Policy, and our Return Guidelines. If you do not agree with any provision, please refrain from using the platform.</p>
        </section>

        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">2. Pricing, Invoicing &amp; Product Availability</h2>
          <p class="mt-3">All listed product prices on Kartzo are quoted in Indian Rupees (INR) and are inclusive of Goods and Services Tax (GST). In the rare event of a typographical pricing error, Kartzo reserves the right to cancel the order and provide a full refund.</p>
        </section>

        <section>
          <h2 class="text-base sm:text-lg font-extrabold text-brand-ink border-b border-slate-100 pb-2">3. Governing Jurisdiction</h2>
          <p class="mt-3">These terms and any disputes arising under them are subject exclusively to the laws of India and the jurisdiction of the courts of Mumbai, Maharashtra.</p>
        </section>
      </article>
    </div>
`);
}
