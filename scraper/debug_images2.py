import urllib.request, re, json

req = urllib.request.Request(
    'https://rti.md/product/rsistems-folding-stand-pos',
    headers={'User-Agent': 'Mozilla/5.0'}
)
with urllib.request.urlopen(req, timeout=20) as r:
    html = r.read().decode('utf-8', errors='replace')

# Find all unique base domains for images
srcs = re.findall(r'src="(https?://[^"]+)"', html)
domains = set()
for s in srcs:
    m = re.match(r'https?://([^/]+)', s)
    if m:
        domains.add(m.group(1))
print('Image source domains:', domains)

# Find all src containing 'product'
product_imgs = [s for s in srcs if 'product' in s.lower()]
print('\nProduct-related image srcs:', len(product_imgs))
for s in product_imgs[:10]:
    print(' ', s[:150])

# Find any JSON blobs in script tags
scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
print('\nScript tags:', len(scripts))
for i, s in enumerate(scripts):
    if 'product' in s.lower() and ('image' in s.lower() or 'photo' in s.lower() or 'img' in s.lower()):
        print(f'Script {i} (contains product+image): length={len(s)}')
        print(s[:500])
        print('...')

# Check for Angular transfer state
if 'ng-version' in html or '_nghost' in html:
    print('\nAngular app detected')
    # Look for transfer state
    ts_match = re.search(r'<script id="([^"]*transfer[^"]*)"[^>]*>({.*?})</script>', html, re.DOTALL | re.IGNORECASE)
    if ts_match:
        print('Transfer state found:', ts_match.group(1))
        print(ts_match.group(2)[:600])

# Find the api.ecommerce.rti.md URLs related to products
api_urls = [s for s in srcs if 'api.ecommerce.rti.md' in s]
print('\nAPI image URLs:', len(api_urls))
for s in api_urls[:10]:
    print(' ', s[:150])
