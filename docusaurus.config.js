// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'UAGC DX Team Hub',
  tagline: 'Central home for every repeatable task that keeps uagc.edu running',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://omac049.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/uagc-dx-documentation/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'omac049', // Usually your GitHub org/user name.
  projectName: 'uagc-dx-documentation', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn', // Allow broken links during migration
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'new-docs', // Path to documentation files
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/omac049/uagc-dx-documentation/edit/main/new-docs/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: false, // Disable blog for documentation site
        theme: {
          customCss: ['./src/css/custom.css', './src/css/fixes.css'],
        },
        gtag: {
          trackingID: 'G-XXXXXXXXXX', // Replace with your actual Google Analytics property ID
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  // Additional scripts and stylesheets
  scripts: [
    // InstantSearch.js CDN
    'https://cdn.jsdelivr.net/npm/algoliasearch@4.20.0/dist/algoliasearch-lite.umd.js',
    'https://cdn.jsdelivr.net/npm/instantsearch.js@4.56.10/dist/instantsearch.production.min.js',
    // Custom search implementation
    '/uagc-dx-documentation/js/custom-search.js',
  ],
  
  stylesheets: [
    // InstantSearch.js reset theme for better baseline styling
    {
      href: 'https://cdn.jsdelivr.net/npm/instantsearch.css@8.5.1/themes/reset-min.css',
      type: 'text/css',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      
      // Custom search configuration (removed DocSearch for custom InstantSearch.js)
      
      navbar: {
        title: 'UAGC DX Team Hub',
        logo: {
          alt: 'UAGC DX Logo',
          src: 'img/logo.svg',
        },
                 items: [
           {
             type: 'docSidebar',
             sidebarId: 'gettingStartedSidebar',
             position: 'left',
             label: 'Getting Started',
           },
           {
             type: 'docSidebar',
             sidebarId: 'qaDevSidebar',
             position: 'left',
             label: 'QA & Development',
           },
           {
             type: 'docSidebar',
             sidebarId: 'analyticsSidebar',
             position: 'left',
             label: 'Analytics & Tracking',
           },
           {
             type: 'docSidebar',
             sidebarId: 'seoSidebar',
             position: 'left',
             label: 'SEO Guide',
           },
           {
             type: 'docSidebar',
             sidebarId: 'guidelinesSidebar',
             position: 'left',
             label: 'Web Guidelines',
           },
           {
             type: 'docSidebar',
             sidebarId: 'referencesSidebar',
             position: 'left',
             label: 'References & Tools',
                     },
          {
            type: 'html',
            position: 'right',
            value: `
              <button
                id="custom-search-button"
                class="navbar__item navbar__link"
                aria-label="Search"
                style="
                  background: none;
                  border: none;
                  color: var(--ifm-navbar-link-color);
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  padding: 0.375rem 0.75rem;
                  border-radius: var(--ifm-button-border-radius);
                  transition: background-color var(--ifm-transition-fast);
                "
                onmouseover="this.style.backgroundColor='var(--ifm-color-emphasis-200)'"
                onmouseout="this.style.backgroundColor='transparent'"
              >
                🔍 Search
              </button>
            `,
          },
         {
           href: 'https://github.com/omac049/uagc-dx-documentation',
           label: 'GitHub',
           position: 'right',
         },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Quick Access',
            items: [
              {
                label: 'Getting Started',
                to: '/getting-started',
              },
              {
                label: 'Common Tasks',
                to: '/common-tasks',
              },
              {
                label: 'QA Smoke Test',
                to: '/guides/qa-smoke-test',
              },
            ],
          },
          {
            title: 'Development',
            items: [
              {
                label: 'Drupal Standards',
                to: '/guides/drupal-standards',
              },
              {
                label: 'Release Procedures',
                to: '/guides/release-incident',
              },
              {
                label: 'Performance Guidelines',
                to: '/guides/performance-web-vitals',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub Repository',
                href: 'https://github.com/omac049/uagc-dx-documentation',
              },
              {
                label: 'Team Roles',
                to: '/who-does-what',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} UAGC Digital Experience Team. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['php', 'bash', 'json', 'yaml'],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'documentation_day',
        content:
          'Documentation continuously updated! <strong>Search improvements</strong> and new guides added regularly.',
        backgroundColor: '#3578e5',
        textColor: '#ffffff',
        isCloseable: false,
      },
    }),

  plugins: [
    // Image optimization plugin can be added later if needed
    // Requires: npm install @docusaurus/plugin-ideal-image
  ],

  // Mermaid support can be added later if needed
  // Requires: npm install @docusaurus/theme-mermaid
};

export default config;
