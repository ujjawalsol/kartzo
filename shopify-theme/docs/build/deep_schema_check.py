import json, os, re, glob

theme_dir = 'shopify-theme'
templates_dir = os.path.join(theme_dir, 'templates')
sections_dir = os.path.join(theme_dir, 'sections')

all_json_files = glob.glob(os.path.join(templates_dir, '**', '*.json'), recursive=True) + \
                 glob.glob(os.path.join(sections_dir, '*-group.json'))

total_errors = 0

for t_file in all_json_files:
    rel_path = os.path.relpath(t_file, theme_dir)
    print(f'=== Checking Template: {rel_path} ===')
    try:
        with open(t_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f'  [JSON SYNTAX ERROR] in {rel_path}: {e}')
        total_errors += 1
        continue
    
    sections = data.get('sections', {})
    order = data.get('order', [])
    
    # Check order completeness
    for s_id in order:
        if s_id not in sections:
            print(f'  [ORDER ERROR] in {rel_path}: ID "{s_id}" in order array does not exist in sections')
            total_errors += 1
    
    for s_key, s_data in sections.items():
        sec_type = s_data.get('type')
        sec_file = os.path.join(sections_dir, f'{sec_type}.liquid')
        if not os.path.exists(sec_file):
            print(f'  [MISSING SECTION FILE] in {rel_path}: {sec_type}.liquid not found')
            total_errors += 1
            continue
        
        with open(sec_file, 'r', encoding='utf-8') as sf:
            content = sf.read()
        schema_match = re.search(r'\{%\s*schema\s*%\}(.*?)\{%\s*endschema\s*%\}', content, re.DOTALL)
        if not schema_match:
            print(f'  [MISSING SCHEMA] in {sec_type}.liquid')
            total_errors += 1
            continue
        try:
            schema = json.loads(schema_match.group(1))
        except Exception as e:
            print(f'  [SCHEMA JSON ERROR] in {sec_type}.liquid: {e}')
            total_errors += 1
            continue
        
        schema_settings = {s.get('id'): s for s in schema.get('settings', [])}
        for s_id, s_val in s_data.get('settings', {}).items():
            if s_id not in schema_settings:
                print(f'  [SECTION SETTING ERROR] in {rel_path} -> section "{s_key}" ({sec_type}): setting "{s_id}" not in schema')
                total_errors += 1
        
        schema_blocks = {b.get('type'): {s.get('id'): s for s in b.get('settings', [])} for b in schema.get('blocks', [])}
        for b_key, b_data in s_data.get('blocks', {}).items():
            b_type = b_data.get('type')
            if b_type not in schema_blocks:
                print(f'  [BLOCK TYPE ERROR] in {rel_path} -> section "{s_key}" ({sec_type}): block "{b_key}" type "{b_type}" not in schema')
                total_errors += 1
            else:
                allowed_b_settings = schema_blocks[b_type]
                for bs_id, bs_val in b_data.get('settings', {}).items():
                    if bs_id not in allowed_b_settings:
                        print(f'  [BLOCK SETTING ERROR] in {rel_path} -> section "{s_key}" ({sec_type}) -> block "{b_key}": setting "{bs_id}" not in schema')
                        total_errors += 1

print(f'\nTotal Errors Across All Templates: {total_errors}')
