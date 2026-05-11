"""
RTI.md Product Scraper v2 — API-based
1. Gets product slugs from HTML category pages  
2. Fetches full product data from api.ecommerce.rti.md
3. Images: https://cdn.rti.md/public/products/images/{UUID}
Output: scraper/output/
"""

import urllib.request
import urllib.parse
import json
import os
import re
import time
import sys
import html as html_module

try:
    from bs4 import BeautifulSoup
    BS4 = True
except ImportError:
    BS4 = False

# ─── Config ──────────────────────────────────────────────────────────────────
CATEGORIES = [
    "pospc-specializat",
    "echipamente-fiscale",
    "imprimante",
    "cantare-comerciale",
    "scanere-coduri-de-bare",
    "terminale-colectare-date",
    "case-de-autodeservire",
    "sistem-numarare-vizitatori",
    "sistem-antifurt",
    "echipamente-de-parcare",
    "sisteme-supraveghere-video",
    "sisteme-audio",
    "sistem-control-acces",
    "echipament-primireemitere-numerar",
    "echipamente-industriale-alimentare",
    "echipamente-wireless",
    "sisteme-antiincendiu",
    "consumabile",
    "sudare-cu-fibre-optice",
]

SITE_BASE    = "https://rti.md"
API_BASE     = "https://api.ecommerce.rti.md"
CDN_BASE     = "https://cdn.rti.md"
HEADERS      = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "ro-RO,ro;q=0.9,en-US;q=0.8",
}
JSON_HEADERS = {**HEADERS, "Accept": "application/json"}
DELAY        = 0.35   # seconds between requests


# ─── HTTP helpers ─────────────────────────────────────────────────────────────
def fetch_bytes(url, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20) as r:
                return r.read()
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(1)
            else:
                raise


def fetch_html(url):
    raw = fetch_bytes(url)
    return raw.decode("utf-8", errors="replace")


def fetch_api(url, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=JSON_HEADERS)
            with urllib.request.urlopen(req, timeout=20) as r:
                return json.loads(r.read().decode("utf-8"))
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(1)
            else:
                raise


# ─── Data extraction ──────────────────────────────────────────────────────────
def strip_html(text):
    """Remove HTML tags and normalize whitespace."""
    if not text:
        return ""
    text = re.sub(r"<[^>]+>", " ", text)
    text = html_module.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def image_url(path):
    """Convert image path to full CDN URL."""
    if not path:
        return None
    if path.startswith("http"):
        return path
    return f"{CDN_BASE}/{path.lstrip('/')}"


def get_product_slugs_from_category_html(html):
    """Extract /product/ links from a category page HTML."""
    slugs = []
    seen = set()
    for m in re.finditer(r'href="(?:https://rti\.md)?/product/([^"?#]+)"', html):
        slug = urllib.parse.unquote(m.group(1).rstrip("/"))
        if slug not in seen:
            seen.add(slug)
            slugs.append(slug)
    return slugs


def get_category_title_from_html(html):
    if BS4:
        soup = BeautifulSoup(html, "html.parser")
        h1 = soup.find("h1")
        if h1:
            return h1.get_text(strip=True)
    m = re.search(r"<h1[^>]*>([^<]+)</h1>", html, re.IGNORECASE)
    return m.group(1).strip() if m else ""


def parse_product(api_data):
    """Convert raw API product object to clean dict."""
    images = []
    for img in api_data.get("images") or []:
        url = image_url(img.get("path", ""))
        if url and url not in images:
            images.append(url)

    # Price from variants
    price = None
    price_currency = "MDL"
    in_stock = False
    for v in api_data.get("variants") or []:
        p = v.get("price")
        if p is not None:
            price = p
            price_currency = v.get("currency", "MDL")
        qty = v.get("quantity", 0)
        if qty and qty > 0:
            in_stock = True

    # Stock status
    status = api_data.get("status", "")
    if in_stock:
        stock_status = "In stoc"
    elif status == "published":
        stock_status = "Pre-comanda"
    else:
        stock_status = status or "unknown"

    # Description — strip HTML
    description = strip_html(api_data.get("description", ""))

    # Attributes (specifications table)
    specifications = {}
    for attr in api_data.get("attributes") or []:
        # attributeId is a nested object containing the name
        attr_id = attr.get("attributeId") or {}
        key = attr_id.get("name") or attr.get("name") or attr.get("key", "")
        val = strip_html(attr.get("value", ""))
        if key:
            specifications[key] = val

    # Widgets (characteristics sections) — can be dict or list depending on product
    characteristics = ""
    widgets = api_data.get("widgets") or {}
    if isinstance(widgets, list):
        widgets = {str(i): v for i, v in enumerate(widgets)}
    for wid_key, wid_val in widgets.items():
        title = wid_val.get("title", "")
        body = strip_html(wid_val.get("body", ""))
        if body:
            characteristics += f"{title}: {body}\n"

    # Category
    cat = api_data.get("category") or {}
    category_name = cat.get("name") or cat.get("title") or ""

    return {
        "slug":           api_data.get("slug", ""),
        "url":            f"{SITE_BASE}/product/{api_data.get('slug', '')}",
        "api_url":        f"{API_BASE}/api/products/slug/{api_data.get('slug', '')}?lang=ro",
        "title":          api_data.get("title", ""),
        "category":       category_name,
        "stock_status":   stock_status,
        "price":          f"{price} {price_currency}" if price is not None else "",
        "images":         images,
        "description":    description,
        "characteristics":characteristics.strip(),
        "specifications": specifications,
        "tags":           [t.get("name", "") for t in (api_data.get("tags") or [])],
        "published_at":   api_data.get("publishedAt", ""),
        "meta_title":     api_data.get("metaTitle", ""),
        "meta_description": api_data.get("metaDescription", ""),
    }


