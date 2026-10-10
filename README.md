# Tarun Pandey — Portfolio

Static site: no build step, no dependencies, no third-party requests.

## Files
| File | Purpose |
|---|---|
| `index.html` | The portfolio |
| `impressum.html` | Legal notice (§ 5 DDG) |
| `datenschutz.html` | Privacy notice (GDPR) |
| `style.css`, `script.js`, `boot.js` | Styling and behaviour (no inline code anywhere) |
| `favicon.svg` | Tab icon |
| `_headers` | Security headers (Netlify / Cloudflare Pages) |
| `.well-known/security.txt` | How to report a security problem (renew the `Expires` date yearly) |

## Before going live — checklist
1. **Impressum + Datenschutz:** replace every yellow `[...]` placeholder (street address, hosting provider, log retention). Search for `class="todo"`.
2. **Links:** fill the `LINKS` block at the top of `script.js` (ScienceDirect article, LinkedIn, GitHub, Xing). Empty entries stay hidden.
3. **Hosting:** use a host that forces HTTPS. Netlify or Cloudflare Pages pick up `_headers` automatically. GitHub Pages cannot set headers: the `<meta>` CSP still protects the pages, but clickjacking protection (`frame-ancestors`, `X-Frame-Options`) is missing there.
4. **Test:** open the live URL in https://securityheaders.com and https://observatory.mozilla.org.
5. **Project details:** the Color Sorter text is deliberately generic. Add what it sorted, the sensor, the controller and the result.

## Security design
- Content-Security-Policy on every page: only same-origin scripts and styles, no inline code, no frames, no forms, no `<base>`.
- `script.js` has no `innerHTML`, no `eval`, no network calls. Link targets are validated (only `https://` or a local `.pdf`).
- External links use `rel="noopener noreferrer"`.
- The email is assembled in JavaScript on the main page to avoid simple scrapers. It must stay readable in the Impressum (legal requirement).
- No cookies, no storage, no analytics, no web fonts from Google: no consent banner needed.

## Legal notes (not legal advice)
- A purely private page may not need an Impressum, but a public job-search portfolio is safest with one.
- The Impressum needs a full street address (a P.O. box is not enough) and a fast contact method.
- Check the texts once with a lawyer or a trusted template generator if the site becomes commercial (freelancing, ads, shop).
