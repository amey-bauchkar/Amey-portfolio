"""
Batch Watermark Removal Script for Amey Bauchkar Portfolio
Restores 960 animation frames across 4 sequences, recompiles videos,
repackages zip files, and synchronizes PreloadContainer.jsx.
"""

import os
import sys
import time
import zipfile
import subprocess
import cv2
import numpy as np

from remove_ai_watermarks.gemini_engine import GeminiEngine
from remove_ai_watermarks.region_eraser import erase_migan

PUBLIC_DIR = "public"
SEQUENCES = [
    "frames",
    "projects-frames",
    "workshop-frames",
    "contact-frames"
]

def process_sequence(seq_name, engine, mask):
    seq_dir = os.path.join(PUBLIC_DIR, seq_name)
    if not os.path.exists(seq_dir):
        print(f"[!] Directory not found: {seq_dir}")
        return

    frames = sorted([f for f in os.listdir(seq_dir) if f.startswith("frame_") and f.endswith(".jpg")])
    total = len(frames)
    print(f"\n==========================================")
    print(f"[*] Processing sequence: {seq_name} ({total} frames)")
    print(f"==========================================")
    
    t0 = time.time()
    for idx, fname in enumerate(frames, start=1):
        fpath = os.path.join(seq_dir, fname)
        img = cv2.imread(fpath)
        if img is None:
            print(f"  [!] Failed to read {fpath}")
            continue

        cleaned = erase_migan(img, mask)
        cv2.imwrite(fpath, cleaned, [cv2.IMWRITE_JPEG_QUALITY, 95])

        if idx % 24 == 0 or idx == total:
            elapsed = time.time() - t0
            pct = (idx / total) * 100
            fps = idx / elapsed if elapsed > 0 else 0
            eta = (total - idx) / fps if fps > 0 else 0
            print(f"  [{idx:3d}/{total}] ({pct:5.1f}%) | {fps:.2f} fps | Elapsed: {elapsed:.1f}s | ETA: {eta:.1f}s")

    print(f"[+] Completed {seq_name} in {time.time() - t0:.1f}s")


def repack_zip(seq_name):
    seq_dir = os.path.join(PUBLIC_DIR, seq_name)
    zip_path = os.path.join(PUBLIC_DIR, f"{seq_name}.zip")
    print(f"[*] Creating ZIP: {zip_path}")
    
    frames = sorted([f for f in os.listdir(seq_dir) if f.startswith("frame_") and f.endswith(".jpg")])
    with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        for fname in frames:
            fpath = os.path.join(seq_dir, fname)
            z.write(fpath, arcname=fname)
            
    size = os.path.getsize(zip_path)
    print(f"[+] {zip_path} created successfully ({size:,} bytes)")
    return size


def recompile_hero_video():
    print(f"\n[*] Recompiling Hero Video from public/frames...")
    out_mp4 = os.path.join(PUBLIC_DIR, "convert_the_above_video_into_c.mp4")
    cmd = [
        "ffmpeg", "-y",
        "-framerate", "24",
        "-i", os.path.join(PUBLIC_DIR, "frames", "frame_%04d.jpg"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "18",
        "-movflags", "+faststart",
        out_mp4
    ]
    subprocess.run(cmd, check=True)
    size = os.path.getsize(out_mp4)
    print(f"[+] Recompiled Hero MP4: {out_mp4} ({size:,} bytes)")


def clean_achievements_video(engine):
    src_mp4 = os.path.join(PUBLIC_DIR, "achievements-bg.mp4")
    if not os.path.exists(src_mp4):
        return

    print(f"\n[*] Cleaning achievements-bg.mp4...")
    temp_dir = "temp_achieve_frames"
    os.makedirs(temp_dir, exist_ok=True)

    # 1. Extract frames
    print("  Extracting frames...")
    subprocess.run(["ffmpeg", "-y", "-i", src_mp4, os.path.join(temp_dir, "frame_%04d.png")], check=True)

    # 2. Build 1080p mask (location: 1704, 864, scale: 72x72)
    sample = cv2.imread(os.path.join(temp_dir, "frame_0001.png"))
    h, w = sample.shape[:2]
    mask_1080 = engine.footprint_mask(sample, region=(1704, 864, 72, 72), dilate=6)

    # 3. Inpaint frames
    frames = sorted(os.listdir(temp_dir))
    print(f"  Inpainting {len(frames)} frames with MI-GAN...")
    for idx, fname in enumerate(frames, start=1):
        p = os.path.join(temp_dir, fname)
        img = cv2.imread(p)
        cleaned = erase_migan(img, mask_1080)
        cv2.imwrite(p, cleaned)
        if idx % 48 == 0 or idx == len(frames):
            print(f"    [{idx}/{len(frames)}] frames done")

    # 4. Re-encode video
    print("  Re-encoding cleaned video...")
    subprocess.run([
        "ffmpeg", "-y",
        "-framerate", "24",
        "-i", os.path.join(temp_dir, "frame_%04d.png"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "18",
        "-movflags", "+faststart",
        src_mp4
    ], check=True)

    # Clean up temp frames
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)
    print(f"[+] achievements-bg.mp4 cleaned successfully ({os.path.getsize(src_mp4):,} bytes)")


def update_preload_container(zip_sizes):
    js_path = os.path.join("src", "components", "PreloadContainer.jsx")
    print(f"\n[*] Updating byte sizes in {js_path}...")
    with open(js_path, "r", encoding="utf-8") as f:
        content = f.read()

    for key, size in zip_sizes.items():
        # Match pattern like: { key: 'frames', url: '/frames.zip', expectedSize: 17277506 },
        import re
        pattern = rf"(\{{\s*key:\s*'{key}',\s*url:\s*'/{key}\.zip',\s*expectedSize:\s*)\d+(\s*\}})"
        replacement = rf"\g<1>{size}\g<2>"
        content = re.sub(pattern, replacement, content)

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("[+] PreloadContainer.jsx updated successfully.")


def main():
    print("=== Starting Intelligent Portfolio Watermark Removal ===")
    overall_start = time.time()

    # Initialize Engine & 720p Mask
    engine = GeminiEngine()
    sample_720 = cv2.imread(os.path.join(PUBLIC_DIR, "frames", "frame_0001.jpg"))
    mask_720 = engine.footprint_mask(sample_720, region=(1136, 576, 48, 48), dilate=5)

    # Warmup MI-GAN
    print("[*] Warming up neural inpainting engine...")
    _ = erase_migan(sample_720, mask_720)
    print("[+] Engine ready.")

    # 1. Process all 4 scroll sequences
    for seq in SEQUENCES:
        process_sequence(seq, engine, mask_720)

    # 2. Re-encode Hero Video
    recompile_hero_video()

    # 3. Clean Achievements Video
    clean_achievements_video(engine)

    # 4. Repack all ZIP archives
    print(f"\n==========================================")
    print(f"[*] Repackaging all ZIP files...")
    print(f"==========================================")
    zip_sizes = {}
    for seq in SEQUENCES:
        size = repack_zip(seq)
        zip_sizes[seq] = size

    # 5. Update PreloadContainer.jsx expected sizes
    update_preload_container(zip_sizes)

    elapsed_total = time.time() - overall_start
    print(f"\n==========================================")
    print(f"[SUCCESS] All 960 frames and videos fully restored in {elapsed_total/60:.2f} minutes!")
    print(f"==========================================")


if __name__ == "__main__":
    main()

