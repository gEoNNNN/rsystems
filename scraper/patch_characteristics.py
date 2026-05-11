"""
Patch all product JSON files to add real specifications (characteristics).
Reads slugs from existing JSON, fetches API for each product, extracts attributes.
Does NOT re-download images or re-scrape HTML category pages.
"""
import os
import json
import time
import re
import urllib.request
import urllib.error
from html.parser import HTMLParser

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
API_BASE   = "https://api.ecommerce.rti.md/api/products/slug/{slug}?lang=ro"
HEADERS    = {
    "User-Agent":      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept":          "application/json",
    "Accept-Language": "ro,en;q=0.9",
    "Connection":      "keep-alive",
}

# ---------- HTML strip ----------
class _Stripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
    def handle_data(self, data):
        self.parts.append(data)

def strip_html(text: str) -> str:
    if not text:
        return ""
    s = _Stripper()
    s.feed(text)
    return " ".join(s.parts).strip()


def fetch_api(slug: str) -> dict | None:
    encoded_slug = urllib.request.quote(slug, safe="")
    url = API_BASE.format(slug=encoded_slug)
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return json.loads(r.read())
    except Exception as e:
        print(f"  ERROR fetching {slug}: {e}")
        return None


def extract_specs(api_data: dict) -> dict:
    specs = {}
    for attr in api_data.get("attributes") or []:
        attr_id = attr.get("attributeId") or {}
        # name can be in attributeId.name or directly on attr
        key = attr_id.get("name") if isinstance(attr_id, dict) else None
        if not key or not isinstance(key, str):
            key = attr.get("name") or attr.get("key", "")
        if not isinstance(key, str):
            key = str(key)
        val = strip_html(attr.get("value", ""))
        if key:
            specs[key] = val
    return specs


def process_file(json_path: str):
    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)

    # Support three structures:
    # 1. list of {category, products:[...]}  — all-products*.json
    # 2. single dict {category, products:[...]}  — per-category JSON
    # 3. flat list of products
    if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict) and "products" in data[0]:
        # all-products*.json
        total = sum(len(cat["products"]) for cat in data)
        print(f"\n{'='*60}")
        print(f"File: {os.path.basename(json_path)}  ({total} products across {len(data)} categories)")
        for cat in data:
            for prod in cat["products"]:
                _patch_product(prod)
    elif isinstance(data, dict) and "products" in data:
        # per-category JSON
        products = data["products"]
        print(f"\n{'='*60}")
        print(f"File: {os.path.basename(json_path)}  ({len(products)} products)")
        for prod in products:
            _patch_product(prod)
    elif isinstance(data, list):
        # flat list
        print(f"\n{'='*60}")
        print(f"File: {os.path.basename(json_path)}  ({len(data)} products)")
        for prod in data:
            _patch_product(prod)
    else:
        print(f"Unknown structure in {json_path}, skipping")
        return

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Saved: {os.path.basename(json_path)}")


_cache: dict[str, dict] = {}

def _patch_product(prod: dict):
    slug = prod.get("slug", "")
    if not slug:
        print("  SKIP (no slug)")
        return

    if slug not in _cache:
        print(f"  Fetching: {slug}")
        api_data = fetch_api(slug)
        if api_data is None:
            return
        _cache[slug] = api_data
        time.sleep(0.15)   # polite delay
    else:
        api_data = _cache[slug]

    specs = extract_specs(api_data)
    prod["specifications"] = specs
    # Also rebuild characteristics string from specs for convenience
    prod["characteristics"] = "\n".join(f"{k}: {v}" for k, v in specs.items())
    if specs:
        print(f"    OK — {len(specs)} attributes")
    else:
        print(f"    (no attributes)")


if __name__ == "__main__":
    # Process all JSON files in output/
    json_files = sorted(
        f for f in os.listdir(OUTPUT_DIR) if f.endswith(".json")
    )
    # Put combined file last so per-category writes come first
    combined = [f for f in json_files if "all-products" in f]
    others   = [f for f in json_files if "all-products" not in f]
    ordered  = others + combined

    for fname in ordered:
        path = os.path.join(OUTPUT_DIR, fname)
        process_file(path)

    print("\nDone.")
