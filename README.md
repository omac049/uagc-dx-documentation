# UAGC DX Team Documentation

Central documentation hub for the UAGC Digital Experience team. This site contains everything needed to maintain, update, and improve the uagc.edu website.

## 🚀 Quick Start

This documentation site is built with **Docusaurus 3**, deployed via **GitHub Pages**.

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
# Generate static files
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

## 📁 Project Structure

```
uagc-dx-documentation/
├── new-docs/                # Documentation content (Markdown files)
│   ├── guides/             # Guide documents
│   └── index.md            # Homepage content
├── src/                    # React components and styling
│   ├── components/         # Custom React components
│   └── css/               # Custom CSS
├── static/                # Static assets (images, files)
│   └── img/               # Images and graphics
├── docusaurus.config.js   # Docusaurus configuration
├── sidebars.js            # Sidebar navigation structure
└── package.json           # Dependencies and scripts
```

## 🔄 Migration from MkDocs

This project was migrated from MkDocs Material to Docusaurus for better:

- **GitHub Pages integration** - Native deployment support
- **Modern development experience** - React-based with TypeScript support
- **Performance** - Faster loading and better SEO
- **Maintenance** - Simpler dependency management
- **Collaboration** - Better git-based workflow

### What Changed

- **Build system**: MkDocs → Docusaurus
- **Theming**: Material theme → Custom CSS + Docusaurus theme
- **Deployment**: ReadTheDocs → GitHub Pages
- **Configuration**: `mkdocs.yml` → `docusaurus.config.js`

### What Stayed the Same

- **Content**: All existing documentation preserved
- **Navigation structure**: Maintained existing organization
- **Features**: Search, dark mode, responsive design
- **Styling**: Replicated Material theme appearance

## 📝 Content Guidelines

### File Organization

- Place documentation files in `new-docs/`
- Use descriptive filenames (kebab-case)
- Organize related content in subdirectories
- Update `sidebars.js` when adding new pages

### Frontmatter

Each page should start with frontmatter:

```yaml
---
title: Page Title
description: Brief description for SEO
---
```

### Links

- Use relative links: `/guides/getting-started`
- Avoid `.md` extensions in links
- Update sidebar configuration for new pages

## 🛠 Customization

### Styling

- Primary styles: `src/css/custom.css`
- Component styles: `src/components/*/styles.module.css`
- Color scheme matches original Material theme (Indigo/Deep Orange)

### Navigation

- Main navigation: `docusaurus.config.js` → `themeConfig.navbar`
- Sidebar navigation: `sidebars.js`
- Footer links: `docusaurus.config.js` → `themeConfig.footer`

### Features

- **Search**: Configured for Algolia (needs setup)
- **Analytics**: Google Analytics integration
- **Dark mode**: Automatic system preference detection
- **Mobile responsive**: Optimized for all devices

## 🔧 Development

### Adding New Pages

1. Create markdown file in appropriate `new-docs/` subdirectory
2. Add frontmatter with title and description
3. Update `sidebars.js` to include in navigation
4. Test locally with `npm start`

### Custom Components

React components go in `src/components/`. Import and use in markdown:

```markdown
import CustomComponent from '@site/src/components/CustomComponent';

<CustomComponent />
```

### Styling Updates

- Global styles: Edit `src/css/custom.css`
- CSS variables: Modify `:root` selectors
- Component-specific: Create `.module.css` files

## 📊 Analytics & Monitoring

- **Google Analytics**: Configured in `docusaurus.config.js`
- **Search Analytics**: Algolia search insights
- **Performance**: Built-in Lighthouse scoring
- **Uptime**: GitHub Pages status monitoring

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** locally with `npm start`
5. **Submit** a pull request

### Documentation Updates

- Follow existing content patterns
- Update navigation if adding new sections
- Include screenshots for UI-related changes
- Test all links and ensure they work

## 📞 Support

For questions or issues:

1. **Check existing documentation** first
2. **Search GitHub issues** for similar problems
3. **Create an Asana task** using the Documentation template
4. **Contact the DX team** in Slack

## 🎯 Success Metrics

**Goal**: ↘ time-to-answer, ↘ QA slips, ↘ Slack back-and-forth; ↗ first-call resolution.

---

Built with ❤️ by the UAGC Digital Experience Team
