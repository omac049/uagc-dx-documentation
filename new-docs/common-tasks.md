---
title: Common Tasks
description: Quick access to the most frequently used documentation and procedures
sidebar_position: 2
---

# Common Tasks

Quick access to the most frequently performed tasks in the DX team workflow.

## 🔄 Content Updates

<div class="grid-container quick-links">
  <div class="grid-card">
    <h3>Add New Page</h3>
    <p>Create new landing or program pages</p>
    <ul>
      <li><a href="/guides/page-changes">Page Creation Guide</a></li>
      <li><a href="/guides/content-standards">Content Standards</a></li>
      <li><a href="/guides/seo-hygiene">SEO Requirements</a></li>
    </ul>
  </div>
  
  <div class="grid-card">
    <h3>Update Existing Content</h3>
    <p>Modify program info, policies, forms</p>
    <ul>
      <li><a href="/content-updates">Content Update Process</a></li>
      <li><a href="/guides/drupal-standards">Drupal Best Practices</a></li>
      <li><a href="/guides/qa-smoke-test">QA Checklist</a></li>
    </ul>
  </div>
  
  <div class="grid-card">
    <h3>Create Redirects</h3>
    <p>Set up URL redirects for moved content</p>
    <ul>
      <li><a href="/guides/seo-redirects">SEO Redirect Guide</a></li>
      <li><a href="/canonical-links-url-taxonomy">URL Standards</a></li>
      <li><a href="/guides/page-changes">Page Management</a></li>
    </ul>
  </div>
</div>

## 🧪 Testing & QA

<div class="grid-container quick-links">
  <div class="grid-card">
    <h3>Pre-Launch QA</h3>
    <p>Complete testing before going live</p>
    <ul>
      <li><a href="/guides/qa-smoke-test">QA Smoke Test</a></li>
      <li><a href="/guides/accessibility">Accessibility Check</a></li>
      <li><a href="/guides/performance-web-vitals">Performance Test</a></li>
    </ul>
  </div>
  
  <div class="grid-card">
    <h3>A/B Test Setup</h3>
    <p>Create and launch optimization experiments</p>
    <ul>
      <li><a href="/guides/optimizely-tests">Optimizely Guide</a></li>
      <li><a href="/ab-testing">A/B Testing Standards</a></li>
      <li><a href="/gtm-configuration-datalayer">GTM Configuration</a></li>
    </ul>
  </div>
  
  <div class="grid-card">
    <h3>Analytics Setup</h3>
    <p>Implement tracking for new content</p>
    <ul>
      <li><a href="/ga4-setup-event-tracking">GA4 Event Setup</a></li>
      <li><a href="/gtm-configuration-datalayer">dataLayer Implementation</a></li>
      <li><a href="/analytics-standards">Analytics Standards</a></li>
    </ul>
  </div>
</div>

## 🔍 SEO Tasks

<div class="grid-container quick-links">
  <div class="grid-card">
    <h3>SEO Audit</h3>
    <p>Technical and content SEO review</p>
    <ul>
      <li><a href="/guides/seo-hygiene">SEO Hygiene Checklist</a></li>
      <li><a href="/canonical-links-url-taxonomy">URL Structure</a></li>
      <li><a href="/guides/content-standards">Content Optimization</a></li>
    </ul>
  </div>
  
  <div class="grid-card">
    <h3>Keyword Research</h3>
    <p>Find and implement target keywords</p>
    <ul>
      <li><a href="/guides/seo-hygiene#keyword-research">Keyword Process</a></li>
      <li><a href="/guides/content-standards#seo-writing">SEO Writing</a></li>
      <li><a href="/analytics-standards">Performance Tracking</a></li>
    </ul>
  </div>
  
  <div class="grid-card">
    <h3>Technical SEO</h3>
    <p>Site structure and technical optimization</p>
    <ul>
      <li><a href="/guides/performance-web-vitals">Core Web Vitals</a></li>
      <li><a href="/guides/seo-redirects">Redirect Management</a></li>
      <li><a href="/sitemap">Sitemap Updates</a></li>
    </ul>
  </div>
</div>

## 🛠 Project Management

### Asana Workflow

| Task Type | Template | Owner | SLA |
|-----------|----------|-------|-----|
| Content Update | Content Request | Brandy | 2-3 days |
| Bug Fix | Bug Report | Brian | 1-2 days |
| A/B Test | Experiment Request | Anthony | 3-5 days |
| SEO Task | SEO Request | Omar | 1-3 days |
| Analytics | Tracking Request | Omar | 2-4 days |

**Quick Links:**
- [Asana Workflow Guide](/asana)
- [Task Templates](/request-information-form)
- [Priority Guidelines](/day-to-day-ops)

### Communication Channels

| Channel | Purpose | Response Time |
|---------|---------|---------------|
| **#dx-team** | General team updates | 4 hours |
| **#dx-urgent** | Critical issues only | 30 minutes |
| **Asana** | Project tracking | 24 hours |
| **Email** | External communication | 24 hours |

## 📊 Analytics & Reporting

### Daily Monitoring

✅ **Morning Checklist** (15 minutes)
- [ ] Check GA4 traffic and conversions
- [ ] Review overnight A/B test performance
- [ ] Monitor site uptime and speed
- [ ] Check for broken pages or errors

✅ **Weekly Review** (30 minutes)
- [ ] Analyze conversion funnel performance
- [ ] Review A/B test statistical significance
- [ ] Monitor SEO keyword rankings
- [ ] Update stakeholder dashboards

### Key Reports

| Report | Frequency | Owner | Recipients |
|--------|-----------|-------|------------|
| Conversion Performance | Weekly | Omar | Leadership |
| A/B Test Results | Bi-weekly | Anthony | All team |
| SEO Rankings | Monthly | Omar | Marketing |
| Site Performance | Monthly | Brian | Dev team |

**Report Templates:**
- [Analytics Dashboard](/guides/bigquery)
- [Performance Reports](/enrollment-funnel-kpis)
- [SEO Tracking](/analytics-standards)

## 🚨 Emergency Procedures

### Site Down
1. **Check status page** - Verify if it's a known issue
2. **Test from multiple locations** - Rule out local network issues
3. **Contact hosting provider** - If confirmed outage
4. **Notify stakeholders** - Use emergency communication plan

### Broken Conversion Tracking
1. **Verify in GA4** - Check real-time reports
2. **Test GTM preview** - Validate tag firing
3. **Check recent changes** - Review deployment history
4. **Escalate immediately** - Contact analytics team

### SEO Emergency
1. **Check Search Console** - Look for manual actions
2. **Verify robot.txt** - Ensure not blocking crawlers
3. **Review recent changes** - Check for SEO impact
4. **Document and fix** - Create incident report

:::warning Critical Contacts
- **Hosting Emergency**: [Contact Info]
- **Analytics Issues**: Omar (primary), Anthony (backup)
- **Site Functionality**: Brian (primary), Jason (backup)
- **Leadership Escalation**: Thomas, Brandy
:::

## 🔗 Quick Reference

### Most Used Links
- [QA Smoke Test Checklist](/guides/qa-smoke-test)
- [Asana Task Creation](/asana)
- [SEO Hygiene Guide](/guides/seo-hygiene)
- [Analytics Standards](/analytics-standards)
- [Content Update Process](/content-updates)

### Keyboard Shortcuts
- **Search**: `/` 
- **Navigate sections**: `←` `→`
- **Go to homepage**: `Alt + H`
- **Open search**: `Alt + S`

Need something not listed here? Use the search function or check the full navigation menu.
