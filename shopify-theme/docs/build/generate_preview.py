import os, re

base_dir = r'c:\Users\ujjaw\Documents\Github\kartzo'
index_html = os.path.join(base_dir, 'index.html')
preview_html = os.path.join(base_dir, 'shopify-theme', 'preview.html')

with open(index_html, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace CDN tailwind and kartzo.css with the compiled Shopify theme.css and kartzo.js
content = re.sub(
    r'<script src="https://cdn\.tailwindcss\.com"></script>.*?<link rel="stylesheet" href="assets/kartzo\.css">',
    '''<!-- Compiled Shopify Production Stylesheet -->
  <link rel="stylesheet" href="/assets/theme.css">
  <script>
    window.KartzoSettings = {
      moneyFormat: "₹{{amount}}",
      currency: "INR",
      freeShippingThreshold: 499,
      routes: {
        root: "/",
        cart: "/cart",
        search: "/search",
        account: "/account"
      }
    };
  </script>
  <script src="/assets/kartzo.js" defer></script>''',
    content,
    flags=re.DOTALL
)

# Replace scripts at the bottom to use /assets/kartzo.js
content = re.sub(
    r'<script src="scripts/shared\.mjs"[^>]*></script>.*?<script src="scripts/index\.mjs"[^>]*></script>',
    '<!-- Loaded via kartzo.js in head -->',
    content,
    flags=re.DOTALL
)

# Add a floating preview badge so the user knows they are viewing the local preview
badge = '''
<aside id="kartzo-preview-bar" class="fixed top-2 right-2 z-[9999] flex items-center gap-2 rounded-full border border-blue-200 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-brand shadow-lg backdrop-blur">
  <span class="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
  <span>Kartzo Local Theme Preview (Port 3000)</span>
  <span class="text-slate-300">|</span>
  <a href="/original" class="text-slate-600 hover:text-brand" title="Compare with original static prototype">View Original Ref</a>
</aside>
'''
content = content.replace('<body id="top"', f'{badge}\n<body id="top"')

with open(preview_html, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Generated {preview_html} ({os.path.getsize(preview_html)} bytes)")
