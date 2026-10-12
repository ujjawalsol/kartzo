import json, os, re, glob, subprocess

theme_dir = 'shopify-theme'
templates_dir = os.path.join(theme_dir, 'templates')
sections_dir = os.path.join(theme_dir, 'sections')
snippets_dir = os.path.join(theme_dir, 'snippets')
assets_dir = os.path.join(theme_dir, 'assets')
locales_dir = os.path.join(theme_dir, 'locales')

results = []

# TEST 1: File Existence & JSON Parsing
try:
    index_path = os.path.join(templates_dir, 'index.json')
    with open(index_path, 'r', encoding='utf-8') as f:
        index_data = json.load(f)
    results.append(("TEST 1: templates/index.json File Existence & JSON Syntax", "PASS", f"Valid JSON, {os.path.getsize(index_path)} bytes"))
except Exception as e:
    results.append(("TEST 1: templates/index.json File Existence & JSON Syntax", "FAIL", str(e)))

# TEST 2: Platform Limits (Max 25 sections, Max 50 blocks)
sections = index_data.get('sections', {})
order = index_data.get('order', [])
sec_count = len(sections)
max_blocks = max([len(s.get('blocks', {})) for s in sections.values()] or [0])
if sec_count <= 25 and max_blocks <= 50:
    results.append(("TEST 2: Shopify Platform Architecture Limits", "PASS", f"{sec_count}/25 sections (limit 25), max {max_blocks}/50 blocks per section (limit 50)"))
else:
    results.append(("TEST 2: Shopify Platform Architecture Limits", "FAIL", f"Exceeded limits: {sec_count} sections, {max_blocks} blocks"))

# TEST 3: Order Array Integrity (Bi-directional match with sections)
order_set = set(order)
sections_set = set(sections.keys())
if order_set == sections_set and len(order) == len(order_set):
    results.append(("TEST 3: Section Order Array Integrity", "PASS", f"All {len(order)} section keys match 1:1 with order array, zero duplicates"))
else:
    diff = order_set.symmetric_difference(sections_set)
    results.append(("TEST 3: Section Order Array Integrity", "FAIL", f"Mismatch between order and sections: {diff}"))

# TEST 4: Section Files Existence
missing_sec_files = []
for s_key, s_data in sections.items():
    s_type = s_data.get('type')
    s_file = os.path.join(sections_dir, f'{s_type}.liquid')
    if not os.path.exists(s_file):
        missing_sec_files.append((s_key, s_type))
if not missing_sec_files:
    results.append(("TEST 4: Referenced Section Files Existence in sections/", "PASS", f"All {len(sections)} section types have matching .liquid files in sections/"))
else:
    results.append(("TEST 4: Referenced Section Files Existence in sections/", "FAIL", f"Missing files: {missing_sec_files}"))

# TEST 5: Section Schemas & Setting ID Validation
schema_setting_errors = []
for s_key, s_data in sections.items():
    s_type = s_data.get('type')
    s_file = os.path.join(sections_dir, f'{s_type}.liquid')
    with open(s_file, 'r', encoding='utf-8') as f:
        content = f.read()
    schema_match = re.search(r'\{%\s*schema\s*%\}(.*?)\{%\s*endschema\s*%\}', content, re.DOTALL)
    if not schema_match:
        schema_setting_errors.append(f"No schema in {s_type}")
        continue
    schema = json.loads(schema_match.group(1))
    allowed_settings = {s['id'] for s in schema.get('settings', []) if 'id' in s}
    for sid in s_data.get('settings', {}):
        if sid not in allowed_settings:
            schema_setting_errors.append(f"{s_key} ({s_type}): invalid setting '{sid}'")
if not schema_setting_errors:
    results.append(("TEST 5: Section Schema Setting ID Alignment", "PASS", "100% of section settings in index.json exist in Liquid schemas"))
else:
    results.append(("TEST 5: Section Schema Setting ID Alignment", "FAIL", "; ".join(schema_setting_errors)))

# TEST 6: Block Types & Block Settings Validation
block_errors = []
for s_key, s_data in sections.items():
    s_type = s_data.get('type')
    s_file = os.path.join(sections_dir, f'{s_type}.liquid')
    with open(s_file, 'r', encoding='utf-8') as f:
        content = f.read()
    schema_match = re.search(r'\{%\s*schema\s*%\}(.*?)\{%\s*endschema\s*%\}', content, re.DOTALL)
    schema = json.loads(schema_match.group(1))
    allowed_blocks = {b['type']: {s['id'] for s in b.get('settings', []) if 'id' in s} for b in schema.get('blocks', [])}
    for b_key, b_data in s_data.get('blocks', {}).items():
        b_type = b_data.get('type')
        if b_type not in allowed_blocks:
            block_errors.append(f"{s_key}: block '{b_key}' type '{b_type}' not in schema")
        else:
            for bsid in b_data.get('settings', {}):
                if bsid not in allowed_blocks[b_type]:
                    block_errors.append(f"{s_key} -> {b_key}: block setting '{bsid}' not in schema")