# ─── Main scraping logic ───────────────────────────────────────────────────────
def scrape_category(category):
    print(f"\n{'=' * 65}")
    print(f"  {category}")
    url = f"{SITE_BASE}/category/{category}"

    # Step 1: Get product slugs from HTML
    try:
        html = fetch_html(url)
    except Exception as e:
        print(f"  ERROR fetching HTML: {e}")
        return {"category": category, "url": url, "total": 0, "products": [], "error": str(e)}

    category_title = get_category_title_from_html(html) or category
    slugs = get_product_slugs_from_category_html(html)
    print(f"  Title: {category_title}")
    print(f"  Products: {len(slugs)}")

    # Step 2: Fetch each product from API
    products = []
    for i, slug in enumerate(slugs):
        api_url = f"{API_BASE}/api/products/slug/{urllib.parse.quote(slug, safe='')}?lang=ro"
        disp = slug[:50]
        sys.stdout.write(f"  [{i+1:2d}/{len(slugs)}] {disp:<52} ")
        sys.stdout.flush()
        try:
            api_data = fetch_api(api_url)
            product = parse_product(api_data)
            products.append(product)
            n_imgs = len(product["images"])
            print(f"OK  {n_imgs} imgs  {product['stock_status']}")
        except Exception as e:
            print(f"FAIL  {e}")
        time.sleep(DELAY)

    return {
        "category":       category,
        "category_title": category_title,
        "url":            url,
        "total":          len(products),
        "products":       products,
    }


# ─── Output generators ────────────────────────────────────────────────────────
def generate_markdown(all_results):
    total_products = sum(r["total"] for r in all_results)
    total_images   = sum(len(p["images"]) for r in all_results for p in r["products"])

    lines = [
        "# RTI.md — Catalog Produse",
        "",
        f"**{len(all_results)} categorii · {total_products} produse · {total_images} imagini**",
        "",
        "---",
        "",
    ]

    for result in all_results:
        lines.append(f"## {result.get('category_title', result['category'])}")
        lines.append(f"*URL: {result['url']}  |  {result['total']} produse*")
        lines.append("")

        for p in result["products"]:
            title = p["title"] or p["slug"]
            lines.append(f"### {title}")
            lines.append(f"| Câmp | Valoare |")
            lines.append(f"|------|---------|")
            lines.append(f"| URL  | {p['url']} |")
            lines.append(f"| Stoc | {p['stock_status']} |")
            if p["price"]:
                lines.append(f"| Preț | {p['price']} |")
            if p["category"]:
                lines.append(f"| Categorie | {p['category']} |")
            if p["tags"]:
                lines.append(f"| Etichete | {', '.join(p['tags'])} |")
            lines.append("")

            if p["description"]:
                desc = p["description"][:600]
                if len(p["description"]) > 600:
                    desc += "..."
                lines.append(f"**Descriere:** {desc}")
                lines.append("")

            if p["characteristics"]:
                char = p["characteristics"][:800]
                lines.append(f"**Caracteristici:** {char}")
                lines.append("")

            if p["specifications"]:
                lines.append("**Specificații:**")
                for k, v in list(p["specifications"].items())[:30]:
                    lines.append(f"- {k}: {v}")
                lines.append("")

            if p["images"]:
                lines.append(f"**Imagini ({len(p['images'])}):**")
                for img in p["images"]:
                    lines.append(f"- {img}")
                lines.append("")

            lines.append("---")
            lines.append("")

    return "\n".join(lines)


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(script_dir, "output")
    os.makedirs(output_dir, exist_ok=True)

    print("RTI.md Product Scraper v2 (API-based)")
    print(f"Output: {output_dir}\n")

    all_results = []

    for category in CATEGORIES:
        result = scrape_category(category)
        all_results.append(result)

        # Save per-category JSON immediately
        cat_json = os.path.join(output_dir, f"{category}.json")
        with open(cat_json, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        time.sleep(0.4)

    # Save combined JSON
    all_json = os.path.join(output_dir, "all-products.json")
    with open(all_json, "w", encoding="utf-8") as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)

    # Save Markdown
    md_path = os.path.join(output_dir, "all-products.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(generate_markdown(all_results))

    # Summary
    total_products = sum(r["total"] for r in all_results)
    total_images   = sum(len(p["images"]) for r in all_results for p in r["products"])

    print(f"\n{'=' * 65}")
    print(f"  DONE")
    print(f"  Categories : {len(all_results)}")
    print(f"  Products   : {total_products}")
    print(f"  Images     : {total_images}")
    print(f"  JSON       : {all_json}")
    print(f"  Markdown   : {md_path}")
    print(f"{'=' * 65}")


if __name__ == "__main__":
    main()
