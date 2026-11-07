import os
from PIL import Image

def summarize(img_path):
    try:
        im = Image.open(img_path).convert("RGB")
        w, h = im.size
        # sample down to 30x30
        small = im.resize((30, 30))
        pixels = list(small.getdata())
        avg_r = sum(p[0] for p in pixels) // len(pixels)
        avg_g = sum(p[1] for p in pixels) // len(pixels)
        avg_b = sum(p[2] for p in pixels) // len(pixels)
        brightness = (avg_r + avg_g + avg_b) // 3
        return f"{img_path:35} | {w:4}x{h:<4} | rgb=({avg_r:3},{avg_g:3},{avg_b:3}) br={brightness:3}"
    except Exception as e:
        return f"{img_path}: {e}"

files = [f for f in os.listdir('.') if f.endswith(('.jpg', '.webp'))]
for f in sorted(files):
    print(summarize(f))
