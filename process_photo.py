import numpy as np
from PIL import Image, ImageEnhance, ImageOps
import os

src_path = '/home/reseprawonenak/.hermes/cache/documents/native-inputs/dd7c91e51b8d6ed60403f3f8be8ff0707126e6e299365da3dcaf6984534d3361/4e6324f5-906c-411e-b0b4-5655f0feb3e3.jpg'
assets_dir = '/home/reseprawonenak/workspace/web-portfolio-agung/assets'

im = Image.open(src_path)

# Crop A: Medium close-up (800x800)
crop_a = im.crop((100, 260, 850, 1010)) # 750x750 square
crop_a.save(os.path.join(assets_dir, 'profile-color.jpg'), quality=92)

# Crop B: Closer crop focused on face & glasses (550x550)
crop_b = im.crop((180, 320, 730, 870))
crop_b.save(os.path.join(assets_dir, 'profile-color-tight.jpg'), quality=92)

# 4-color Game Boy DMG-01 Palette matching our CSS tokens
# Palette shades from darkest to lightest:
PALETTE_DMG = [
    (31, 43, 20),    # #1F2B14 - lcd-ink (darkest)
    (77, 96, 53),    # #4D6035 - lcd-dim
    (122, 145, 80),  # #7A9150 - lcd-mid
    (174, 192, 131), # #AEC083 - lcd-screen (lightest)
]

def make_gameboy_dither(img_in, target_size=(160, 160), contrast=1.4, brightness=1.05):
    # Resize to pixel-art resolution
    small = img_in.resize(target_size, Image.Resampling.BILINEAR)
    gray = ImageOps.grayscale(small)
    gray = ImageEnhance.Contrast(gray).enhance(contrast)
    gray = ImageEnhance.Brightness(gray).enhance(brightness)
    
    # Custom palette quantization with Floyd-Steinberg dithering
    pal_img = Image.new('P', (1, 1))
    pal_bytes = []
    for rgb in PALETTE_DMG:
        pal_bytes.extend(rgb)
    # Fill up 256 colors
    pal_bytes.extend([0, 0, 0] * (256 - len(PALETTE_DMG)))
    pal_img.putpalette(pal_bytes)
    
    # Quantize with dithering
    quant = gray.convert('RGB').quantize(palette=pal_img, dither=Image.Dither.FLOYDSTEINBERG)
    
    # Upscale back to crisp 480x480 using NEAREST NEIGHBOR
    final = quant.resize((480, 480), Image.Resampling.NEAREST)
    return final

# Generate for crop A and crop B
retro_a = make_gameboy_dither(crop_a, target_size=(160, 160), contrast=1.35)
retro_a.save(os.path.join(assets_dir, 'profile-retro-a.png'))

retro_b = make_gameboy_dither(crop_b, target_size=(160, 160), contrast=1.3)
retro_b.save(os.path.join(assets_dir, 'profile-retro-b.png'))

print("Generated retro profiles in assets!")
