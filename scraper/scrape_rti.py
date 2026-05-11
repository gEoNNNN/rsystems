"""
RTI.md Product Scraper
Scrapes all products from 19 categories on rti.md
Output: rti-products.json + rti-products.md in scraper/output/
"""

import urllib.request
import urllib.parse
import json
import os
import re
import time
import sys
from html.parser import HTMLParser

try:
    from bs4 import BeautifulSoup
    BS4_AVAILABLE = True
except ImportError:
    BS4_AVAILABLE = False
    print("Warning: BeautifulSoup not available, using fallback parser")

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

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7",
}

BASE_URL = "https://rti.md"
DELAY = 0.5  # seconds between requests


def fetch(url, retries=3):
    """Fetch a URL with retries, returns HTML string."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20) as r:
                charset = "utf-8"
                ct = r.headers.get("Content-Type", "")
                if "charset=" in ct:
                    charset = ct.split("charset=")[-1].strip()
                return r.read().decode(charset, errors="replace")
        except Exception as e:
            if attempt < retries - 1:
                print(f"    Retry {attempt + 1}/{retries}: {e}")
                time.sleep(1)
            else:
                raise


def extract_images(soup_or_html):
    """Extract all product images from cdn.rti.md and return original URLs."""
    images = []
    seen = set()

    if BS4_AVAILABLE and hasattr(soup_or_html, "find_all"):
        soup = soup_or_html
        for img in soup.find_all("img", src=True):
            src = img["src"]
            if "cdn.rti.md" in src and "/products/images/" in src:
                m = re.search(r"/products/images/([a-f0-9\-]+\.\w+)", src, re.IGNORECASE)
                if m and m.group(1) not in seen:
                    seen.add(m.group(1))
                    images.append(f"https://cdn.rti.md/public/products/images/{m.group(1)}")
    else:
        html = soup_or_html
        for m in re.finditer(r'src="(https://cdn\.rti\.md[^"]+/products/images/([a-f0-9\-]+\.\w+))"', html, re.IGNORECASE):
            filename = m.group(2)
            if filename not in seen:
                seen.add(filename)
                images.append(f"https://cdn.rti.md/public/products/images/{filename}")

    return images


def extract_product_links(html):
    """Extract all /product/ links from a category page."""
    links = []
    seen = set()

    # Collect all href="/product/..." or href="https://rti.md/product/..."
    for m in re.finditer(r'href="(/product/[^"]+|https://rti\.md/product/[^"]+)"', html):
        href = m.group(1)
        if href.startswith("/"):
            href = BASE_URL + href
        # Decode URL encoding in slug
        if href not in seen:
            seen.add(href)
            links.append(href)

    return links


def extract_product_data(html, url):
    """Extract structured product data from a product detail page."""
    if BS4_AVAILABLE:
        soup = BeautifulSoup(html, "html.parser")
    else:
        soup = None

    product = {
        "url": url,
        "slug": url.split("/product/")[-1],
        "title": "",
        "stock_status": "unknown",
        "price": "",
        "images": [],
        "description": "",
        "characteristics": "",
        "specifications": {},
        "category_breadcrumb": [],
    }

    # --- Title ---
    if soup:
        h1 = soup.find("h1")
        if h1:
            product["title"] = h1.get_text(strip=True)
    else:
        m = re.search(r"<h1[^>]*>([^<]+)</h1>", html, re.IGNORECASE)
        if m:
            product["title"] = m.group(1).strip()

    # --- Stock status ---
    text_lower = html.lower()
    if "in stoc" in text_lower:
        product["stock_status"] = "In stoc"
    elif "stoc epuizat" in text_lower:
        product["stock_status"] = "Stoc epuizat"
    elif "pre-comanda" in text_lower:
        product["stock_status"] = "Pre-comanda"

    # --- Price ---
    price_m = re.search(r"(\d[\d\s]*(?:[.,]\d+)?)\s*(lei|MDL|RON|EUR)", html, re.IGNORECASE)
    if price_m:
        product["price"] = price_m.group(0).strip()

    # --- Images ---
    if soup:
        product["images"] = extract_images(soup)
    else:
        product["images"] = extract_images(html)

    # --- Description & Characteristics ---
    if soup:
        # Find sections by heading text
        for heading in soup.find_all(["h3", "h4", "h5"]):
            heading_text = heading.get_text(strip=True).lower()

            if heading_text == "descriere":
                # Get sibling/parent text
                parent = heading.find_parent(["div", "section"])
                if parent:
                    # Remove the heading from the text
                    text = parent.get_text(separator="\n", strip=True)
                    text = text.replace("Descriere", "", 1).strip()
                    product["description"] = text[:2000]

            elif heading_text in ("caracteristici", "specificatii", "specificații"):
                parent = heading.find_parent(["div", "section"])
                if parent:
                    text = parent.get_text(separator="\n", strip=True)
                    text = re.sub(r"^(Caracteristici|Specificat[ii]+)", "", text).strip()
                    product["characteristics"] = text[:3000]

        # Try to extract specifications table
        for table in soup.find_all("table"):
            for row in table.find_all("tr"):
                cells = row.find_all("td")
                if len(cells) == 2:
                    key = cells[0].get_text(strip=True)
                    val = cells[1].get_text(strip=True)
                    if key and val:
                        product["specifications"][key] = val

        # Breadcrumb
        breadcrumb = []
        for bc in soup.select("nav a, .breadcrumb a, ol.breadcrumb li a"):
            text = bc.get_text(strip=True)
            if text and text not in ("Principala", "Home"):
                breadcrumb.append({"text": text, "href": bc.get("href", "")})
        if breadcrumb:
            product["category_breadcrumb"] = breadcrumb

    else:
        # Regex fallback for description
        desc_m = re.search(r"Descriere</h[345]>([\s\S]{0,2000}?)(?:<h[345]|<footer)", html, re.IGNORECASE)
        if desc_m:
            clean = re.sub(r"<[^>]+>", " ", desc_m.group(1))
            product["description"] = re.sub(r"\s+", " ", clean).strip()[:2000]

    return product


def scrape_category(category):
    """Scrape all products in a category. Returns dict with category info + products list."""
    url = f"{BASE_URL}/category/{category}"
    print(f"\n{'=' * 60}")
    print(f"Category: {category}")
    print(f"URL: {url}")

    try:
        html = fetch(url)
    except Exception as e:
        print(f"  ERROR fetching category: {e}")
        return {"category": category, "url": url, "products": [], "error": str(e)}

    product_links = extract_product_links(html)

    # Get category title
    cat_title = category
    if BS4_AVAILABLE:
        soup = BeautifulSoup(html, "html.parser")
        h1 = soup.find("h1")
        if h1:
            cat_title = h1.get_text(strip=True)

    print(f"Title: {cat_title}")
    print(f"Products found: {len(product_links)}")

    products = []
    for i, product_url in enumerate(product_links):
        slug = urllib.parse.unquote(product_url.split("/product/")[-1])
        sys.stdout.write(f"  [{i+1:2d}/{len(product_links)}] {slug[:55]:<55} ")
        sys.stdout.flush()

        try:
            product_html = fetch(product_url)
            data = extract_product_data(product_html, product_url)
            products.append(data)
            print(f"OK | {len(data['images'])} imgs | {data['stock_status']}")
        except Exception as e:
            print(f"FAILED: {e}")

        time.sleep(DELAY)

    return {
        "category": category,
        "category_title": cat_title,
        "url": url,
        "total": len(products),
        "products": products,
    }


def generate_markdown(all_results):
    """Generate a readable Markdown report."""
    lines = [
        "# RTI.md — Catalog Produse",
        "",
        f"*Scraped: {len(all_results)} categorii, {sum(r['total'] for r in all_results)} produse total*",
        "",
        "---",
        "",
    ]

    for result in all_results:
        lines.append(f"## {result.get('category_title', result['category'])}")
        lines.append(f"**URL:** {result['url']}  ")
        lines.append(f"**Produse:** {result['total']}  ")
        lines.append("")

        for p in result["products"]:
            lines.append(f"### {p['title'] or p['slug']}")
            lines.append(f"- **URL:** {p['url']}")
            lines.append(f"- **Stoc:** {p['stock_status']}")
            if p["price"]:
                lines.append(f"- **Preț:** {p['price']}")
            if p["description"]:
                desc = p["description"].replace("\n", " ")[:400]
                lines.append(f"- **Descriere:** {desc}")
            if p["characteristics"]:
                char = p["characteristics"].replace("\n", " | ")[:600]
                lines.append(f"- **Caracteristici:** {char}")
            if p["specifications"]:
                lines.append("- **Specificații:**")
                for k, v in list(p["specifications"].items())[:20]:
                    lines.append(f"  - {k}: {v}")
            if p["images"]:
                lines.append(f"- **Imagini ({len(p['images'])}):**")
                for img in p["images"]:
                    lines.append(f"  - {img}")
            lines.append("")

        lines.append("---")
        lines.append("")

    return "\n".join(lines)


def main():
    # Setup output directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(script_dir, "output")
    os.makedirs(output_dir, exist_ok=True)

    print("RTI.md Product Scraper")
    print(f"Categories: {len(CATEGORIES)}")
    print(f"Output: {output_dir}")

    all_results = []

    for category in CATEGORIES:
        result = scrape_category(category)
        all_results.append(result)

        # Save individual category file immediately (so progress is not lost)
        cat_file = os.path.join(output_dir, f"{category}.json")
        with open(cat_file, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        time.sleep(0.3)

    # Save combined JSON
    json_path = os.path.join(output_dir, "all-products.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)

    # Save Markdown report
    md_path = os.path.join(output_dir, "all-products.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(generate_markdown(all_results))

    # Summary
    total_products = sum(r["total"] for r in all_results)
    total_images = sum(len(p["images"]) for r in all_results for p in r["products"])

    print(f"\n{'=' * 60}")
    print(f"DONE!")
    print(f"  Categories: {len(all_results)}")
    print(f"  Products:   {total_products}")
    print(f"  Images:     {total_images} URLs collected")
    print(f"  JSON:       {json_path}")
    print(f"  Markdown:   {md_path}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
