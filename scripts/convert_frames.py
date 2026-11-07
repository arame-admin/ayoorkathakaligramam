import os
import re
import time
from concurrent.futures import ProcessPoolExecutor
from PIL import Image

def natural_sort_key(s):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r'(\d+)', s)]

def process_one_frame(args):
    src_path, dest_desktop, dest_mobile = args
    with Image.open(src_path) as im:
        orig_w, orig_h = im.size
        # desktop: 1600px wide
        h_desktop = int(round(1600 * orig_h / orig_w))
        im_desktop = im.resize((1600, h_desktop), Image.Resampling.LANCZOS)
        im_desktop.save(dest_desktop, 'WEBP', quality=78, method=4)
        
        # mobile: 960px wide
        h_mobile = int(round(960 * orig_h / orig_w))
        im_mobile = im.resize((960, h_mobile), Image.Resampling.LANCZOS)
        im_mobile.save(dest_mobile, 'WEBP', quality=72, method=4)
    return True

def convert_sequence(src_folders, out_desktop_dir, out_mobile_dir):
    os.makedirs(out_desktop_dir, exist_ok=True)
    os.makedirs(out_mobile_dir, exist_ok=True)
    
    all_files = []
    for sdir in src_folders:
        files = sorted([os.path.join(sdir, f) for f in os.listdir(sdir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))], key=natural_sort_key)
        all_files.extend(files)
        
    tasks = []
    for idx, src_file in enumerate(all_files, start=1):
        num_str = f'{idx:04d}'
        d_out = os.path.join(out_desktop_dir, f'frame_{num_str}.webp')
        m_out = os.path.join(out_mobile_dir, f'frame_{num_str}.webp')
        tasks.append((src_file, d_out, m_out))
        
    t0 = time.time()
    with ProcessPoolExecutor() as executor:
        list(executor.map(process_one_frame, tasks))
    t1 = time.time()
    
    # Calculate stats
    d_count = len([f for f in os.listdir(out_desktop_dir) if f.endswith('.webp')])
    m_count = len([f for f in os.listdir(out_mobile_dir) if f.endswith('.webp')])
    d_size = sum(os.path.getsize(os.path.join(out_desktop_dir, f)) for f in os.listdir(out_desktop_dir) if f.endswith('.webp'))
    m_size = sum(os.path.getsize(os.path.join(out_mobile_dir, f)) for f in os.listdir(out_mobile_dir) if f.endswith('.webp'))
    
    print(f'Processed {len(all_files)} frames into {out_desktop_dir} & {out_mobile_dir} in {t1-t0:.2f}s')
    print(f'  Desktop: {d_count} files, {d_size / (1024*1024):.2f} MB ({d_size} bytes)')
    print(f'  Mobile:  {m_count} files, {m_size / (1024*1024):.2f} MB ({m_size} bytes)')

def convert_static_images():
    out_dir = 'assets/images'
    os.makedirs(out_dir, exist_ok=True)
    
    image_mappings = [
        ('car image.png', 'ayroor-pamba-mela.webp', 1920),
        ('k1.png', 'kathakali-hero-still.webp', 1920),
        ('k2.png', 'kathakali-about.webp', 1920),
        ('k3.png', 'kathakali-heritage.webp', 1920),
        ('k4.png', 'kathakali-culture.webp', 1920),
        ('e1.png', 'kathakali-dismantle-still.webp', 1920),
        ('e2.png', 'kathakali-full-vesham.webp', 1920),
    ]
    
    print('\n--- Converting Static Photography ---')
    for src, dest_name, target_width in image_mappings:
        if os.path.exists(src):
            with Image.open(src) as im:
                orig_w, orig_h = im.size
                h = int(round(target_width * orig_h / orig_w))
                im_opt = im.resize((target_width, h), Image.Resampling.LANCZOS)
                dest_path = os.path.join(out_dir, dest_name)
                im_opt.save(dest_path, 'WEBP', quality=85, method=4)
                print(f'  {src} -> {dest_path} ({target_width}x{h}, {os.path.getsize(dest_path)/(1024*1024):.2f} MB)')

if __name__ == '__main__':
    print('--- Converting Hero Frames (clip1, clip2, clip3) ---')
    convert_sequence(['clip1frame', 'clip2frame', 'clip3frame'], 'assets/frames/hero', 'assets/frames/hero-mobile')

    print('\n--- Converting Dismantle Frames (flowclipframe) ---')
    convert_sequence(['flowclipframe'], 'assets/frames/dismantle', 'assets/frames/dismantle-mobile')

    convert_static_images()

