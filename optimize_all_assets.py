import os
from PIL import Image

ASSETS_DIR = "assets"

def optimize_image(filename, target_dims, quality=82):
    filepath = os.path.join(ASSETS_DIR, filename)
    if not os.path.exists(filepath):
        print(f"Skipping {filename}: not found")
        return 0, 0
    
    orig_size = os.path.getsize(filepath)
    im = Image.open(filepath)
    orig_w, orig_h = im.width, im.height
    
    # Calculate proportional dimensions
    if isinstance(target_dims, tuple):
        target_w, target_h = target_dims
        if target_w and target_h:
            im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
        elif target_w:
            ratio = target_w / orig_w
            target_h = int(orig_h * ratio)
            im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    im.save(filepath, "WEBP", quality=quality, method=6)
    new_size = os.path.getsize(filepath)
    saved = orig_size - new_size
    print(f"Optimized {filename:22} | {orig_w}x{orig_h} -> {im.width}x{im.height} | {orig_size/1024:.1f} KB -> {new_size/1024:.1f} KB (Saved: {saved/1024:.1f} KB)")
    return orig_size, new_size

def run():
    total_orig = 0
    total_new = 0
    
    # 1. Logo
    o, n = optimize_image("logo.webp", (300, 169), quality=85)
    total_orig += o; total_new += n
    
    # 2. Avatars
    for av in ["avatar-rahul.webp", "avatar-priya.webp", "avatar-amit.webp"]:
        o, n = optimize_image(av, (80, 80), quality=82)
        total_orig += o; total_new += n
        
    # 3. Category Icons (displayed at 99x99 desktop, 60x60 mobile)
    cats = [
        "c-fashion.webp", "c-home.webp", "c-toys.webp", "c-health.webp", 
        "p-phone.webp", "p-backpack.webp", "p-headphones.webp", "p-perfume.webp", 
        "p-shoes.webp", "p-watch.webp", "p-blender.webp", "p-chair.webp", 
        "p-earbuds.webp", "p-fryer.webp", "p-luggage.webp", "p-sunglasses.webp"
    ]
    for c in cats:
        o, n = optimize_image(c, (180, 180), quality=82)
        total_orig += o; total_new += n
        
    # 4. Hero and Large Banners
    heroes = [("hero-1.webp", (1500, 534)), ("hero-2.webp", (1500, 534)), ("hero-3.webp", (1500, 534))]
    for h, dims in heroes:
        o, n = optimize_image(h, dims, quality=80)
        total_orig += o; total_new += n
        
    banners = [
        ("electronics.webp", (1200, 352)),
        ("home.webp", (1100, 381)),
        ("deals.webp", (1300, 265)),
        ("blog-gadgets.webp", (1200, 378)),
        ("blog-home.webp", (1200, 393)),
        ("blog-shopping.webp", (1200, 384)),
        ("app.webp", (900, 600)),
        ("hero.webp", (1200, 800))
    ]
    for b, dims in banners:
        o, n = optimize_image(b, dims, quality=80)
        total_orig += o; total_new += n
        
    print("=" * 60)
    print(f"GRAND TOTAL SAVINGS: {total_orig/1024:.1f} KB -> {total_new/1024:.1f} KB")
    print(f"NET REDUCTION: {(total_orig - total_new)/1024:.1f} KB ({((total_orig - total_new)/total_orig)*100:.1f}% reduction)")
    print("=" * 60)

if __name__ == "__main__":
    run()
