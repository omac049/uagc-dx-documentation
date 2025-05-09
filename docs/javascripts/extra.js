/**
 * Enhanced MkDocs JavaScript
 */

// Main initialization function 
document.addEventListener('DOMContentLoaded', function() {
  // Clean up any exposed debug code in header
  cleanupExposedCode();
  
  // Apply enhanced layout
  enhanceLayout();
  
  // Set up page enhancements
  setupProgressBar();
  setupKeyboardShortcuts();
  setupMobileMenuHandling();
  applyActiveStateToMenu();
  fixNestedNavigation();
  enhanceSidebarMenu();
  fixHeaderIcons();
  
  // CRITICAL FIX: Force open all submenus that should be expanded
  forceOpenSubmenus();
  
  // Re-apply on window resize
  window.addEventListener('resize', enhanceLayout, { passive: true });
  
  // Handle navigation events
  document.addEventListener('click', function(e) {
    // Check if a menu item was clicked
    if (e.target.closest('.md-nav__link')) {
      // Apply any transition effects here if needed
    }
  });

  // Improve navigation functionality
  const navLinks = document.querySelectorAll('.md-nav__link');
  const navToggles = document.querySelectorAll('.md-nav__toggle');
  
  // Handle nested navigation items toggle
  navLinks.forEach(link => {
    // For links that have nested items
    if (link.nextElementSibling && link.nextElementSibling.classList.contains('md-nav')) {
      link.addEventListener('click', function(e) {
        // Only prevent default if it's a parent nav item with children
        if (link.parentElement.classList.contains('md-nav__item--nested')) {
          e.preventDefault();
          
          // Find the associated toggle and trigger it
          const toggle = link.parentElement.querySelector('.md-nav__toggle');
          if (toggle) {
            toggle.checked = !toggle.checked;
            
            // Manually trigger the display change for child nav
            const nestedNav = link.nextElementSibling;
            if (nestedNav && nestedNav.classList.contains('md-nav')) {
              if (toggle.checked) {
                nestedNav.style.display = 'block';
                link.setAttribute('aria-expanded', 'true');
                link.parentElement.classList.add('md-nav__item--expanded');
                // Force open
                forceOpenSubmenus();
              } else {
                nestedNav.style.display = 'none';
                link.setAttribute('aria-expanded', 'false');
                link.parentElement.classList.remove('md-nav__item--expanded');
              }
            }
          }
        }
      });
    }
  });

  // Enhanced navigation for mobile devices
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Make touch targets larger on touch devices
    const style = document.createElement('style');
    style.textContent = `
      .touch-device .md-nav__link {
        padding-top: 0.7rem !important;
        padding-bottom: 0.7rem !important;
      }
      .touch-device .md-nav__item--nested .md-nav__link:after {
        top: 0.7rem !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Force existing menu structure
  setTimeout(forceOpenSubmenus, 100);
  setTimeout(forceOpenSubmenus, 500);
  setTimeout(forceOpenSubmenus, 1000);
});

// Clean up any exposed debug/dev code
function cleanupExposedCode() {
  // Hide debug elements in header
  document.querySelectorAll('.md-header pre:not([class]), .md-header code:not([class])').forEach(el => {
    el.style.display = 'none';
  });
  
  // Remove exposed JS/CSS variables
  document.querySelectorAll('[data-md-component="palette"], [style*="var("]').forEach(el => {
    if (el.textContent.includes('color-scheme') || 
        el.textContent.includes('palette') || 
        el.textContent.includes('var(')) {
      el.style.display = 'none';
    }
  });
  
  // Move any inline styles to head
  document.querySelectorAll('.md-header style').forEach(style => {
    if (!style.parentNode.isEqualNode(document.head)) {
      document.head.appendChild(style);
    }
  });
}

// Apply enhanced layout
function enhanceLayout() {
  // Fix header
  const header = document.querySelector('.md-header');
  if (header) {
    header.style.width = '100%';
    
    // Add subtle shadow on scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }
    }, { passive: true });
  }
  
  // Fix content
  const content = document.querySelector('.md-content');
  if (content) {
    if (window.innerWidth > 960) {
      content.style.marginLeft = '14rem';
      content.style.width = 'calc(100% - 14rem)';
      content.style.maxWidth = 'calc(100% - 14rem)';
    } else {
      content.style.marginLeft = '0';
      content.style.width = '100%';
      content.style.maxWidth = '100%';
    }
  }
  
  // Fix sidebar width
  const sidebar = document.querySelector('.md-sidebar--primary');
  if (sidebar) {
    sidebar.style.width = '14rem';
    sidebar.style.minWidth = '14rem';
    sidebar.style.maxWidth = '14rem';
    
    // Add shadow to scrollwrap
    const scrollwrap = sidebar.querySelector('.md-sidebar__scrollwrap');
    if (scrollwrap) {
      scrollwrap.style.width = '14rem';
      scrollwrap.style.minWidth = '14rem';
      scrollwrap.style.maxWidth = '14rem';
    }
  }
  
  // Enhance tables - apply special styling to Team Members table
  document.querySelectorAll('table').forEach(table => {
    const tableText = table.textContent.toLowerCase();
    if (tableText.includes('core responsibilities') || 
        tableText.includes('team members') || 
        tableText.includes('person')) {
      table.classList.add('team-table');
    }
  });
  
  // Enhance card components
  document.querySelectorAll('.grid-card').forEach(card => {
    // Add subtle hover effect
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 6px 14px rgba(0, 0, 0, 0.12)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
  
  // Add separators to navigation sections
  document.querySelectorAll('.md-nav__title:not(:first-child)').forEach(title => {
    title.style.borderTop = '1px solid rgba(0, 0, 0, 0.05)';
    title.style.marginTop = '0.6rem';
  });
}

// Fix nested navigation indentation
function fixNestedNavigation() {
  document.querySelectorAll('.md-nav--lifted > .md-nav__list, .md-nav--nested').forEach(nav => {
    // Remove any default padding
    nav.style.paddingLeft = '0';
    nav.style.marginLeft = '0';
    
    // Apply custom padding to links
    nav.querySelectorAll('.md-nav__link').forEach(link => {
      // Calculate level depth
      let level = 0;
      let parent = link.closest('.md-nav--nested');
      while (parent) {
        level++;
        parent = parent.parentElement.closest('.md-nav--nested');
      }
      
      // Apply appropriate padding based on level
      if (level === 1) {
        link.style.paddingLeft = '1.5rem';
      } else if (level === 2) {
        link.style.paddingLeft = '2.2rem';
      } else if (level >= 3) {
        link.style.paddingLeft = '2.9rem';
      }
      
      link.style.fontSize = '0.7rem';
    });
  });
  
  // Make sure all nested navigation items are properly indented
  document.querySelectorAll('.md-nav__item--nested').forEach(item => {
    const list = item.querySelector('.md-nav__list');
    if (list) {
      list.style.paddingLeft = '0';
    }
  });
}

// Activate current menu item based on URL
function applyActiveStateToMenu() {
  const currentPath = window.location.pathname;
  
  // Find all navigation links
  document.querySelectorAll('.md-nav__link').forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Skip if no href
    if (!linkPath) return;
    
    // Check if current path matches this link
    if (currentPath.endsWith(linkPath) || 
        (linkPath !== '/' && currentPath.includes(linkPath))) {
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

// Mobile menu handling
function setupMobileMenuHandling() {
  // Get the mobile menu toggle button
  const menuToggle = document.querySelector('.md-header-nav__button.md-icon--menu, [data-md-toggle="drawer"]');
  if (!menuToggle) return;
  
  // Get the sidebar
  const sidebar = document.querySelector('.md-sidebar--primary');
  if (!sidebar) return;
  
  // Add overlay for mobile menu
  let overlay = document.createElement('div');
  overlay.className = 'md-sidebar-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.background = 'rgba(0, 0, 0, 0.3)';
  overlay.style.zIndex = '99';
  overlay.style.display = 'none';
  overlay.style.opacity = '0';
  overlay.style.transition = 'opacity 0.3s ease-in-out';
  
  document.body.appendChild(overlay);
  
  // Handle menu toggle click
  menuToggle.addEventListener('click', function() {
    if (sidebar.classList.contains('md-sidebar--open')) {
      sidebar.classList.remove('md-sidebar--open');
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.display = 'none'; }, 300);
    } else {
      sidebar.classList.add('md-sidebar--open');
      overlay.style.display = 'block';
      setTimeout(() => { overlay.style.opacity = '1'; }, 10);
    }
  });
  
  // Close menu when clicking overlay
  overlay.addEventListener('click', function() {
    sidebar.classList.remove('md-sidebar--open');
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 300);
  });
  
  // Close menu on window resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 960 && sidebar.classList.contains('md-sidebar--open')) {
      sidebar.classList.remove('md-sidebar--open');
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.display = 'none'; }, 300);
    }
  });
}

// Progress bar
function setupProgressBar() {
  // Create if doesn't exist
  if (document.querySelector('.progress-bar')) return;
  
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '3px';
  progressBar.style.backgroundColor = 'var(--md-primary-fg-color)';
  progressBar.style.zIndex = '1000';
  progressBar.style.width = '0%';
  progressBar.style.transition = 'width 0.1s ease-out';
  
  document.body.appendChild(progressBar);
  
  // Update on scroll
  window.addEventListener('scroll', function() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    // Skip if in form fields
    if (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable) {
      return;
    }
    
    // Simple shortcuts
    switch (e.key) {
      case '/': // Search
        e.preventDefault();
        const search = document.querySelector('.md-search__input');
        if (search) search.focus();
        break;
      case 'h': // Home
        const homeLink = document.querySelector('.md-header__button[title="Back to home"]');
        if (homeLink) window.location.href = homeLink.href;
        break;
      case 't': // Top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'n': // Next page
        const next = document.querySelector('.md-footer__link--next');
        if (next) next.click();
        break;
      case 'p': // Previous page
        const prev = document.querySelector('.md-footer__link--prev');
        if (prev) prev.click();
        break;
    }
  });
}

// Enhanced sidebar menu
function enhanceSidebarMenu() {
  // Add smooth animation for menu toggling
  document.querySelectorAll('.md-nav__toggle').forEach(toggle => {
    toggle.addEventListener('change', function() {
      const item = this.closest('.md-nav__item--nested');
      const nav = item.querySelector('.md-nav');
      
      if (this.checked) {
        // Expanding
        item.classList.add('md-nav__item--expanded');
        if (nav) {
          // Set initial height for transition
          nav.style.maxHeight = '0';
          nav.style.opacity = '0';
          
          // Use requestAnimationFrame for smooth transition
          requestAnimationFrame(() => {
            nav.style.maxHeight = nav.scrollHeight + 'px';
            nav.style.opacity = '1';
          });
        }
      } else {
        // Collapsing
        item.classList.remove('md-nav__item--expanded');
        if (nav) {
          // Set initial height for transition
          nav.style.maxHeight = nav.scrollHeight + 'px';
          nav.style.opacity = '1';
          
          // Use requestAnimationFrame for smooth transition
          requestAnimationFrame(() => {
            nav.style.maxHeight = '0';
            nav.style.opacity = '0';
          });
        }
      }
    });
  });
  
  // Add hover effect to menu items
  document.querySelectorAll('.md-nav__link').forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'rgba(var(--md-primary-fg-color--rgb), 0.05)';
    });
    
    link.addEventListener('mouseleave', function() {
      if (!this.classList.contains('md-nav__link--active')) {
        this.style.backgroundColor = '';
      }
    });
  });
  
  // Add better keyboard navigation
  document.querySelectorAll('.md-nav__link').forEach(link => {
    link.setAttribute('tabindex', '0');
    
    link.addEventListener('keydown', function(e) {
      // Enter or space activates the link
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Improve scrolling by highlighting current section
  let currentSection = null;
  const sections = document.querySelectorAll('h1[id], h2[id], h3[id]');
  
  function highlightNavSection() {
    if (sections.length === 0) return;
    
    // Find the section currently in view
    let newCurrentSection = null;
    const scrollPosition = window.scrollY + 100; // Add offset for header
    
    for (const section of sections) {
      if (section.offsetTop <= scrollPosition) {
        newCurrentSection = section.id;
      } else {
        break;
      }
    }
    
    if (newCurrentSection !== currentSection) {
      currentSection = newCurrentSection;
      
      // Remove previous highlighting
      document.querySelectorAll('.md-nav__link--highlight').forEach(link => {
        link.classList.remove('md-nav__link--highlight');
      });
      
      // Add highlighting to new section
      if (currentSection) {
        const tocLink = document.querySelector(`.md-nav__link[href*="${currentSection}"]`);
        if (tocLink) {
          tocLink.classList.add('md-nav__link--highlight');
        }
      }
    }
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', highlightNavSection, { passive: true });
  
  // Initialize highlighting
  highlightNavSection();
  
  // Make sidebar sticky on desktop
  if (window.innerWidth >= 1220) {
    const sidebar = document.querySelector('.md-sidebar--primary');
    const header = document.querySelector('.md-header');
    
    if (sidebar && header) {
      const headerHeight = header.offsetHeight;
      sidebar.style.position = 'sticky';
      sidebar.style.top = headerHeight + 'px';
      sidebar.style.maxHeight = `calc(100vh - ${headerHeight}px)`;
    }
  }
}

// Fix header icons to prevent glitches
function fixHeaderIcons() {
  // Normalize all icons in header
  document.querySelectorAll('.md-header .md-icon, .md-header [class*="fa-"], .md-header .material-icons').forEach(icon => {
    // Ensure consistent dimensions
    icon.style.width = '1.2rem';
    icon.style.height = '1.2rem';
    icon.style.minWidth = '1.2rem';
    icon.style.minHeight = '1.2rem';
    icon.style.fontSize = '1.2rem';
    icon.style.lineHeight = '1';
    icon.style.boxSizing = 'content-box';
    
    // Make the icon display as flex for better centering
    icon.style.display = 'inline-flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    
    // Prevent transition glitches
    icon.classList.add('no-transition');
  });
  
  // Fix logo size
  const logoIcon = document.querySelector('.md-header__button.md-logo img, .md-header__button.md-logo svg');
  if (logoIcon) {
    logoIcon.style.width = '1.6rem';
    logoIcon.style.height = '1.6rem';
    logoIcon.style.minWidth = '1.6rem';
    logoIcon.style.minHeight = '1.6rem';
  }
  
  // Fix search icon position
  document.querySelectorAll('.md-search__icon').forEach(icon => {
    icon.style.position = 'relative';
    icon.style.padding = '0.3rem';
    icon.style.display = 'inline-flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
  });
  
  // Ensure tabs align properly
  document.querySelectorAll('.md-tabs__item').forEach(tab => {
    tab.style.height = '2.4rem';
    tab.style.lineHeight = '2.4rem';
    tab.style.display = 'inline-flex';
    tab.style.alignItems = 'center';
  });
  
  // Fix tabs links alignment
  document.querySelectorAll('.md-tabs__link').forEach(link => {
    link.style.height = '100%';
    link.style.display = 'inline-flex';
    link.style.alignItems = 'center';
    link.style.lineHeight = '2.4rem';
  });
  
  // Smooth scrolling for tabs
  const tabsContainer = document.querySelector('.md-tabs__list');
  if (tabsContainer) {
    // Make tabs scrollable horizontally but hide scrollbar
    tabsContainer.style.overflowX = 'auto';
    tabsContainer.style.scrollbarWidth = 'none'; // Firefox
    tabsContainer.style.msOverflowStyle = 'none'; // IE/Edge
    
    // Hide WebKit scrollbar
    const style = document.createElement('style');
    style.textContent = '.md-tabs__list::-webkit-scrollbar { display: none; }';
    document.head.appendChild(style);
    
    // Add smooth scroll behavior
    tabsContainer.style.scrollBehavior = 'smooth';
    
    // Function to center active tab
    function centerActiveTab() {
      const activeTab = tabsContainer.querySelector('.md-tabs__link--active');
      if (activeTab) {
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();
        const offset = tabRect.left + tabRect.width / 2 - containerRect.left - containerRect.width / 2;
        
        // Smooth scroll to center active tab
        tabsContainer.scrollLeft += offset;
      }
    }
    
    // Center active tab on load
    setTimeout(centerActiveTab, 100);
  }
  
  // Apply smoother transitions
  document.querySelectorAll('.md-header *, .md-tabs *').forEach(el => {
    el.style.backfaceVisibility = 'hidden';
    el.style.webkitFontSmoothing = 'antialiased';
    el.style.mozOsxFontSmoothing = 'grayscale';
  });
}

// Add a progress indicator for long pages
window.addEventListener('load', function() {
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress-bar';
  document.body.prepend(progressBar);
  
  window.addEventListener('scroll', function() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = `${Math.min(100, progress)}%`;
  });
});

// CRITICAL FIX: Function to ensure submenus are properly opened
function forceOpenSubmenus() {
  console.log("Forcing open submenus");
  
  // Method 1: Find active item and ensure all parent menus are open
  const activeItem = document.querySelector('.md-nav__link--active');
  if (activeItem) {
    // Mark all parent nested items as expanded
    let parent = activeItem.closest('.md-nav__item');
    while (parent) {
      if (parent.classList.contains('md-nav__item--nested')) {
        parent.classList.add('md-nav__item--expanded');
        
        // Also check the toggle
        const toggle = parent.querySelector('.md-nav__toggle');
        if (toggle) toggle.checked = true;
        
        // Explicitly show the navigation
        const nav = parent.querySelector('.md-nav');
        if (nav) {
          nav.style.display = 'block';
          nav.style.opacity = '1';
          nav.style.height = 'auto';
          nav.style.maxHeight = '2000px';
          nav.style.visibility = 'visible';
          nav.style.overflow = 'visible';
        }
      }
      parent = parent.parentElement ? parent.parentElement.closest('.md-nav__item') : null;
    }
  }
  
  // Method 2: Ensure all items marked as expanded have their submenus visible
  document.querySelectorAll('.md-nav__item--expanded').forEach(item => {
    const toggle = item.querySelector('.md-nav__toggle');
    if (toggle) toggle.checked = true;
    
    const nav = item.querySelector('.md-nav');
    if (nav) {
      nav.style.display = 'block';
      nav.style.opacity = '1';
      nav.style.height = 'auto';
      nav.style.maxHeight = '2000px';
      nav.style.visibility = 'visible';
      nav.style.overflow = 'visible';
    }
  });
  
  // Method 3: Find all checked toggles and ensure their nav is visible
  document.querySelectorAll('.md-nav__toggle:checked').forEach(toggle => {
    const nav = toggle.parentElement.querySelector('.md-nav');
    if (nav) {
      nav.style.display = 'block';
      nav.style.opacity = '1';
      nav.style.height = 'auto';
      nav.style.maxHeight = '2000px';
      nav.style.visibility = 'visible';
      nav.style.overflow = 'visible';
    }
  });
} 