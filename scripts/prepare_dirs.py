import os
import shutil

# Let's inspect images 1..20 and unnamed 1..4
# Let's write an html page with local links or inspect with python
print("Organizing assets...")
os.makedirs("assets/images", exist_ok=True)
os.makedirs("assets/models", exist_ok=True)
