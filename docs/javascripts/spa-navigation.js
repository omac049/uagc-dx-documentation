/**
 * Enhanced navigation for MkDocs Material theme
 * Adds SPA-like functionality to prevent full page reloads
 */

document.addEventListener('DOMContentLoaded', function() {
  // Skip if the browser doesn't support the History API
  if (!window.history || !window.history.pushState) {
    return;
  }

  // Store the current page content for quick back/forward navigation
  cacheCurrentPage();

  // Add click handlers to all navigation links
  setupNavigation();

  // Handle browser back/forward buttons
  window.addEventListener('popstate', function(event) {
    if (event.state && event.state.url) {
      navigateToPage(event.state.url, false);
    }
  });

  /**
   * Set up navigation handlers on all internal links
   */
  function setupNavigation() {
    // Target all internal links except for anchors, downloads, etc.
    const links = document.querySelectorAll('a[href^="/"]:not([download]):not([target]), a[href^="./"]:not([download]):not([target]), a[href^="../"]:not([download]):not([target])');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip external links or special links
        if (href.startsWith('http') || href.startsWith('#') || 
            this.hasAttribute('download') || this.hasAttribute('target')) {
          return;
        }
        
        e.preventDefault();
        navigateToPage(href, true);
      });
    });
  }

  /**
   * Navigate to the specified URL without a full page reload
   */
  function navigateToPage(url, pushState = true) {
    // Show loading indicator
    showLoadingIndicator();
    
    // Use fetch to get the page content
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Navigation failed: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(html => {
        // Parse the HTML
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');
        
        // Update page title
        document.title = newDoc.title;
        
        // Replace the main content
        const newContent = newDoc.querySelector('.md-content__inner');
        const currentContent = document.querySelector('.md-content__inner');
        
        if (newContent && currentContent) {
          // Create animation effect
          currentContent.style.opacity = '0';
          currentContent.style.transform = 'translateY(10px)';
          
          setTimeout(() => {
            // Replace content
            currentContent.innerHTML = newContent.innerHTML;
            
            // Add entry in browser history
            if (pushState) {
              history.pushState({ url: url }, document.title, url);
            }
            
            // Animate the new content in
            setTimeout(() => {
              currentContent.style.opacity = '1';
              currentContent.style.transform = 'translateY(0)';
            }, 10);
            
            // Update active state in navigation
            updateActiveNav(url);
            
            // Reinitialize MkDocs components and our handlers
            reinitializePage();
            
            // Cache the new page
            cacheCurrentPage();
            
            // Hide loading indicator
            hideLoadingIndicator();
            
            // Scroll to top
            window.scrollTo(0, 0);
          }, 200);
        } else {
          console.error('Could not find content to update');
          window.location.href = url; // Fallback to normal navigation
        }
      })
      .catch(error => {
        console.error('Navigation error:', error);
        hideLoadingIndicator();
        window.location.href = url; // Fallback to normal navigation
      });
  }

  /**
   * Update the active state in the navigation menu
   */
  function updateActiveNav(url) {
    // Remove active states
    document.querySelectorAll('.md-nav__link--active').forEach(link => {
      link.classList.remove('md-nav__link--active');
    });
    
    // Find and set the new active link
    const activeLink = document.querySelector(`.md-nav__link[href="${url}"]`);
    if (activeLink) {
      activeLink.classList.add('md-nav__link--active');
      
      // Expand parent navigation sections
      let parent = activeLink.parentElement;
      while (parent) {
        if (parent.classList.contains('md-nav__item--nested')) {
          // Expand this section
          const toggle = parent.querySelector('.md-nav__toggle');
          if (toggle) {
            toggle.checked = true;
          }
          
          // Add expanded class
          parent.classList.add('md-nav__item--expanded');
          
          // Show the nav
          const nav = parent.querySelector('.md-nav');
          if (nav) {
            nav.style.display = 'block';
            nav.setAttribute('aria-expanded', 'true');
          }
          
          // Update aria-expanded on the label
          const label = parent.querySelector('.md-nav__link');
          if (label) {
            label.setAttribute('aria-expanded', 'true');
          }
        }
        parent = parent.parentElement;
      }
    }
  }

  /**
   * Reinitialize page components after content update
   */
  function reinitializePage() {
    // Re-attach click handlers to links
    setupNavigation();
    
    // Re-initialize code blocks and syntax highlighting if Prism/Highlight.js is used
    if (window.Prism) {
      Prism.highlightAll();
    } else if (window.hljs) {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightBlock(block);
      });
    }
    
    // Re-initialize any other scripts
    if (window.MathJax) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    }
    
    // Dispatch an event so other scripts can reinitialize
    document.dispatchEvent(new CustomEvent('content-updated'));
  }

  /**
   * Show a loading indicator
   */
  function showLoadingIndicator() {
    let loadingBar = document.querySelector('.spa-loading-bar');
    
    if (!loadingBar) {
      loadingBar = document.createElement('div');
      loadingBar.className = 'spa-loading-bar';
      document.body.appendChild(loadingBar);
      
      // Add the loading bar styling
      const style = document.createElement('style');
      style.textContent = `
        .spa-loading-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 0;
          height: 3px;
          background-color: var(--md-primary-fg-color);
          z-index: 1000;
          transition: width 0.3s ease-out;
        }
        
        .spa-loading-bar.active {
          width: 30%;
          animation: loading-progress 2s ease-out forwards;
        }
        
        @keyframes loading-progress {
          0% { width: 0; }
          30% { width: 30%; }
          70% { width: 70%; }
          100% { width: 90%; }
        }
      `;
      document.head.appendChild(style);
    }
    
    loadingBar.classList.add('active');
  }

  /**
   * Hide the loading indicator
   */
  function hideLoadingIndicator() {
    const loadingBar = document.querySelector('.spa-loading-bar');
    if (loadingBar) {
      loadingBar.style.width = '100%';
      
      setTimeout(() => {
        loadingBar.style.opacity = '0';
        setTimeout(() => {
          loadingBar.classList.remove('active');
          loadingBar.style.width = '0';
          loadingBar.style.opacity = '1';
        }, 300);
      }, 200);
    }
  }

  /**
   * Cache the current page for faster back/forward navigation
   */
  function cacheCurrentPage() {
    const url = window.location.pathname;
    const content = document.querySelector('.md-content__inner').innerHTML;
    const title = document.title;
    
    // Add to browser history without changing URL
    history.replaceState({ 
      url: url,
      content: content,
      title: title
    }, title, url);
  }
}); 