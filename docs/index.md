---
comments: true
---

# UAGC Digital Experience (DX) Documentation

Welcome to the central documentation hub for the UAGC Digital Experience team. This site contains everything you need to maintain, update, and improve the uagc.edu website.

!!! tip "Need something specific?"
    Use the search feature (press <kbd>/</kbd>) or browse the navigation menu to find what you need.

## Quick Links

<div class="grid quick-links">
  <a href="guides/getting-started.md" class="quick-link-card">
    <div class="quick-link-content">
      <h3>Getting Started Guide</h3>
      <p>New to the team? Start here!</p>
    </div>
  </a>
  
  <a href="guides/page-changes.md" class="quick-link-card">
    <div class="quick-link-content">
      <h3>Page Changes</h3>
      <p>Learn how to add, remove, or redirect pages</p>
    </div>
  </a>
  
  <a href="guides/qa-smoke-test.md" class="quick-link-card">
    <div class="quick-link-content">
      <h3>QA Smoke Test</h3>
      <p>Verify changes before they go live</p>
    </div>
  </a>
  
  <a href="asana.md" class="quick-link-card">
    <div class="quick-link-content">
      <h3>Asana Workflow</h3>
      <p>How we track and manage tasks</p>
    </div>
  </a>
  
  <a href="guides/seo-hygiene.md" class="quick-link-card">
    <div class="quick-link-content">
      <h3>SEO Hygiene</h3>
      <p>Best practices for search optimization</p>
    </div>
  </a>
</div>

<style>
.grid.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.quick-link-card {
  background-color: var(--md-primary-fg-color--light);
  color: var(--md-primary-bg-color);
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  overflow: hidden;
}

.quick-link-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.quick-link-content {
  padding: 1.2rem;
}

.quick-link-content h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.quick-link-content p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}
</style>

## Documentation Overview

Our documentation is organized by:

<div class="grid cards" markdown>

-   :material-information-outline: **Overview**
    
    Learn about our team, roles, and day-to-day operations
    
    [:octicons-arrow-right-24: Why This Exists](why-this-exists.md)

-   :material-tools: **Tools & Processes**
    
    Task management and form handling processes
    
    [:octicons-arrow-right-24: Asana Workflow](asana.md)

-   :material-book-open-page-variant: **Documentation Guides**
    
    Core guides for common tasks
    
    [:octicons-arrow-right-24: View Guides](guides/getting-started.md)

-   :material-code-tags: **Advanced Guides**
    
    Technical documentation for engineering and SEO
    
    [:octicons-arrow-right-24: View Advanced Guides](guides/accessibility.md)

</div>

## Team Members & Responsibilities

| Person | Title | Core Responsibilities |
|--------|-------|----------------------|
| Thomas | DX Director / Product Owner | Roadmap, priorities, release approval |
| Brandy | Digital Marketing & Web Operations Manager | DX governance, CMS permissions, training |
| Jason | Senior Backend Drupal Engineer | Drupal architecture, custom modules, security |
| Will | Backend Engineer | API endpoints, CI jobs, patch pipeline |
| Brian | Front-End Dev & QA Lead | Component library, accessibility, QA test plans |
| Anthony | Front-End Developer & Experiment Engineer | Optimizely tests, dataLayer, QA |
| Omar | SEO & Tracking Manager | Technical/content SEO, GA4/GTM, BigQuery pipelines |

## Recent Updates

- **[SEO Redirect Decision Tree](guides/seo-redirects.md)** - Updated with new canonical link guidelines
- **[Performance & Core Web Vitals](guides/performance-web-vitals.md)** - Added mobile optimization section
- **[Drupal Coding Standards](guides/drupal-standards.md)** - Updated for latest Drupal version

## Feedback & Contributions

This documentation is continuously improving. If you have suggestions:

1. Create an Asana task using the **Documentation** template
2. Specify what needs to be updated
3. Add any supporting information or examples

!!! note "Documentation Day"
    We hold a quarterly "Docs Day" where each team member reviews and updates their documentation sections.
    
    Next scheduled Docs Day: **June 15, 2025**

<div class="grid-container">
  <div class="grid-card">
    <h3>Getting Started</h3>
    <p>Start here if you're new to the DX documentation.</p>
    <p><a href="guides/getting-started.md" class="grid-link">Getting Started Guide →</a></p>
  </div>
  
  <div class="grid-card">
    <h3>Daily Operations</h3>
    <p>Core processes for day-to-day website management.</p>
    <p><a href="day-to-day-ops.md" class="grid-link">Daily Operations Guide →</a></p>
  </div>
  
  <div class="grid-card">
    <h3>Common Tasks</h3>
    <p>Step-by-step guides for frequent actions.</p>
    <p>
      <a href="guides/page-changes.md" class="grid-link">Add/Remove Pages →</a><br>
      <a href="guides/qa-smoke-test.md" class="grid-link">QA Testing →</a>
    </p>
  </div>
  
  <div class="grid-card">
    <h3>Reference</h3>
    <p>Technical specifications and standards.</p>
    <p>
      <a href="guides/glossary.md" class="grid-link">Glossary →</a><br>
      <a href="sitemap.md" class="grid-link">Site Map →</a>
    </p>
  </div>
