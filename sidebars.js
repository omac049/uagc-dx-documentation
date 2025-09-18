/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Home and general info
  homeSidebar: [
    'index',
    'how-to-use',
    'why-this-exists',
    'recent-updates',
  ],

  // Getting Started section
  gettingStartedSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'digital-experience-enrollment-funnel',
        'guides/getting-started',
        'day-to-day-ops',
        'common-tasks',
        'who-does-what',
      ],
    },
  ],

  // QA & Development section
  qaDevSidebar: [
    {
      type: 'category',
      label: 'Development Standards & Processes',
      items: [
        'guides/drupal-standards',
        'development-workflows',
        'guides/performance-web-vitals',
      ],
    },
    {
      type: 'category',
      label: 'QA Processes',
      items: [
        'guides/qa-smoke-test',
        'guides/accessibility',
        'accessibility',
      ],
    },
    {
      type: 'category',
      label: 'Page Management',
      items: [
        'guides/page-changes',
        'content-updates',
      ],
    },
    {
      type: 'category',
      label: 'Release Management',
      items: [
        'guides/release-incident',
      ],
    },
  ],

  // Analytics & Tracking section
  analyticsSidebar: [
    {
      type: 'category',
      label: 'Analytics Strategy & Governance',
      items: [
        'analytics-standards',
        'enrollment-funnel-kpis',
      ],
    },
    {
      type: 'category',
      label: 'Implementation Details',
      items: [
        'ga4-setup-event-tracking',
        'gtm-configuration-datalayer',
      ],
    },
    {
      type: 'category',
      label: 'Testing & Optimization',
      items: [
        'guides/optimizely-tests',
        'ab-testing',
      ],
    },
    {
      type: 'category',
      label: 'Privacy, Consent & Data',
      items: [
        'guides/privacy-consent',
        'cookie-organization',
        'user-consent-procedures',
      ],
    },
  ],

  // SEO Guide section  
  seoSidebar: [
    {
      type: 'category',
      label: 'SEO Optimization',
      items: [
        'guides/seo-hygiene',
        'guides/seo-redirects',
        'canonical-links-url-taxonomy',
      ],
    },
  ],

  // Web Guidelines section
  guidelinesSidebar: [
    {
      type: 'category',
      label: 'Accessibility',
      items: [
        'wcag-compliance',
        'accessibility-checklist',
        'guides/accessibility',
      ],
    },
    {
      type: 'category',
      label: 'Content',
      items: [
        'guides/content-standards',
        'content-templates',
      ],
    },
    {
      type: 'category',
      label: 'UI/UX',
      items: [
        'ui-ux-best-practices',
      ],
    },
  ],

  // References & Tools section
  referencesSidebar: [
    {
      type: 'category',
      label: 'References & Tools',
      items: [
        'asana',
        'guides/glossary',
        'sitemap',
        'request-information-form',
        'documentation-workflow',
        'growth-roadmap',
        'keyboard_shortcuts',

        {
          type: 'category',
          label: 'Draft Documents',
          items: [
            'outline-draft/outline',
          ],
        },
      ],
    },
  ],

  // Program SEO Strategies section
  programsSidebar: [
    {
      type: 'category',
      label: 'Program SEO Strategies',
      items: [
        'programs/index',
        {
          type: 'category',
          label: 'Bachelor Programs',
          items: [
            'programs/ba-business-economics',
            'programs/ba-communication-studies', 
            'programs/ba-health-wellness',
            'programs/ba-social-science',
            'programs/ba-supply-chain-management',
          ],
        },
        {
          type: 'category',
          label: 'Master Programs',
          items: [
            'programs/ma-teaching-learning-technology',
            'programs/mps-leadership',
          ],
        },
        {
          type: 'category', 
          label: 'Doctoral Programs',
          items: [
            'programs/dps-organizational-development-leadership',
          ],
        },
        {
          type: 'category',
          label: 'Program Intelligence',
          items: [
            'programs/academic-programs-catalog',
            'programs/program-specifications',
          ],
        },
      ],
    },
  ],


};

export default sidebars;
