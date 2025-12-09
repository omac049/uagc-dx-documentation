/**
 * Algolia SiteSearch with Ask AI Initialization
 * See: https://sitesearch.algolia.com/docs/experiences/search-askai
 */

document.addEventListener('DOMContentLoaded', function() {
  // Wait for SiteSearchAskAI to be available
  if (typeof SiteSearchAskAI === 'undefined') {
    console.error('SiteSearchAskAI not loaded');
    return;
  }

  // Create search container if it doesn't exist
  let searchContainer = document.getElementById('sitesearch-container');
  if (!searchContainer) {
    searchContainer = document.createElement('div');
    searchContainer.id = 'sitesearch-container';
    document.body.appendChild(searchContainer);
  }

  // Initialize SiteSearch with Ask AI
  SiteSearchAskAI.init({
    container: '#sitesearch-container',
    applicationId: 'DRLUZYJNEF',
    apiKey: '023ae40f566d93964e26d0cd7bfb7acb',
    indexName: 'uagc-dx-documentation',
    assistantId: 'YOUR_ASSISTANT_ID', // TODO: Replace with your Algolia Assistant ID
    attributes: {
      primaryText: 'title',
      secondaryText: 'content',
      url: 'url',
    },
    placeholder: 'Search documentation...',
    keyboardShortcut: 'k',
    buttonText: '🔍 Search',
    darkMode: false, // Will respect system preference
    insights: true,
    hitsPerPage: 10,
  });

  // Connect custom search button if it exists
  const customSearchButton = document.getElementById('custom-search-button');
  if (customSearchButton) {
    customSearchButton.addEventListener('click', function() {
      // Trigger the SiteSearch modal
      const searchButton = document.querySelector('[data-sitesearch-button]');
      if (searchButton) {
        searchButton.click();
      }
    });
  }
});
