# UAGC Digital Experience Team Documentation Hub

[![Deploy to GitHub Pages](https://github.com/omac049/uagc-dx-documentation/actions/workflows/deploy.yml/badge.svg)](https://github.com/omac049/uagc-dx-documentation/actions/workflows/deploy.yml)

> **Central home for every repeatable task that keeps uagc.edu running**

Complete documentation system for the UAGC Digital Experience team, powered by Docusaurus and deployed via GitHub Pages. This hub contains everything needed to maintain, update, and improve the uagc.edu website.

## 🚀 Quick Links

- **[📖 Live Documentation](https://omac049.github.io/uagc-dx-documentation/)** - Main documentation hub
- **[🎯 Getting Started](https://omac049.github.io/uagc-dx-documentation/getting-started)** - Team onboarding guide
- **[🛠️ Common Tasks](https://omac049.github.io/uagc-dx-documentation/common-tasks)** - Quick reference for daily operations
- **[🚀 Strategic Resources](https://omac049.github.io/UAGC-Strategic-Intelligence/)** - Strategic intelligence suite

## 📋 What's Inside

### 🏠 **Team Hub & Operations**
- Team member profiles and responsibilities
- Daily operations and workflows
- Common task quick-reference guides
- Project management with Asana integration

### 📊 **Analytics & Tracking**
- GA4 implementation standards
- GTM configuration and dataLayer
- BigQuery pipelines and reporting
- Conversion tracking and KPIs

### 🔍 **SEO & Content Strategy**
- Technical SEO hygiene and best practices
- Content standards and templates
- URL taxonomy and canonical links
- Performance optimization guidelines

### 🧪 **Development & QA**
- Drupal coding standards
- Component library documentation
- QA testing procedures and checklists
- Release management workflows

### ♿ **Accessibility & Compliance**
- WCAG 2.1 AA compliance guidelines
- Accessibility testing procedures
- UI/UX best practices
- User consent and privacy procedures

### 🎯 **Strategic Intelligence Suite**
- **[SEO & CRO Strategy](https://omac049.github.io/UAGC-Strategic-Intelligence/seo-cro-audit-uagc.html)** - 40-60% traffic growth analysis
- **[Personalization Framework](https://omac049.github.io/UAGC-Strategic-Intelligence/cookie/UAGC-cookie-personalization.html)** - 20-25% RFI increase strategy
- **[Reputation Management](https://omac049.github.io/UAGC-Strategic-Intelligence/Reputation%20management/uagc-comprehensive-reputation-analysis.html)** - Brand recovery strategy
- **[SEO QBR Dashboard](https://omac049.github.io/uagc_seo_cro_qbr/)** - Quarterly performance review
- **[LLM Optimization](https://omac049.github.io/uagc-seo-llm-optimization/)** - Search visibility strategy

## 👥 Team

### Leadership
- **Thomas** - DX Director / Product Owner
- **Brandy** - Digital Marketing & Web Operations Manager

### Development Team
- **Jason** - Senior Backend Drupal Engineer
- **Will** - Backend Engineer (APIs, CI/CD)
- **Brian** - Front-End Dev & QA Lead
- **Anthony** - Front-End Developer & Experiment Engineer

### Marketing & Analytics
- **Omar** - SEO & Analytics Specialist

## 🛠️ Technology Stack

- **Documentation**: [Docusaurus](https://docusaurus.io/) v3
- **Hosting**: GitHub Pages
- **Deployment**: GitHub Actions
- **Analytics**: Google Analytics 4
- **Search**: Algolia DocSearch
- **Styling**: Custom CSS with responsive design

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/omac049/uagc-dx-documentation.git
cd DX-Documentation-New

# Install dependencies
npm install

# Start development server
npm start
```

The site will open at `http://localhost:3000` with live reload enabled.

### Building for Production

```bash
# Generate static files
npm run build

# Serve production build locally
npm run serve
```

## 📝 Contributing

### Adding New Documentation

1. **Create/Edit Files**: Add `.md` files in the `new-docs/` directory
2. **Follow Standards**: Use existing templates and formatting guidelines
3. **Update Navigation**: Modify `sidebars.js` if adding new sections
4. **Test Locally**: Verify changes work with `npm start`
5. **Submit Changes**: Create pull request with descriptive commit message

### Documentation Standards

- **Format**: Use Markdown with Docusaurus extensions
- **Style**: Follow existing patterns and callout usage
- **Links**: Use relative links for internal pages
- **Images**: Store in `static/img/` directory
- **Code**: Use syntax highlighting with language specifications

### Contribution Workflow

```bash
# Create feature branch
git checkout -b feature/new-documentation

# Make changes
# ... edit files ...

# Commit with descriptive message
git commit -m "Add [specific feature/page]: [brief description]"

# Push and create pull request
git push origin feature/new-documentation
```

## 🔄 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions. The deployment workflow:

1. **Trigger**: Push to `main` branch
2. **Build**: Generate static site with Docusaurus
3. **Deploy**: Publish to GitHub Pages
4. **Live**: Available at https://omac049.github.io/uagc-dx-documentation/

## 📊 Success Metrics

**Our goal**: ↘ time-to-answer, ↘ QA slips, ↘ Slack back-and-forth; ↗ first-call resolution.

- **Reduced support tickets** - Better documentation and processes
- **Faster implementation** - Streamlined workflows and clear procedures  
- **Higher quality** - Fewer bugs and better user experiences
- **Team efficiency** - More time for strategic work, less firefighting

## 📈 Recent Achievements

- **Complete Migration**: Successfully migrated from MkDocs to Docusaurus
- **32+ Pages**: Comprehensive documentation coverage
- **Strategic Integration**: Connected operational docs with strategic intelligence
- **Team Adoption**: All team members actively contributing
- **Mobile Responsive**: Professional styling across all devices

## 🆘 Getting Help

1. **Check Documentation First** - Most common tasks are documented
2. **Search Team Slack** - Previous solutions might exist  
3. **Create Asana Task** - For new requests or complex issues
4. **Direct Contact** - For urgent issues or clarification

## 📄 License

This documentation is proprietary to UAGC and intended for internal team use only.

---

**Success Looks Like**: ↘ time-to-answer, ↘ QA slips, ↘ Slack back-and-forth; ↗ first-call resolution.