</div>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.grid-card {
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.grid-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}

.grid-card h3 {
  margin-top: 0;
  color: var(--md-primary-fg-color);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.grid-link {
  display: inline-block;
  font-weight: 500;
  margin-top: 0.5rem;
  color: var(--md-primary-fg-color);
  text-decoration: none;
}

.grid-link:hover {
  text-decoration: underline;
}
</style>

## Why This Documentation Exists

- **Purpose**: Central home for all repeatable tasks: content edits, page launches, experiments, SEO, tracking, and development standards
- **Audience**: Jason, Will, Brian, Anthony, Omar, Brandy, Thomas + anyone we onboard next
- **Success Metrics**: ↘ time‑to‑answer, ↘ QA slips, ↘ Slack back‑and‑forth; ↗ first‑call resolution

## Quick Reference

| Task | Go To | Owner |
|------|-------|-------|
| Create Asana Task | [Asana](asana.md) | Brandy |
| Update Content | [Page Changes](guides/page-changes.md) | Brian |
| Set Up A/B Test | [Optimizely Tests](guides/optimizely-tests.md) | Anthony |
| Fix SEO Issue | [SEO Hygiene](guides/seo-hygiene.md) | Omar |
| Run QA Check | [QA Smoke Test](guides/qa-smoke-test.md) | Brian |

## Documentation by Category

<div class="category-grid">
  <div class="category-section">
    <h3>Content Management</h3>
    <ul>
      <li><a href="guides/page-changes.md">Add/Remove/Redirect Pages</a></li>
      <li><a href="guides/seo-hygiene.md">SEO Hygiene</a></li>
      <li><a href="guides/seo-redirects.md">SEO Redirect Decision Tree</a></li>
    </ul>
  </div>

  <div class="category-section">
    <h3>Development & QA</h3>
    <ul>
      <li><a href="guides/drupal-standards.md">Drupal Coding Standards</a></li>
      <li><a href="guides/qa-smoke-test.md">QA Smoke Test</a></li>
      <li><a href="guides/accessibility.md">Accessibility Guidelines</a></li>
      <li><a href="guides/release-incident.md">Release & Incident Procedures</a></li>
    </ul>
  </div>

  <div class="category-section">
    <h3>Analytics & Optimization</h3>
    <ul>
      <li><a href="analytics-standards.md">Analytics Standards</a></li>
      <li><a href="guides/optimizely-tests.md">Optimizely Tests</a></li>
      <li><a href="guides/performance-web-vitals.md">Performance Web Vitals</a></li>
      <li><a href="guides/privacy-consent.md">Privacy & Consent</a></li>
    </ul>
  </div>

  <div class="category-section">
    <h3>Team Resources</h3>
    <ul>
      <li><a href="who-does-what.md">Who Does What</a></li>
      <li><a href="asana.md">Asana</a></li>
      <li><a href="request-information-form.md">RFI Form</a></li>
      <li><a href="documentation-workflow.md">Documentation Workflow</a></li>
      <li><a href="growth-roadmap.md">Growth Roadmap</a></li>
    </ul>
  </div>
</div>

<style>
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.category-section h3 {
  color: var(--md-primary-fg-color);
  margin-top: 0;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.category-section ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0.5rem;
}

.category-section li {
  margin-bottom: 0.4rem;
}

.category-section a {
  color: var(--md-typeset-a-color);
  text-decoration: none;
}

.category-section a:hover {
  text-decoration: underline;
}
</style>

## Accessing This Documentation

You can access this documentation in two ways:

1. **Locally**: Run `mkdocs serve` to view at http://localhost:8000
2. **Online**: Visit our hosted documentation at [docs.dx.uagc.edu](https://docs.dx.uagc.edu)

### Keyboard Shortcuts

Navigate faster with these keyboard shortcuts:

- <kbd>/</kbd> - Open search
- <kbd>Home</kbd> - Go to top of page
- <kbd>End</kbd> - Go to bottom of page
- <kbd>Tab</kbd> then <kbd>Enter</kbd> - Navigate through links

## Contributing

Learn how to contribute to this documentation in the [Documentation Workflow](documentation-workflow.md) guide.

## Growth Roadmap

Want to know where we're headed? Check out our [Growth Roadmap](growth-roadmap.md) for documentation development.

---

**Success Looks Like:** ↘ time-to-answer, ↘ QA slips, ↘ Slack back-and-forth; ↗ first-call resolution.
