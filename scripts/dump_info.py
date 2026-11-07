import os
from PIL import Image

# Let's inspect some images by generating a quick text report of aspect ratio and characteristics
files = [f for f in os.listdir('.') if f.endswith(('.jpg', '.webp'))]
for f in sorted(files):
    im = Image.open(f)
    print(f"{f}: {im.size}, mode={im.mode}")
