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
        'team-collaboration-guide',
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
      label: 'Program SEO - Complete Catalog',
      items: [
        'programs/index',
        {
          type: 'category',
          label: 'Associate Degree (4 Programs)',
          items: [
            {
              type: 'link',
              label: 'AA in Business',
              href: 'https://www.uagc.edu/online-degrees/associate/business',
            },
            {
              type: 'link',
              label: 'AA in Military Studies',
              href: 'https://www.uagc.edu/online-degrees/associate/military-studies',
            },
            {
              type: 'link',
              label: 'AA in Organizational Management',
              href: 'https://www.uagc.edu/online-degrees/associate/organizational-management',
            },
            {
              type: 'link',
              label: 'Early Childhood Education Associate',
              href: 'https://www.uagc.edu/online-degrees/associate/early-childhood-education',
            },
          ],
        },
        {
          type: 'category',
          label: 'Bachelor\'s Degree (29+ Programs)',
          items: [
            {
              type: 'category',
              label: 'Business & Finance (8 Programs)',
              items: [
                {
                  type: 'link',
                  label: 'Accounting',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/accounting',
                },
                {
                  type: 'link',
                  label: 'Business Administration (BBA)',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/business-administration',
                },
                {
                  type: 'link',
                  label: 'Business Leadership',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/business-leadership',
                },
                {
                  type: 'link',
                  label: 'Business Information Systems',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/business-information-systems',
                },
                {
                  type: 'link',
                  label: 'Finance',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/finance',
                },
                {
                  type: 'link',
                  label: 'Marketing',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/marketing',
                },
                {
                  type: 'link',
                  label: 'Operations Management',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/operations-management',
                },
                {
                  type: 'link',
                  label: 'Project Management',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/project-management',
                },
              ],
            },
            {
              type: 'category',
              label: 'NEW Business Programs (2)',
              items: [
                'programs/ba-business-economics',
                'programs/ba-supply-chain-management',
              ],
            },
            {
              type: 'category',
              label: 'Education (5 Programs)',
              items: [
                {
                  type: 'link',
                  label: 'Early Childhood Education (BA)',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/early-childhood-education',
                },
                {
                  type: 'link',
                  label: 'Early Childhood Education Admin',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/early-childhood-education-administration',
                },
                {
                  type: 'link',
                  label: 'Child Development',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/child-development',
                },
                {
                  type: 'link',
                  label: 'Early Childhood Development',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/early-childhood-development',
                },
                {
                  type: 'link',
                  label: 'Education Studies',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/education-studies',
                },
              ],
            },
            {
              type: 'category',
              label: 'Health Care (4 Programs)',
              items: [
                {
                  type: 'link',
                  label: 'Health Care Administration',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/health-care-administration',
                },
                {
                  type: 'link',
                  label: 'Health and Human Services',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/health-human-services',
                },
                {
                  type: 'link',
                  label: 'Health Information Management',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/health-information-management',
                },
                {
                  type: 'link',
                  label: 'RN to BSN',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/rn-bsn',
                },
              ],
            },
            {
              type: 'category',
              label: 'NEW Health & Wellness (1)',
              items: [
                'programs/ba-health-wellness',
              ],
            },
            {
              type: 'category',
              label: 'Information Technology (3 Programs)',
              items: [
                {
                  type: 'link',
                  label: 'Information Technology',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/information-technology',
                },
                {
                  type: 'link',
                  label: 'Computer Software Technology',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/computer-software-technology',
                },
                {
                  type: 'link',
                  label: 'Cyber and Data Security',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/cyber-data-security-technology',
                },
              ],
            },
            {
              type: 'category',
              label: 'Social Sciences & Liberal Arts (6)',
              items: [
                {
                  type: 'link',
                  label: 'Psychology',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/psychology',
                },
                {
                  type: 'link',
                  label: 'Sociology',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/sociology',
                },
                {
                  type: 'link',
                  label: 'Applied Behavioral Science',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/applied-behavioral-science',
                },
                {
                  type: 'link',
                  label: 'Social and Criminal Justice',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/social-criminal-justice',
                },
                {
                  type: 'link',
                  label: 'Liberal Arts',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/liberal-arts',
                },
                {
                  type: 'link',
                  label: 'Instructional Design',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/instructional-design',
                },
              ],
            },
            {
              type: 'category',
              label: 'NEW Social Sciences (2)',
              items: [
                'programs/ba-communication-studies',
                'programs/ba-social-science',
              ],
            },
            {
              type: 'category',
              label: 'Management & Leadership (2)',
              items: [
                {
                  type: 'link',
                  label: 'Organizational Management',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/organizational-management',
                },
                {
                  type: 'link',
                  label: 'Human Resources Management',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/human-resources-management',
                },
              ],
            },
            {
              type: 'category',
              label: 'Security & Emergency (1)',
              items: [
                {
                  type: 'link',
                  label: 'Homeland Security',
                  href: 'https://www.uagc.edu/online-degrees/bachelors/homeland-security-emergency-management',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Master\'s Degree (17+ Programs)',
          items: [
            {
              type: 'category',
              label: 'Business & Management (6)',
              items: [
                {
                  type: 'link',
                  label: 'MBA',
                  href: 'https://www.uagc.edu/online-degrees/masters/mba',
                },
                {
                  type: 'link',
                  label: 'Information Systems Management',
                  href: 'https://www.uagc.edu/online-degrees/masters/information-systems-management',
                },
                {
                  type: 'link',
                  label: 'Human Resource Management',
                  href: 'https://www.uagc.edu/online-degrees/masters/human-resource-management',
                },
                {
                  type: 'link',
                  label: 'Finance',
                  href: 'https://www.uagc.edu/online-degrees/masters/finance',
                },
                {
                  type: 'link',
                  label: 'Accountancy',
                  href: 'https://www.uagc.edu/online-degrees/masters/accountancy',
                },
                {
                  type: 'link',
                  label: 'Organizational Management',
                  href: 'https://www.uagc.edu/online-degrees/masters/organizational-management',
                },
              ],
            },
            {
              type: 'category',
              label: 'Education (4 Programs)',
              items: [
                {
                  type: 'link',
                  label: 'Education',
                  href: 'https://www.uagc.edu/online-degrees/masters/education',
                },
                {
                  type: 'link',
                  label: 'Special Education',
                  href: 'https://www.uagc.edu/online-degrees/masters/special-education',
                },
                {
                  type: 'link',
                  label: 'Instructional Design & Technology',
                  href: 'https://www.uagc.edu/online-degrees/masters/instructional-design-technology',
                },
                {
                  type: 'link',
                  label: 'Early Childhood Education Leadership',
                  href: 'https://www.uagc.edu/online-degrees/masters/early-childhood-education-leadership',
                },
              ],
            },
            {
              type: 'category',
              label: 'NEW Education Programs (1)',
              items: [
                'programs/ma-teaching-learning-technology',
              ],
            },
            {
              type: 'category',
              label: 'Health Care (4 Programs)',
              items: [
                {
                  type: 'link',
                  label: 'Health Care Administration',
                  href: 'https://www.uagc.edu/online-degrees/masters/health-care-administration',
                },
                {
                  type: 'link',
                  label: 'Health Informatics and Analytics',
                  href: 'https://www.uagc.edu/online-degrees/masters/health-informatics-analytics',
                },
                {
                  type: 'link',
                  label: 'Public Health',
                  href: 'https://www.uagc.edu/online-degrees/masters/public-health',
                },
                {
                  type: 'link',
                  label: 'Psychology',
                  href: 'https://www.uagc.edu/online-degrees/masters/psychology',
                },
              ],
            },
            {
              type: 'category',
              label: 'Technology & Criminal Justice (3)',
              items: [
                {
                  type: 'link',
                  label: 'Technology Management',
                  href: 'https://www.uagc.edu/online-degrees/masters/technology-management',
                },
                {
                  type: 'link',
                  label: 'Criminal Justice',
                  href: 'https://www.uagc.edu/online-degrees/masters/criminal-justice',
                },
                {
                  type: 'link',
                  label: 'Human Services',
                  href: 'https://www.uagc.edu/online-degrees/masters/human-services',
                },
              ],
            },
            {
              type: 'category',
              label: 'NEW Leadership Program (1)',
              items: [
                'programs/mps-leadership',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Doctoral Degree (4+ Programs)',
          items: [
            {
              type: 'link',
              label: 'PhD in Education',
              href: 'https://www.uagc.edu/online-degrees/doctoral/education',
            },
            {
              type: 'link',
              label: 'PhD in Human Services',
              href: 'https://www.uagc.edu/online-degrees/doctoral/human-services',
            },
            {
              type: 'link',
              label: 'Doctor of Psychology',
              href: 'https://www.uagc.edu/online-degrees/doctoral/psychology',
            },
            {
              type: 'link',
              label: 'PhD in Organizational Development',
              href: 'https://www.uagc.edu/online-degrees/doctoral/organizational-development-leadership',
            },
            {
              type: 'category',
              label: 'NEW Doctoral Programs (1)',
              items: [
                'programs/dps-organizational-development-leadership',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Program Intelligence & Analysis',
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
