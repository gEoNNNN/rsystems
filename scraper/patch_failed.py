"""Patch the 3 failed products by re-fetching and updating the JSON files."""
import urllib.request, json, os, urllib.parse, html as html_module, re

API_BASE = "https://api.ecommerce.rti.md"
CDN_BASE = "https://cdn.rti.md"
SITE_BASE = "https://rti.md"
HEADERS = {"User-Agent": "Mozilla/5.0"}

FAILED = [
    ("pospc-specializat", "tableta-rs-wt-101-all-in-one-specializat-101-windows"),
    ("terminale-colectare-date", "terminal-mobil-chainway-c6000"),
]

output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")


def fetch_api(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode("utf-8"))


def strip_html(text):
    if not text: return ""
    text = re.sub(r"<[^>]+>", " ", text)
    text = html_module.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def image_url(path):
    if not path: return None
    if path.startswith("http"): return path
    return f"{CDN_BASE}/{path.lstrip('/')}"


def parse_product(api_data):
    images = []
    for img in api_data.get("images") or []:
        url = image_url(img.get("path", ""))
        if url and url not in images:
            images.append(url)

    price = None
    price_currency = "MDL"
    in_stock = False
    for v in api_data.get("variants") or []:
        p = v.get("price")
        if p is not None:
            price = p
            price_currency = v.get("currency", "MDL")
        if (v.get("quantity") or 0) > 0:
            in_stock = True

    if in_stock:
        stock_status = "In stoc"
    elif api_data.get("status") == "published":
        stock_status = "Pre-comanda"
    else:
        stock_status = api_data.get("status", "unknown")

    # Fix: widgets can be list OR dict
    characteristics = ""
    widgets = api_data.get("widgets") or {}
    if isinstance(widgets, list):
        widgets = {str(i): v for i, v in enumerate(widgets)}
    for wid_key, wid_val in widgets.items():
        title = wid_val.get("title", "")
        body = strip_html(wid_val.get("body", ""))
        if body:
            characteristics += f"{title}: {body}\n"

    specifications = {}
    for attr in api_data.get("attributes") or []:
        key = attr.get("name") or attr.get("key", "")
        val = attr.get("value", "")
        if key:
            specifications[key] = val

    cat = api_data.get("category") or {}
    category_name = cat.get("name") or cat.get("title") or ""

    return {
        "slug":             api_data.get("slug", ""),
        "url":              f"{SITE_BASE}/product/{api_data.get('slug', '')}",
        "api_url":          f"{API_BASE}/api/products/slug/{api_data.get('slug', '')}?lang=ro",
        "title":            api_data.get("title", ""),
        "category":         category_name,
        "stock_status":     stock_status,
        "price":            f"{price} {price_currency}" if price is not None else "",
        "images":           images,
        "description":      strip_html(api_data.get("description", "")),
        "characteristics":  characteristics.strip(),
        "specifications":   specifications,
        "tags":             [t.get("name", "") for t in (api_data.get("tags") or [])],
        "published_at":     api_data.get("publishedAt", ""),
        "meta_title":       api_data.get("metaTitle", ""),
        "meta_description": api_data.get("metaDescription", ""),
    }


for category_slug, product_slug in FAILED:
    print(f"Patching {product_slug} in {category_slug}...")
    api_url = f"{API_BASE}/api/products/slug/{urllib.parse.quote(product_slug, safe='')}?lang=ro"
    api_data = fetch_api(api_url)
    product = parse_product(api_data)
    print(f"  OK: {product['title']} | {len(product['images'])} imgs")

    # Update category JSON
    cat_file = os.path.join(output_dir, f"{category_slug}.json")
    with open(cat_file, encoding="utf-8") as f:
        cat_data = json.load(f)

    # Find and replace or append the product
    found = False
    for i, p in enumerate(cat_data["products"]):
        if p.get("slug") == product_slug:
            cat_data["products"][i] = product
            found = True
            break
    if not found:
        # Find position by index from original FAILED position
        cat_data["products"].append(product)
        cat_data["total"] = len(cat_data["products"])

    with open(cat_file, "w", encoding="utf-8") as f:
        json.dump(cat_data, f, ensure_ascii=False, indent=2)
    print(f"  Saved {cat_file}")

# Rebuild all-products.json and all-products.md
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

CATEGORIES = [
    "pospc-specializat","echipamente-fiscale","imprimante","cantare-comerciale",
    "scanere-coduri-de-bare","terminale-colectare-date","case-de-autodeservire",
    "sistem-numarare-vizitatori","sistem-antifurt","echipamente-de-parcare",
    "sisteme-supraveghere-video","sisteme-audio","sistem-control-acces",
    "echipament-primireemitere-numerar","echipamente-industriale-alimentare",
    "echipamente-wireless","sisteme-antiincendiu","consumabile","sudare-cu-fibre-optice",
]

all_results = []
for cat in CATEGORIES:
    cat_file = os.path.join(output_dir, f"{cat}.json")
    with open(cat_file, encoding="utf-8") as f:
        all_results.append(json.load(f))

all_json = os.path.join(output_dir, "all-products.json")
with open(all_json, "w", encoding="utf-8") as f:
    json.dump(all_results, f, ensure_ascii=False, indent=2)

total_products = sum(r["total"] for r in all_results)
total_images = sum(len(p["images"]) for r in all_results for p in r["products"])
print(f"\nRebuilt all-products.json: {total_products} products, {total_images} images")
