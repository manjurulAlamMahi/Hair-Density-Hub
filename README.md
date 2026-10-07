# Hair Density Hub (Lucknow): static website

Open `index.html` in a browser, or upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Pages are generated: edit `src/`, then run `node build.mjs`
The site has 22 pages (home, treatments + one page per treatment, before & after, doctors, pricing, graft estimator, international patients, about, F.A.Q, blog + articles, contact). They share one header, footer and pop-up, so **don't edit the `.html` files in the root by hand**; they're overwritten on every build.
- `src/data/treatments.mjs`: treatment pages (text, steps, facts, guide prices, FAQs)
- `src/data/content.mjs`: doctors, pricing, before/after cases, reviews, all F.A.Q
- `src/data/posts.mjs`: blog articles
- `src/sections/*.html`, `src/partials/*.html`: shared page parts (hero, booking form, header, pop-up…)
- `build.mjs`: page layouts and menus

Then run `node build.mjs` (Node 18+, no installs needed).

## Demo content to replace
Marked on the page with a dashed **DEMO** tag:
- Doctor names, qualifications and bios (`content.mjs` → `doctors`)
- All prices and packages (`content.mjs` → `packages`, `priceList`; `treatments.mjs` → `price`)
- Before & after cases: drawn illustrations until real patient photos (with consent) are added (`content.mjs` → `cases`)
- Patient reviews (`content.mjs` → `reviews`)

## Things to edit: all in `CONFIG` at the top of `assets/js/main.js`
- `address`: full street address (currently just "Lucknow, Uttar Pradesh"). Shown in the booking panel, contact section and calendar invites.
- `mapQuery`: what the Google map searches for. Set it to the full address once known.
- `videos`: patient / surgery review videos for the Results section, e.g.
  ```js
  videos: [
    { instagram: 'https://www.instagram.com/reel/XXXXXXXXX/' },
    { youtube: 'VIDEO_ID', title: 'Grade 4 · 3000 grafts · 8 months' }
  ],
  ```
  While empty, the section shows three "Watch on Instagram" tiles.
- `openHour`, `closeHour`, `closedDays`: clinic timings for the booking slots.
- `formEndpoint`: optional Formspree / Web3Forms URL to also receive bookings by email (otherwise bookings go via WhatsApp).

- `consultBadge`, `consultLanguages`, `consultOpenHour` / `consultCloseHour`, `consultDaysAhead`: the **Online Consultation** pop-up (hero button). Set the badge to e.g. `'30 min · Google Meet'` once the clinic confirms the call length and platform. Requests go to WhatsApp (and `formEndpoint` if set).

## Confirm with the client
- The **International patients** section says the clinic can help arrange an airport car and a nearby hotel. Remove those steps in `index.html` (`#international`) if the clinic doesn't offer them.
- The consultation languages (default English and Hindi).

## Other assets
- **Hero video**: replace `assets/video/hero-720.mp4` (desktop) and `hero-360.mp4` (mobile) with the clinic's own footage (10–20 s, muted, under ~5 MB).
  Current clip: Mixkit "Man touching his hair close up" (free Mixkit licence).
