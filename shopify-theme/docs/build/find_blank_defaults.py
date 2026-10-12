import glob, json, os, re

sections_dir = r'c:\Users\ujjaw\Documents\Github\kartzo\shopify-theme\sections'
blank_defaults = []

for f in glob.glob(os.path.join(sections_dir, '*.liquid')):
    with open(f, 'r', encoding='utf-8') as sf:
        content = sf.read()
    schema_match = re.search(r'\{%\s*schema\s*%\}(.*?)\{%\s*endschema\s*%\}', content, re.DOTALL)
    if not schema_match:
        continue
    schema_str = schema_match.group(1)
    try:
        schema = json.loads(schema_str)
    except Exception as e:
        print(f"Error parsing schema in {f}: {e}")
        continue
    
    # Check section settings
    for s in schema.get('settings', []):
        if s.get('default') == "":
            blank_defaults.append((os.path.basename(f), 'section', s.get('id')))
            
    # Check block settings
    for b in schema.get('blocks', []):
        for bs in b.get('settings', []):
            if bs.get('default') == "":
                blank_defaults.append((os.path.basename(f), f"block:{b.get('type')}", bs.get('id')))

print(f"Total blank defaults found: {len(blank_defaults)}")
for item in blank_defaults:
    print(f"  File: {item[0]} | Context: {item[1]} | Setting ID: {item[2]}")
