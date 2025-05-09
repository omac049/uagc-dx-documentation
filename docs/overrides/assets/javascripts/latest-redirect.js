/**
 * Handles redirects from /latest/ paths to the root
 * Ensures users aren't stranded on 404 pages when using versioned URLs
 */
(function() {
  // Check if we're on a page with /latest/ in the URL
  const currentPath = window.location.pathname;
  
  if (currentPath.includes('/latest/')) {
    // Extract the path after /latest/
    const redirectPath = currentPath.replace('/latest/', '/');
    
    // Redirect to the path without /latest/
    window.location.href = window.location.origin + redirectPath;
  }
  
  // Also add a check for 404 pages to improve user experience
  document.addEventListener('DOMContentLoaded', function() {
    // If we're on a 404 page and the URL contains /latest/
    if (document.title.includes('404') && currentPath.includes('/latest/')) {
      // Create a message for the user
      const noticeEl = document.createElement('div');
      noticeEl.className = 'latest-redirect-notice';
      noticeEl.style.padding = '1rem';
      noticeEl.style.margin = '1rem 0';
      noticeEl.style.backgroundColor = '#ffebee';
      noticeEl.style.border = '1px solid #ffcdd2';
      noticeEl.style.borderRadius = '4px';
      
      noticeEl.innerHTML = `
        <h3 style="margin-top: 0;">Redirecting from versioned URL</h3>
        <p>The URL with <code>/latest/</code> is being redirected to the main documentation.</p>
        <p>If you're not redirected automatically, <a href="${window.location.origin}">click here</a> to go to the home page.</p>
      `;
      
      // Find a good place to insert the notice
      const container = document.querySelector('article') || document.querySelector('main') || document.body;
      if (container.firstChild) {
        container.insertBefore(noticeEl, container.firstChild);
      } else {
        container.appendChild(noticeEl);
      }
      
      // Attempt redirect after a short delay
      setTimeout(function() {
        window.location.href = window.location.origin;
      }, 4000);
    }
  });
})(); 