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

Both custom domains are saved in GitHub Pages and both DNS checks are successful. The `asitube.com` certificate is issued and **Enforce HTTPS** is enabled. The `asitube.io` certificate is still pending and its enforcement control remains disabled. Some local DNS caches still return no address for `.com` despite successful GitHub validation and correct public resolver answers. Do not bypass certificate warnings. Recheck the redirect repository's Settings → Pages after issuance, enable **Enforce HTTPS**, then verify the apex and www URLs and the `.io` deep-link redirect.

## Validation performed

- `node validate.mjs` checks HTML pages, local file/fragment references, JavaScript syntax, canonical channel, ASimulation link, and concept-stage labels.
- Homepage inspected in desktop and 390px layouts, with no horizontal overflow in those checks.
- Both branching story choices changed the narrative and artwork; Surface and Signals views plus animation pause/play updated their controls correctly.
- No warnings or errors were recorded in the preview console during the interaction check.
- Brand page inspected on desktop. The 1545 × 423 mobile-safe banner crop was inspected; essential banner text and logo fit within it.
- Redirect code tested with homepage, deep link, query/fragment, unusual double-slash path, and repository-path cases. Destination origin remained fixed.
- Main GitHub Pages deployment was visually verified at its default URL before adding the custom domain.
- The contact panel follows the existing ASimulation email-draft flow. Required-field validation, subject/body encoding, and stale-draft invalidation were checked locally without sending email. Desktop and 390px layouts were visually inspected; the narrow contact page had no horizontal overflow. Console warnings/errors were empty.
- Local legal and privacy pages were added using business details verified against the public ASimulation legal notice. Privacy text describes the actual local draft, Gmail, email-app, and copy actions.
- The first workflow failed before Pages was enabled; its retry succeeded. Run [35662939251](https://github.com/rogerbootsma/asitube/actions/runs/35662939251) also completed successfully. A notification for the initial failure does not describe the later successful state.

## Brand deliverables

Editable SVGs and upload-ready PNGs are in `dist/brand/`. The full YouTube banner is 2560 × 1440, avatar is 800 × 800, watermark is 150 × 150, and social card is 1200 × 630. The mobile-safe crop is only a preview; upload the full banner. A ZIP of all assets is also saved alongside this repository as `ASITube-brand-kit.zip`. No YouTube channel content was modified.

## Routine updates

Edit files in `dist/`, run `node validate.mjs`, preview using `node preview.mjs`, inspect the affected layout/interactions, then commit and push `main`. The workflow deploys automatically. Regenerate brand exports using `node create-brand.mjs` with `sharp` available.

References: [GitHub custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [GitHub HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https), [Namecheap URL forwarding](https://www.namecheap.com/support/knowledgebase/article.aspx/385/2237/how-to-set-up-a-url-redirect-for-a-domain/), [YouTube branding requirements](https://support.google.com/youtube/answer/10456525).
