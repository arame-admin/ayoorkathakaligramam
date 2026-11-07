import os
import shutil

src_dir = "."
dest_dir = "assets/images"
os.makedirs(dest_dir, exist_ok=True)

# Mapping of original files to clean semantic names based on our inspection
mapping = {
    # Logo
    "logo_header.jpg": "logo.jpg",
    
    # Ultra-high-res hero and core images
    "8bqmdXOPpvhm9zBjFZac2HbUEF6WAAFW9gHu1iy_LG8VgxBEuksFP6pDamwHwx2qXjMIMDAhnSAX6nvI4RVicLDZfmFiGBcpJGr8CcfKEYy18_kVuluvz1Lum6ivm5nZaT6m7LKtP1yp7UskuMiECYbSYlQbTeoEuMWgu-avs24F8EeWDezAOwVaIveV0GHk.jpg": "hero_paccha_dark.jpg",
    "u8-UPLQG4OdC37QRFGQgWzZsb7wByMGGGaYWSVU682ROCT49PVus6ATN907U5eh2PTNGymTB8GPY6fJde_AumVI0T4vDOeebwNFYFyI01SZT8yWGEYEgAgCyoVm1vZEgKU-sCtPYKr1jS2QJBbZ6xhHswPploMUdVYjOmgq-5M1g1tO1Qhby9p8dMNq-TNQx.jpg": "stage_leap_lamp.jpg",
    "pZzfSCCjbvjQbqy-gX4KkoHvnRn21bvH8Et9WcP08ZECY_dI7VgA7t3dszitbVuQaHRK8H_eAq7XvPWYddrPr8u3a0dmWhA-EEovHySAmW2OqE-H45TXJm0MtMuYFuRgbxOdu9iHOU0k9Im9ZlfU137jB14fJqldO5b2L8S9jfb6LhKaxxVy7CrcMuko7o9y.jpg": "performer_red_silk.jpg",
    "4D8pLmEp5hn8UD6Flnlp47A20pwAlStf-Cb78SKvWNGg7zxh_KOoBjUHXiXhQbqcVxolM7ptrJHn-kY7CBjuIGee1_0UeLZ-A_rrTU4sej-oe0C218P_0lqtFE9Glz7_9Yiik7SB7AC81zctF-ibDebPcdgraqlZRfXTNppsVTAlpqekM-f4Ij3Qe5bjDCHq.jpg": "kathi_close_crown.jpg",
    "E397lIdWkLfuX02dLvKucHeeqhlReAmKfc5SuaLkvAk6tYO6riZhZM1xbkoLDTtoaOVn4PWxM58qwj4MuHPgHSvYF3ghTKD0QJFLDbQ3LqGehwDh9z_fyMpCfrUuinY-nTdfDPERgY6TkO_kzbP4c-Wg_W7fhjbxEyXys9y_tU9vxxF4pLmk47GQTE6qojUT.jpg": "festival_night_paccha.jpg",
    "YFGAxZ3r8Too-hMzXPWHDxhMEn52qD2vRYN6mUUpCgzZjhh0hXCiW7Wr6I8qOZjxL1xbHH7D0KDmrX5IB-G7pkOizwhRNhNFsrIO8vgGgWdErTwWrvFTkkV2A3bM9iwmemaNsJLXXg3v83pQoD5loa1iKzhBkbQOeojppDjprzLNGM2O2W1KgDO3dyBVslfa.jpg": "chutti_greenroom.jpg",
    "17PWnPdtfrCyFed2jMI68XclG7H2xOCAmZNlqTEcQ0tiYI65MxS66TJwvMXY-XJXXu7qactOrlXAWRYZeklC52H8MoUvYxoptNH0ZS9sAQSaBjuIaXIoD-EJbeJ2MfS7SQ2a_4_VPTT07MITpTUYVWYCymmF2nzXq4ksTA9t76E.jpg": "tradition_heritage.jpg",
    "2Yi8di-srgHCYDCw8pUqJajlRj9GQdFn9tusdQ6LrCkCR-RPRazo0DxVEwxMzP8AZ5G2Tsw_m0J-n_qNP2trX4jDpgL-INs8ZBc52ZCP1bwnqk1vkeeg-c0pBwonirRI449vFE6ObmxLiQnNmmmc2i6TTOxelmxvI8wklyr-Aj843Iemq-8Vve5Q2gDBpHzW.jpg": "performer_expression.jpg",
    "Stko8fFgLgPHZ8T3POIqaxf0YnXfL5cXUEMjEKxJp9-AJOVb8WfkXOft0p_NVOP12ZwCLO8DGF07yeZz-rM5_Sqa6PF40yyCHRlj3PQoDD404Tvsi0JNGrv4N9Jt8GxG16tQZDzH-Y80jJbZ7cj2WpvJLDxz05LX8KSzvRFKh3z3nwoW7i5e7yWMHhcbsH4e.jpg": "mela_audience.jpg",
    
    # Official event & ceremony webp
    "unnamed.webp": "mela_inauguration_lamp.webp",
    "unnamed (1).webp": "press_conference.webp",
    "unnamed (2).webp": "mela_presidential_speech.webp",
    "unnamed.jpg": "speaker_portrait.jpg",
    "unnamed (5).jpg": "awards_record_1.jpg",
    "unnamed (6).jpg": "awards_record_2.jpg",
    
    # Procession, Koothambalam & Character roles
    "images (1).jpg": "shobhayathra_procession.jpg",
    "images (2).jpg": "koothambalam_stage.jpg",
    "images (4).jpg": "mudra_anjali_prayer.jpg",
    "images (6).jpg": "paccha_minukku_scene.jpg",
    "images (7).jpg": "troupe_night_performance.jpg",
    "images (13).jpg": "chuvanna_thadi_beards.jpg",
    "images (14).jpg": "mela_street_celebration.jpg",
    "images (15).jpg": "kireedam_crowning.jpg",
    "images (20).jpg": "kathakali_troupe_ensemble.jpg",
}

for src_name, dest_name in mapping.items():
    if os.path.exists(src_name):
        dest_path = os.path.join(dest_dir, dest_name)
        shutil.copy2(src_name, dest_path)
        print(f"Copied {src_name[:25]}... -> {dest_name}")

# Also copy all remaining images as gallery items
for f in os.listdir("."):
    if f.startswith("images (") and f.endswith(".jpg"):
        num = f.split("(")[1].split(")")[0]
        dest = f"assets/images/gallery_{num}.jpg"
        if not os.path.exists(dest):
            shutil.copy2(f, dest)

print("All assets successfully organized in assets/images/")
