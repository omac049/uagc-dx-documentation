/**
 * Enhanced Sidebar Navigation for UAGC DX Documentation
 * Provides improved usability features for the side navigation
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all sidebar elements
  const sidebar = document.querySelector('.md-sidebar--primary');
  if (!sidebar) return;
  
  const nav = sidebar.querySelector('.md-nav--primary');
  if (!nav) return;
  
  // 1. Add expand/collapse all button
  addExpandCollapseButton(nav);
  
  // 2. Enhance toggle interactions
  enhanceToggleInteractions(nav);
  
  // 3. Auto-expand current section and its parents
  expandCurrentSection(nav);
  
  // 4. Add keyboard navigation
  enhanceKeyboardNavigation(nav);
  
  // 5. Add section coloring based on depth
  addSectionColors(nav);
  
  // 6. Add scroll state restoration
  preserveScrollPosition(sidebar);
  
  // 7. Fix mobile navigation toggle
  fixMobileNavigation(sidebar);
});

/**
 * Fixes mobile navigation toggle behavior
 */
function fixMobileNavigation(sidebar) {
  // Get drawer toggle and ensure it works with sidebar
  const drawerToggle = document.getElementById('__drawer');
  if (!drawerToggle) return;
  
  // When drawer toggle is checked, add open class to sidebar
  drawerToggle.addEventListener('change', function() {
    if (this.checked) {
      sidebar.classList.add('md-sidebar--open');
    } else {
      sidebar.classList.remove('md-sidebar--open');
    }
  });
  
  // Add click handler for overlay to close sidebar
  const overlay = document.querySelector('.md-overlay');
  if (overlay) {
    overlay.addEventListener('click', function() {
      drawerToggle.checked = false;
      sidebar.classList.remove('md-sidebar--open');
    });
  }
  
  // Close sidebar on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawerToggle.checked) {
      drawerToggle.checked = false;
      sidebar.classList.remove('md-sidebar--open');
    }
  });
}

/**
 * Adds expand/collapse all button to the navigation
 */
function addExpandCollapseButton(nav) {
  // Create control container
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'md-nav-controls';
  controlsContainer.style.cssText = 'padding: 0.5rem; display: flex; justify-content: space-between; gap: 0.5rem; margin: 0 0.5rem 0.5rem;';
  
  // Create expand all button
  const expandButton = document.createElement('button');
  expandButton.textContent = 'Expand All';
  expandButton.title = 'Expand all sections';
  expandButton.className = 'md-nav-control-button';
  expandButton.setAttribute('aria-label', 'Expand all sections');
  expandButton.style.cssText = 'font-size: 0.7rem; padding: 0.3rem 0.5rem; cursor: pointer; background: transparent; border: 1px solid rgba(0,0,0,0.1); border-radius: 3px; flex: 1;';
  
  // Create collapse all button
  const collapseButton = document.createElement('button');
  collapseButton.textContent = 'Collapse All';
  collapseButton.title = 'Collapse all sections';
  collapseButton.className = 'md-nav-control-button';
  collapseButton.setAttribute('aria-label', 'Collapse all sections');
  collapseButton.style.cssText = 'font-size: 0.7rem; padding: 0.3rem 0.5rem; cursor: pointer; background: transparent; border: 1px solid rgba(0,0,0,0.1); border-radius: 3px; flex: 1;';
  
  // Add event listeners
  expandButton.addEventListener('click', function() {
    const nestedItems = nav.querySelectorAll('.md-nav__item--nested');
    nestedItems.forEach(item => {
      item.classList.add('md-nav__item--expanded');
      const toggle = item.querySelector('.md-nav__toggle');
      if (toggle) toggle.checked = true;
    });
  });
  
  collapseButton.addEventListener('click', function() {
    const expandedItems = nav.querySelectorAll('.md-nav__item--expanded');
    expandedItems.forEach(item => {
      // Don't collapse items with active children
      if (!item.querySelector('.md-nav__link--active')) {
        item.classList.remove('md-nav__item--expanded');
        const toggle = item.querySelector('.md-nav__toggle');
        if (toggle) toggle.checked = false;
      }
    });
  });
  
  // Add buttons to container and container to nav
  controlsContainer.appendChild(expandButton);
  controlsContainer.appendChild(collapseButton);
  nav.insertBefore(controlsContainer, nav.firstChild);
}

/**
 * Enhances the interaction with toggle elements for smoother expansion
 */
function enhanceToggleInteractions(nav) {
  // Get all nested items
  const nestedItems = nav.querySelectorAll('.md-nav__item--nested');
  
  nestedItems.forEach(item => {
    const link = item.querySelector('.md-nav__link');
    if (!link) return;
    
    // Add arrow indicator for expandable items
    const arrow = document.createElement('span');
    arrow.className = 'md-nav__icon md-icon';
    arrow.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z"/></svg>';
    link.appendChild(arrow);
    
    // Add click listener that prevents immediate navigation
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Toggle the expanded state
      if (item.classList.contains('md-nav__item--expanded')) {
        item.classList.remove('md-nav__item--expanded');
        const toggle = item.querySelector('.md-nav__toggle');
        if (toggle) toggle.checked = false;
      } else {
        item.classList.add('md-nav__item--expanded');
        const toggle = item.querySelector('.md-nav__toggle');
        if (toggle) toggle.checked = true;
      }
    });
  });
}

