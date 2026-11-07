import os
from PIL import Image

images = [f for f in os.listdir('.') if f.lower().endswith(('.jpg', '.jpeg', '.webp'))]
html = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body { background: #080909; color: #F5F0E6; font-family: sans-serif; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.card { background: #121514; border: 1px solid #C6A15B44; border-radius: 8px; overflow: hidden; }
img { width: 100%; height: 200px; object-fit: cover; display: block; }
.info { padding: 10px; font-size: 12px; }
.name { font-weight: bold; color: #C6A15B; word-break: break-all; }
</style>
</head>
<body>
<h1>Ayroor Kathakali Gramam - Asset Inventory</h1>
<div class="grid">
"""

for f in sorted(images):
    try:
        with Image.open(f) as im:
            w, h = im.size
            fmt = im.format
            sz = os.path.getsize(f) // 1024
            html += f"""
<div class="card">
  <img src="{f}" alt="{f}">
  <div class="info">
    <div class="name">{f}</div>
    <div>Dimensions: {w}x{h} ({fmt}) | Size: {sz} KB</div>
  </div>
</div>"""
    except Exception as e:
        print(f"Error {f}: {e}")

html += """
</div>
</body>
</html>
"""

with open("asset_catalog.html", "w", encoding="utf-8") as out:
    out.write(html)

print(f"Wrote asset_catalog.html with {len(images)} images.")
