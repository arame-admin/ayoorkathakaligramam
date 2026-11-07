from PIL import Image, ImageOps, ImageFilter
import numpy as np

img_path = r"C:\Users\tkasw\.gemini\antigravity\brain\08403f79-3e06-4c26-a9f5-ca11de8e5781\kathakali_paccha_master_v2_1793957039508.jpg"
im_rgb = Image.open(img_path).convert("RGB")

# Compute grayscale / max brightness mask
gray = ImageOps.grayscale(im_rgb)
gray_arr = np.array(gray)

# Threshold: background is pitch black (< 20)
alpha_arr = np.zeros_like(gray_arr, dtype=np.uint8)
solid = gray_arr >= 28
feather = (gray_arr >= 8) & (gray_arr < 28)

alpha_arr[solid] = 255
alpha_arr[feather] = ((gray_arr[feather] - 8) / 20.0 * 255).astype(np.uint8)

# Feet/floor fade
h, w = gray_arr.shape
floor_start = int(h * 0.94)
for y in range(floor_start, h):
    ratio = 1.0 - ((y - floor_start) / (h - floor_start))
    alpha_arr[y, :] = (alpha_arr[y, :].astype(np.float32) * ratio).astype(np.uint8)

alpha_im = Image.fromarray(alpha_arr, mode='L')
# Smooth edges slightly
alpha_im = alpha_im.filter(ImageFilter.GaussianBlur(radius=1.2))

im_rgba = im_rgb.copy()
im_rgba.putalpha(alpha_im)
im_rgba.save("assets/images/kathakali_cutout.png", "PNG")
print("Clean cutout with exact colors saved to assets/images/kathakali_cutout.png")
