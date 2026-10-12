import http.server, socketserver, os, sys, mimetypes, re

PORT = 3000
BASE_DIR = r'c:\Users\ujjaw\Documents\Github\kartzo'
THEME_DIR = os.path.join(BASE_DIR, 'shopify-theme')
ASSETS_DIR = os.path.join(THEME_DIR, 'assets')

class ThemePreviewHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Map /assets/... directly to shopify-theme/assets/
        if path.startswith('/assets/'):
            rel_asset = path[len('/assets/'):].split('?')[0]
            full_path = os.path.join(ASSETS_DIR, rel_asset)
            if os.path.exists(full_path):
                return full_path
            # fallback to root assets
            root_asset = os.path.join(BASE_DIR, 'assets', rel_asset)
            if os.path.exists(root_asset):
                return root_asset
            return full_path
            
        # Map root / to preview.html if exists, else index.html
        if path == '/' or path.startswith('/?'):
            preview_file = os.path.join(THEME_DIR, 'preview.html')
            if os.path.exists(preview_file):
                return preview_file
            return os.path.join(BASE_DIR, 'index.html')
            
        if path == '/original':
            return os.path.join(BASE_DIR, 'index.html')
            
        # Standard resolution in BASE_DIR
        clean_path = path.split('?')[0].lstrip('/')
        target = os.path.join(BASE_DIR, clean_path)
        if os.path.exists(target):
            return target
            
        return super().translate_path(path)

    def end_headers(self):
        # Enable CORS and disable caching for instant live edits
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(BASE_DIR)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ThemePreviewHandler) as httpd:
        print(f"KARTZO LOCAL PREVIEW SERVER RUNNING AT: http://localhost:{PORT}")
        print(f"  -> Homepage (Shopify Theme Render): http://localhost:{PORT}/")
        print(f"  -> Original Reference Site:        http://localhost:{PORT}/original")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Server stopped.")

if __name__ == '__main__':
    run_server()
