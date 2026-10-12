/** Kartzo Shopify theme — Tailwind v3 build config.
 * Mirrors the inline `tailwind.config` from the original site (scripts/shared.mjs
 * + index.html) so the compiled production CSS preserves the exact design tokens.
 * Build: npx tailwindcss@3.4.13 -c ./tailwind.config.js -i ./input.css -o ./assets/theme.css --minify
 * Content sources MUST include the original ../*.html (class vocabulary source of
 * truth) plus all ./layout ./sections ./snippets ./templates Liquid files.
 */
const ROOT = 'C:/Users/ujjaw/Documents/Github/kartzo';
module.exports = {
  content: [
    `${ROOT}/*.html`,
    `${ROOT}/shopify-theme/layout/**/*.liquid`,
    `${ROOT}/shopify-theme/sections/**/*.liquid`,
    `${ROOT}/shopify-theme/snippets/**/*.liquid`,
    `${ROOT}/shopify-theme/templates/**/*.liquid`,
    `${ROOT}/shopify-theme/templates/**/*.json`,
    `${ROOT}/shopify-theme/assets/kartzo.js`,
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1A56F0',
          dark: '#123FBE',
          bar: '#1246D0',
          ink: '#0E1730',
          muted: '#4E5D78',
          soft: '#F4F8FF',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 24px rgba(16, 42, 110, 0.08)',
      },
    },
  },
  corePlugins: {
    // Keep preflight: the original site was built on Tailwind preflight (Play CDN).
    preflight: true,
  },
};
