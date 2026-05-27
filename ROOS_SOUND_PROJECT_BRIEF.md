# Roos Sound Productions Project Brief

Last updated: 2026-05-27

This document is the working memory for the Roos Sound Productions website. It should help Frank, Codex, and any other IDE or coding agent understand the project quickly, keep the design consistent, and avoid undoing important decisions.

## Project Status

The project is now a proper Git repository.

- Local project folder: `C:\Users\Frank\Downloads\roos`
- GitHub repo: `https://github.com/franksitesza-max/Roos_sound`
- Branch: `main`
- Remote: `origin`
- Initial commit: `9c12c0a Initial commit`
- Current app type: Vite static/multi-page site with React used for selected interactive 3D elements
- Deployment target: Vercel-ready static build
- Build command: `npm run build`
- Dev command: `npm run dev`

The repository is ready for normal development across Codex, VS Code, Cursor, Windsurf, or any other IDE. Git should remain the source of truth.

## Important Viewing Note

Do not judge the site by opening `index.html` directly from the file system.

The site uses Vite module paths such as `/src/main.jsx` and `/js/main.js`. Opening the file directly can make backgrounds, scripts, 3D, CSS, and some sections appear broken or missing.

Correct local workflow:

```powershell
cd C:\Users\Frank\Downloads\roos
npm run dev
```

Then open the local Vite URL, usually:

```text
http://127.0.0.1:5173
```

If that port is busy, Vite will print another local URL.

## Brand Summary

Roos Sound Productions is positioned as a DJ-led events and sound brand built around Michael Roos.

The brand should feel:

- Premium but not stiff
- Nightlife-focused but still professional
- Young, energetic, and event-ready
- Clean enough for weddings and private events
- Cool enough for Stellenbosch student events, housedances, 21sts, themed parties, and festivals
- Modern, glassy, immersive, and high-motion where it matters
- Quote-led rather than hard-price-led for now

The site should not feel like a generic sound rental catalog. The strongest current strategic direction is:

```text
Michael first. DJ experience first. Equipment rentals second.
```

Equipment rentals exist, but the current site should not invent gear details before the final inventory, specs, and photos are confirmed.

## Core Positioning

Main message:

```text
Roos Sound Productions delivers DJ-led events and equipment rental enquiries for events in South Africa, with Michael Roos as the central DJ and face of the brand.
```

Sharper positioning:

- Michael reads the room instead of forcing a fixed playlist.
- Packages start with the event, crowd, venue, and runtime.
- The brand handles housedances, 21sts, weddings, res events, private parties, themed parties, and festivals.
- The experience should feel polished from booking through event flow.
- Rentals are part of the business, but should remain flexible and enquiry-based until the final catalog exists.

## Tone Of Voice

The copy should sound confident, clean, and direct.

Use phrases like:

- "Sets that follow the room."
- "Packages built around Michael behind the decks."
- "Sharp DJ sets."
- "A proper floor."
- "Room to flex."
- "Quote before confirmation."
- "Tell us what kind of night you want."
- "Michael plays for the room, not a fixed playlist."

Avoid:

- Corporate filler
- Overexplaining the website
- Fake-sounding testimonials that are too polished
- Overpromising gear details that have not been confirmed
- Long blocks of text
- Hard pricing until Frank confirms exact packages
- Making rentals seem more important than DJ services

## Current Site Structure

The site is a multi-page Vite build with four HTML entry points.

### `index.html`

Purpose: Home page and strongest first impression.

Current sections:

- Immersive glass hero with "Roos Sound Productions"
- Hero CTAs: Book an Event, View Packages
- DJ-first service snapshot
- Three feature cards: Crowd Reading, DJ-Led Planning, Flexible Nights
- Previous Venues section with animated/fluid logo ribbon
- Client Feedback player
- About Roos Sound section
- Team portraits for Michael Roos and Hendrik

Strategic role:

- Make Roos Sound feel premium immediately
- Establish Michael as the core of the offering
- Show social proof through venues and reviews
- Keep equipment rentals visible but secondary

### `packages.html`

Purpose: Quote-based DJ packages.

Current packages:

- Compact DJ Set
- Standard Event Set
- Full Night DJ

Current pricing style:

```text
Quote
```

This is intentional. Do not add exact package prices until Frank confirms them.

Strategic role:

- Keep packages simple and flexible
- Avoid pretending final pricing is known
- Move users toward a quote request
- Push rental details to the equipment page

### `equipment.html`

Purpose: Future equipment rental catalog placeholder.

Current strategy:

- No invented gear
- Placeholder cards only
- Status: Awaiting details
- Quote: On request

This page exists so the site structure is ready, but it must not make claims about stock, specs, or pricing until the final rental inventory is provided.

### `dj.html`

Purpose: Michael Roos DJ profile and booking page.

Current highlights:

- "DJ Michael Roos"
- "Sets that follow the room."
- Genre range: disco, oldies, throwbacks, amapiano, sokkie, house, techno, club remixes
- Stats: 80+ shows, 10+ venues, 5+ years
- Performance history: housedances, 21sts, weddings
- Booking section
- WhatsApp-first contact flow
- Email displayed for longer notes

Primary conversion:

```text
WhatsApp Michael directly
```

Current WhatsApp number:

```text
+27 72 279 1279
```

Current email:

```text
info@roossound.co.za
```

## Visual Direction

The design language is immersive liquid glass with nightlife energy.

Important qualities:

- Dark base
- Bright cyan/blue/pink highlights
- Glass panels
- Light refraction feeling
- 3D venue ribbon
- Animated audio/wave details
- Strong hero typography
- Button and card highlights that feel like glossy event tech
- Responsive layout that still feels premium on mobile

The site should feel like "sound, motion, light, glass, club energy" rather than a plain business brochure.

## Brand Colors

Defined in `css/styles.css`.

Core background:

```css
--bg: #05070b;
body background: #020305;
```

Surfaces:

```css
--surface: rgba(9, 14, 22, .68);
--surface-strong: rgba(10, 16, 25, .86);
```

Glass:

```css
--glass: rgba(110, 190, 255, .105);
--glass-strong: rgba(126, 210, 255, .18);
--glass-edge: rgba(209, 244, 255, .36);
```

Lines and borders:

```css
--line: rgba(140, 210, 255, .24);
--line-strong: rgba(178, 232, 255, .48);
```

Text:

```css
--text: #f6f7fb;
--muted: #a7b0c3;
--dim: #69748a;
```

Accent colors:

```css
--cyan: #21f0d2;
--blue: #5aa7ff;
--pink: #ff4f91;
--amber: #ffc857;
--green: #55f19a;
```

Main gradients:

```css
--grad: linear-gradient(135deg, var(--cyan), var(--blue) 48%, var(--pink));
--grad-hot: linear-gradient(135deg, var(--amber), var(--pink));
```

Design guidance:

- Cyan and blue are the main "Roos Sound tech/glass" colors.
- Pink is used as heat, nightlife, and emphasis.
- Amber is used for warmth, stars, progress, and energetic accents.
- Avoid turning the site into a one-color blue/purple theme.
- Keep the palette dark and luminous, not flat.

## Fonts

Fonts are loaded from Google Fonts in each HTML page:

```html
Space Grotesk: 600, 700, 800, 900
Inter: 400, 500, 600, 700, 800, 900
```

Usage:

- `Inter` is the body and UI font.
- `Space Grotesk` is used for headings, stats, stronger brand moments, and display text.

Typography rules:

- Large hero type is allowed only in hero contexts.
- Compact cards should use tighter, smaller headings.
- Letter spacing should generally be `0` for headings.
- Avoid negative letter spacing.
- Keep copy short and scannable.
- Text must not overlap or overflow on mobile.

