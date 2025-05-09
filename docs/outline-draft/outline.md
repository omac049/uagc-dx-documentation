# UAGC Digital Experience Documentation - Proposed Structure

This outline presents a reorganized documentation structure based on the requested categories: Home, Getting Started, QA & Dev Notes, Tracking & Analytics, Web Guidelines, and References & Tools.

## Navigation Structure

```
Home
├── Welcome
├── How to Use This Documentation
├── Why This Documentation Exists
└── Recent Updates

Getting Started
├── Understanding the UAGC Digital Experience & Enrollment Funnel
├── Onboarding Guide
├── Daily Operations
├── Common Tasks
└── Team Roles & Responsibilities

QA & Dev Notes
├── Development Standards & Processes
│   ├── Drupal Coding Standards
│   ├── General Development Workflows & Best Practices
│   └── Performance & Core Web Vitals
├── QA Processes
│   ├── QA Smoke Test
│   └── Accessibility Checking (WCAG 2.2 AA Focus)
├── Page Management
│   ├── Page Changes (Add/Remove/Redirect)
│   └── Content Updates
└── Release & Incident Procedures

Tracking & Analytics
├── Analytics Strategy & Governance
│   └── KPIs for Enrollment Funnel
├── Implementation Details
│   ├── GA4 Setup & Event Tracking
│   ├── GTM Configuration & dataLayer Management
│   ├── BigQuery Pipelines
│   └── Lead API & Salesforce Data Flow
├── Testing & Optimization
│   ├── Optimizely Tests
│   └── A/B Testing
└── Privacy, Consent & Data
    ├── Cookie Organization & Management
    └── User Consent Procedures

Web Guidelines
├── SEO
│   ├── SEO Hygiene
│   ├── SEO Redirect Decision Tree
│   └── Canonical Links & URL Taxonomy
├── Accessibility
│   ├── WCAG Compliance
│   └── Accessibility Checklist
├── Content Standards
│   ├── Writing Guidelines
│   └── Content Templates
└── UI/UX Best Practices & Component Library Usage

References & Tools
├── Asana Workflow
├── Glossary
├── Site Map
├── RFI Form
├── Documentation Workflow
└── Growth Roadmap
```

## Mapping of Existing Content

### Home
- index.md (main landing page)
- why-this-exists.md

### Getting Started
- guides/getting-started.md
- day-to-day-ops.md
- digital-experience-enrollment-funnel.md (to be created)
- who-does-what.md

### QA & Dev Notes
- guides/drupal-standards.md
- guides/qa-smoke-test.md
- guides/release-incident.md
- guides/page-changes.md
- guides/performance-web-vitals.md

### Tracking & Analytics
- analytics-strategy-governance.md (renamed from analytics-standards.md)
- enrollment-funnel-kpis.md (to be created)
- guides/optimizely-tests.md
- ga4-setup-event-tracking.md (to be created)
- gtm-configuration-datalayer.md (to be created)
- lead-api-salesforce-integration.md (to be created)
- guides/privacy-consent.md
- guides/bigquery.md (to be created)
- cookie-organization.md (to be created)
- user-consent-procedures.md (to be created)

### Web Guidelines
- guides/seo-hygiene.md
- guides/seo-redirects.md
- canonical-links-url-taxonomy.md (to be created)
- guides/accessibility.md
- guides/content-standards.md (to be created)
- content-templates.md (to be created)
- ui-ux-best-practices/component-library-usage.md (to be created)

### References & Tools
- asana.md
- guides/glossary.md
- sitemap.md
- request-information-form.md
- documentation-workflow.md
- growth-roadmap.md

## Implementation Plan

1. **Phase 1:** Restructure the navigation in mkdocs.yml
2. **Phase 2:** Review and update cross-links between documents
3. **Phase 3:** Create missing pages (identified with "to be created")
4. **Phase 4:** Update the index.md to reflect the new structure

## Benefits of New Structure

- **Clearer Organization:** Content is grouped by functional areas
- **Improved Findability:** Logical categorization makes it easier to locate information
- **Scalable Structure:** Categories can expand as documentation grows
- **Role-Based Access:** Team members can quickly find documentation relevant to their role
- **Reduced Redundancy:** Content is organized to minimize duplication