import urllib.request, re, json, html as html_module

# Test the category products API
tests = [
    'https://api.ecommerce.rti.md/api/products?category=pospc-specializat&lang=ro',
    'https://api.ecommerce.rti.md/api/products?categorySlug=pospc-specializat&lang=ro',
    'https://api.ecommerce.rti.md/api/categories/pospc-specializat/products?lang=ro',
]

for url in tests:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read().decode('utf-8'))
        print(f'SUCCESS: {url}')
        if isinstance(data, list):
            print(f'  List of {len(data)} items, first item keys:', list(data[0].keys()) if data else [])
        elif isinstance(data, dict):
            print(f'  Dict keys:', list(data.keys()))
        break
    except Exception as e:
        print(f'FAILED: {url} -> {e}')

# Check the category page transfer state for product list
print('\n--- Category page transfer state ---')
req = urllib.request.Request(
    'https://rti.md/category/pospc-specializat',
    headers={'User-Agent': 'Mozilla/5.0'}
)
with urllib.request.urlopen(req, timeout=20) as r:
    page_html = r.read().decode('utf-8', errors='replace')

scripts = re.findall(r'<script[^>]*>(.*?)</script>', page_html, re.DOTALL)
for s in scripts:
    if 'api.ecommerce.rti.md/api/products' in s and 'products/slug' not in s:
        decoded = s.replace('&q;', '"').replace('&l;', '<').replace('&g;', '>').replace('&a;', '&').replace('&s;', "'")
        decoded = html_module.unescape(decoded)
        try:
            data = json.loads(decoded)
            for k in data.keys():
                if 'products' in k and 'slug' not in k:
                    print('Products list key:', k)
                    v = data[k]
                    if isinstance(v, list):
                        print(f'  List of {len(v)} items')
                        if v:
                            print('  First product keys:', list(v[0].keys()))
                            print('  First product:', json.dumps(v[0], ensure_ascii=False)[:400])
                    elif isinstance(v, dict):
                        print('  Dict keys:', list(v.keys())[:10])
        except json.JSONDecodeError as e:
            print('JSON error:', e)
        break
