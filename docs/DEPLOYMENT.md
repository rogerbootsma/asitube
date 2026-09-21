# ASITube deployment handoff

Updated 22 September 2026. This is a static concept homepage, not a streaming or AI production backend.

## Published projects

- Main source: https://github.com/rogerbootsma/asitube
- Main address: https://asitube.com
- Brand downloads: https://asitube.com/identity.html
- Redirect source: https://github.com/rogerbootsma/asitube-redirect
- Companion address: https://asitube.io

The main repository publishes `dist/` through `.github/workflows/pages.yml`. GitHub Pages must use **GitHub Actions** as its source. The initial successful deployment was run [35661056640](https://github.com/rogerbootsma/asitube/actions/runs/35661056640), attempt 2. The custom domain is configured in repository Settings → Pages; `dist/CNAME` also records the intended hostname.

The redirect repository publishes `main` / repository root and binds `asitube.io`. It uses `location.replace` to send visitors to the fixed origin `https://asitube.com`, preserving path, query, and fragment. HTML refresh and a visible homepage link provide fallbacks. This is a browser redirect, not an HTTP 301. GitHub Pages provides the companion domain's certificate; Namecheap's ordinary URL forwarding does not provide HTTPS for the source hostname.

## DNS

The owner explicitly approved replacing the parked main domain's JulyDNS nameservers with GoDaddy defaults. GoDaddy now uses `ns27.domaincontrol.com` and `ns28.domaincontrol.com`.

| Provider / domain | Type | Host | Value |
| --- | --- | --- | --- |
| GoDaddy / asitube.com | A | @ | 185.199.108.153 |
| GoDaddy / asitube.com | A | @ | 185.199.109.153 |
| GoDaddy / asitube.com | A | @ | 185.199.110.153 |
| GoDaddy / asitube.com | A | @ | 185.199.111.153 |
| GoDaddy / asitube.com | CNAME | www | rogerbootsma.github.io |
| Namecheap / asitube.io | ALIAS | @ | rogerbootsma.github.io |
| Namecheap / asitube.io | CNAME | www | rogerbootsma.github.io |

Namecheap email-forwarding settings were preserved. GoDaddy default SOA, nameserver, domain-connect, and DMARC records were retained. A local pre-change snapshot is kept in ignored `qa/dns-before.md`.

Public resolvers 1.1.1.1, 8.8.8.8, and 9.9.9.9 returned GitHub Pages addresses for both apex domains after the changes. DNS caching may temporarily retain older answers.

## HTTPS status

Both custom domains are saved in GitHub Pages and both DNS checks are successful. GitHub has requested TLS certificates. At this checkpoint, certificate issuance remains pending. The **Enforce HTTPS** controls are disabled until issuance completes. Do not bypass certificate warnings. Recheck both repositories' Settings → Pages after propagation, enable **Enforce HTTPS**, then verify the apex and www URLs and the `.io` deep-link redirect.

## Validation performed

- `node validate.mjs`: four HTML pages, 44 local file/fragment references, JavaScript syntax, canonical channel, ASimulation link, and concept-stage labels passed.
- Homepage inspected in desktop and 390px layouts, with no horizontal overflow in those checks.
- Both branching story choices changed the narrative and artwork; Surface and Signals views plus animation pause/play updated their controls correctly.
- No warnings or errors were recorded in the preview console during the interaction check.
- Brand page inspected on desktop. The 1545 × 423 mobile-safe banner crop was inspected; essential banner text and logo fit within it.
- Redirect code tested with homepage, deep link, query/fragment, unusual double-slash path, and repository-path cases. Destination origin remained fixed.
- Main GitHub Pages deployment was visually verified at its default URL before adding the custom domain.

## Brand deliverables

Editable SVGs and upload-ready PNGs are in `dist/brand/`. The full YouTube banner is 2560 × 1440, avatar is 800 × 800, watermark is 150 × 150, and social card is 1200 × 630. The mobile-safe crop is only a preview; upload the full banner. A ZIP of all assets is also saved alongside this repository as `ASITube-brand-kit.zip`. No YouTube channel content was modified.

## Routine updates

Edit files in `dist/`, run `node validate.mjs`, preview using `node preview.mjs`, inspect the affected layout/interactions, then commit and push `main`. The workflow deploys automatically. Regenerate brand exports using `node create-brand.mjs` with `sharp` available.

References: [GitHub custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [GitHub HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https), [Namecheap URL forwarding](https://www.namecheap.com/support/knowledgebase/article.aspx/385/2237/how-to-set-up-a-url-redirect-for-a-domain/), [YouTube branding requirements](https://support.google.com/youtube/answer/10456525).
