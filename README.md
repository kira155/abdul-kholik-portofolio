# Abdul Kholik Portfolio

A concise, responsive portfolio for a Staff Process Engineer focused on process improvement, production analytics, automation, and manufacturing digitalization.

## Main sections

- Profile
- What I Deliver
- On the Shop Floor — real photos from an October 2026 production-tools briefing, with a responsive gallery and photo lightbox (keyboard arrows, touch swipe)
- Featured Projects
- Career Journey
- Tools & Expertise
- Contact

All five briefing images are optimized locally in `assets/field-notes/` as WebP. The professional portrait remains unchanged. The portfolio does not rely on a server/database or external asset CDN.

The project archive is collapsed by default so the main page stays focused while additional manufacturing dashboards remain available.

## Run locally

Open `index.html` directly in a browser, or start a local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Upload the contents of this folder to the `abdul-kholik-portfolio` repository.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**.
4. Select the `main` branch and the `/root` folder.
5. Save and wait for deployment to complete.

## Structure

- `index.html` — page structure and content
- `styles.css` — themes and responsive layout
- `script.js` — navigation, animations, theme switching, modals, and email copy
- `assets/` — profile photo and project screenshots

## CV download

The website includes `assets/Abdul-Kholik-CV.pdf`, linked from the navigation, hero section, and contact section. The professional contact email used across the website is `abdulkholikk953@gmail.com`.
