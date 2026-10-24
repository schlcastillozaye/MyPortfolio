# Zaye's Portfolio

A cute, pink, glassmorphism personal portfolio for **Kashieca Zaye Z. Castillo**.
Built with only HTML, CSS, and vanilla JavaScript — no frameworks, no build tools.

**Live site:** <https://schlcastillozaye.github.io/portfolio/>
**Repository:** <https://github.com/schlcastillozaye/portfolio>

---

## Files

```
portfolio/
├── index.html          ← all the content lives here
├── style.css           ← all the colors, glass effects, and layouts
├── script.js           ← menu, theme, modal, animations
├── assets/
│   ├── zaye.jpg        ← your profile photo
│   └── favicon.svg     ← the little flower in the browser tab
└── README.md           ← this guide
```

To preview it on your computer:

1. Open the folder in VS Code (or any editor).
2. Double-click `index.html`, **or** run a small local server:

   ```powershell
   python -m http.server 8000
   ```

   Then open <http://localhost:8000> in your browser.

Everything is relative, so it also works on GitHub Pages without changes.

---

## The easiest things to edit

### 1. Your photo

Replace `assets/zaye.jpg` with your new photo, keeping the **same file name**.
Use a square photo (roughly 800 × 800 px works nicely) and keep it under ~300 KB
so the page stays fast. The frame crops it with `object-fit: cover`, so it will
never stretch.

If the image is ever missing, the site automatically shows a pink **Z** placeholder.

### 2. Your name, intro, and bio

Open `index.html`. The content is in order, with comment banners:

- **Hero:** look for `HOME / HERO` — the `<h1>`, `.hero-intro`, and the quick facts.
- **About:** look for `ABOUT` — the bio paragraphs are inside `.about-body`.
- **Quick facts:** the `facts-card` list (name, program, university, etc.).
- **Contact:** look for `CONTACT`. Edit the GitHub links and the note.

There is no fake email, phone number, or social link anywhere. Only real details
you've provided are shown.

### 3. Your projects

Each project has **two places** in `index.html`:

1. **The card** inside `<div class="projects-grid">` — title, short description,
   tags, and status.
2. **The hidden details** inside `<div class="project-data" hidden>` — what the
   project does, your role, technologies, and links. These are shown in the modal.

They are connected by an id:

```html
<button data-project="roadwatch">View details</button>
...
<article id="details-roadwatch" data-title="RoadWatch" data-tags="PHP · MySQL">
```

If you add a new project, copy one card **and** one `project-detail` block, then
give both the same new id (for example `details-myproject` and
`data-project="myproject"`).

#### Adding a repository or live demo link

Inside a project's detail block, find:

```html
<span class="detail-soon">Repository link coming soon</span>
```

Replace it with a real link:

```html
<a class="btn btn--primary btn--small"
   href="https://github.com/your-username/your-repo"
   target="_blank" rel="noopener noreferrer">
  View repository
</a>
```

Only add links you know work. The RoadWatch repository is already linked.

### 4. Adding an email or social links

When you're ready, replace the placeholder note in the contact section with
something like this:

```html
<a class="btn btn--ghost" href="mailto:your-email@example.com">Email me</a>
```

For LinkedIn, add another button:

```html
<a class="btn btn--ghost" href="https://www.linkedin.com/in/your-profile"
   target="_blank" rel="noopener noreferrer">LinkedIn</a>
```

Then remove the sentence about email not being available yet.

### 5. Colors and fonts

All main colors are CSS variables at the top of `style.css`:

```css
:root {
  --bg: #fff7fa;
  --pink: #e58aab;
  --pink-deep: #a8446a;
  --ink: #3b2831;
  ...
}
```

The dark theme is the `html[data-theme="dark"]` block right below it. Fonts are
loaded from Google Fonts in the `<head>` of `index.html` — Quicksand for headings
and DM Sans for body text.

### 6. Projects, skills, and certifications

All of these are plain HTML lists/cards. To add a skill, copy one `<li>` inside a
`.chips` list. To add a certification, copy one `<li class="cert-card ...">` block.
There are **no percentage bars** and no invented proficiency levels.

---

## Interactive features (already working)

- Sticky glass navigation with active-section highlighting
- Mobile hamburger menu (closes on Escape, outside click, or link click)
- Light / dark pink theme, remembered in `localStorage`
- Scroll progress bar
- Reveal-on-scroll animations (disabled for reduced-motion users)
- Project detail modals with keyboard support (`Esc` closes; focus returns)
- Back-to-top button
- Subtle cursor sparkles on desktop only (off for touch and reduced motion)
- Automatic year in the footer
- Photo fallback if `assets/zaye.jpg` is missing

---

## Accessibility notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`)
- Skip-to-content link
- Visible focus outlines
- `aria-expanded` / `aria-controls` on the mobile menu
- Native `<dialog>` element for the project modal
- Decorative elements marked `aria-hidden`
- Text contrast checked against both pink themes
- All motion respects `prefers-reduced-motion`

---

## Publishing on GitHub Pages

This site is already published from the `main` branch, root folder:

**<https://schlcastillozaye.github.io/portfolio/>**

The current settings are:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/ (root)`

Whenever you push a change to `main`, GitHub Pages rebuilds the site
automatically in a minute or two. There is no build step.

If you ever need to set it up again, open the repository on GitHub, go to
**Settings → Pages**, choose those settings, and save. The URL only changes if
you rename the repository or move it to a different account.

---

## A small reminder

The site deliberately does **not** invent awards, work experience, testimonials,
contact details, or repository links. Keep it that way and it will always feel
honest — which is a much better look than a perfect-sounding template.
