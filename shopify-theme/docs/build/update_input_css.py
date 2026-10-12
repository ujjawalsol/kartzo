import os

css_block = """
/* ==========================================================================
   Kartzo Unified Product Card Design System
   Guarantees 100% pixel-perfect alignment, zero image overflow, and consistent
   button alignment across all grid columns (Real Shopify products & demo).
   ========================================================================== */
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-radius: 1rem;
  border: 1px solid #e6eefb;
  background-color: #ffffff;
  padding: 0.75rem;
  box-shadow: 0 2px 10px rgba(15, 50, 120, 0.04);
  transition: all 0.2s ease;
}
.product-card:hover {
  border-color: #b9d0ff;
  box-shadow: 0 8px 24px rgba(16, 42, 110, 0.08);
}
.product-card .image-wrap {
  position: relative;
  display: flex;
  width: 100%;
  height: 140px;
  align-items: center;
  justify-content: center;
  overflow: hidden !important;
  border-radius: 0.75rem;
  background-color: #f8fbff;
  padding: 0.5rem;
}
.product-card .image-wrap img {
  max-width: 100% !important;
  max-height: 100% !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  transition: transform 0.25s ease;
}
.product-card:hover .image-wrap img {
  transform: scale(1.05);
}
.product-card .wish {
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  z-index: 20;
  display: flex;
  height: 2.25rem;
  width: 2.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #ffffff;
  color: #1a56f0;
  box-shadow: 0 2px 8px rgba(15, 50, 120, 0.12);
  transition: all 0.2s ease;
}
.product-card .wish:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(15, 50, 120, 0.2);
}
.product-card .wish[aria-pressed="true"] {
  background-color: #1a56f0;
  color: #ffffff;
}
.product-card .product-title {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.35;
  color: #0e1730;
  height: 2.6rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.product-card .product-meta {
  font-size: 11px;
  color: #7d8aa3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 16px;
  line-height: 16px;
  margin-top: 2px;
}
.product-card .product-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #8b97ad;
  height: 18px;
  margin-top: 4px;
}
.product-card .product-price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  height: 22px;
  margin-top: 4px;
}
.product-card .product-action {
  margin-top: 0.625rem;
  width: 100%;
}
.product-card .add-cart,
.product-card .sold-out-btn {
  display: flex;
  width: 100%;
  min-height: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-size: 12px;
  font-weight: 700;
  border: 0;
  text-decoration: none;
  transition: all 0.15s ease;
}
.product-card .add-cart {
  background-color: #1a56f0;
  color: #ffffff;
  cursor: pointer;
}
.product-card .add-cart:hover {
  background-color: #123fbe;
}
.product-card .sold-out-btn {
  background-color: #f1f5f9;
  color: #64748b;
  cursor: not-allowed;
}
"""

input_css_path = os.path.join(os.path.dirname(__file__), 'input.css')
with open(input_css_path, 'r', encoding='utf-8') as f:
    orig = f.read()

if 'Kartzo Unified Product Card Design System' not in orig:
    with open(input_css_path, 'a', encoding='utf-8') as f:
        f.write(css_block)
    print("Appended successfully.")
else:
    print("Already present.")
