import urllib.request, re

req = urllib.request.Request(
    'https://rti.md/product/rsistems-folding-stand-pos',
    headers={'User-Agent': 'Mozilla/5.0'}
)
with urllib.request.urlopen(req, timeout=20) as r:
    html = r.read().decode('utf-8', errors='replace')

print('HTML length:', len(html))
print('cdn.rti.md count:', html.count('cdn.rti.md'))

# Find all src attributes
srcs = re.findall(r'src="([^"]+)"', html)
cdn = [s for s in srcs if 'cdn.rti' in s]
print('cdn img srcs:', len(cdn))
for s in cdn[:5]:
    print(' ', s[:120])

# Check for data-src
datasrcs = re.findall(r'data-src="([^"]+)"', html)
print('data-src count:', len(datasrcs))
for s in datasrcs[:3]:
    print(' ', s[:120])

# Check for __NEXT_DATA__
if '__NEXT_DATA__' in html:
    print('Has __NEXT_DATA__')
    m = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL)
    if m:
        print('NEXT_DATA snippet:', m.group(1)[:600])
else:
    print('No __NEXT_DATA__')

# Find what images are present
imgs = re.findall(r'<img[^>]+>', html)
print('Total img tags:', len(imgs))
for img in imgs[:5]:
    print(' ', img[:200])
