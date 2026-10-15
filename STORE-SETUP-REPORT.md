# KARTZO — Store Setup Audit & Execution Report
Store: Kartzo (kartzo.shop) — Admin: xvvacq-kv — Date: 2026-10-15
Theme: kartzo/shopify-theme-dev (GitHub connected) — NOT published without approval

## Phase 1 — Inspect (PARTIAL)
| Area | Existing state | Status |
|---|---|---|
| Home | "Kartzo is open for business", 26 sessions, shipping CTA pending | Needs config |
| Products | 7 Active, 100 in stock each: Facial Massager, Hairline Powder, Cupping Set, Eyebrow, Papaya Cream, Perfume (typo Perfum), Green Tea Mask. Vendor=all `qcpb2m-7c`, Category/Type empty | Needs correction |
| Collections | 6: Kids Collections(6), Jewellery(6), Self Care(6), Home Essentials(6), Best Sellers(7), Home page. Theme hardcoded electronics/fashion/home (wrong) | Needs correction — header fixed locally |
| Pages | Before: only Contact. After: About Us created ID 160437469286, handle about-us, template about, Visible — VERIFIED via OCR | PARTIAL (FAQ/Deals/Tracking/Wishlist missing) |
| Themes | Live: shopify-theme-dev + drafts vesperly-1, electronics-theme, Horizon. Preview renders, LCP 2188ms Good, INP 8ms Good | PASS (do not publish) |
| Settings index | General, Plan, Billing, Users, Payments, Checkout, Customer accounts, Shipping, Taxes, Locations, Domains all listed. Domain kartzo.shop shown | Needs per-section inspect |
| Navigation | URL /content/navigation attempted — redirected to pages list. Need Content>Navigation via search | BLOCKED (need correct path) |
| Apps | EasySell COD Form installed | Needs audit (duplicate scripts?) |

## Theme code fixes (PASS, in HEAD 0290f09 + 1 uncommitted)
- footer.liquid:225 copyright year, main-deals.liquid:255 range, wishlist 8x product.html, theme.liquid lang/theme-color/duplicate, policy.json NEW, addresses.liquid NEW, hero fallback modulo, main-collection split, main-contact contact[order_id], cart-drawer checkout, settings_schema logo, seo-head escape+noindex, header.liquid collections self-care/home-essentials/best-sellers (UNCOMMITTED — push needed)

