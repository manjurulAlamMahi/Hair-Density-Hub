# Hair Density Hub (Lucknow): static website

Open `index.html` in a browser, or upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).

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

## Other assets
- **Hero video**: replace `assets/video/hero-720.mp4` (desktop) and `hero-360.mp4` (mobile) with the clinic's own footage (10–20 s, muted, under ~5 MB).
  Current clip: Mixkit "Man touching his hair close up" (free Mixkit licence).
