import urllib.request, json, html as html_module, re

def fetch_json(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode('utf-8'))

# Get all categories from API
cats = fetch_json('https://api.ecommerce.rti.md/api/categories?lang=ro&_order=ASC&_sort=order')
print(f'Total categories: {len(cats)}')

# Target category slugs
targets = [
    "pospc-specializat", "echipamente-fiscale", "imprimante", "cantare-comerciale",
    "scanere-coduri-de-bare", "terminale-colectare-date", "case-de-autodeservire",
    "sistem-numarare-vizitatori", "sistem-antifurt", "echipamente-de-parcare",
    "sisteme-supraveghere-video", "sisteme-audio", "sistem-control-acces",
    "echipament-primireemitere-numerar", "echipamente-industriale-alimentare",
    "echipamente-wireless", "sisteme-antiincendiu", "consumabile", "sudare-cu-fibre-optice"
]

# Find matching categories
print('\nMatching categories:')
for cat in cats:
    slug = cat.get('slug', '')
    name = cat.get('name', cat.get('title', ''))
    cid = cat.get('_id', '')
    if slug in targets:
        print(f'  MATCH: {slug} -> {name} (id: {cid})')
    
# Also test products for first category with the category ID
print('\n--- Test products by category ID ---')
# Find pospc-specializat
for cat in cats:
    if cat.get('slug') == 'pospc-specializat':
        cid = cat['_id']
        print(f'pospc-specializat ID: {cid}')
        # Test with ID
        prods_by_id = fetch_json(f'https://api.ecommerce.rti.md/api/products?category={cid}&lang=ro')
        print(f'Products by ID: {len(prods_by_id)}')
        prods_by_slug = fetch_json(f'https://api.ecommerce.rti.md/api/products?category=pospc-specializat&lang=ro')
        print(f'Products by slug: {len(prods_by_slug)}')
        if prods_by_id:
            p = prods_by_id[0]
            print('First product title:', p.get('title'))
            print('First product slug:', p.get('slug'))
            print('Images:', p.get('images', [])[:2])
        break

# Check image URL
print('\n--- Image URL test ---')
test_path = 'public/products/images/244a8eaf-dc87-40be-a4e3-3d9f81958861.png'
urls_to_test = [
    f'https://api.ecommerce.rti.md/{test_path}',
    f'https://cdn.rti.md/{test_path}',
]
for url in urls_to_test:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}, method='HEAD')
        with urllib.request.urlopen(req, timeout=10) as r:
            print(f'OK ({r.status}): {url}')
    except Exception as e:
        print(f'FAIL: {url} -> {e}')
