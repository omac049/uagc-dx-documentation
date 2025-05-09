/**
 * UAGC DX Documentation - Navigation Connection Fix
 * This script ensures all navigation links are properly connected and displayed
 */
document.addEventListener('DOMContentLoaded', function() {
  // Wait for navigation to be fully loaded
  setTimeout(function() {
    fixNavigationConnections();
    handleHeaderScrolling();
    fixScrollingToAnchors();
    enhanceNavigationUsability();
    handleBrokenLinks();
  }, 300);
});

/**
 * Fix navigation connection issues by checking for missing links and ensuring proper display
 */
function fixNavigationConnections() {
  // Get the main navigation elements
  const primaryNav = document.querySelector('.md-nav--primary');
  if (!primaryNav) return;
  
  // 1. Ensure all top-level sections are visible
  ensureTopLevelSectionsVisible(primaryNav);
  
  // 2. Automatically expand the current section
  expandCurrentSection(primaryNav);
  
  // 3. Fix any broken link references
  fixBrokenLinks(primaryNav);
  
  // 4. Add error handling for missing pages
  addMissingPageHandling();
  
  // 5. Ensure proper nesting and indentation of navigation items
  fixNavigationNesting(primaryNav);
}

/**
 * Handle header behavior on scrolling
 */
function handleHeaderScrolling() {
  let lastScrollPosition = 0;
  const header = document.querySelector('.md-header');
  const headerHeight = header ? header.offsetHeight : 0;
  const tabs = document.querySelector('.md-tabs');
  const tabsHeight = tabs ? tabs.offsetHeight : 0;
  const totalHeaderHeight = headerHeight + tabsHeight;
  
  // Add padding to main content to prevent content from being hidden
  const main = document.querySelector('.md-main');
  if (main) {
    main.style.paddingTop = `${totalHeaderHeight}px`;
  }
  
  // Add scroll padding for proper anchor placement
  document.documentElement.style.scrollPaddingTop = `${totalHeaderHeight + 16}px`;
  
  // Handle scroll behavior
  window.addEventListener('scroll', function() {
    const currentScrollPosition = window.pageYOffset;
    
    // Only apply shadow when scrolled down
    if (header) {
      if (currentScrollPosition > 10) {
        header.classList.add('md-header--shadow');
      } else {
        header.classList.remove('md-header--shadow');
      }
    }
    
    lastScrollPosition = currentScrollPosition;
  });
}

/**
 * Fix scrolling to anchors accounting for fixed header
 */
