"""Local preview server.

Serves the project folder as is, except index.html, which gets the same
document skeleton as the GitHub Pages build (see build.py), so the page
renders in standards mode the way it does once published.

    python3 scripts/serve.py [port]
"""
import http.server
import sys

from build import ROOT, wrap


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        if self.path.split("?")[0] in ("/", "/index.html"):
            page = wrap((ROOT / "index.html").read_text(encoding="utf-8")).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(page)))
            self.end_headers()
            self.wfile.write(page)
            return
        super().do_GET()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    print(f"Serving {ROOT} at http://127.0.0.1:{port}", flush=True)
    http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
