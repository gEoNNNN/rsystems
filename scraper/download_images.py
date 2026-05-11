"""
Download all product images from all-products.json
Saves to: public/img/products/{uuid}.ext
Updates: scraper/output/all-products.json  (images → local paths /img/products/...)
Also saves per-category JSON files with local paths.
"""

import urllib.request
import urllib.error
import json
import os
import time

# ─── Paths ────────────────────────────────────────────────────────────────────
SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
INPUT_JSON   = os.path.join(SCRIPT_DIR, "output", "all-products.json")
OUTPUT_JSON  = os.path.join(SCRIPT_DIR, "output", "all-products-local.json")
IMG_DIR      = os.path.join(PROJECT_ROOT, "public", "img", "products")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Referer": "https://rti.md/",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Language": "ro-RO,ro;q=0.9,en-US;q=0.8",
}


def download_image(url, dest_path, retries=3):
    """Download url to dest_path. Returns True on success."""
    if os.path.exists(dest_path):
        return True  # already downloaded
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            with open(dest_path, "wb") as f:
                f.write(data)
            return True
        except urllib.error.HTTPError as e:
            print(f"  FAIL HTTP {e.code}: {url}")
            return False  # Don't retry HTTP errors (404, 403, etc.)
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(1.5)
            else:
                print(f"  FAIL ({e}): {url}")
                return False


# Image proxy URL: cdn.rti.md serves resized images via this format
CDN_PROXY = "https://cdn.rti.md//resize:fit:800:800/q:85/plain/local:///"

def url_to_local(url):
    """Convert any rti.md image url to local path and proxy download URL."""
    # Extract the path portion (public/products/images/uuid.ext)
    for prefix in ("https://cdn.rti.md/", "https://rti.md/"):
        if url.startswith(prefix):
            rel = url[len(prefix):]
            break
    else:
        rel = url.split("/", 3)[-1]  # fallback: strip scheme+host
    # Strip any existing proxy path if present
    if "plain/local:///" in rel:
        rel = rel.split("plain/local:///")[-1]
    filename   = rel.split("/")[-1]               # uuid.ext
    local_path = f"/img/products/{filename}"      # served by Vite
    abs_path   = os.path.join(IMG_DIR, filename)
    proxy_url  = CDN_PROXY + rel                  # working proxy URL
    return local_path, abs_path, proxy_url


def main():
    os.makedirs(IMG_DIR, exist_ok=True)

    with open(INPUT_JSON, encoding="utf-8") as f:
        categories = json.load(f)

    total_imgs   = 0
    downloaded   = 0
    skipped      = 0
    failed_urls  = []

    for cat in categories:
        cat_name = cat["category"]
        products = cat.get("products", [])
        print(f"\n[{cat_name}] {len(products)} products")

        for prod in products:
            new_images = []
            for url in prod.get("images", []):
                total_imgs += 1
                local_path, abs_path, fixed_url = url_to_local(url)

                if os.path.exists(abs_path):
                    skipped += 1
                    new_images.append(local_path)
                    continue

                ok = download_image(fixed_url, abs_path)
                if ok:
                    downloaded += 1
                    new_images.append(local_path)
                    print(f"  + {os.path.basename(abs_path)}")
                else:
                    failed_urls.append(fixed_url)
                    new_images.append(local_path)  # use local path anyway (will be missing)

                time.sleep(0.1)

            prod["images"] = new_images

    # Save updated JSON
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(categories, f, ensure_ascii=False, indent=2)

    # Also overwrite per-category files with local paths
    output_dir = os.path.join(SCRIPT_DIR, "output")
    for cat in categories:
        cat_file = os.path.join(output_dir, f"{cat['category']}.json")
        with open(cat_file, "w", encoding="utf-8") as f:
            json.dump(cat, f, ensure_ascii=False, indent=2)

    print(f"\n─── Done ───────────────────────────────")
    print(f"  Total images : {total_imgs}")
    print(f"  Downloaded   : {downloaded}")
    print(f"  Already had  : {skipped}")
    print(f"  Failed       : {len(failed_urls)}")
    if failed_urls:
        print("\nFailed URLs:")
        for u in failed_urls:
            print(f"  {u}")
    print(f"\nImages saved to : {IMG_DIR}")
    print(f"Updated JSON    : {OUTPUT_JSON}")


if __name__ == "__main__":
    main()