function fixScrollingToAnchors() {
  // Get all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Skip empty anchors
      if (this.getAttribute('href') === '#') return;
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const header = document.querySelector('.md-header');
        const tabs = document.querySelector('.md-tabs');
        const headerHeight = header ? header.offsetHeight : 0;
        const tabsHeight = tabs ? tabs.offsetHeight : 0;
        const totalOffset = headerHeight + tabsHeight + 16; // Additional padding
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - totalOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Ensure all top-level navigation sections are visible
 */
function ensureTopLevelSectionsVisible(nav) {
  const topLevelItems = nav.querySelectorAll(':scope > .md-nav__list > .md-nav__item');
  topLevelItems.forEach(item => {
    // Remove any hidden state
    item.style.display = '';
    item.removeAttribute('hidden');
    
    // Ensure the link is visible
    const link = item.querySelector('.md-nav__link');
    if (link) {
      link.style.display = '';
      link.removeAttribute('hidden');
    }
  });
}

/**
 * Auto-expand the current section and its parents for better navigation
 */
function expandCurrentSection(nav) {
  // Find the active link
  const activeLink = nav.querySelector('.md-nav__link--active');
  if (!activeLink) return;
  
  // Find all parent nested items and expand them
  let parent = activeLink.closest('.md-nav__item--nested');
  while (parent) {
    parent.classList.add('md-nav__item--expanded');
    const toggle = parent.querySelector('.md-nav__toggle');
    if (toggle) toggle.checked = true;
    
    // Get next parent level
    parent = parent.parentElement.closest('.md-nav__item--nested');
  }
}

/**
 * Fix broken links by checking URL validity and applying corrections
 */
function fixBrokenLinks(nav) {
  // Get all navigation links
  const links = nav.querySelectorAll('.md-nav__link');
  
  links.forEach(link => {
    // Skip links that don't have an href attribute
    if (!link.hasAttribute('href')) return;
    
    const href = link.getAttribute('href');
    
    // Fix common issues with href attributes
    if (href === '#' || href === '') {
      // Find the text content and try to generate a valid URL
      const text = link.textContent.trim().toLowerCase();
      const slug = text.replace(/[^a-z0-9]+/g, '-');
      link.setAttribute('href', `${slug}.html`);
    }
    
    // Add click handler to track navigation errors
    link.addEventListener('click', function(e) {
      // Store the last clicked link for error recovery
      sessionStorage.setItem('lastClickedLink', link.getAttribute('href'));
      sessionStorage.setItem('lastClickedText', link.textContent.trim());
    });
  });
}

/**
 * Handle cases where a user navigates to a missing page
 */
function addMissingPageHandling() {
  // Check if we're on the 404 page
  if (document.querySelector('.md-404__content')) {
    // Try to provide helpful information about the missing page
    const lastClickedLink = sessionStorage.getItem('lastClickedLink');
    const lastClickedText = sessionStorage.getItem('lastClickedText');
    
    if (lastClickedLink && lastClickedText) {
      const errorInfo = document.createElement('div');
      errorInfo.className = 'md-404__help';
      errorInfo.innerHTML = `
        <p>You were attempting to access: <strong>${lastClickedText}</strong></p>
        <p>This page is referenced in the navigation but hasn't been created yet.</p>
        <p><a href="index.html">Return to the homepage</a> or use the search to find related content.</p>
      `;
      
      const errorContent = document.querySelector('.md-404__content');
      if (errorContent) {
        errorContent.appendChild(errorInfo);
      }
    }
  }
}

/**
 * Fix navigation nesting issues by ensuring proper structure and indent levels
 */
function fixNavigationNesting(nav) {
  // Get all navigation lists
  const navLists = nav.querySelectorAll('.md-nav__list');
  
  navLists.forEach(list => {
    // Skip the top-level list
    if (list.parentElement === nav) return;
    
    // Check if the list is properly nested
    const parentNavItem = list.closest('.md-nav__item');
    if (!parentNavItem) return;
    
    const parentLink = parentNavItem.querySelector(':scope > .md-nav__link');
    if (!parentLink) return;
    
    // Add a class to indicate the nesting level
    const nestingLevel = getNavNestingLevel(list);
    list.classList.add(`md-nav__list--level-${nestingLevel}`);
    
    // Apply proper indentation based on nesting level
    const items = list.querySelectorAll(':scope > .md-nav__item > .md-nav__link');
    items.forEach(item => {
      item.style.paddingLeft = `${nestingLevel * 0.5 + 0.5}rem`;
    });
  });
}

/**
 * Get the nesting level of a navigation element
 */
function getNavNestingLevel(element) {
  let level = 0;
  let parent = element.parentElement;
  
  while (parent) {
    if (parent.classList && parent.classList.contains('md-nav__list')) {
      level++;
    }
    parent = parent.parentElement;
  }
  
  return level;
}

/**
 * Enhance navigation usability with better interaction
 */
function enhanceNavigationUsability() {
  // Add functionality to expand/collapse sections on click
  const nestedItems = document.querySelectorAll('.md-nav__item--nested');
  
  nestedItems.forEach(item => {
    const link = item.querySelector('.md-nav__link');
    if (link) {
      link.addEventListener('click', function(e) {
        // Only handle the click if it's directly on the parent link (not a child link)
        if (e.target === link || e.target.parentNode === link) {
          e.preventDefault();
          item.classList.toggle('md-nav__item--expanded');
          
          // If a checkbox toggle exists, toggle it
          const toggle = item.querySelector('.md-nav__toggle');
          if (toggle) {
            toggle.checked = !toggle.checked;
          }
        }
      });
    }
  });
  
  // Highlight active section and parents
  const currentPath = window.location.pathname;
  const allLinks = document.querySelectorAll('.md-nav__link');
  
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if (href && (currentPath.endsWith(href) || currentPath.includes(href))) {
      link.classList.add('md-nav__link--active');
      
      // Expand parent sections
      let parent = link.closest('.md-nav__item--nested');
      while (parent) {
        parent.classList.add('md-nav__item--expanded');
        const toggle = parent.querySelector('.md-nav__toggle');
        if (toggle) toggle.checked = true;
        
        parent = parent.parentElement.closest('.md-nav__item--nested');
      }
    }
  });
}