## Privacy/T&C single-page fix (PASS, 2026-10-15)
- Task: Alag Privacy page hatao, T&C wala hi rakho.
- Existing: Footer me 2 links — Privacy Policy -> /policies/privacy-policy (native, Published) aur Terms of Service -> /pages/terms-conditions (Page exist hi nahi karta tha, HTTP 404 + 404-fallback content, SEO disaster). Dono same 5-tab UI render karte the = duplication.
- Action (theme code, UNCOMMITTED — push bakki): footer.liquid desktop+mobile se Privacy <li> hata, Terms link "Terms & Conditions" rename; header.liquid mobile drawer legal row se Privacy hata; why-choose Secure badge privacy URL -> terms URL; templates/page.privacy-policy.json deleted (koi Page use nahi karta tha — /pages/privacy-policy 404 verify kiya).
- Action (admin): NAYA Page "Terms & Conditions" banaya ID 160440746086, handle terms-conditions, Visible, Template terms-conditions — OCR verify.
- Verification: webfetch https://kartzo.shop/pages/terms-conditions = HTTP 200 + full 5-tab content (Shipping/Returns/Cancellation/Privacy/Terms). Pehle 404 tha.
- Status: PASS (page live). Footer/header changes push ke baad live honge.
- NOT changed (judgment): Settings > Policies > Privacy policy (Published) rakhi — checkout/signup/policy links ke liye chahiye; theme /pages/* checkout me nahi dikhta. Footer se unlink karne se duplication khatm, compliance barkarar.
- Blocker/approval: `git add -A && git commit && git push origin shopify-theme-dev` karne par footer live hoga — push approval chahiye (live theme hai).

## Blockers needing owner input (consolidated)
1. Legal business name, address, GSTIN, support email/phone — do not invent
2. Currency/timezone/units confirmation (change affects products/markets)
3. Shipping origin, zones, rates, COD scope, free-shipping Rs.499 approved?
4. Payment providers authorized for India (UPI/cards/COD) + test vs live — no credentials invented
5. Tax registration details — no GSTIN invented
6. Markets: India only or international?
7. Policies content approval (refund window, address) — snippet has placeholder Indore address
8. Customer accounts mode: new vs classic?
9. Sender email + DNS auth for notifications
10. Publish / password removal approval — NOT done
11. Product real data: images alt, SKU, HS codes, weights, vendor brand names, Perfum typo fix approval

## Next safe actions (updated 2026-10-15 evening)
- DONE: Privacy/T&C pushed live (a5b27ab) — footer/header verified live, no Privacy links.
- DONE: Main menu — Home, Category(All products), About Us(page), Contact, Best Sellers(collection) — saved+live in header.
- DONE: Favicon/logo — logo.webp uploaded to Files; code fallbacks live (favicon webp + apple-touch-icon, og:image + Organization logo). Theme customizer Theme-settings panel NOT loading groups (BLOCKED UI path — code fallback used instead).
- DONE: Preferences SEO — title "Kartzo – Smart Tech, Home Essentials & Daily Needs" (50/70), meta desc (180/320) from owner copy, hCaptcha already on, private mode off.
- DONE: Homepage — Best Sellers -> best-sellers collection (7 real), New Arrivals -> all-products fallback (8 real), 0 demo cards. Fixed og:url double-slash (28b65be).
- TODO: 7 dead pages still 404 (deals, tracking, faq, wishlist, shipping/returns/cancellation-policy) — create via proven flow OR remove links per owner choice.
- TODO: Test shopping journey (add-to-cart, filters) — no real paid orders.
- TODO: Sitemap verify (/sitemap.xml), Google Search Console (needs owner account).

## Contact email + full SEO sweep (PASS/PARTIAL, 2026-10-16)
- Contact email mistake: `%{creation_date}` Shopify fixed template hai (admin me editable template exist nahi karta — search karke verify kiya), badla nahi ja sakta. Jo hamare control me tha fix kiya: hidden subject value "tracking" -> "Order Tracking & Delivery Inquiry" (78fb81e live) — ab email me raw key ki jagah poora subject aayega. Baaki lines (Name/Email/Phone/Order/Body) Shopify render karta hai. Status: PARTIAL (code live; agli real/test mail me verify hoga).
- Dead links ZERO: Deals/Tracking/Wishlist pages banaye (200 verify). Announcement+footer+drawer policy links ab terms-hub hashes (#shipping/#return/#cancel) par — 404 khatm, duplicate-content bhi nahi.
- Collections SEO 6/6: description + meta title/desc — Best Sellers, Self Care, Home Essentials, Kids Collections, Jewellery, Featured Collection ("Home page" rename kiya — wahi purana frontpage collection tha). Sab live verify.
- Products SEO: title/desc/canonical/og/Product-JSONLD present (supplier copy), image alts present, sitemap.xml auto (products+collections+pages+blogs), robots.txt healthy (crawl traps blocked, sitemap declared).
- BLOCKED: FAQ page — live theme me page.faq.json template missing hai (repo me valid file hai; re-push se sync nahi hua). Theme code editor se add karna padega ya divergence investigate karni padegi.
- TODO owner: vendor "qcpb2m-7c" cleanup, product type, blog content, Google Search Console.

## Phone + contact form (PASS, 2026-10-15 night)
- Number +91 76976 43683 set everywhere (settings_data, footer defaults+block, contact section+schema, tracking demo, policy tel: link, footer-group.json) — old 98765/800 numbers fully gone (grep clean), pushed 0921169, live verified on contact page + footer.
- Contact form live test: filled Test Customer/test@kartzo.shop/+91 76976 43683 + TEST message, submitted on kartzo.shop/pages/contact → URL ?contact_posted=true + "Thank you! Your message has been received." Form WORKS. Test email went to store notification inbox — owner to confirm receipt.
