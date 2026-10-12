import zipfile, os

base_dir = r'c:\Users\ujjaw\Documents\Github\kartzo\shopify-theme'
dest_zip_root = r'c:\Users\ujjaw\Documents\Github\kartzo\Kartzo-1.0.0.zip'
dest_zip_theme = r'c:\Users\ujjaw\Documents\Github\kartzo\shopify-theme\Kartzo-1.0.0.zip'

allowed_dirs = {'assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'}

for dest_zip in [dest_zip_root, dest_zip_theme]:
    print(f'Creating zip at: {dest_zip}')
    with zipfile.ZipFile(dest_zip, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(base_dir):
            rel_dir = os.path.relpath(root, base_dir)
            first_dir = rel_dir.split(os.sep)[0] if rel_dir != '.' else ''
            
            # Only include official Shopify theme directories
            if rel_dir != '.' and first_dir not in allowed_dirs:
                continue
                
            for file in files:
                if file.endswith('.zip') or file.startswith('.'):
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, base_dir).replace('\\', '/')
                
                # Verify arcname starts with an allowed directory
                top_folder = arcname.split('/')[0]
                if top_folder in allowed_dirs:
                    zf.write(file_path, arcname)

print('Zip creation complete.')