## Logo And Brand Mark

The current brand mark is generated in `js/main.js` through `iconBars()`.

It is a simple audio-bar icon in a glassy gradient square.

Current nav brand text:

```text
ROOS SOUND
```

The full brand name remains:

```text
Roos Sound Productions
```

Guidance:

- Use "Roos Sound" in compact UI.
- Use "Roos Sound Productions" in main hero, titles, SEO, and formal copy.
- Keep the mark clean and sound-related.
- Do not replace it with a generic speaker icon unless there is a deliberate redesign.

## Current Assets

Root asset folder:

- `assets/hendrik.jpg`
- `assets/michael-roos.jpg`
- `assets/roos-vinyl.png`
- Venue logo `.webp` files

Public asset folder:

- `public/assets/3d/bar.glb`
- `public/assets/3d/cube.glb`
- `public/assets/3d/lens.glb`
- Duplicated public image assets used by Vite public paths

Venue logos currently used:

- MET
- Simonsberg
- Stellenbosch Choir
- Huis Marais
- L'Avenir
- Zandvliet
- Ashanti
- Idiom
- Dylan Lewis Sculpture Garden

Team/person assets:

- Michael Roos portrait
- Hendrik portrait
- Roos vinyl visual

Current decision:

- Duplicate-looking assets in root and `public` were left in place because they are byte-for-byte matches and the current build references both path styles.
- Do not delete asset folders casually. Asset cleanup should be a separate intentional pass.

## Interaction System

Global JavaScript lives in `js/main.js`.

It currently handles:

- Injecting the nav
- Injecting the footer
- Mobile menu open/close
- Sticky nav scrolled state
- Wave bar generation
- Portrait image ready state
- Reveal-on-scroll animations
- Filters
- Tabs
- Review carousel/player

The nav and footer are injected into all pages instead of repeated directly in each HTML page.

This means:

- To change nav links, edit `js/main.js`.
- To change footer copy or links, edit `js/main.js`.
- To change review carousel data, edit `js/main.js`.

Current review data:

- Simonsberg Met
- Eendrag
- Huis Marais
- Stellenbosch Choir

The review player is designed like a music/audio player:

- Now Playing label
- Progress bar
- Time markers
- Previous/play/next controls
- Dots
- 5-star visual rating

## React And 3D System

React is used selectively, not for the whole site.

Main React entry:

```text
src/main.jsx
```

It mounts the fluid venue ribbon into:

```html
<div id="fluid-venue-ribbon-root"></div>
```

The fluid venue ribbon only runs when:

- The element exists
- Screen width is at least 900px
- User does not prefer reduced motion

This is intentional for performance and accessibility.

### `src/FluidVenueRibbon.jsx`

Purpose:

- Desktop 3D animated venue-logo ribbon
- Liquid glass logo cards
- Moving horizontal loop
- Three.js canvas background texture

Libraries:

- `three`
- `@react-three/fiber`
- `@react-three/drei`

Important visual traits:

- `MeshTransmissionMaterial`
- Rounded 3D glass cards
- Subtle rotation per card
- Cyan and pink point lighting
- Warm/dark canvas-generated backdrop
- Fallback non-React logo ribbon exists in the HTML/CSS

### `src/FluidGlass.jsx`

Purpose:

- General reusable glass/lens/bar/cube 3D component.
- Currently included in the repo but not the main active visible experience on the home page.

Uses:

- GLB models from `/assets/3d`
- FBO buffer
- transmission material
- pointer-following lens/cube or bottom-locked bar
- image and text scroll scene

Guidance:

- Keep it if future hero or interactive sections need it.
- Do not remove unless there is a planned simplification.

## CSS Architecture

Main stylesheet:

```text
css/styles.css
```

The stylesheet contains:

