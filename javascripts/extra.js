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
  
  // Create the back-to-top button
  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'back-to-top';
  backToTopButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>';
  backToTopButton.setAttribute('aria-label', 'Back to top');
  backToTopButton.setAttribute('title', 'Back to top');
  document.body.appendChild(backToTopButton);
  
  // Function to toggle button visibility based on scroll position
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', toggleBackToTopButton);
  
  // Add click event to scroll back to top
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Add styles for the button
  const backToTopStyle = document.createElement('style');
  backToTopStyle.textContent = `
    #back-to-top {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--md-primary-fg-color);
      color: white;
      border: none;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s, transform 0.3s;
      transform: translateY(20px);
      z-index: 100;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    #back-to-top svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
    
    #back-to-top.visible {
      opacity: 0.8;
      transform: translateY(0);
    }
    
    #back-to-top:hover {
      opacity: 1;
      transform: translateY(-2px);
    }
    
    @media print {
      #back-to-top {
        display: none;
      }
    }
  `;
  document.head.appendChild(backToTopStyle);
  
  // Find all headings in the content
  const headings = document.querySelectorAll('.md-content h2, .md-content h3, .md-content h4');
  
  headings.forEach(heading => {
    // Only process headings that have an id
    if (heading.id) {
      // Create the anchor link
      const anchor = document.createElement('a');
      anchor.className = 'header-anchor';
      anchor.href = `#${heading.id}`;
      anchor.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24zm2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24c-.39-.39-.39-1.03 0-1.42z"/></svg>';
      anchor.setAttribute('aria-label', 'Link to this section');
      anchor.setAttribute('title', 'Link to this section');
      
      // Add the anchor link to the heading
      heading.appendChild(anchor);
    }
  });
  
  // Add styles for the anchor links
  const anchorStyle = document.createElement('style');
  anchorStyle.textContent = `
    .header-anchor {
      opacity: 0;
      margin-left: 0.5em;
      font-size: 0.8em;
      vertical-align: middle;
      transition: opacity 0.2s;
    }
    
    .header-anchor svg {
      width: 1em;
      height: 1em;
      fill: var(--md-primary-fg-color);
    }
    
    h2:hover .header-anchor,
    h3:hover .header-anchor,
    h4:hover .header-anchor,
    .header-anchor:focus {
      opacity: 1;
    }
  `;
  document.head.appendChild(anchorStyle);
  
  // Get the main content
  const content = document.querySelector('.md-content__inner');
  
  if (content) {
    // Get the text content
    const text = content.textContent;
    
    // Calculate reading time (average reading speed: 200 words per minute)
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    // Create reading time element
    if (readingTime > 1) {
      const readingTimeElement = document.createElement('div');
      readingTimeElement.className = 'reading-time';
      readingTimeElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg> ${readingTime} minute read`;
      
      // Find the article header
      const articleHeader = document.querySelector('.md-content__inner > h1');
      if (articleHeader) {
        // Insert reading time after the heading
        articleHeader.insertAdjacentElement('afterend', readingTimeElement);
      }
    }
  }
  
  // Add styles for reading time
  const readingTimeStyle = document.createElement('style');
  readingTimeStyle.textContent = `
    .reading-time {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      font-size: 0.8rem;
      color: var(--md-default-fg-color--light);
    }
    
    .reading-time svg {
      width: 1.2em;
      height: 1.2em;
      margin-right: 0.3em;
      fill: currentColor;
    }
  `;
  document.head.appendChild(readingTimeStyle);
  
  // Skip password check if already authenticated
  if (sessionStorage.getItem('authenticated') !== 'true') {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.flexDirection = 'column';
    overlay.style.color = 'white';
    
    // Create password form
    const form = document.createElement('div');
    form.innerHTML = `
      <h2>UAGC DX Documentation</h2>
      <p>Please enter the password to access the documentation:</p>
      <input type="password" id="password-input" style="padding: 10px; margin: 10px 0; width: 250px;">
      <button id="submit-password" style="padding: 10px; width: 250px; background-color: #3f51b5; color: white; border: none; cursor: pointer;">Access Documentation</button>
      <p id="password-error" style="color: #f44336; display: none;">Incorrect password. Please try again.</p>
    `;
    overlay.appendChild(form);
    document.body.appendChild(overlay);
    
    // Focus on password input
    setTimeout(() => {
      document.getElementById('password-input').focus();
    }, 100);
    
    // Handle password submission
    document.getElementById('submit-password').addEventListener('click', checkPassword);
    document.getElementById('password-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        checkPassword();
      }
    });
    
    function checkPassword() {
      const password = document.getElementById('password-input').value;
      // Change this to your desired password
      if (password === 'uagcdx2025') {
        sessionStorage.setItem('authenticated', 'true');
        document.body.removeChild(overlay);
      } else {
        document.getElementById('password-error').style.display = 'block';
      }
    }
  }
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

// Add back-to-top functionality
window.addEventListener('scroll', function() {
    var backToTopButton = document.querySelector('.md-top');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
        }
    }
}); 