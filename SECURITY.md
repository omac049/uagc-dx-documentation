# Security Policy

## Security Measures Implemented

### Content Security Policy (CSP)

A strict Content Security Policy is enforced via `<meta>` tag in `docusaurus.config.js`:

- **default-src** `'self'` — only same-origin resources by default
- **script-src** — same-origin plus CDN (jsdelivr, Algolia, Google Tag Manager)
- **style-src** — same-origin plus CDN and Google Fonts
- **connect-src** — Algolia search and Google Analytics endpoints only
- **frame-ancestors** `'none'` — prevents clickjacking via iframe embedding
- **base-uri / form-action** `'self'` — prevents base-tag hijacking and form data exfiltration

Additional headers:
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Search Feature Security

#### XSS Prevention
- Input sanitization removes dangerous characters before rendering
- HTML escaping applied to search queries and suggestions
- Character filtering strips `<>"'`, `javascript:` protocols, and event handlers
- Search inputs limited to 100 characters

#### Input Validation
- Type checking validates inputs are strings before processing
- Content filtering removes script injection patterns
- LocalStorage operations wrapped in try-catch blocks

#### DOM Security
- `textContent` used instead of `innerHTML` where possible
- Custom escape functions prevent HTML injection
- All dynamic content sanitized before DOM insertion

### Secret Management

**Write API keys** (Algolia indexing) are loaded exclusively from environment variables.
No write keys are stored in source code or committed to the repository.

To run Algolia indexing scripts locally:
```bash
export ALGOLIA_WRITE_API_KEY="your-write-api-key"
npm run index-algolia
npm run index-markdown
```

In CI, set `ALGOLIA_WRITE_API_KEY` as a GitHub Actions secret.

**Search-only API keys** (client-side read access) are embedded in `static/js/custom-search.js` and
`static/js/sitesearch-init.js`. These keys are restricted to read-only search operations within
the `uagc-dx-documentation` index. They are safe to expose in client-side code per
[Algolia's security model](https://www.algolia.com/doc/guides/security/api-keys/).

### Dependency Security

- **npm overrides** pin transitive dependencies to patched versions (see `package.json`)
- **`.npmrc`** sets `audit-level=high` — `npm audit` runs on every install
- CI pipeline runs `npm audit --audit-level high --production` before deployment
- Weekly automated dependency update workflow creates PRs for outdated packages

### Privacy & Crawling

- `robots.txt` disallows all crawlers
- `<meta name="robots" content="noindex, nofollow">` prevents search-engine indexing
- `showLastUpdateAuthor: false` prevents personal info exposure
- Google Analytics configured with `anonymizeIP: true`

## Known Development Dependencies

### webpack-dev-server (Development Only)
- **Severity:** Moderate
- **Impact:** Development environment only — not present in production builds
- **Mitigation:** Overridden to v5.2.2 in `package.json`; production uses static files

## Security Best Practices

### For Developers
1. Never commit secrets or API write keys to the repository
2. Keep dependencies updated — review the weekly dependency-update PRs
3. Run `npm audit` locally before pushing changes
4. Validate and sanitize all user inputs
5. Ensure all external resources use HTTPS

### For Users
1. Access the documentation only via HTTPS
2. Keep your browser up to date
3. Report suspected security issues to the development team

## Security Checklist

- [x] Content Security Policy enforced
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy: strict-origin-when-cross-origin
- [x] Frame-ancestors: none (clickjacking protection)
- [x] Input sanitization and XSS prevention
- [x] HTML escaping for dynamic content
- [x] LocalStorage security measures
- [x] Write API keys externalized to environment variables
- [x] Development-only vulnerabilities documented
- [x] Dependencies pinned and regularly audited
- [x] CI security audit on every deployment

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

1. **Do not** create a public GitHub issue
2. Contact the development team directly
3. Provide detailed information about the vulnerability
4. Allow reasonable time for the issue to be addressed

## Security Updates

This document is updated whenever security measures change or security-related dependencies are updated.

**Last Updated:** March 2026
**Security Review:** Completed
