import json, os, glob, re

theme_dir = 'shopify-theme'
templates_dir = os.path.join(theme_dir, 'templates')
sections_dir = os.path.join(theme_dir, 'sections')
snippets_dir = os.path.join(theme_dir, 'snippets')
assets_dir = os.path.join(theme_dir, 'assets')

print('--- TEMPLATE AUDIT ---')
json_templates = glob.glob(os.path.join(templates_dir, '**', '*.json'), recursive=True) + glob.glob(os.path.join(sections_dir, '*-group.json'))
missing_sections = []
for t in json_templates:
    rel_path = os.path.relpath(t, theme_dir)
    try:
        with open(t, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f'JSON ERROR in {rel_path}: {e}')
        continue
    sections = data.get('sections', {})
    for s_key, s_data in sections.items():
        s_type = s_data.get('type')
        s_file = os.path.join(sections_dir, f'{s_type}.liquid')
        if not os.path.exists(s_file):
            missing_sections.append((rel_path, s_key, s_type))

if missing_sections:
    print('MISSING SECTIONS IN TEMPLATES:', missing_sections)
else:
    print(f'ALL {len(json_templates)} JSON templates reference existing section files!')

print('\n--- SNIPPET AUDIT ---')
liquid_files = glob.glob(os.path.join(theme_dir, '**', '*.liquid'), recursive=True)
missing_snippets = []
for lf in liquid_files:
    rel_path = os.path.relpath(lf, theme_dir)
    with open(lf, 'r', encoding='utf-8') as f:
        content = f.read()
    render_calls = re.findall(r'{%\s*(?:render|include)\s+[\'"]([^\'"]+)[\'"]', content)
    for snip in render_calls:
        snip_file = os.path.join(snippets_dir, f'{snip}.liquid')
        if not os.path.exists(snip_file):
            missing_snippets.append((rel_path, snip))

if missing_snippets:
    print('MISSING SNIPPETS:', missing_snippets)
else:
    print(f'ALL snippet calls across all {len(liquid_files)} Liquid files exist!')

print('\n--- ASSET AUDIT ---')
missing_assets = []
for lf in liquid_files:
    rel_path = os.path.relpath(lf, theme_dir)
    with open(lf, 'r', encoding='utf-8') as f:
        content = f.read()
    asset_calls = re.findall(r'[\'"]([a-zA-Z0-9_\-\.]+\.(?:webp|png|jpg|jpeg|svg|css|js))[\'"]\s*\|\s*asset_url', content)
    for asset in asset_calls:
        asset_file = os.path.join(assets_dir, asset)
        if not os.path.exists(asset_file):
            missing_assets.append((rel_path, asset))

if missing_assets:
    print('MISSING ASSETS:', set(missing_assets))
else:
    print('ALL static asset references resolve to existing files in assets/!')

print('\n--- TRANSLATION AUDIT ---')
locales_path = os.path.join(theme_dir, 'locales', 'en.default.json')
with open(locales_path, 'r', encoding='utf-8') as f:
    locales = json.load(f)

def get_keys(d, prefix=''):
    keys = set()
    for k, v in d.items():
        new_key = f'{prefix}.{k}' if prefix else k
        if isinstance(v, dict):
            keys.update(get_keys(v, new_key))
        else:
            keys.add(new_key)
    return keys

all_locales_keys = get_keys(locales)
missing_keys = []
for lf in liquid_files:
    rel_path = os.path.relpath(lf, theme_dir)
    with open(lf, 'r', encoding='utf-8') as f:
        content = f.read()
    t_matches = re.findall(r'[\'"]([a-zA-Z0-9_\.]+)[\'"]\s*\|\s*t', content)
    for k in t_matches:
        if k not in all_locales_keys:
            missing_keys.append((rel_path, k))

if missing_keys:
    print('MISSING TRANSLATIONS:', set(missing_keys))
else:
    print('ALL translation keys resolve in locales/en.default.json!')

