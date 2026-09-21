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

Both custom domains are saved in GitHub Pages. DNS checks have succeeded at earlier checkpoints but are still inconsistent across GitHub's checks during propagation. A fresh direct check at 00:45 CEST confirmed valid HTTPS and HTTP 200 for `asitube.com`. The other three hostnames (`www.asitube.com`, `asitube.io`, `www.asitube.io`) still failed certificate hostname verification. The main site's **Enforce HTTPS** checkbox did not persist after reload; GitHub subsequently displayed certificate issuance pending there too. Do not report HTTPS enforcement or all certificates complete until checked again after propagation.

At 00:45 CEST on 22 September, the default resolver returned the old `ns1.julydns.com` / `ns2.julydns.com` delegation with TTL 75,621 seconds (about 21 hours). Cloudflare and Google returned the new GoDaddy nameservers and correct GitHub A records. Both authoritative GoDaddy servers independently returned all four correct A records. The default resolver had already picked up the new `.io` records. This isolates the main reachability issue to stale delegation caching. Chrome's security-settings URL was blocked by browser automation policy; no Chrome DNS changes were made.

The local DNS provider still returned no address for `.com` and the old Namecheap forwarding address for `.io`, despite correct public resolver answers. Flushing the Windows DNS cache succeeded but did not change those upstream answers. No system DNS provider or hosts-file settings were changed. A direct `curl --resolve` check against the configured GitHub IP (with normal certificate verification, without `--insecure`) returned HTTPS 200 for `asitube.com`. The downloaded homepage, legal notice, and privacy page matched the local files byte-for-byte. This confirms the main deployment independently of the stale local resolver, but is not an end-to-end browser check through ordinary DNS.

Do not bypass certificate warnings. Recheck the redirect repository's Settings → Pages after issuance, enable **Enforce HTTPS**, then verify the apex and www URLs and the `.io` deep-link redirect. The local preview at http://127.0.0.1:4178/ can be used while DNS propagates.

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
- Contact and local legal pages deployed successfully in run [35663424223](https://github.com/rogerbootsma/asitube/actions/runs/35663424223), commit `85d73c8dcb89d9c2280575be9c0915fa51bac69e`.

## Brand deliverables

Editable SVGs and upload-ready PNGs are in `dist/brand/`. The full YouTube banner is 2560 × 1440, avatar is 800 × 800, watermark is 150 × 150, and social card is 1200 × 630. The mobile-safe crop is only a preview; upload the full banner. A ZIP of all assets is also saved alongside this repository as `ASITube-brand-kit.zip`. No YouTube channel content was modified.

## Routine updates

Edit files in `dist/`, run `node validate.mjs`, preview using `node preview.mjs`, inspect the affected layout/interactions, then commit and push `main`. The workflow deploys automatically. Regenerate brand exports using `node create-brand.mjs` with `sharp` available.

References: [GitHub custom-domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [GitHub HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https), [Namecheap URL forwarding](https://www.namecheap.com/support/knowledgebase/article.aspx/385/2237/how-to-set-up-a-url-redirect-for-a-domain/), [YouTube branding requirements](https://support.google.com/youtube/answer/10456525).
