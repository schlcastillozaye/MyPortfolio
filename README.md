# Zaye's Portfolio

Built with HTML, CSS, and vanilla JavaScript—no frameworks or build tools.

**Live site:** https://schlcastillozaye.github.io/MyPortfolio/

**Repository:** https://github.com/schlcastillozaye/MyPortfolio

---

## Project structure

```text
MyPortfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── zaye.jpg
│   └── favicon.svg
└── README.md
```

- `index.html` contains the main content.
- `style.css` handles the colors, glass effects, and layouts.
- `script.js` powers the menu, theme switcher, modals, and animations.
- `assets/` stores images and icons.

---

## Running the project locally

You can preview the site in two ways.

**Option 1:** Open `index.html` directly in your browser.

**Option 2:** Run a simple local server.

```powershell
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

The project uses relative file paths, so it works on GitHub Pages without additional configuration.

---

## Editing the portfolio

### Update your profile photo

Replace `assets/zaye.jpg` with your new photo while keeping the same file name.

A square image around **800 × 800 px** works best. Keeping it under **300 KB** helps the page load faster.

If the image is missing, the site automatically displays a pink **Z** placeholder.

### Update your name, intro, and bio

Open `index.html`.

The sections are organized with clear comment banners.

- **Home / Hero** – edit your heading, introduction, and quick facts.
- **About** – update your biography inside `.about-body`.
- **Quick facts** – edit your personal information card.
- **Contact** – update your GitHub links or future contact details.

The site intentionally avoids fake emails, phone numbers, or social links.

### Update your projects

Each project has two connected parts inside `index.html`.

1. The project card inside `projects-grid`.
2. The hidden project details shown inside the modal.

They are linked using matching IDs.

Example:

```html
<button data-project="roadwatch">View details</button>

<article id="details-roadwatch" data-title="RoadWatch">
```

When adding a new project, duplicate both sections and give them matching IDs.

### Add a repository or live demo

Replace:

```html
<span class="detail-soon">Repository link coming soon</span>
```

with:

```html
<a class="btn btn--primary btn--small"
   href="https://github.com/your-username/your-repo"
   target="_blank"
   rel="noopener noreferrer">
  View repository
</a>
```

Only add links that already work.

### Add an email or social links

When you're ready, add a button like this:

```html
<a class="btn btn--ghost" href="mailto:your-email@example.com">Email me</a>
```

For LinkedIn:

```html
<a class="btn btn--ghost"
   href="https://www.linkedin.com/in/your-profile"
   target="_blank"
   rel="noopener noreferrer">
  LinkedIn
</a>
```

Then remove the placeholder contact note.

---

## Customizing the design

The main colors are defined at the top of `style.css`.

```css
:root {
  --bg: #fff7fa;
  --pink: #e58aab;
  --pink-deep: #a8446a;
  --ink: #3b2831;
}
```

The dark theme is inside the `html[data-theme="dark"]` section.

The site uses **Quicksand** for headings and **DM Sans** for body text.

---

## Updating skills and certifications

The skills and certifications are simple HTML cards and lists.

- Duplicate a `<li>` inside `.chips` to add another skill.
- Duplicate a `<li class="cert-card">` block to add another certification.

The portfolio intentionally avoids fake skill percentages or exaggerated proficiency levels.

---

## Interactive features

Everything below is already working.

- Sticky glass navigation with active section highlighting
- Mobile menu with keyboard support
- Pink light and dark mode with saved preference
- Scroll progress bar
- Reveal-on-scroll animations
- Project detail modals
- Back-to-top button
- Subtle desktop cursor sparkles
- Automatic footer year
- Profile photo fallback

---

## Accessibility

The portfolio includes accessibility improvements such as:

- Semantic HTML landmarks
- Skip-to-content link
- Visible keyboard focus states
- Accessible mobile navigation
- Keyboard-friendly project modals
- Decorative elements marked as hidden from screen readers
- Motion that respects `prefers-reduced-motion`

---

## GitHub Pages deployment

The portfolio is configured to use GitHub Pages with the following settings:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/ (root)`

Whenever you push changes to the `main` branch, GitHub Pages automatically rebuilds the site.

If you need to configure it again, open **Settings → Pages**, select those settings, and save.

**Live site:** https://schlcastillozaye.github.io/MyPortfolio/

---

## A small reminder

This portfolio is meant to reflect real work and real progress.

Instead of filling it with made-up awards, experience, testimonials, or contact details, keep it honest and update it as you grow. I think that makes it feel much more genuine than trying to make it look perfect.
