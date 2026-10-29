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
| `scripts/serve.py` | Local preview server |

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

`index.html` has no `<!doctype>`, `<html>`, `<head>` or `<body>`: the Claude artifact host adds them when the page is published. Before moving to another static host, wrap the file in a normal document (the skeleton in `scripts/serve.py` is enough). Everything else is plain static files.
