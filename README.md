# Geo Games

Flag and country-shape guessing games for kids. Works offline as an installable web app.

## Run locally
    python3 -m http.server 8000
Then open http://localhost:8000 (ES modules do not load from file://).

## Deploy (GitHub Pages)
1. Push this folder to a new GitHub repo on the `main` branch.
2. In the repo: Settings > Pages > Source: **GitHub Actions**.
3. Every push to `main` now deploys automatically. Your URL: `https://<username>.github.io/<repo>/`.

## Use offline / install
Open the site once with internet. The footer shows "Offline ready". After that it works with no connection.
On iPad/iPhone: Share > Add to Home Screen. On Android/Chrome: menu > Install app.

## Change it with Claude
Open the repo with Claude Code. It reads `CLAUDE.md` automatically and follows the project conventions.
