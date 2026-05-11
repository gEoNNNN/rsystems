import urllib.request, re, json, html as html_module

req = urllib.request.Request(
    'https://rti.md/product/rsistems-folding-stand-pos',
    headers={'User-Agent': 'Mozilla/5.0'}
)
with urllib.request.urlopen(req, timeout=20) as r:
    page_html = r.read().decode('utf-8', errors='replace')

# Find script tag with Angular transfer state
scripts = re.findall(r'<script[^>]*>(.*?)</script>', page_html, re.DOTALL)
for s in scripts:
    if 'api.ecommerce.rti.md/api/products/slug/' in s:
        # Decode the custom HTML entity encoding
        decoded = s.replace('&q;', '"').replace('&l;', '<').replace('&g;', '>').replace('&a;', '&').replace('&s;', "'")
        # Standard unescape too
        decoded = html_module.unescape(decoded)
        try:
            data = json.loads(decoded)
            print('Transfer state parsed successfully!')
            print('Keys:', list(data.keys())[:5])
            # Get the product data
            for k, v in data.items():
                if 'products/slug/' in k:
                    print('\nProduct API key:', k)
                    print('Product data keys:', list(v.keys()))
                    # Show images
                    if 'images' in v:
                        print('Images:', v['images'])
                    if 'photos' in v:
                        print('Photos:', v['photos'])
                    if 'photo' in v:
                        print('Photo:', v['photo'])
                    # Print all fields
                    for field, val in v.items():
                        if not isinstance(val, list) or len(str(val)) < 200:
                            print(f'  {field}: {str(val)[:150]}')
                    break
        except json.JSONDecodeError as e:
            print('JSON parse error:', e)
            print('First 200 chars:', decoded[:200])
        break

# Also test the direct API endpoint
print('\n--- Testing direct API ---')
api_url = 'https://api.ecommerce.rti.md/api/products/slug/rsistems-folding-stand-pos?lang=ro'
try:
    req2 = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req2, timeout=15) as r2:
        api_data = json.loads(r2.read().decode('utf-8'))
    print('Direct API works!')
    print('Keys:', list(api_data.keys()))
    if 'images' in api_data:
        print('Images:', api_data['images'])
except Exception as e:
    print('Direct API failed:', e)