/**
 * Handle broken links to prevent 404 errors
 */
function handleBrokenLinks() {
  // Get all links on the page
  const links = document.querySelectorAll('a:not([href^="#"]):not([href^="http"]):not([href^="mailto"])');
  
  // List of files known to exist (implement this based on your structure)
  const knownValidPaths = [
    'index.html', 'index.md',
    'how-to-use.html', 'how-to-use.md',
    'why-this-exists.html', 'why-this-exists.md',
    'recent-updates.html', 'recent-updates.md',
    'digital-experience-enrollment-funnel.html', 'digital-experience-enrollment-funnel.md',
    'guides/getting-started.html', 'guides/getting-started.md',
    'day-to-day-ops.html', 'day-to-day-ops.md',
    'common-tasks.html', 'common-tasks.md',
    'who-does-what.html', 'who-does-what.md',
    'guides/drupal-standards.html', 'guides/drupal-standards.md', 
    'guides/performance-web-vitals.html', 'guides/performance-web-vitals.md',
    'guides/qa-smoke-test.html', 'guides/qa-smoke-test.md',
    'guides/accessibility.html', 'guides/accessibility.md',
    'guides/page-changes.html', 'guides/page-changes.md',
    'guides/release-incident.html', 'guides/release-incident.md',
    'analytics-standards.html', 'analytics-standards.md',
    'enrollment-funnel-kpis.html', 'enrollment-funnel-kpis.md',
    'guides/bigquery.html', 'guides/bigquery.md',
    'guides/optimizely-tests.html', 'guides/optimizely-tests.md',
    'guides/privacy-consent.html', 'guides/privacy-consent.md',
    'guides/seo-hygiene.html', 'guides/seo-hygiene.md',
    'guides/seo-redirects.html', 'guides/seo-redirects.md',
    'guides/content-standards.html', 'guides/content-standards.md',
    'asana.html', 'asana.md',
    'guides/glossary.html', 'guides/glossary.md',
    'sitemap.html', 'sitemap.md',
    'request-information-form.html', 'request-information-form.md',
    'documentation-workflow.html', 'documentation-workflow.md',
    'growth-roadmap.html', 'growth-roadmap.md',
    'keyboard_shortcuts.html', 'keyboard_shortcuts.md',
    'outline-draft/outline.html', 'outline-draft/outline.md'
  ];
  
  // Fix potentially broken links
  links.forEach(link => {
    if (!link.hasAttribute('href')) return;
    
    let href = link.getAttribute('href');
    if (!href) return;
    
    // Normalize href (remove leading slash, convert .md to .html if viewing in browser)
    href = href.replace(/^\//, '');
    
    // Check if the path is known to be valid
    const isValid = knownValidPaths.some(path => {
      return href === path || href.replace('.md', '.html') === path || href.replace('.html', '.md') === path;
    });
    
    // If path is not valid, redirect to a fallback or mark the link
    if (!isValid) {
      // Add special class to show it might be broken
      link.classList.add('potentially-broken-link');
      
      // Add tooltip explaining it might be a broken link
      link.setAttribute('title', 'This link might be broken or point to a page that hasn\'t been created yet.');
      
      // Add click handler to handle broken links
      link.addEventListener('click', function(e) {
        // Get relevant section from the broken URL
        const section = getMainSectionFromUrl(href);
        
        if (section) {
          e.preventDefault();
          
          // Redirect to existing section instead
          window.location.href = sectionToUrl(section);
          
          console.log(`Redirected from potentially broken link "${href}" to section "${section}"`);
        } else {
          console.log(`Potentially broken link clicked: ${href}`);
          // Let the browser handle the 404
        }
      });
    }
  });
}

/**
 * Try to determine which main section a URL belongs to
 */
function getMainSectionFromUrl(url) {
  const sectionMappings = {
    // Home section
    'index': 'home',
    'how-to-use': 'home',
    'why-this-exists': 'home',
    'recent-updates': 'home',
    
    // Getting Started
    'digital-experience-enrollment-funnel': 'getting-started',
    'getting-started': 'getting-started',
    'day-to-day-ops': 'getting-started',
    'common-tasks': 'getting-started',
    'who-does-what': 'getting-started',
    
    // QA & Development
    'drupal-standards': 'qa-development',
    'development-workflows': 'qa-development',
    'performance-web-vitals': 'qa-development',
    'qa-smoke-test': 'qa-development',
    'accessibility': 'qa-development',
    'page-changes': 'qa-development',
    'content-updates': 'qa-development',
    'release-incident': 'qa-development',
    
    // Tracking & Analytics
    'analytics-standards': 'tracking-analytics',
    'enrollment-funnel-kpis': 'tracking-analytics',
    'ga4-setup-event-tracking': 'tracking-analytics',
    'gtm-configuration-datalayer': 'tracking-analytics',
    'bigquery': 'tracking-analytics',
    'lead-api-salesforce-integration': 'tracking-analytics',
    'optimizely-tests': 'tracking-analytics',
    'ab-testing': 'tracking-analytics',
    'privacy-consent': 'tracking-analytics',
    'cookie-organization': 'tracking-analytics',
    'user-consent-procedures': 'tracking-analytics',
    
    // Web Guidelines
    'seo-hygiene': 'web-guidelines',
    'seo-redirects': 'web-guidelines',
    'canonical-links-url-taxonomy': 'web-guidelines',
    'wcag-compliance': 'web-guidelines',
    'accessibility-checklist': 'web-guidelines',
    'content-standards': 'web-guidelines',
    'content-templates': 'web-guidelines',
    'ui-ux-best-practices': 'web-guidelines',
    
    // References & Tools
    'asana': 'references-tools',
    'glossary': 'references-tools',
    'sitemap': 'references-tools',
    'request-information-form': 'references-tools',
    'documentation-workflow': 'references-tools',
    'growth-roadmap': 'references-tools',
    'keyboard_shortcuts': 'references-tools',
    'outline-draft/outline': 'references-tools'
  };
  
  // Extract the page name from the URL
  const pageName = url.split('.')[0];
  const segments = pageName.split('/');
  const lastSegment = segments[segments.length - 1];
  
  // Check if the page or its parent directory maps to a section
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (sectionMappings[segment]) {
      return sectionMappings[segment];
    }
  }
  
  // Check the full page name
  if (sectionMappings[pageName]) {
    return sectionMappings[pageName];
  }
  
  // Check just the last segment
  if (sectionMappings[lastSegment]) {
    return sectionMappings[lastSegment];
  }
  
  return null;
}

/**
 * Convert a section name to a valid URL that exists
 */
function sectionToUrl(section) {
  const sectionUrls = {
    'home': 'index.html',
    'getting-started': 'guides/getting-started.html',
    'qa-development': 'guides/qa-smoke-test.html',
    'tracking-analytics': 'analytics-standards.html',
    'web-guidelines': 'guides/seo-hygiene.html',
    'references-tools': 'documentation-workflow.html'
  };
  
  return sectionUrls[section] || 'index.html';
}

/**
 * Create a class for the header when scrolled for visual distinction
 */
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .md-header--shadow {
      box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.15), 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
    }
    .md-content {
      scroll-margin-top: calc(var(--md-header-height) + var(--md-tabs-height) + 1rem);
    }
    :target {
      scroll-margin-top: calc(var(--md-header-height) + var(--md-tabs-height) + 1rem);
    }
  </style>
`); 