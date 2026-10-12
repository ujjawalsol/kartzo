# DESIGN_SPEC — canonical Kartzo tokens (source of truth: index.html + kartzo.css)

## Color
| Token | Value | Usage |
|---|---|---|
| brand DEFAULT | `#1A56F0` | primary buttons, links, active states, focus ring |
| brand dark | `#123FBE` | button hover, deals CTA text |
| brand bar | `#1246D0` | announcement bar bg |
| ink | `#0E1730` | body text, headings, toast bg |
| muted | `#4E5D78` | secondary text |
| soft | `#F4F8FF` | tinted surfaces, nav active pill, search field `#f3f7ff` variant |
| line | `#e6eefb` / `#dbe7ff` / `#e8eef8` | card + header borders |
| star | amber-400 `#fbbf24` | ratings |
| sale badge | `#ef3b3b` | discount badges |
| success/warn/danger pills | `#059669`/`#c27a00`/`#dc2626` on tinted bgs | order/account states |
| hero shade | `rgba(4,19,57,.92→.04)` gradient; mobile variant `.9→.24`, image `object-position:62%` | hero legibility |

Exposed as CSS vars `--kz-*` (`:root` in theme.css) AND Tailwind `brand.*` utilities. No page may
introduce new hues; tints derive from these.

## Typography
- Family: `Plus Jakarta Sans` (Google Fonts, `display=swap`), fallbacks `Inter, system-ui, sans-serif`.
- Scale (preserved): hero `1.6rem → sm:6xl → lg:4.7rem/1.05/-0.03em`; section H2 `xl→2xl extrabold tracking-tight`
  with brand accent word; card title `13px bold`; price `15px extrabold`; micro `10–12px`.
- Kicker pattern: `11px extrabold uppercase tracking-[0.18em]` on `bg-white/15` pill.

## Layout / spacing
- Gutter `.pad`: 16px → 24px (≥768) → 32px (≥1280). Full-bleed sections use `pad` directly.
- Radii: cards `rounded-2xl`, pills `rounded-full`, buttons `rounded-xl` (hero) / `rounded-lg` (cards).
- Shadows: `shadow-card 0 8px 24px rgba(16,42,110,.08)`; card resting `0 2px 10px rgba(15,50,120,.04)`;
  header `0 5px 20px rgba(16,42,110,.04)`.
- Header: sticky, desktop 2-row grid (logo+actions / nav+search, search pill `rounded-full bg-[#f3f7ff]`,
  icon columns with 10px labels); mobile app header (menu/logo/cart, inline search, category pills),
  bottom nav 5 tabs + `body padding-bottom:68px` below lg.
- Product card (canonical): `rounded-2xl border-[#e6eefb] p-2.5`, square image area (`aspect-square`,
  compact `4/3` ≤640px), `-30%` badge top-left, `.wish` circle top-right (44px touch), stars + count,
  price row (extrabold + line-through MRP), `min-h-11 Add to Cart` full-width. Image ratio preserved
  via `object-contain`; aspect enforced so grids never jump.
- Hero: grid-stacked slides, fade 650ms + image settle 1.2s, dots 7px→26px, autoplay pause on
  hover/focus/hidden-tab, `prefers-reduced-motion` kills motion (kept in production CSS).
- Drawers/modal: right slide-over cart, left mobile menu, centered search modal; backdrop fade;
  Esc closes; focus trapped + returned (new in theme JS, same visuals).
- Breakpoints: 640 / 768 / 1024 / 1280 (Tailwind defaults; custom CSS adds 639.5/1023.5/1023 cutoffs).
- Focus: `2px solid #1A56F0 + 2px offset` everywhere (never removed for looks).
