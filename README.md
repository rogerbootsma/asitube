# ASITube

Static homepage and editable brand kit for **asitube.com**, a Metaversal Arts project. Companion domain **asitube.io** redirects to the main site. Channel: https://www.youtube.com/@ASI-Tube. Research connection: https://asimulation.io.

## Local development

Run `node preview.mjs`, then open http://127.0.0.1:4178. Run `node validate.mjs` before publishing. No dependency installation or build is required for the website. GitHub Actions deploys only `dist/`.

## Scope

The site presents the vision for simulated-world broadcasts, personal AI filmmaking studios, and branching timelines. These platform services are explicitly described as in development. The world artwork and authored two-path story sketch run entirely in the browser. There is no signup, streaming backend, AI generation API, visitor tracking, or browser persistence. The contact panel follows ASimulation's local email-draft flow, offering Gmail, an email app, or copying after preparation. It does not submit messages to a server or send email automatically. Local legal-notice and privacy pages use the existing Metaversal Arts business information.

## Brand assets

Editable vector masters and ready-to-upload PNGs are in `dist/brand/`. Run `node create-brand.mjs` to regenerate them (requires `sharp`, available in the bundled local runtime; alternatively install sharp in a development environment).

- `youtube-banner-2560x1440.png`: channel banner, with essential content inside the central mobile-safe region.
- `youtube-banner-mobile-preview.png`: cropped layout preview; do not upload this as the channel banner.
- `youtube-avatar-800.png`: profile picture.
- `video-watermark-150.png`: transparent video watermark.
- `asitube-logo.svg` / `asitube-mark.svg`: editable wordmark and symbol.
- `asitube-mark-transparent.png`: transparent 800px mark.
- `social-card-1200x630.png`: link preview artwork.

Artwork and original copy © 2026 Metaversal Arts / Roger Bootsma. No third-party libraries, fonts, or stock images are shipped with the website.

## Hosting

See [deployment notes](docs/DEPLOYMENT.md) for current Pages and domain status. Site source is isolated in this folder; the existing Metaversal Arts and ASimulation projects are unchanged.
