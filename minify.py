import re
import os

def minify_css(css):
    # Remove comments
    css = re.sub(r'/\*[\s\S]*?\*/', '', css)
    # Remove newlines and extra spaces
    css = re.sub(r'\s+', ' ', css)
    # Remove spaces around specific characters
    css = re.sub(r'\s*([{}:;,>+~])\s*', r'\1', css)
    return css.strip()

def minify_js(js):
    # Remove single line comments
    js = re.sub(r'//.*', '', js)
    # Remove multi-line comments
    js = re.sub(r'/\*[\s\S]*?\*/', '', js)
    # Remove console.log
    js = re.sub(r'console\.log\([^)]*\);?', '', js)
    # Remove newlines and extra spaces
    js = re.sub(r'\s+', ' ', js)
    # Minimal space removal (simplistic)
    js = re.sub(r'\s*([=+\-*/<>{}();,])\s*', r'\1', js)
    return js.strip()

def minify_html(html):
    # Remove comments (except security meta tags if any, but let's just remove all for minification except the ones we strictly need - actually standard HTML comments)
    html = re.sub(r'<!--[\s\S]*?-->', '', html)
    # Remove newlines and extra spaces between tags
    html = re.sub(r'>\s+<', '><', html)
    html = re.sub(r'\s+', ' ', html)
    return html.strip()

with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()
    
# Clean orphaned variables
css = re.sub(r'--bg-cream:\s*[^;]+;', '', css)

min_css = minify_css(css)
with open("style.min.css", "w", encoding="utf-8") as f:
    f.write(min_css)

with open("main.js", "r", encoding="utf-8") as f:
    js = f.read()

min_js = minify_js(js)
with open("main.min.js", "w", encoding="utf-8") as f:
    f.write(min_js)

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

html = html.replace('style.css', 'style.min.css').replace('main.js', 'main.min.js')
min_html = minify_html(html)
with open("index.min.html", "w", encoding="utf-8") as f:
    f.write(min_html)

print("Minification complete.")