/**
 * Auto-expands the current section and its parents
 */
function expandCurrentSection(nav) {
  // Find the active item
  const activeItem = nav.querySelector('.md-nav__link--active');
  if (!activeItem) return;
  
  // Add active class to the item
  const activeItemParent = activeItem.closest('.md-nav__item');
  if (activeItemParent) {
    activeItemParent.classList.add('md-nav__item--active');
  }
  
  // Expand all parent sections
  let parent = activeItem.closest('.md-nav__item--nested');
  while (parent) {
    parent.classList.add('md-nav__item--expanded');
    const toggle = parent.querySelector('.md-nav__toggle');
    if (toggle) toggle.checked = true;
    
    parent = parent.parentElement.closest('.md-nav__item--nested');
  }
  
  // Scroll to the active item with a small delay to ensure DOM is updated
  setTimeout(() => {
    activeItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, 300);
}

/**
 * Enhances keyboard navigation for accessibility
 */
function enhanceKeyboardNavigation(nav) {
  // Get all links in the navigation
  const links = nav.querySelectorAll('.md-nav__link');
  
  links.forEach(link => {
    link.addEventListener('keydown', function(e) {
      // Expand section on right arrow
      if (e.key === 'ArrowRight') {
        const parentItem = link.closest('.md-nav__item--nested');
        if (parentItem && !parentItem.classList.contains('md-nav__item--expanded')) {
          e.preventDefault();
          parentItem.classList.add('md-nav__item--expanded');
          const toggle = parentItem.querySelector('.md-nav__toggle');
          if (toggle) toggle.checked = true;
        }
      }
      
      // Collapse section on left arrow
      if (e.key === 'ArrowLeft') {
        const parentItem = link.closest('.md-nav__item--nested');
        if (parentItem && parentItem.classList.contains('md-nav__item--expanded')) {
          e.preventDefault();
          parentItem.classList.remove('md-nav__item--expanded');
          const toggle = parentItem.querySelector('.md-nav__toggle');
          if (toggle) toggle.checked = false;
        }
      }
      
      // Move to next link on down arrow
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const allVisibleLinks = Array.from(nav.querySelectorAll('.md-nav__link:not([hidden])'));
        const currentIndex = allVisibleLinks.indexOf(link);
        
        if (currentIndex < allVisibleLinks.length - 1) {
          allVisibleLinks[currentIndex + 1].focus();
        }
      }
      
      // Move to previous link on up arrow
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const allVisibleLinks = Array.from(nav.querySelectorAll('.md-nav__link:not([hidden])'));
        const currentIndex = allVisibleLinks.indexOf(link);
        
        if (currentIndex > 0) {
          allVisibleLinks[currentIndex - 1].focus();
        }
      }
    });
  });
}

/**
 * Adds subtle color coding to sections based on depth
 */
function addSectionColors(nav) {
  // First-level sections
  const firstLevelItems = nav.querySelectorAll(':scope > .md-nav__list > .md-nav__item--nested');
  
  firstLevelItems.forEach((item, index) => {
    // Calculate a hue based on position (distribute evenly across color wheel)
    const hue = (index * 60) % 360;
    const saturation = 70; // Less saturated for subtlety
    const lightness = 55; // Adjust for visibility
    
    // Apply very subtle left border to main section
    const firstLink = item.querySelector('.md-nav__link');
    if (firstLink) {
      firstLink.style.borderLeft = `2px solid hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`;
      firstLink.style.paddingLeft = 'calc(0.8rem - 2px)'; // Adjust padding to compensate for border
    }
    
    // Apply very subtle backgrounds to nested items 
    const nestedItems = item.querySelectorAll('.md-nav__item');
    nestedItems.forEach(nestedItem => {
      const nestedLink = nestedItem.querySelector('.md-nav__link');
      if (nestedLink && !nestedLink.isEqualNode(firstLink)) {
        nestedLink.style.borderLeft = `1px solid hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`;
        nestedLink.style.paddingLeft = 'calc(0.8rem - 1px)'; // Adjust padding
      }
    });
  });
}

/**
 * Preserves scroll position when returning to the page
 */
function preserveScrollPosition(sidebar) {
  const scrollContainer = sidebar.querySelector('.md-sidebar__scrollwrap');
  if (!scrollContainer) return;
  
  // Restore scroll position if stored
  const storedScrollTop = sessionStorage.getItem('sidebar-scroll-position');
  if (storedScrollTop !== null) {
    scrollContainer.scrollTop = parseInt(storedScrollTop, 10);
  }
  
  // Save scroll position when scrolling
  scrollContainer.addEventListener('scroll', function() {
    sessionStorage.setItem('sidebar-scroll-position', scrollContainer.scrollTop);
  });
} 