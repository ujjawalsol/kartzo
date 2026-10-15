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

## Next safe actions
- Create FAQ/Deals/Tracking/Wishlist pages same About flow (title + template, no invented content — theme snippet provides content)
- Inspect Settings>General, Payments, Shipping, Taxes, Markets, Policies, Notifications, Preferences, Domains one by one via automation, record only, change only safe SEO/preference fields
- Test shopping journey on preview (add-to-cart, search, filters) — no real paid orders
