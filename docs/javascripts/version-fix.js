/**
 * Version Selector Fix for UAGC DX Documentation
 * 
 * This script handles duplicate version selectors and ensures proper functionality
 */

// Execute as early as possible
(function() {
  // Function to fix version selectors
  function fixVersionSelectors() {
    // Wait for elements to be available
    setTimeout(() => {
      // 1. Identify all version selectors
      const versionElements = document.querySelectorAll(
        '.md-version, .md-header__button[title^="Select"], [data-md-component="version-selector"]'
      );
      
      // If we have multiple version elements
      if (versionElements.length > 1) {
        // Keep only the first one and hide the rest
        for (let i = 1; i < versionElements.length; i++) {
          versionElements[i].style.display = 'none';
        }
        
        // Make the first one visible and styled properly
        versionElements[0].style.display = 'flex';
        versionElements[0].classList.add('md-version-active');
        
        // Add proper aria attributes for accessibility
        versionElements[0].setAttribute('aria-label', 'Select version');
        versionElements[0].setAttribute('role', 'button');
      }
      
      // 2. Fix styling on the primary version selector if it exists
      const mainVersionSelector = document.querySelector('.md-version');
      if (mainVersionSelector) {
        // Make it visually distinct
        mainVersionSelector.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
        mainVersionSelector.style.borderRadius = '0.2rem';
        mainVersionSelector.style.padding = '0.4rem 0.8rem';
        mainVersionSelector.style.marginLeft = '0.4rem';
        mainVersionSelector.style.cursor = 'pointer';
        
        // Add proper indicator
        const currentVersion = mainVersionSelector.querySelector('.md-version__current');
        if (currentVersion && !currentVersion.querySelector('.md-version__indicator')) {
          const indicator = document.createElement('span');
          indicator.className = 'md-version__indicator';
          indicator.textContent = '▾';
          indicator.style.marginLeft = '0.3rem';
          indicator.style.fontSize = '0.6rem';
          indicator.style.opacity = '0.7';
          currentVersion.appendChild(indicator);
        }
      }
      
      // 3. Fix button styling if present
      const versionButton = document.querySelector('.md-header__button[title^="Select"]');
      if (versionButton) {
        versionButton.classList.add('md-version-select');
        versionButton.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
        versionButton.style.borderRadius = '0.2rem';
        versionButton.style.padding = '0.3rem 0.6rem';
        versionButton.style.fontSize = '0.7rem';
        versionButton.style.fontWeight = '500';
      }
    }, 100); // Small delay to ensure DOM is ready
  }
  
  // Apply fixes after DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixVersionSelectors);
  } else {
    fixVersionSelectors();
  }
  
  // Also handle dynamic insertion of version selectors
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        fixVersionSelectors();
      }
    });
  });
  
  // Start observing once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
  });
})(); 