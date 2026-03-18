## Learned User Preferences

- Use `.env` file at project root for sensitive config (API keys, secrets) — never manual `export` commands or hardcoded values
- When user confirms a fix has been applied, verify it actually took effect before proceeding
- Site must remain `noindex, nofollow` — search engines should not index or follow links
- Use parallel agents for complex multi-step tasks when the user requests it
- Do not break search functionality — verify search works after any changes to Algolia integration
- GitHub Actions secrets (not `.env`) supply credentials in CI workflows

## Learned Workspace Facts

- Docusaurus 3.9.x documentation site for UAGC Digital Experience Team
- Deployed to GitHub Pages at `https://omac049.github.io/uagc-dx-documentation/`
- Base URL path is `/uagc-dx-documentation/`
- Algolia DocSearch v4 with Ask AI enabled via `@docusaurus/theme-search-algolia`
- Algolia App ID: `DRLUZYJNEF`, main index: `uagc-dx-documentation`, markdown index: `uagc-dx-documentation-markdown`
- Indexing runs via `npm run search-index` (build, then index-algolia, then index-markdown)
- Write API key read from `ALGOLIA_WRITE_API_KEY` in `.env` (gitignored) via dotenv
- Indexing scripts live in `scripts/index-algolia.js` and `scripts/index-algolia-markdown.js` using algoliasearch v5
- CSP and security headers configured in `docusaurus.config.js` head tags
- shadcn/ui is incompatible with Docusaurus — it targets Next.js/Vite only
- Documentation source files are in `new-docs/` directory
