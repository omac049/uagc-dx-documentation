/**
 * UAGC DX Documentation - Mike Version Plugin Fixes
 * 
 * This script properly handles the 'latest' version and redirects as needed.
 */
(function() {
  // Execute after DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Detect if we're on a /latest/ path and redirect appropriately
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/latest/')) {
      // Extract the path after /latest/
      let redirectPath = currentPath.replace('/latest/', '/');
      
      // Ensure the path has a trailing slash if it's a directory
      if (!redirectPath.endsWith('/') && !redirectPath.includes('.')) {
        redirectPath += '/';
      }
      
      // Redirect to the root path
      window.location.href = window.location.origin + redirectPath;
      return; // Stop further execution
    }
    
    // 2. Handle version selector functionality
    enhanceVersionSelector();
    
    // 3. Fix links that might point to /latest/ paths
    fixVersionLinks();
  });
  
  /**
   * Enhances the version selector with proper navigation
   */
  function enhanceVersionSelector() {
    // Find all version selectors
    const versionSelectors = document.querySelectorAll('.md-version, [data-md-component="version"]');
    
    versionSelectors.forEach(selector => {
      // Ensure we have the correct active version
      const currentItems = selector.querySelectorAll('.md-version__link--active');
      const latestItems = selector.querySelectorAll('.md-version__link[href*="/latest/"], .md-version__link[href="/"]');
      
      // Set current text to "latest" if we're on the main version
      const currentText = selector.querySelector('.md-version__current');
      if (currentText && !window.location.pathname.match(/\/v[\d\.]+\//)) {
        currentText.textContent = 'latest';
      }
      
      // Ensure the latest version is properly marked active when on main site
      if (!window.location.pathname.match(/\/v[\d\.]+\//)) {
        latestItems.forEach(item => {
          item.classList.add('md-version__link--active');
        });
      }
      
      // Add click handlers to version links
      const versionLinks = selector.querySelectorAll('.md-version__link');
      versionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          // Get the current path relative to version
          const currentPathNoVersion = window.location.pathname.replace(/^\/v[\d\.]+\/|^\/latest\//, '/');
          
          // Build the new URL
          let newPath = this.getAttribute('href');
          if (newPath === '/' || newPath.endsWith('/latest/')) {
            // If going to latest version, keep the same page
            newPath = currentPathNoVersion;
          } else if (newPath.match(/\/v[\d\.]+\//)) {
            // If going to specific version, keep the same page
            const versionPrefix = newPath.match(/^(\/v[\d\.]+\/)/)[1];
            newPath = versionPrefix + currentPathNoVersion.substring(1);
          }
          
          // Navigate to the equivalent page in the other version
          if (newPath !== window.location.pathname) {
            e.preventDefault();
            window.location.href = window.location.origin + newPath;
          }
        });
      });
    });
  }
  
  /**
   * Fix links that might point to /latest/ paths
   */
  function fixVersionLinks() {
    // Find all links that point to /latest/
    const latestLinks = document.querySelectorAll('a[href^="/latest/"]');
    
    latestLinks.forEach(link => {
      // Replace /latest/ with /
      const href = link.getAttribute('href');
      const fixedHref = href.replace('/latest/', '/');
      link.setAttribute('href', fixedHref);
    });
  }
})(); 