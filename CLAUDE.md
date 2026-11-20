# Geo Games - guide for Claude

Kids' geography games: plain HTML/CSS/vanilla JS (ES modules), no build step, no dependencies.
Installable PWA that works offline. Hosted on GitHub Pages (auto-deploys on push to `main`).
The audience is elementary school kids: keep text short, friendly, and encouraging.

## Layout
- `index.html` - page shell (tabs, stats, card). Rarely changes.
- `js/main.js` - renders tabs/stats/rounds for ANY game that follows the round contract.
- `js/core.js` - shared helpers (`pick`, `shuffle`, `twoChoice`) and scoring (`createScorer`). All points/streak logic lives here.
- `js/games/<id>.js` - one file per game.
- `js/games/index.js` - registry; the order of `GAMES` is the tab order.
- `data/*.js` - question data (flags, shapes). Edit data here, not in game logic.
- `sw.js` - service worker (offline). `manifest.webmanifest` - install info.

## Round contract
A game is a default-exported object: `{ id, label, newRound() }`.
`newRound()` returns `{ prompt, stage, options, answer }`:
- `prompt` - question text
- `stage` - HTML string shown above the buttons (an emoji, an SVG, an image tag...)
- `options` - array of button labels (main.js shuffles them; two-choice by default)
- `answer` - the exact string in `options` that is correct

## Adding a new game
1. Create `js/games/<id>.js` following the contract (copy `flags.js`).
2. Put its data in `data/<id>.js` if it needs any.
3. Import it and add it to `GAMES` in `js/games/index.js`.
4. Add every NEW file to the `ASSETS` list in `sw.js` (otherwise it will not work offline).
5. Test with a local server, not by double-clicking: `python3 -m http.server 8000`.

## Rules
- Everything must work offline: no CDN links, no remote images or fonts. Bundle assets in the repo.
- Keep vanilla JS. Do not add frameworks or a build step without asking.
- Keep colors as CSS variables in `css/style.css` (light and dark mode both supported).
- Wrap `localStorage` access in try/catch (see `core.js`).
- Use relative paths only (the site is served from a sub-path on GitHub Pages).
- Rename or delete files? Bump `CACHE` in `sw.js` so old caches are cleared.

## Known to-dos
- Shapes use rough hand-made outlines: replace with simplified Natural Earth data.
- Flags use emoji, which do not render on Windows: bundle SVG flags (flag-icons) in `assets/flags/`.
- More gamification: levels, badges, daily goal.