- CSS reset
- root variables
- layout primitives
- nav
- mobile menu
- hero system
- glass panels
- cards
- badges
- venue ribbon
- review player
- stats
- package cards
- equipment cards
- booking/contact panels
- footer
- reveal animations
- responsive breakpoints

Important global patterns:

- `.container`
- `.section`
- `.section-tight`
- `.grid-2`
- `.grid-3`
- `.grid-4`
- `.auto-grid`
- `.glass`
- `.card`
- `.badge`
- `.btn`
- `.gradient-text`
- `.reveal`

Design rules already present:

- Cards use glass gradients, inner highlights, and glow.
- Buttons are pill-shaped, glossy, and high-contrast.
- The main page background stays extremely dark.
- Motion respects `prefers-reduced-motion`.
- The venue ribbon switches to a more mobile-friendly/fallback mode under 900px.
- The nav becomes hamburger-driven under 760px.

## Layout Strategy

Home page:

- The first viewport should signal Roos Sound Productions clearly.
- The hero is centered and immersive, not a split marketing hero.
- The brand name is the main visual object.
- The next section should feel close enough that the page does not feel empty.

Packages:

- Simple three-card structure.
- No prices until confirmed.
- Keep CTA to booking.

Equipment:

- Placeholder catalog structure.
- Do not invent products.
- Designed for future catalog insertion.

DJ:

- Michael-led page.
- Strong genre and event credibility.
- Conversion through WhatsApp.

## UX Preferences And Working Style

Frank likes:

- Agentic work: make decisions, do the thing, then report clearly.
- Complete setup, not half-measures.
- Clean formatting and correct repo hygiene.
- Visual polish that actually feels designed.
- Bold, premium, modern visual direction.
- Immersive effects when they support the brand.
- Strong first impressions.
- Practical workflow advice.
- GitHub as a source of truth so multiple IDEs can work safely.

Frank does not like:

- Being told only what to do when the agent can do it.
- Generic bland layouts.
- Broken local viewing because files are opened incorrectly.
- Unclear project state.
- Missing Git/repo setup.
- Invented details about gear, pricing, or business specifics.
- Overly stiff or corporate copy.
- Lazy summaries that miss the small details.

Working principle:

```text
If the request is actionable, implement it. Ask only when blocked by missing credentials, repo URL, exact brand data, or business facts that cannot be inferred.
```

## Git And Multi-IDE Workflow

This repo should work well across multiple IDEs.

Recommended daily flow:

```powershell
cd C:\Users\Frank\Downloads\roos
git status
git pull
npm run dev
```

After edits:

```powershell
npm run build
git status
git add .
git commit -m "Describe the change"
git push
```

Rules:

- Pull before working if another IDE or agent may have pushed changes.
- Commit meaningful chunks.
- Do not commit `node_modules`, `dist`, `.codex`, `.vercel`, logs, or environment files.
- Use GitHub as the handoff point between tools.
- If two tools edit the same files, commit or stash before switching context.
- Do not manually edit files in `dist`; it is build output.

Current `.gitignore` protects:

- `node_modules/`
- `dist/`
- `build/`
- `.env`
- `.env.*`
- `.codex/`
- `.vercel/`
- logs
- common OS/editor files

## Build And Deployment

Build:

```powershell
npm run build
```

Preview:

```powershell
npm run preview
```

Vercel config:

```text
vercel.json
```

Current Vercel settings include:

- Long immutable cache for `/assets/(.*)`
- Revalidation for HTML files
- Shorter cache for `/css/(.*)` and `/js/(.*)`
- Security headers:
  - Content Security Policy
  - Strict Transport Security
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy
  - Cross-Origin-Opener-Policy

Important:

- If adding external scripts, forms, analytics, maps, or APIs, update the CSP in `vercel.json`.
- Current CSP is strict and mostly self-hosted.

## Known Build Warning

`npm run build` succeeds.

There is a known Vite warning:

```text
Some chunks are larger than 500 kB after minification.
```

Reason:

