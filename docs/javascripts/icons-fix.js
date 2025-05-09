/**
 * Icon Loading and Fix for UAGC DX Documentation
 * 
 * This script ensures icons are loaded consistently and without glitches
 */

// Execute as early as possible
(function() {
  // Create a style element for immediate icon fixes
  const style = document.createElement('style');
  style.textContent = `
    /* Prevent icon flicker during loading */
    .md-header .md-icon,
    .md-header [class*="fa-"],
    .md-header .material-icons,
    .md-header svg,
    .md-tabs .md-icon,
    .md-tabs [class*="fa-"],
    .md-tabs .material-icons,
    .md-tabs svg {
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }
    
    /* Show icons when document is ready */
    .icons-ready .md-header .md-icon,
    .icons-ready .md-header [class*="fa-"],
    .icons-ready .md-header .material-icons,
    .icons-ready .md-header svg,
    .icons-ready .md-tabs .md-icon,
    .icons-ready .md-tabs [class*="fa-"],
    .icons-ready .md-tabs .material-icons,
    .icons-ready .md-tabs svg {
      opacity: 1;
    }
    
    /* Ensure icon containers have proper dimensions during loading */
    .md-header__button,
    .md-tabs__button,
    .md-search__icon {
      min-width: 1.2rem;
      min-height: 1.2rem;
    }
  `;
  document.head.appendChild(style);
  
  // Function to normalize icon dimensions
  function normalizeIconDimensions() {
    const icons = document.querySelectorAll('.md-header .md-icon, .md-header [class*="fa-"], .md-header .material-icons, .md-header svg');
    
    icons.forEach(icon => {
      // Set consistent dimensions
      icon.style.width = '1.2rem';
      icon.style.height = '1.2rem';
      icon.style.minWidth = '1.2rem';
      icon.style.minHeight = '1.2rem';
      icon.style.boxSizing = 'content-box';
      
      // Ensure proper display
      icon.style.display = 'inline-flex';
      icon.style.alignItems = 'center';
      icon.style.justifyContent = 'center';
    });
    
    // Mark document as ready for icons
    document.documentElement.classList.add('icons-ready');
  }
  
  // Apply fixes after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', normalizeIconDimensions);
  } else {
    normalizeIconDimensions();
  }
  
  // Apply fixes when window is fully loaded (including fonts)
  window.addEventListener('load', normalizeIconDimensions);
  
  // Re-apply on any font loading event
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(normalizeIconDimensions);
  }
  
  // Apply fixes on resize (which might cause layout shifts)
  window.addEventListener('resize', normalizeIconDimensions, { passive: true });
})(); 