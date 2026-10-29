# ZHIJIAJI Rear Display Case

Single-page product site for the ZHIJIAJI (智佳际) Rear Display Case. English only, no prices or checkout: it shows the product, its features, the three iPhone 17 models and their colors.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Page markup |
| `styles.css` | All styles; colors are tokens at the top, with a dark theme |
| `main.js` | Model cards, color dialog, header, film controls, scroll motion |
| `models.js` | Model and color data (edit this to change models, colors or photos) |
| `assets/` | Brand film, its poster frame, feature and in-the-box images |
| `brand/` | Logo redrawn as SVG (wordmark, symbol, favicon) and its preview page |
| `scripts/build.py` | Builds `dist/` for GitHub Pages or any static host |
| `scripts/serve.py` | Local preview server |
| `.github/workflows/pages.yml` | Builds and deploys to GitHub Pages on every push to `main` |

## Preview locally

```bash
python3 scripts/serve.py
```

Then open http://127.0.0.1:4173.

## Replacing placeholders

- **Models and colors**: edit `models.js`. Set `image` on a color to a photo path (a transparent PNG works best) and that photo replaces the drawn illustration on the card and in the dialog.
- **Feature photos**: replace `assets/feature-*.jpg` (4:3). They are stills from the brand film for now; the fill light one is a low-resolution crop.
- **Logo**: replace the files in `brand/` with the client's vector logo when it arrives. The wordmark is also inlined at the top of `index.html`.
- **Contact**: the Email, Instagram and TikTok rows in `index.html` say "Coming soon".

## Hosting

The site is published in two places from the same files:

- **Claude artifact**: `index.html` is published as is, with the other files alongside. It has no `<!doctype>`, `<html>`, `<head>` or `<body>` because the artifact host adds them.
- **GitHub Pages**: `scripts/build.py` adds that document skeleton and copies everything into `dist/`; the workflow deploys `dist/` on every push to `main`.

The build adds `<meta name="robots" content="noindex">` while the site is a preview. Set `NOINDEX = False` in `scripts/build.py` when it goes live.
