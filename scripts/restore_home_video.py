"""
Restore and Clean the true Home Screen (Hero) Video
Extracts the original typing video from backup_frames_raw/convert_the_above_video_into_c.mp4,
removes the watermark across all 240 frames using MI-GAN ONNX with the exact sparkle footprint mask,
and re-encodes back to public/convert_the_above_video_into_c.mp4.
"""

import os
import time
import subprocess
import cv2
import numpy as np

from remove_ai_watermarks.gemini_engine import GeminiEngine
from remove_ai_watermarks.region_eraser import erase_migan

BACKUP_VIDEO = os.path.join("backup_frames_raw", "convert_the_above_video_into_c.mp4")
OUTPUT_VIDEO = os.path.join("public", "convert_the_above_video_into_c.mp4")
TEMP_DIR = "temp_hero_frames"

def main():
    if not os.path.exists(BACKUP_VIDEO):
        print(f"[!] Backup video not found: {BACKUP_VIDEO}")
        return

    os.makedirs(TEMP_DIR, exist_ok=True)
    t0 = time.time()
    
    print("[*] Extracting frames from original home video...")
    subprocess.run([
        "ffmpeg", "-y",
        "-i", BACKUP_VIDEO,
        os.path.join(TEMP_DIR, "frame_%04d.png")
    ], check=True)

    frames = sorted([f for f in os.listdir(TEMP_DIR) if f.startswith("frame_") and f.endswith(".png")])
    total = len(frames)
    print(f"[*] Extracted {total} frames.")

    engine = GeminiEngine()
    sample = cv2.imread(os.path.join(TEMP_DIR, frames[0]))
    mask_720 = engine.footprint_mask(sample, region=(1136, 576, 48, 48), dilate=5)

    print("[*] Warming up MI-GAN inpainting engine...")
    _ = erase_migan(sample, mask_720)
    print("[+] Engine ready. Inpainting frames...")

    for idx, fname in enumerate(frames, start=1):
        fpath = os.path.join(TEMP_DIR, fname)
        img = cv2.imread(fpath)
        cleaned = erase_migan(img, mask_720)
        cv2.imwrite(fpath, cleaned)

        if idx % 24 == 0 or idx == total:
            elapsed = time.time() - t0
            pct = (idx / total) * 100
            fps = idx / elapsed if elapsed > 0 else 0
            eta = (total - idx) / fps if fps > 0 else 0
            print(f"  [{idx:3d}/{total}] ({pct:5.1f}%) | Elapsed: {elapsed:.1f}s | ETA: {eta:.1f}s")

    print("[*] Re-encoding cleaned Home Video...")
    subprocess.run([
        "ffmpeg", "-y",
        "-framerate", "24",
        "-i", os.path.join(TEMP_DIR, "frame_%04d.png"),
        "-i", BACKUP_VIDEO,
        "-map", "0:v:0",
        "-map", "1:a:0?",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "18",
        "-c:a", "copy",
        "-movflags", "+faststart",
        OUTPUT_VIDEO
    ], check=True)

    # Clean up temp frames
    print("[*] Cleaning up temporary frame files...")
    for f in os.listdir(TEMP_DIR):
        os.remove(os.path.join(TEMP_DIR, f))
    os.rmdir(TEMP_DIR)

    out_size = os.path.getsize(OUTPUT_VIDEO)
    print(f"\n[SUCCESS] Home Screen Video fully restored and watermark-free!")
    print(f"Output: {OUTPUT_VIDEO} ({out_size:,} bytes) in {time.time() - t0:.1f}s")

if __name__ == "__main__":
    main()

