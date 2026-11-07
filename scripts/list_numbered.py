import os

# Let's inspect images (7) through (20)
for i in [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]:
    fn = f"images ({i}).jpg"
    if os.path.exists(fn):
        print(f"Exists: {fn}")
