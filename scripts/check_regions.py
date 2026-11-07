import os
from PIL import Image

large_images = [
    'pZzfSCCjbvjQbqy-gX4KkoHvnRn21bvH8Et9WcP08ZECY_dI7VgA7t3dszitbVuQaHRK8H_eAq7XvPWYddrPr8u3a0dmWhA-EEovHySAmW2OqE-H45TXJm0MtMuYFuRgbxOdu9iHOU0k9Im9ZlfU137jB14fJqldO5b2L8S9jfb6LhKaxxVy7CrcMuko7o9y.jpg',
    'u8-UPLQG4OdC37QRFGQgWzZsb7wByMGGGaYWSVU682ROCT49PVus6ATN907U5eh2PTNGymTB8GPY6fJde_AumVI0T4vDOeebwNFYFyI01SZT8yWGEYEgAgCyoVm1vZEgKU-sCtPYKr1jS2QJBbZ6xhHswPploMUdVYjOmgq-5M1g1tO1Qhby9p8dMNq-TNQx.jpg',
    '4D8pLmEp5hn8UD6Flnlp47A20pwAlStf-Cb78SKvWNGg7zxh_KOoBjUHXiXhQbqcVxolM7ptrJHn-kY7CBjuIGee1_0UeLZ-A_rrTU4sej-oe0C218P_0lqtFE9Glz7_9Yiik7SB7AC81zctF-ibDebPcdgraqlZRfXTNppsVTAlpqekM-f4Ij3Qe5bjDCHq.jpg',
    '8bqmdXOPpvhm9zBjFZac2HbUEF6WAAFW9gHu1iy_LG8VgxBEuksFP6pDamwHwx2qXjMIMDAhnSAX6nvI4RVicLDZfmFiGBcpJGr8CcfKEYy18_kVuluvz1Lum6ivm5nZaT6m7LKtP1yp7UskuMiECYbSYlQbTeoEuMWgu-avs24F8EeWDezAOwVaIveV0GHk.jpg',
    'E397lIdWkLfuX02dLvKucHeeqhlReAmKfc5SuaLkvAk6tYO6riZhZM1xbkoLDTtoaOVn4PWxM58qwj4MuHPgHSvYF3ghTKD0QJFLDbQ3LqGehwDh9z_fyMpCfrUuinY-nTdfDPERgY6TkO_kzbP4c-Wg_W7fhjbxEyXys9y_tU9vxxF4pLmk47GQTE6qojUT.jpg',
    'YFGAxZ3r8Too-hMzXPWHDxhMEn52qD2vRYN6mUUpCgzZjhh0hXCiW7Wr6I8qOZjxL1xbHH7D0KDmrX5IB-G7pkOizwhRNhNFsrIO8vgGgWdErTwWrvFTkkV2A3bM9iwmemaNsJLXXg3v83pQoD5loa1iKzhBkbQOeojppDjprzLNGM2O2W1KgDO3dyBVslfa.jpg',
    '17PWnPdtfrCyFed2jMI68XclG7H2xOCAmZNlqTEcQ0tiYI65MxS66TJwvMXY-XJXXu7qactOrlXAWRYZeklC52H8MoUvYxoptNH0ZS9sAQSaBjuIaXIoD-EJbeJ2MfS7SQ2a_4_VPTT07MITpTUYVWYCymmF2nzXq4ksTA9t76E.jpg',
    '2Yi8di-srgHCYDCw8pUqJajlRj9GQdFn9tusdQ6LrCkCR-RPRazo0DxVEwxMzP8AZ5G2Tsw_m0J-n_qNP2trX4jDpgL-INs8ZBc52ZCP1bwnqk1vkeeg-c0pBwonirRI449vFE6ObmxLiQnNmmmc2i6TTOxelmxvI8wklyr-Aj843Iemq-8Vve5Q2gDBpHzW.jpg',
    'unnamed.webp',
    'unnamed (1).webp',
    'unnamed (2).webp',
    'unnamed (5).jpg',
    'unnamed (6).jpg',
    'logo_header.jpg'
]

for name in large_images:
    if os.path.exists(name):
        im = Image.open(name)
        # sample 5 regions: top, bottom, left, right, center
        w, h = im.size
        center = im.crop((w//3, h//3, 2*w//3, 2*h//3)).resize((10,10)).convert('RGB')
        c_pixels = list(center.getdata())
        avg_cr = sum(p[0] for p in c_pixels)//len(c_pixels)
        avg_cg = sum(p[1] for p in c_pixels)//len(c_pixels)
        avg_cb = sum(p[2] for p in c_pixels)//len(c_pixels)
        print(f"{name[:30]:30} | {w}x{h} | center RGB=({avg_cr:3},{avg_cg:3},{avg_cb:3})")