if not block_errors:
    results.append(("TEST 6: Block Types & Block Setting Alignment", "PASS", "100% of block types and block settings in index.json exist in schemas"))
else:
    results.append(("TEST 6: Block Types & Block Setting Alignment", "FAIL", "; ".join(block_errors)))

# TEST 7: Liquid Syntax & Tags Balance in Homepage Sections
liquid_errors = []
for s_key, s_data in sections.items():
    s_type = s_data.get('type')
    s_file = os.path.join(sections_dir, f'{s_type}.liquid')
    with open(s_file, 'r', encoding='utf-8') as f:
        code = f.read()
    # Check basic block balances
    for tag in ['if', 'for', 'case']:
        opens = len(re.findall(r'\{%\s*' + tag + r'\b', code))
        closes = len(re.findall(r'\{%\s*end' + tag + r'\b', code))
        if opens != closes:
            liquid_errors.append(f"{s_type}.liquid: {tag} count mismatch ({opens} opens vs {closes} closes)")
if not liquid_errors:
    results.append(("TEST 7: Liquid Tag Balance in Referenced Sections", "PASS", "All if/for/case tags in referenced sections are properly closed"))
else:
    results.append(("TEST 7: Liquid Tag Balance in Referenced Sections", "FAIL", "; ".join(liquid_errors)))

# TEST 8: Static Snippet & Asset References
missing_refs = []
for s_key, s_data in sections.items():
    s_type = s_data.get('type')
    s_file = os.path.join(sections_dir, f'{s_type}.liquid')
    with open(s_file, 'r', encoding='utf-8') as f:
        code = f.read()
    snippets = re.findall(r'\{%\s*(?:render|include)\s+[\'"]([^\'"]+)[\'"]', code)
    for snip in snippets:
        if not os.path.exists(os.path.join(snippets_dir, f'{snip}.liquid')):
            missing_refs.append(f"Snippet '{snip}' in {s_type}")
    assets = re.findall(r'[\'"]([a-zA-Z0-9_\-\.]+\.(?:webp|png|jpg|css|js))[\'"]\s*\|\s*asset_url', code)
    for ast in assets:
        if not os.path.exists(os.path.join(assets_dir, ast)):
            missing_refs.append(f"Asset '{ast}' in {s_type}")
if not missing_refs:
    results.append(("TEST 8: Snippet and Asset Resolution", "PASS", "All snippets and static asset URLs in homepage sections resolve"))
else:
    results.append(("TEST 8: Snippet and Asset Resolution", "FAIL", "; ".join(missing_refs)))

# TEST 9: Layout Binding (layout/theme.liquid)
layout_path = os.path.join(theme_dir, 'layout', 'theme.liquid')
with open(layout_path, 'r', encoding='utf-8') as f:
    layout_code = f.read()
has_header = 'content_for_header' in layout_code
has_layout = 'content_for_layout' in layout_code
if has_header and has_layout:
    results.append(("TEST 9: Layout Theme Objects Binding", "PASS", "layout/theme.liquid correctly renders content_for_header and content_for_layout"))
else:
    results.append(("TEST 9: Layout Theme Objects Binding", "FAIL", f"Missing header: {not has_header}, missing layout: {not has_layout}"))

# TEST 10: Zip Archive Root Structure
zip_path = os.path.join(theme_dir, 'Kartzo-1.0.0.zip')
import zipfile
with zipfile.ZipFile(zip_path, 'r') as zf:
    names = zf.namelist()
has_root_index = 'templates/index.json' in names
has_root_layout = 'layout/theme.liquid' in names
nested = any(n.startswith('shopify-theme/') for n in names)
if has_root_index and has_root_layout and not nested:
    results.append(("TEST 10: Zip Package Root Directory Hierarchy", "PASS", f"Kartzo-1.0.0.zip has templates/index.json directly at root (no nested subfolder)"))
else:
    results.append(("TEST 10: Zip Package Root Directory Hierarchy", "FAIL", f"Nested: {nested}, index: {has_root_index}, layout: {has_root_layout}"))

print("="*80)
print("10-STEP RIGOROUS TEST SUITE REPORT FOR KARTZO HOMEPAGE (index.json)")
print("="*80)
all_pass = True
for title, status, details in results:
    if status != "PASS": all_pass = False
    print(f"[{status}] {title}\n       -> {details}\n")
print("="*80)
print(f"FINAL RESULT: {'ALL 10 TESTS PASSED (100% OK)' if all_pass else 'FAILURES DETECTED'}")
print("="*80)
