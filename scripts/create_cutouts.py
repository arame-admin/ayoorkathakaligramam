import os
from PIL import Image
from rembg import remove

def process_image(input_path, output_path):
    print(f"Processing {input_path} -> {output_path}...")
    with open(input_path, 'rb') as i:
        input_data = i.read()
        output_data = remove(input_data)
        with open(output_path, 'wb') as o:
            o.write(output_data)
    print(f"Successfully generated {output_path}")

# 1. Process generated master
gen_path = r"C:\Users\tkasw\.gemini\antigravity\brain\08403f79-3e06-4c26-a9f5-ca11de8e5781\kathakali_paccha_master_v2_1793957039508.jpg"
out_path_1 = "assets/images/kathakali_cutout.png"

if os.path.exists(gen_path):
    process_image(gen_path, out_path_1)

# 2. Also process stage_leap_lamp
leap_path = "assets/images/stage_leap_lamp.jpg"
out_path_2 = "assets/images/stage_leap_cutout.png"
if os.path.exists(leap_path):
    process_image(leap_path, out_path_2)

print("Cutout processing complete!")
