// UAGC DX Documentation - Extra JavaScript

// Add announcement banner if parameters are present
document.addEventListener('DOMContentLoaded', function() {
  // Highlight current page section in navigation
  highlightCurrentSection();
  
  // Add copy buttons to code blocks
  addCodeCopyButtons();
  
  // Add "Last updated" info to the footer
  addLastUpdatedInfo();
  
  // Add quick search shortcut
  addSearchShortcut();
});

// Function to highlight the current page in the navigation
function highlightCurrentSection() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.md-nav__link');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
      link.classList.add('md-nav__link--active');
      
      // Expand the parent navigation
      let parent = link.closest('.md-nav__item--nested');
      if (parent) {
        parent.classList.add('md-nav__item--expanded');
      }
    }
  });
}

// Function to add last updated info to the footer
function addLastUpdatedInfo() {
  const footer = document.querySelector('.md-footer-meta__inner');
  if (footer && document.lastModified) {
    const container = document.createElement('div');
    container.className = 'md-footer-last-updated';
    container.innerHTML = 'Last updated: ' + new Date(document.lastModified).toLocaleDateString();
    footer.appendChild(container);
  }
}

// Function to add keyboard shortcut for search
function addSearchShortcut() {
  document.addEventListener('keydown', function(e) {
    // '/' key opens search
    if (e.key === '/' && !e.ctrlKey && !e.metaKey && 
        !(e.target instanceof HTMLInputElement) && 
        !(e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
      document.querySelector('.md-search__input').focus();
    }
  });
} 