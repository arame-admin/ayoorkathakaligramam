import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
url = 'https://www.youtube.com/watch?v=sYGsqFtojDc'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        m_title = re.search(r'<title>(.*?)</title>', html)
        if m_title:
            print('Title:', m_title.group(1))
        m_desc = re.search(r'<meta name="description" content="([^"]*)"', html)
        if m_desc:
            print('Description:', m_desc.group(1))
except Exception as e:
    print('Fetch error:', e)
