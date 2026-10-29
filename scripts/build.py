"""Build the site for a regular static host such as GitHub Pages.

index.html is written for the Claude artifact host, which adds the document
skeleton (doctype, <html>, <head>, <body>) at publish time. This script adds
that skeleton itself and copies the page and its files into an output folder.

    python3 scripts/build.py [out_dir]    # default: dist
"""
import pathlib
import re
import shutil
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
FILES = ["styles.css", "main.js", "models.js"]
DIRS = ["assets", "brand"]

# The site is still a preview with placeholder content, so keep search engines out.
# Set to False once the client signs off and the site goes live.
NOINDEX = True

# The title, meta, link and comment tags at the top of index.html belong in <head>
HEAD_TAGS = re.compile(r"\A(?:\s*(?:<title>.*?</title>|<meta\b[^>]*>|<link\b[^>]*>|<!--.*?-->))*", re.S)


def wrap(page):
    head = HEAD_TAGS.match(page).group(0)
    body = page[len(head):]
    robots = '\n<meta name="robots" content="noindex">' if NOINDEX else ""
    return (
        '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
        f"{robots}\n{head.strip()}\n</head>\n<body>{body.rstrip()}\n</body>\n</html>\n"
    )


def build(out):
    if out == ROOT or out in ROOT.parents:
        sys.exit(f"Refusing to build into {out}: it would delete the project")
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    page = (ROOT / "index.html").read_text(encoding="utf-8")
    (out / "index.html").write_text(wrap(page), encoding="utf-8")
    for name in FILES:
        shutil.copy2(ROOT / name, out / name)
    for name in DIRS:
        shutil.copytree(ROOT / name, out / name)
    # Serve files as they are, without GitHub Pages' Jekyll step
    (out / ".nojekyll").touch()


if __name__ == "__main__":
    out = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "dist"
    build(out.resolve())
    print(f"Built {out}")
