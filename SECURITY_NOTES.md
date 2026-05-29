# Security Notes

## Static-site threat model

Roos Sound Productions is a static HTML/CSS/JS site with no backend API, authentication, or server-side sessions. The highest-risk paths are DOM-based XSS, unsafe link handling, clickjacking, third-party resource abuse, mixed content, and weak response headers.

## Header policy

Security headers are set at the hosting layer in `vercel.json`.

## CSP policy

The production CSP uses a deny-by-default model with explicit allowlists:

- `default-src 'self'`
- scripts from `'self'` only, with `script-src-attr 'none'`
- styles from `'self'` plus Google Fonts stylesheet origin, with `style-src-attr 'none'`
- fonts from `'self'` plus Google Fonts font origin
- no frames (`frame-src 'none'`, `frame-ancestors 'none'`)
- no plugins (`object-src 'none'`)
- same-origin form actions and connections only

## Known exceptions

| Origin | CSP directive | Reason |
|---|---|---|
| `https://fonts.googleapis.com` | `style-src` | Hosted stylesheet for typography |
| `https://fonts.gstatic.com` | `font-src` | Hosted font files for typography |

## Scanner notes

Automated scanners may report legacy or informational findings that do not represent exploitable risk in this static architecture. Any accepted scanner warning must be documented here with a concrete reason.