- The Three.js / React Three Fiber venue ribbon creates a large chunk.

Current decision:

- This is acceptable for now because the 3D ribbon is a deliberate premium visual feature.
- Future optimization could use more aggressive code-splitting, lazy loading, or chunk configuration.

## Previous Fixes Already Made

Before the initial GitHub push:

- Initialized a local Git repo in `C:\Users\Frank\Downloads\roos`
- Added `.gitignore`
- Ensured `node_modules`, `dist`, `.codex`, logs, and local env files are ignored
- Updated HTML script tags from classic scripts to Vite-friendly modules:

```html
<script type="module" src="/js/main.js"></script>
```

- Ran `npm run build` successfully
- Created initial commit
- Added GitHub remote
- Pushed `main` to `https://github.com/franksitesza-max/Roos_sound`

## Current File Map

Important files:

```text
index.html
packages.html
equipment.html
dj.html
css/styles.css
js/main.js
src/main.jsx
src/FluidVenueRibbon.jsx
src/FluidGlass.jsx
package.json
vite.config.js
vercel.json
.gitignore
```

Important folders:

```text
assets/
public/assets/
public/assets/3d/
src/
css/
js/
```

Generated/local folders:

```text
node_modules/
dist/
.codex/
```

These should not be committed.

## Content Facts To Preserve

Brand/business:

- Brand: Roos Sound Productions
- Short UI name: Roos Sound
- Main person: Michael Roos
- Support person: Hendrik
- Location context: Stellenbosch and South Africa
- Core service: DJ services
- Secondary service: equipment rental enquiries

Event types:

- Housedances
- 21sts
- Weddings
- Res events
- Private parties
- Themed parties
- Festivals

Genres:

- Amapiano
- Gqom
- Isighubu
- Sokkie
- Afrikaans
- Disco
- Oldies
- Throwbacks
- House
- Techno
- Club remixes

Proof points currently shown:

- 80+ shows
- 10+ venues
- 5+ years

Venues/residences/events mentioned:

- Simonsberg Met
- Eendrag
- Huis Marais
- Huis Ubuntu
- Irene
- Erica
- Monica
- Stellenbosch Choir
- MET
- L'Avenir
- Zandvliet
- Ashanti
- Idiom
- Dylan Lewis Sculpture Garden

## Future Improvements

Good next changes when Frank is ready:

- Add final equipment inventory with real photos, specs, and availability notes.
- Replace placeholder rental cards with real catalog items.
- Confirm package names, runtime limits, add-ons, and pricing rules.
- Add real client testimonials if available.
- Add real event gallery images or short video loops.
- Consider adding a contact form only if there is a confirmed backend/email flow.
- Optimize the Three.js chunk if performance becomes a problem.
- Remove duplicate asset copies only after verifying all references.
- Add a README for developer setup if collaborators will clone the repo.
- Add deployment notes once the Vercel project is connected.

## Non-Negotiables

- Do not invent pricing.
- Do not invent rental stock.
- Do not make equipment rentals the main brand story.
- Do not remove the premium glass/nightlife design language without a deliberate redesign.
- Do not open `index.html` directly and treat that as a valid QA check.
- Do not commit generated folders.
- Do not make broad refactors during small content edits.
- Do not break the strict Vercel security headers without understanding the deployment effect.
- Do not lose the Michael-first positioning.

## Short Handoff Summary For Another Agent

Roos Sound Productions is a Vite multi-page website for a DJ-led event brand in Stellenbosch/South Africa. The design is dark, premium, glassy, and animated, with cyan/blue/pink accents, Space Grotesk headings, Inter body text, and a React Three Fiber 3D venue-logo ribbon on desktop. Michael Roos is the central service offering; equipment rentals are intentionally secondary and currently placeholder-only until real inventory is provided. Keep package pricing quote-based. Use GitHub as source of truth. Run the app with `npm run dev`, not by opening `index.html` directly.
