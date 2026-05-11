import urllib.request, re

url = 'https://rti.md/product/cantar-dibal-wind-serie-500'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml',
}
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=20) as r:
    html = r.read().decode('utf-8', errors='replace')

uuid = '2a7ba239-64cb-402f-8ae6-edeb55b7ef08'
idx = html.find(uuid)
if idx >= 0:
    print('Found UUID at index', idx)
    print(repr(html[max(0, idx-300):idx+100]))
else:
    print('UUID not in HTML, searching for image patterns...')
    imgs = re.findall(r'https?://[^"\'<>\s]+(?:png|jpg|jpeg|webp)', html)
    for i in imgs[:20]:
        print(i)
