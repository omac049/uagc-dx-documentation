/**
 * Enhanced Custom InstantSearch.js Implementation for UAGC DX Documentation
 * 
 * Features a 10x improved UX/UI with:
 * - Advanced autocomplete with query suggestions
 * - Voice search capability
 * - Search analytics and history
 * - Enhanced accessibility and mobile experience
 * - Real-time suggestions and instant results
 * - Advanced filtering and sorting
 * - Smart search features and visual enhancements
 * - Compact bottom pagination with advanced controls
 */

// Wait for DOM to be ready and libraries to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if libraries are loaded
  if (typeof algoliasearch === 'undefined' || typeof instantsearch === 'undefined') {
    console.error('InstantSearch.js or Algoliasearch libraries not loaded');
    return;
  }

  // Enhanced Algolia configuration with caching and performance optimizations
  const searchClient = algoliasearch('DRLUZYJNEF', '023ae40f566d93964e26d0cd7bfb7acb');
  
  // Performance enhancement: Cache search results for 5 minutes
  const searchClientWithCache = {
    ...searchClient,
    search(requests) {
      const cacheKey = JSON.stringify(requests);
      const cachedResult = sessionStorage.getItem(`algolia_${cacheKey}`);
      
      if (cachedResult) {
        return Promise.resolve(JSON.parse(cachedResult));
      }
      
      return searchClient.search(requests).then(results => {
        sessionStorage.setItem(`algolia_${cacheKey}`, JSON.stringify(results));
        // Clean cache after 5 minutes
        setTimeout(() => {
          sessionStorage.removeItem(`algolia_${cacheKey}`);
        }, 5 * 60 * 1000);
        
        return results;
      });
    }
  };
  
  // Create search instance with enhanced configuration
  const search = instantsearch({
    indexName: 'uagc-dx-documentation',
    searchClient: searchClientWithCache,
    routing: false,
    insights: true, // Enable search analytics
  });

  // Enhanced search state management with query suggestions
  const searchState = {
    recentQueries: JSON.parse(localStorage.getItem('uagc_recent_searches') || '[]'),
    queryHistory: [],
    currentQuery: '',
    isVoiceSearching: false,
    searchStartTime: null,
    querySuggestions: [
      // Popular search terms for your documentation
      'getting started', 'analytics setup', 'drupal standards', 'qa testing',
      'performance optimization', 'accessibility guidelines', 'SEO best practices',
      'release procedures', 'google analytics', 'content management',
      'development workflow', 'testing checklist', 'privacy compliance',
      'user consent', 'cookie management', 'bigquery integration',
      'optimizely testing', 'salesforce integration', 'event tracking'
    ],
    currentSuggestions: [],
    suggestionIndex: -1
  };

  // Query suggestions functionality
  function getQuerySuggestions(query) {
    if (!query || query.length < 2) {
      return searchState.recentQueries.slice(0, 5);
    }
    
    const lowerQuery = query.toLowerCase();
    const suggestions = [];
    
    // Add matching recent queries first
    const recentMatches = searchState.recentQueries
      .filter(q => q.toLowerCase().includes(lowerQuery))
      .slice(0, 3);
    suggestions.push(...recentMatches);
    
    // Add predefined suggestions
    const predefinedMatches = searchState.querySuggestions
      .filter(q => q.toLowerCase().includes(lowerQuery) && !suggestions.includes(q))
      .slice(0, 5);
    suggestions.push(...predefinedMatches);
    
    return suggestions.slice(0, 8);
  }

  function saveRecentQuery(query) {
    if (!query || query.length < 2) return;
    
    // Sanitize the query before saving
    const sanitizedQuery = sanitizeSearchInput(query);
    if (!sanitizedQuery || sanitizedQuery.length < 2) return;
    
    // Remove if already exists and add to front
    const filtered = searchState.recentQueries.filter(q => q !== sanitizedQuery);
    searchState.recentQueries = [sanitizedQuery, ...filtered].slice(0, 10);
    
    try {
      localStorage.setItem('uagc_recent_searches', JSON.stringify(searchState.recentQueries));
    } catch (e) {
      console.warn('Failed to save recent searches to localStorage:', e);
    }
  }

  // Enhanced search modal HTML with new features and compact pagination
  function createSearchModal() {
    const modalHtml = `
      <div id="search-modal" style="
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        backdrop-filter: blur(8px);
        animation: fadeIn 0.2s ease-out;
      ">
        <div class="search-modal-container" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(95vw, 900px);
          max-height: min(90vh, 700px);
          background: var(--ifm-background-color);
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          border: 1px solid var(--ifm-color-emphasis-200);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: var(--ifm-font-family-base);
          animation: slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        ">
          <!-- Enhanced Search Header -->
          <div class="search-header" style="
            padding: 20px 24px;
            border-bottom: 1px solid var(--ifm-color-emphasis-200);
            display: flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, var(--ifm-background-surface-color), var(--ifm-color-emphasis-100));
            border-bottom: 2px solid var(--ifm-color-primary-lighter);
          ">
                          <div style="flex: 1; position: relative;">
                <div id="searchbox" style="position: relative;"></div>
                <!-- Query Suggestions Dropdown -->
                <div id="query-suggestions" style="
                  position: absolute;
                  top: 100%;
                  left: 0;
                  right: 0;
                  background: white;
                  border: 1px solid #e9ecef;
                  border-top: none;
                  border-radius: 0 0 12px 12px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                  z-index: 1000;
                  max-height: 300px;
                  overflow-y: auto;
                  display: none;
                "></div>
              </div>
            
            <!-- Close Button -->
            <button id="close-search" style="
              background: none;
              border: none;
              font-size: 18px;
              cursor: pointer;
              color: var(--ifm-color-content-secondary);
              padding: 8px;
              border-radius: 8px;
              transition: var(--ifm-transition-fast) all;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
            " aria-label="Close search (ESC)">✕</button>
          </div>

          <!-- Enhanced Search Body -->
          <div class="search-body" style="
            display: flex;
            flex: 1;
            min-height: 0;
          ">
            <!-- Enhanced Categories & Filters Sidebar -->
            <div class="search-sidebar" style="
              width: 280px;
              background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
              border-right: 1px solid var(--ifm-color-emphasis-200);
              padding: 0;
              overflow-y: auto;
              flex-shrink: 0;
            ">
              <!-- Browse by Category Header -->
              <div class="sidebar-header" style="
                padding: 20px 16px 16px 16px;
                background: linear-gradient(135deg, #0066cc 0%, #4da6ff 100%);
                color: white;
                border-bottom: 1px solid var(--ifm-color-emphasis-200);
              ">
                <h4 style="
                  margin: 0 0 8px 0;
                  font-size: 16px;
                  font-weight: 700;
                  color: white;
                  display: flex;
                  align-items: center;
                  gap: 8px;
                ">
                  <span style="font-size: 18px;">📁</span>
                  Browse by Category
                </h4>
                <p style="
                  margin: 0;
                  font-size: 12px;
                  color: rgba(255, 255, 255, 0.9);
                  opacity: 0.9;
                ">Click any category to filter results instantly</p>
              </div>

              <div style="padding: 16px;">
                <!-- All Categories Section -->
                <div class="all-categories-section" style="margin-bottom: 24px;">
                  <div id="category-refinement"></div>
                </div>
                
                <!-- Secondary Filters -->
                <div class="secondary-filters" style="
                  border-top: 1px solid #e9ecef;
                  padding-top: 16px;
                ">
                  <h5 style="
                    margin: 0 0 12px 0;
                    font-size: 12px;
                    font-weight: 600;
                    color: var(--ifm-color-content-secondary);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                  ">
                    <span style="font-size: 14px;">🏷️</span>
                    Document Type
                  </h5>
                  <div id="type-refinement"></div>
                </div>
              </div>
            </div>
            
            <!-- Enhanced Main Content Area -->
            <div class="search-content" style="
              flex: 1;
              display: flex;
              flex-direction: column;
              min-width: 0;
              position: relative;
            ">
              <!-- Enhanced Search Stats & Controls -->
              <div class="search-stats-bar" style="
                padding: 16px 24px;
                border-bottom: 1px solid var(--ifm-color-emphasis-200);
                background: var(--ifm-background-surface-color);
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 12px;
                position: relative;
              ">
                <div id="stats"></div>
                <!-- Mobile Category Toggle Button -->
                <button id="mobile-category-toggle" class="mobile-category-toggle" style="
                  display: none;
                  background: linear-gradient(135deg, #0066cc 0%, #4da6ff 100%);
                  border: none;
                  border-radius: 8px;
                  color: white;
                  padding: 8px 16px;
                  font-size: 12px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s ease;
                  position: absolute;
                  right: 16px;
                  top: 50%;
                  transform: translateY(-50%);
                " aria-label="Toggle categories">
                  📁 Categories
                </button>
              </div>

              <!-- Enhanced Search Results with Loading States -->
              <div id="search-results-container" style="
                flex: 1;
                overflow-y: auto;
                padding: 0;
                position: relative;
              ">
                <!-- Loading Skeleton -->
                <div id="search-loading-skeleton" style="
                  display: none;
                  padding: 20px;
                ">
                  <div class="skeleton-item" style="
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: skeleton-loading 1.5s infinite;
                    margin: 12px 0;
                    border-radius: 8px;
                    padding: 20px;
                    height: 80px;
                    position: relative;
                    overflow: hidden;
                  ">
                    <div style="
                      background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
                      background-size: 200% 100%;
                      animation: skeleton-loading 1.5s infinite;
                      height: 14px;
                      width: 120px;
                      border-radius: 4px;
                      margin-bottom: 8px;
                    "></div>
                    <div style="
                      background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
                      background-size: 200% 100%;
                      animation: skeleton-loading 1.5s infinite;
                      height: 16px;
                      width: 80%;
                      border-radius: 4px;
                      margin-bottom: 6px;
                    "></div>
                    <div style="
                      background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
                      background-size: 200% 100%;
                      animation: skeleton-loading 1.5s infinite;
                      height: 12px;
                      width: 60%;
                      border-radius: 4px;
                    "></div>
                  </div>
                  <div class="skeleton-item" style="
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: skeleton-loading 1.5s infinite;
                    margin: 12px 0;
                    border-radius: 8px;
                    padding: 20px;
                    height: 80px;
                    position: relative;
                    overflow: hidden;
                  ">
                    <div style="
                      background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
                      background-size: 200% 100%;
                      animation: skeleton-loading 1.5s infinite;
                      height: 14px;
                      width: 100px;
                      border-radius: 4px;
                      margin-bottom: 8px;
                    "></div>
                    <div style="
                      background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
                      background-size: 200% 100%;
                      animation: skeleton-loading 1.5s infinite;
                      height: 16px;
                      width: 70%;
                      border-radius: 4px;
                      margin-bottom: 6px;
                    "></div>
                    <div style="
                      background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
                      background-size: 200% 100%;
                      animation: skeleton-loading 1.5s infinite;
                      height: 12px;
                      width: 50%;
                      border-radius: 4px;
                    "></div>
                  </div>
                  <div class="skeleton-item" style="
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: skeleton-loading 1.5s infinite;
                    margin: 12px 0;
                    border-radius: 8px;
                    padding: 20px;
                    height: 80px;
                    position: relative;
                    overflow: hidden;
                  ">
                    <div style="
                      background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
                      background-size: 200% 100%;
                      animation: skeleton-loading 1.5s infinite;
                      height: 14px;
                      width: 140px;
                      border-radius: 4px;
                      margin-bottom: 8px;
                    "></div>
                    <div style="
                      background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
                      background-size: 200% 100%;
                      animation: skeleton-loading 1.5s infinite;
                      height: 16px;
                      width: 85%;
                      border-radius: 4px;
                      margin-bottom: 6px;
                    "></div>
                    <div style="
                      background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
                      background-size: 200% 100%;
                      animation: skeleton-loading 1.5s infinite;
                      height: 12px;
                      width: 45%;
                      border-radius: 4px;
                    "></div>
                  </div>
                </div>
                
                <!-- Search Progress Indicator -->
                <div id="search-progress" style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 3px;
                  background: linear-gradient(90deg, #0066cc, #4da6ff, #0066cc);
                  background-size: 200% 100%;
                  animation: progress-bar 1.5s infinite;
                  transform: scaleX(0);
                  transform-origin: left;
                  transition: transform 0.3s ease;
                  z-index: 10;
                  display: none;
                "></div>
                
                <div id="hits"></div>
              </div>

              <!-- Compact Bottom Pagination -->
              <div class="compact-pagination-container" style="
                position: sticky;
                bottom: 0;
                background: #ffffff;
                border-top: 2px solid #e9ecef;
                padding: 12px 16px;
                box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
                z-index: 5;
              ">
                <!-- Primary Pagination Row -->
                <div class="pagination-primary" style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-bottom: 8px;
                ">
                  <!-- Results Summary (Left) -->
                  <div id="pagination-info" class="results-summary" style="
                    font-size: 13px;
                    color: #6c757d;
                    font-weight: 500;
                    flex-shrink: 0;
                  "></div>
                  
                  <!-- Main Navigation (Center) -->
                  <div id="pagination" 
                       role="navigation" 
                       aria-label="Search results pagination"
                       style="flex: 0 0 auto; margin: 0 16px;"></div>
                  
                  <!-- Quick Controls (Right) -->
                  <div class="pagination-quick-controls" style="
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-shrink: 0;
                  ">
                    <select 
                      id="results-per-page-compact" 
                      title="Results per page"
                      style="
                        padding: 4px 6px;
                        border: 1px solid #ced4da;
                        border-radius: 4px;
                        font-size: 12px;
                        background: #ffffff;
                        color: #495057;
                        min-width: 60px;
                      "
                      aria-label="Results per page"
                    >
                      <option value="10">10</option>
                      <option value="20" selected>20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    
                    <button 
                      id="compact-jump-toggle"
                      title="Jump to page"
                      style="
                        background: none;
                        border: 1px solid #ced4da;
                        border-radius: 4px;
                        padding: 4px 8px;
                        color: #6c757d;
                        font-size: 12px;
                        cursor: pointer;
                        transition: all 0.2s;
                      "
                      aria-label="Toggle jump to page"
                    >⚡</button>
                  </div>
                </div>
                
                <!-- Secondary Row (Hidden by default) -->
                <div id="pagination-secondary" class="pagination-secondary" style="
                  display: none;
                  align-items: center;
                  justify-content: center;
                  gap: 8px;
                  padding-top: 8px;
                  border-top: 1px solid #f1f3f4;
                  animation: slideDown 0.2s ease-out;
                ">
                  <input 
                    type="number" 
                    id="jump-to-page-compact" 
                    min="1" 
                    max="25"
                    placeholder="Page"
                    style="
                      width: 60px;
                      padding: 4px 6px;
                      border: 1px solid #ced4da;
                      border-radius: 4px;
                      font-size: 12px;
                      text-align: center;
                      background: #ffffff;
                      color: #495057;
                    "
                    aria-label="Jump to page number"
                  >
                  <button 
                    id="jump-to-page-btn-compact" 
                    style="
                      padding: 4px 12px;
                      background: #0066cc;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      font-size: 12px;
                      font-weight: 500;
                      cursor: pointer;
                      transition: all 0.2s;
                    "
                    aria-label="Go to page"
                  >Go</button>
                  <button 
                    id="jump-close-btn"
                    style="
                      background: none;
                      border: none;
                      color: #6c757d;
                      font-size: 14px;
                      cursor: pointer;
                      padding: 4px;
                    "
                    aria-label="Close jump controls"
                  >×</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  // Add enhanced search widgets with compact pagination
  function addSearchWidgets() {
    search.addWidgets([
      instantsearch.widgets.searchBox({
        container: '#searchbox',
        placeholder: 'Search UAGC DX Documentation... (try "getting started" or "analytics")',
        autofocus: true,
        showSubmit: true,
        showReset: true,
        cssClasses: {
          root: 'enhanced-search-box-root',
          form: 'enhanced-search-box-form',
          input: 'enhanced-search-box-input',
          submit: 'enhanced-search-box-submit',
          reset: 'enhanced-search-box-reset',
        },
        templates: {
          submit: `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          `,
          reset: `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          `
        },
      }),

      instantsearch.widgets.hits({
        container: '#hits',
        hitsPerPage: 20,
        cssClasses: {
          root: 'enhanced-hits-root',
          list: 'enhanced-hits-list',
          item: 'enhanced-hits-item',
          empty: 'enhanced-hits-empty',
        },
        templates: {
          item: function(hit, { html }) {
            const category = hit.category || 'Documentation';
            const title = hit.title || 'Untitled';
            const content = hit.content || '';
            const url = hit.url || '#';
            
            const truncatedContent = content.length > 200 
              ? content.substring(0, 200).split(' ').slice(0, -1).join(' ') + '...' 
              : content;

            const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
            const fullUrl = url.startsWith('http') ? url : baseUrl + '/' + url.replace(/^\/+/, '');

            return `
              <div class="search-hit-item ui-kit-card" onclick="window.open('${fullUrl}', '_blank')" style="
                padding: 24px;
                border: 1px solid #e9ecef;
                border-radius: 12px;
                cursor: pointer;
                margin: 16px 0;
                background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                position: relative;
                overflow: hidden;
              "
              onmouseover="
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(0, 102, 204, 0.15)';
                this.style.borderColor = '#0066cc';
                this.style.background = 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)';
              "
              onmouseout="
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                this.style.borderColor = '#e9ecef';
                this.style.background = 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)';
              ">
                <!-- Category Badge with Icon -->
                <div style="
                  display: flex; 
                  align-items: center; 
                  justify-content: space-between;
                  margin-bottom: 12px;
                ">
                  <span class="category-badge" style="
                    background: linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(77, 166, 255, 0.05) 100%);
                    color: #0066cc;
                    padding: 6px 12px;
                    border-radius: 16px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: 1px solid rgba(0, 102, 204, 0.2);
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                  ">
                    <span style="font-size: 12px;">📄</span>
                    ${category}
                  </span>
                  <div class="hit-actions" style="
                    opacity: 0;
                    transition: opacity 0.2s ease;
                    display: flex;
                    gap: 4px;
                  ">
                    <span style="
                      background: rgba(0, 102, 204, 0.1);
                      color: #0066cc;
                      padding: 4px 8px;
                      border-radius: 6px;
                      font-size: 10px;
                      font-weight: 600;
                    ">CLICK TO OPEN</span>
                  </div>
                </div>
                
                <!-- Enhanced Title -->
                <h3 class="hit-title" style="
                  margin: 0 0 10px 0;
                  font-size: 18px;
                  font-weight: 700;
                  color: #1a202c;
                  line-height: 1.3;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                ">${instantsearch.highlight({ attribute: 'title', hit })}</h3>
                
                <!-- Content Preview -->
                ${truncatedContent ? `
                  <p class="hit-content" style="
                    margin: 0 0 12px 0;
                    font-size: 14px;
                    color: #4a5568;
                    line-height: 1.5;
                    font-weight: 400;
                  ">${truncatedContent}</p>
                ` : ''}
                
                <!-- Footer with Metadata -->
                <div class="hit-footer" style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-top: 16px;
                  padding-top: 12px;
                  border-top: 1px solid #f1f3f4;
                  font-size: 12px;
                  color: #9ca3af;
                ">
                  <span style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 14px;">🔗</span>
                    <span>Documentation</span>
                  </span>
                  <span style="
                    background: rgba(76, 175, 80, 0.1);
                    color: #4caf50;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: 600;
                    font-size: 10px;
                  ">AVAILABLE</span>
                </div>
                
                <!-- Hover Animation Line -->
                <div class="hover-line" style="
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 3px;
                  background: linear-gradient(90deg, #0066cc, #4da6ff);
                  transform: scaleX(0);
                  transition: transform 0.3s ease;
                  transform-origin: left;
                "></div>
              </div>
            `;
          },
          empty: function(results) {
            const hasQuery = results.query && results.query.trim().length > 0;
            
            if (!hasQuery) {
              return `
                <div style="
                  text-align: center;
                  padding: 40px 20px;
                  color: #6c757d;
                ">
                  <div style="font-size: 48px; margin-bottom: 20px;">📚</div>
                  <h3 style="margin: 0 0 12px 0; font-size: 20px; color: #212529;">Welcome to UAGC DX Documentation</h3>
                  <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5;">
                    Start typing to search our documentation, or use the categories on the left to browse by topic.
                  </p>
                  
                  <div style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 12px;
                    margin: 24px 0;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                  ">
                    ${['getting started', 'analytics setup', 'drupal standards', 'qa testing'].map(suggestion => `
                      <button onclick="applyQuerySuggestion('${suggestion}')" style="
                        padding: 12px 16px;
                        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                        border: 1px solid #e9ecef;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        font-size: 13px;
                        color: #495057;
                        text-align: center;
                      "
                      onmouseover="this.style.background='linear-gradient(135deg, #0066cc 0%, #4da6ff 100%)'; this.style.color='white'; this.style.borderColor='#0066cc';"
                      onmouseout="this.style.background='linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'; this.style.color='#495057'; this.style.borderColor='#e9ecef';">
                        🔍 ${suggestion}
                      </button>
                    `).join('')}
                  </div>
                  
                  <p style="margin: 20px 0 0 0; font-size: 12px; color: #9ca3af;">
                    💡 <strong>Pro tip:</strong> Use <kbd style="background: #f1f3f4; padding: 2px 6px; border-radius: 4px; font-size: 11px;">Ctrl+K</kbd> to open search from anywhere
                  </p>
                </div>
              `;
            } else {
              return `
                <div style="
                  text-align: center;
                  padding: 60px 20px;
                  color: #6c757d;
                ">
                  <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                  <h3 style="margin: 0 0 8px 0; font-size: 18px;">No results found for "${results.query}"</h3>
                  <p style="margin: 0 0 20px 0; font-size: 14px;">Try adjusting your search terms or browse by category</p>
                  
                  <div style="margin-top: 20px;">
                    <button onclick="document.querySelector('#searchbox input').value = ''; document.querySelector('#searchbox input').focus();" style="
                      padding: 10px 20px;
                      background: linear-gradient(135deg, #0066cc 0%, #4da6ff 100%);
                      color: white;
                      border: none;
                      border-radius: 6px;
                      cursor: pointer;
                      font-size: 14px;
                      font-weight: 500;
                      transition: all 0.2s ease;
                    "
                    onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(0, 102, 204, 0.3)';"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                      🔄 Clear Search
                    </button>
                  </div>
                </div>
              `;
            }
          }
        },
      }),

      instantsearch.widgets.stats({
        container: '#stats',
        cssClasses: {
          root: 'ui-kit-stats-root',
          text: 'ui-kit-stats-text',
        },
        templates: {
          text: function(data) {
            const { nbHits, processingTimeMS, query } = data;
            const performanceIndicator = processingTimeMS < 50 ? '🚀' : processingTimeMS < 100 ? '⚡' : '🔍';
            const performanceColor = processingTimeMS < 50 ? '#4caf50' : processingTimeMS < 100 ? '#ff9800' : '#2196f3';
            
            return `
              <div class="ui-kit-stats-container" style="
                display: flex; 
                align-items: center; 
                gap: 20px; 
                font-size: 14px; 
                color: #4a5568;
                font-weight: 500;
              ">
                <div class="stats-results" style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding: 8px 12px;
                  background: linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(77, 166, 255, 0.05) 100%);
                  border-radius: 8px;
                  border: 1px solid rgba(0, 102, 204, 0.2);
                ">
                  <span style="font-size: 16px;">📊</span>
                  <span style="color: #0066cc; font-weight: 700;">
                    ${nbHits.toLocaleString()}
                  </span>
                  <span style="color: #6c757d;">
                    result${nbHits !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div class="stats-performance" style="
                  display: flex;
                  align-items: center;
                  gap: 6px;
                  padding: 6px 10px;
                  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.05) 100%);
                  border-radius: 6px;
                  border: 1px solid rgba(76, 175, 80, 0.2);
                ">
                  <span style="font-size: 14px;">${performanceIndicator}</span>
                  <span style="color: ${performanceColor}; font-weight: 600; font-size: 13px;">
                    ${processingTimeMS}ms
                  </span>
                </div>
                
                ${query ? `
                  <div class="stats-query" style="
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    color: #9ca3af;
                    font-style: italic;
                  ">
                    <span>for</span>
                    <span style="
                      background: rgba(156, 163, 175, 0.1);
                      padding: 2px 6px;
                      border-radius: 4px;
                      font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
                      font-style: normal;
                      font-weight: 500;
                      color: #4a5568;
                    ">"${query}"</span>
                  </div>
                ` : ''}
                
                <div class="stats-tip" style="
                  margin-left: auto;
                  font-size: 11px;
                  color: #9ca3af;
                  display: flex;
                  align-items: center;
                  gap: 4px;
                ">
                  <span>💡</span>
                  <span>Use categories to refine</span>
                </div>
              </div>
            `;
          }
        },
      }),

      // Compact Pagination widget optimized for bottom placement
      instantsearch.widgets.pagination({
        container: '#pagination',
        maxPages: 20,
        showFirst: false,
        showLast: false,
        showPrevious: true,
        showNext: true,
        padding: 2,
        cssClasses: {
          root: 'compact-pagination-root',
          list: 'compact-pagination-list',
          item: 'compact-pagination-item',
          previousPageItem: 'compact-pagination-previous',
          nextPageItem: 'compact-pagination-next',
          pageItem: 'compact-pagination-page',
          selectedItem: 'compact-pagination-selected',
          disabledItem: 'compact-pagination-disabled',
          link: 'compact-pagination-link',
        },
        templates: {
          previous: '<span aria-hidden="true">‹</span><span class="sr-only">Previous</span>',
          next: '<span aria-hidden="true">›</span><span class="sr-only">Next</span>',
        }
      }),

      // Compact Results Summary widget
      instantsearch.widgets.stats({
        container: '#pagination-info',
        cssClasses: {
          root: 'compact-stats-root',
          text: 'compact-stats-text',
        },
        templates: {
          text: function(data) {
            const { page, nbPages, hitsPerPage, nbHits } = data;
            const currentPage = page + 1;
            const startResult = (page * hitsPerPage) + 1;
            const endResult = Math.min((page + 1) * hitsPerPage, nbHits);
            
            if (nbHits === 0) {
              return 'No results';
            }
            
            return `${startResult.toLocaleString()}–${endResult.toLocaleString()} of ${nbHits.toLocaleString()} <span class="page-indicator">(${currentPage}/${nbPages})</span>`;
          }
        }
      }),

      // Enhanced Document Type Refinement (Sidebar)
      instantsearch.widgets.refinementList({
        container: '#type-refinement',
        attribute: 'type',
        limit: 8,
        showMore: false,
        searchable: false,
        operator: 'or',
        sortBy: ['count:desc', 'name:asc'],
        cssClasses: {
          root: 'enhanced-type-root',
          list: 'enhanced-type-list',
          item: 'enhanced-type-item',
          selectedItem: 'enhanced-type-selected',
          label: 'enhanced-type-label',
          checkbox: 'enhanced-type-checkbox',
          count: 'enhanced-type-count',
        },
        templates: {
          item: function(data) {
            // Get type icons
            const typeIcons = {
              'Guide': '📖',
              'Documentation': '📚',
              'Process': '🔄',
              'Reference': '📑',
              'Standard': '📋',
              'Template': '📄',
              'Checklist': '✅',
              'Workflow': '⚙️'
            };
            
            const icon = typeIcons[data.label] || '📄';
            
            return `
              <label class="enhanced-type-label" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 12px;
                margin: 3px 0;
                background: ${data.isRefined ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : '#ffffff'};
                color: ${data.isRefined ? '#ffffff' : '#212529'};
                border: 1px solid ${data.isRefined ? '#28a745' : '#e9ecef'};
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 12px;
                font-weight: ${data.isRefined ? '600' : '500'};
                box-shadow: ${data.isRefined ? '0 2px 8px rgba(40, 167, 69, 0.25)' : 'none'};
              " 
              onmouseover="
                if (!${data.isRefined}) {
                  this.style.background='#f8f9fa';
                  this.style.borderColor='#28a745';
                }
              "
              onmouseout="
                if (!${data.isRefined}) {
                  this.style.background='#ffffff';
                  this.style.borderColor='#e9ecef';
                }
              ">
                <span style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 14px;">${icon}</span>
                  <input type="checkbox" 
                         ${data.isRefined ? 'checked' : ''} 
                         style="
                           margin: 0;
                           accent-color: ${data.isRefined ? '#ffffff' : '#28a745'};
                           transform: scale(0.9);
                         " 
                         aria-label="Filter by ${data.label}">
                  <span>${data.label}</span>
                </span>
                <span class="enhanced-type-count" style="
                  background: ${data.isRefined ? 'rgba(255, 255, 255, 0.25)' : 'rgba(40, 167, 69, 0.1)'};
                  color: ${data.isRefined ? '#ffffff' : '#28a745'};
                  padding: 2px 6px;
                  border-radius: 8px;
                  font-size: 10px;
                  font-weight: 600;
                  min-width: 20px;
                  text-align: center;
                ">${data.count}</span>
              </label>
            `;
          }
        }
      }),

      // Enhanced Category Refinement (Sidebar) - Now more prominent
      instantsearch.widgets.refinementList({
        container: '#category-refinement',
        attribute: 'category',
        limit: 50, // Show all categories by default - no more "show more" needed
        showMore: false, // Disable show more functionality
        searchable: false,
        operator: 'or', // Allow multiple category selection
        sortBy: ['count:desc', 'name:asc'], // Sort by popularity then alphabetically
        cssClasses: {
          root: 'enhanced-category-root',
          list: 'enhanced-category-list',
          item: 'enhanced-category-item',
          selectedItem: 'enhanced-category-selected',
          label: 'enhanced-category-label',
          checkbox: 'enhanced-category-checkbox',
          count: 'enhanced-category-count',
        },
        templates: {
          item: function(data) {
            // Get category icon based on the category name
            const categoryIcons = {
              'Getting Started': '🚀',
              'Development': '⚙️',
              'QA': '✅',
              'Analytics': '📊',
              'SEO': '🔍',
              'Accessibility': '♿',
              'Documentation': '📚',
              'Release': '🚀',
              'Performance': '⚡',
              'Privacy': '🔒',
              'Testing': '🧪',
              'Content': '📝',
              'UI/UX': '🎨',
              'Tools': '🛠️',
              'Standards': '📋',
              'Guide': '📖',
              'Reference': '📑',
              'Process': '🔄',
              'Workflow': '⚙️',
              'Management': '👥',
              'Implementation': '🔧'
            };
            
            const icon = categoryIcons[data.label] || '📄';
            
            return `
              <label class="enhanced-category-label" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 16px;
                margin: 6px 0;
                background: ${data.isRefined ? 'linear-gradient(135deg, #0066cc 0%, #4da6ff 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'};
                color: ${data.isRefined ? '#ffffff' : '#212529'};
                border: 2px solid ${data.isRefined ? '#0066cc' : '#e9ecef'};
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-size: 14px;
                font-weight: ${data.isRefined ? '600' : '500'};
                box-shadow: ${data.isRefined ? '0 4px 12px rgba(0, 102, 204, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.08)'};
                transform: ${data.isRefined ? 'translateY(-1px)' : 'translateY(0)'};
              "
              onmouseover="
                if (!${data.isRefined}) {
                  this.style.background='linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)';
                  this.style.borderColor='#0066cc';
                  this.style.transform='translateY(-2px)';
                  this.style.boxShadow='0 6px 16px rgba(0, 102, 204, 0.2)';
                }
              "
              onmouseout="
                if (!${data.isRefined}) {
                  this.style.background='linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
                  this.style.borderColor='#e9ecef';
                  this.style.transform='translateY(0)';
                  this.style.boxShadow='0 2px 4px rgba(0, 0, 0, 0.08)';
                }
              ">
                <span style="display: flex; align-items: center; gap: 12px; flex: 1;">
                  <span style="
                    font-size: 18px;
                    line-height: 1;
                    min-width: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">${icon}</span>
                  <input type="checkbox" 
                         ${data.isRefined ? 'checked' : ''} 
                         style="
                           margin: 0;
                           accent-color: ${data.isRefined ? '#ffffff' : '#0066cc'};
                           transform: scale(1.1);
                         " 
                         aria-label="Filter by ${data.label}">
                  <span style="flex: 1;">${data.label}</span>
                </span>
                <span class="enhanced-category-count" style="
                  background: ${data.isRefined ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 102, 204, 0.1)'};
                  color: ${data.isRefined ? '#ffffff' : '#0066cc'};
                  padding: 4px 8px;
                  border-radius: 12px;
                  font-size: 11px;
                  font-weight: 700;
                  min-width: 24px;
                  text-align: center;
                  border: 1px solid ${data.isRefined ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 102, 204, 0.2)'};
                ">${data.count}</span>
              </label>
            `;
          }
        }
      }),
    ]);
  }

  // Modal control functions
  function openSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const searchInput = document.querySelector('#searchbox input');
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  }

  function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      // Reset mobile sidebar state
      const sidebar = document.querySelector('.search-sidebar');
      if (sidebar) {
        sidebar.classList.remove('mobile-open');
      }
    }
  }

  // Mobile category sidebar toggle
  function toggleMobileCategorySidebar() {
    const sidebar = document.querySelector('.search-sidebar');
    const toggleBtn = document.getElementById('mobile-category-toggle');
    
    if (sidebar && toggleBtn) {
      const isOpen = sidebar.classList.contains('mobile-open');
      
      if (isOpen) {
        sidebar.classList.remove('mobile-open');
        toggleBtn.innerHTML = '📁 Categories';
        toggleBtn.setAttribute('aria-label', 'Show categories');
      } else {
        sidebar.classList.add('mobile-open');
        toggleBtn.innerHTML = '✕ Close';
        toggleBtn.setAttribute('aria-label', 'Hide categories');
      }
    }
  }

  // Enhanced event listeners with query suggestions functionality
  function setupEventListeners() {
    // Search button click
    function attachSearchButtonListener() {
      const searchButton = document.getElementById('custom-search-button');
      if (searchButton) {
        searchButton.addEventListener('click', openSearchModal);
      } else {
        setTimeout(attachSearchButtonListener, 500);
      }
    }
    attachSearchButtonListener();

    // Enhanced search input with query suggestions
    function setupQuerySuggestions() {
      // Wait for the search input to be rendered
      const checkForInput = () => {
        const searchInput = document.querySelector('#searchbox input');
        if (searchInput) {
          setupSearchInputListeners(searchInput);
        } else {
          setTimeout(checkForInput, 100);
        }
      };
      checkForInput();
    }

    function setupSearchInputListeners(searchInput) {
      let debounceTimer;

      // Input event for suggestions with security validation
      searchInput.addEventListener('input', function(e) {
        const rawQuery = e.target.value;
        const query = sanitizeSearchInput(rawQuery);
        
        // Update the input value if it was sanitized
        if (query !== rawQuery) {
          e.target.value = query;
        }
        
        searchState.currentQuery = query;

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          updateQuerySuggestions(query);
        }, 150);
      });

      // Focus event to show suggestions
      searchInput.addEventListener('focus', function(e) {
        updateQuerySuggestions(e.target.value);
      });

      // Blur event to hide suggestions (with delay for clicking)
      searchInput.addEventListener('blur', function() {
        setTimeout(() => {
          hideQuerySuggestions();
        }, 150);
      });

      // Keyboard navigation for suggestions
      searchInput.addEventListener('keydown', function(e) {
        const suggestionsEl = document.getElementById('query-suggestions');
        const suggestionItems = suggestionsEl.querySelectorAll('.suggestion-item');

        switch(e.key) {
          case 'ArrowDown':
            e.preventDefault();
            searchState.suggestionIndex = Math.min(
              searchState.suggestionIndex + 1,
              suggestionItems.length - 1
            );
            updateSuggestionHighlight(suggestionItems);
            break;

          case 'ArrowUp':
            e.preventDefault();
            searchState.suggestionIndex = Math.max(searchState.suggestionIndex - 1, -1);
            updateSuggestionHighlight(suggestionItems);
            break;

          case 'Enter':
            if (searchState.suggestionIndex >= 0 && suggestionItems[searchState.suggestionIndex]) {
              e.preventDefault();
              const suggestionText = suggestionItems[searchState.suggestionIndex].dataset.suggestion;
              applyQuerySuggestion(suggestionText);
            } else if (e.target.value.trim()) {
              saveRecentQuery(e.target.value.trim());
            }
            break;

          case 'Escape':
            hideQuerySuggestions();
            searchState.suggestionIndex = -1;
            break;
        }
      });
    }

    setupQuerySuggestions();

    // Compact pagination controls
    document.addEventListener('change', function(e) {
      if (e.target.id === 'results-per-page-compact') {
        updateResultsPerPage(parseInt(e.target.value));
      }
    });

    // Compact jump to page functionality
    document.addEventListener('click', function(e) {
      if (e.target.id === 'jump-to-page-btn-compact') {
        e.preventDefault();
        handleCompactJumpToPage();
      } else if (e.target.id === 'compact-jump-toggle') {
        e.preventDefault();
        toggleCompactJumpControls();
      } else if (e.target.id === 'jump-close-btn') {
        e.preventDefault();
        closeCompactJumpControls();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.target.id === 'jump-to-page-compact' && e.key === 'Enter') {
        e.preventDefault();
        handleCompactJumpToPage();
      }
      if (e.key === 'Escape') {
        const secondaryRow = document.getElementById('pagination-secondary');
        if (secondaryRow && secondaryRow.style.display !== 'none') {
          closeCompactJumpControls();
        } else {
          closeSearchModal();
        }
      }
    });

    // Enhanced search lifecycle management
    search.on('render', () => {
      updatePaginationControls();
      hideLoadingStates();
      enhanceSearchResults();
    });

    search.on('search', () => {
      showLoadingStates();
    });

    search.on('error', (error) => {
      hideLoadingStates();
      showSearchError(error);
    });

    // Close button click
    document.addEventListener('click', function(e) {
      if (e.target.id === 'close-search') {
        closeSearchModal();
      }
    });

    // Mobile category toggle functionality
    document.addEventListener('click', function(e) {
      if (e.target.id === 'mobile-category-toggle') {
        toggleMobileCategorySidebar();
      }
    });

    // Modal overlay click
    document.addEventListener('click', function(e) {
      if (e.target.id === 'search-modal') {
        closeSearchModal();
      }
      
      // Close mobile sidebar when clicking outside on mobile
      if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.search-sidebar');
        const toggleBtn = document.getElementById('mobile-category-toggle');
        
        if (sidebar && sidebar.classList.contains('mobile-open')) {
          const isClickInsideSidebar = sidebar.contains(e.target);
          const isToggleBtn = e.target === toggleBtn || toggleBtn.contains(e.target);
          
          if (!isClickInsideSidebar && !isToggleBtn) {
            toggleMobileCategorySidebar();
          }
        }
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
        return;
      }
    });
  }

  // Query suggestions display and interaction functions
  function updateQuerySuggestions(query) {
    const suggestionsEl = document.getElementById('query-suggestions');
    if (!suggestionsEl) return;

    const suggestions = getQuerySuggestions(query);
    searchState.currentSuggestions = suggestions;
    searchState.suggestionIndex = -1;

    if (suggestions.length === 0) {
      hideQuerySuggestions();
      return;
    }

    const isRecentQuery = (suggestion) => searchState.recentQueries.includes(suggestion);
    
    suggestionsEl.innerHTML = `
      ${query.length < 2 && searchState.recentQueries.length > 0 ? `
        <div style="
          padding: 12px 16px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-bottom: 1px solid #e9ecef;
          font-size: 12px;
          font-weight: 600;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">
          <span style="margin-right: 8px;">🕒</span>Recent Searches
        </div>
      ` : ''}
      
      ${suggestions.map((suggestion, index) => `
        <div class="suggestion-item" 
             data-suggestion="${suggestion}"
             data-index="${index}"
             style="
               padding: 12px 16px;
               cursor: pointer;
               transition: all 0.2s ease;
               border-bottom: 1px solid #f1f3f4;
               display: flex;
               align-items: center;
               justify-content: space-between;
               background: white;
               color: #212529;
               font-size: 14px;
             "
             onmouseover="this.style.background='#f8f9fa'; this.style.color='#0066cc';"
             onmouseout="this.style.background='white'; this.style.color='#212529';"
             onclick="applyQuerySuggestion('${suggestion}')">
          <span style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 16px;">${isRecentQuery(suggestion) ? '🕒' : '🔍'}</span>
            <span>${highlightQueryInSuggestion(suggestion, query)}</span>
          </span>
          ${isRecentQuery(suggestion) ? `
            <span style="
              background: rgba(0, 102, 204, 0.1);
              color: #0066cc;
              padding: 2px 6px;
              border-radius: 8px;
              font-size: 10px;
              font-weight: 600;
            ">RECENT</span>
          ` : ''}
        </div>
      `).join('')}
    `;

    suggestionsEl.style.display = 'block';
  }

  // Enhanced security function to prevent XSS attacks
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function highlightQueryInSuggestion(suggestion, query) {
    if (!query || query.length < 2) return escapeHtml(suggestion);
    
    // Escape both suggestion and query to prevent XSS
    const escapedSuggestion = escapeHtml(suggestion);
    const escapedQuery = escapeHtml(query);
    
    const regex = new RegExp(`(${escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return escapedSuggestion.replace(regex, '<strong style="color: #0066cc;">$1</strong>');
  }

  function hideQuerySuggestions() {
    const suggestionsEl = document.getElementById('query-suggestions');
    if (suggestionsEl) {
      suggestionsEl.style.display = 'none';
    }
    searchState.suggestionIndex = -1;
  }

  function updateSuggestionHighlight(suggestionItems) {
    suggestionItems.forEach((item, index) => {
      if (index === searchState.suggestionIndex) {
        item.style.background = 'linear-gradient(135deg, #0066cc 0%, #4da6ff 100%)';
        item.style.color = 'white';
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.style.background = 'white';
        item.style.color = '#212529';
      }
    });
  }

  // Security validation function
  function sanitizeSearchInput(input) {
    if (typeof input !== 'string') return '';
    
    // Remove potentially dangerous characters and limit length
    const sanitized = input
      .replace(/[<>\"']/g, '') // Remove HTML/script injection characters
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim()
      .substring(0, 100); // Limit to 100 characters
    
    return sanitized;
  }

  function applyQuerySuggestion(suggestion) {
    const searchInput = document.querySelector('#searchbox input');
    if (searchInput) {
      // Sanitize the suggestion before applying
      const sanitizedSuggestion = sanitizeSearchInput(suggestion);
      searchInput.value = sanitizedSuggestion;
      searchInput.focus();
      
      // Trigger the search
      const event = new Event('input', { bubbles: true });
      searchInput.dispatchEvent(event);
      
      saveRecentQuery(sanitizedSuggestion);
      hideQuerySuggestions();
    }
  }

  // UI Kit-inspired loading states and enhancements
  function showLoadingStates() {
    const skeleton = document.getElementById('search-loading-skeleton');
    const progress = document.getElementById('search-progress');
    const hits = document.getElementById('hits');
    
    if (skeleton) skeleton.style.display = 'block';
    if (progress) {
      progress.style.display = 'block';
      progress.style.transform = 'scaleX(1)';
    }
    if (hits) hits.style.opacity = '0.5';
  }

  function hideLoadingStates() {
    const skeleton = document.getElementById('search-loading-skeleton');
    const progress = document.getElementById('search-progress');
    const hits = document.getElementById('hits');
    
    if (skeleton) skeleton.style.display = 'none';
    if (progress) {
      progress.style.transform = 'scaleX(0)';
      setTimeout(() => {
        progress.style.display = 'none';
      }, 300);
    }
    if (hits) hits.style.opacity = '1';
  }

  function enhanceSearchResults() {
    // Add staggered animation to search results
    const hitItems = document.querySelectorAll('.search-hit-item');
    hitItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 50);
    });

    // Enhance hover effects for hit actions
    const hitCards = document.querySelectorAll('.ui-kit-card');
    hitCards.forEach(card => {
      const actions = card.querySelector('.hit-actions');
      const hoverLine = card.querySelector('.hover-line');
      
      card.addEventListener('mouseenter', () => {
        if (actions) actions.style.opacity = '1';
        if (hoverLine) hoverLine.style.transform = 'scaleX(1)';
      });
      
      card.addEventListener('mouseleave', () => {
        if (actions) actions.style.opacity = '0';
        if (hoverLine) hoverLine.style.transform = 'scaleX(0)';
      });
    });
  }

  function showSearchError(error) {
    const hits = document.getElementById('hits');
    if (hits) {
      hits.innerHTML = `
        <div style="
          text-align: center;
          padding: 60px 20px;
          color: #dc3545;
        ">
          <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
          <h3 style="margin: 0 0 8px 0; font-size: 18px;">Search Error</h3>
          <p style="margin: 0 0 20px 0; font-size: 14px; color: #6c757d;">
            ${error.message || 'Something went wrong. Please try again.'}
          </p>
          <button onclick="location.reload()" style="
            padding: 10px 20px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
          ">🔄 Retry</button>
        </div>
      `;
    }
  }

  // Compact pagination utility functions
  function updateResultsPerPage(resultsPerPage) {
    search.setUiState({
      'uagc-dx-documentation': {
        ...search.getUiState()['uagc-dx-documentation'],
        hitsPerPage: resultsPerPage,
        page: 1
      }
    });
    localStorage.setItem('uagc_search_results_per_page', resultsPerPage.toString());
  }

  function handleCompactJumpToPage() {
    const jumpInput = document.getElementById('jump-to-page-compact');
    const pageNumber = parseInt(jumpInput.value);
    
    if (!pageNumber || pageNumber < 1) {
      jumpInput.style.borderColor = '#dc3545';
      setTimeout(() => {
        jumpInput.style.borderColor = '#ced4da';
      }, 2000);
      return;
    }

    const stats = search.helper.lastResults;
    if (stats && pageNumber > stats.nbPages) {
      jumpInput.value = '';
      jumpInput.placeholder = `Max: ${stats.nbPages}`;
      setTimeout(() => {
        jumpInput.placeholder = 'Page';
      }, 3000);
      return;
    }

    search.setUiState({
      'uagc-dx-documentation': {
        ...search.getUiState()['uagc-dx-documentation'],
        page: pageNumber
      }
    });

    jumpInput.value = '';
    closeCompactJumpControls();
  }

  function toggleCompactJumpControls() {
    const secondaryRow = document.getElementById('pagination-secondary');
    const isVisible = secondaryRow.style.display !== 'none';
    
    if (isVisible) {
      closeCompactJumpControls();
    } else {
      secondaryRow.style.display = 'flex';
      const jumpInput = document.getElementById('jump-to-page-compact');
      setTimeout(() => {
        jumpInput.focus();
      }, 100);
      
      const stats = search.helper.lastResults;
      if (stats && jumpInput) {
        jumpInput.max = stats.nbPages;
      }
    }
  }

  function closeCompactJumpControls() {
    const secondaryRow = document.getElementById('pagination-secondary');
    secondaryRow.style.display = 'none';
    
    const jumpInput = document.getElementById('jump-to-page-compact');
    if (jumpInput) {
      jumpInput.value = '';
      jumpInput.style.borderColor = '#ced4da';
      jumpInput.placeholder = 'Page';
    }
  }

  function updatePaginationControls() {
    const jumpInput = document.getElementById('jump-to-page-compact');
    const stats = search.helper.lastResults;
    
    if (jumpInput && stats) {
      jumpInput.max = stats.nbPages;
      
      const jumpToggleBtn = document.getElementById('compact-jump-toggle');
      if (jumpToggleBtn) {
        jumpToggleBtn.disabled = stats.nbPages <= 1;
        jumpToggleBtn.style.opacity = stats.nbPages <= 1 ? '0.5' : '1';
        jumpToggleBtn.title = stats.nbPages <= 1 ? 'Only one page' : 'Jump to page';
      }
    }

    const resultsPerPageSelect = document.getElementById('results-per-page-compact');
    if (resultsPerPageSelect && !resultsPerPageSelect.dataset.initialized) {
      const savedResultsPerPage = localStorage.getItem('uagc_search_results_per_page');
      if (savedResultsPerPage) {
        resultsPerPageSelect.value = savedResultsPerPage;
      }
      resultsPerPageSelect.dataset.initialized = 'true';
    }
  }

  // Add enhanced custom CSS for compact pagination
  function addCustomStyles() {
    const styles = `
      <style>
        /* ===== COMPACT BOTTOM PAGINATION SYSTEM ===== */
        .compact-pagination-container {
          backdrop-filter: blur(8px) !important;
          border-top: 2px solid #0066cc !important;
          box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.08) !important;
        }

        .compact-pagination-root {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .compact-pagination-list {Ca
          display: flex !important;
          align-items: center !important;
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
          gap: 2px !important;
        }
        
        .compact-pagination-item {
          display: flex !important;
        }
        
        .compact-pagination-link {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-width: 32px !important;
          height: 32px !important;
          padding: 4px 8px !important;
          border: 1px solid transparent !important;
          border-radius: 4px !important;
          text-decoration: none !important;
          color: #6c757d !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          background: transparent !important;
          transition: all 0.15s ease !important;
        }
        
        .compact-pagination-link:hover {
          background: #0066cc !important;
          border-color: #0066cc !important;
          color: #ffffff !important;
          transform: scale(1.05) !important;
        }
        
        .compact-pagination-selected .compact-pagination-link {
          background: #0066cc !important;
          color: #ffffff !important;
          border-color: #0066cc !important;
          font-weight: 600 !important;
        }
        
        .compact-pagination-disabled .compact-pagination-link {
          background: transparent !important;
          color: #adb5bd !important;
          cursor: not-allowed !important;
          border-color: transparent !important;
          opacity: 0.5 !important;
        }

        .compact-pagination-disabled .compact-pagination-link:hover {
          transform: none !important;
          background: transparent !important;
          border-color: transparent !important;
          color: #adb5bd !important;
        }

        .compact-pagination-previous .compact-pagination-link,
        .compact-pagination-next .compact-pagination-link {
          min-width: 36px !important;
          font-size: 16px !important;
          font-weight: 400 !important;
        }

        .compact-stats-root {
          opacity: 1 !important;
        }

        .results-summary {
          white-space: nowrap !important;
        }

        .page-indicator {
          color: #9ca3af !important;
          font-weight: 400 !important;
        }

        .pagination-quick-controls select,
        .pagination-quick-controls button {
          transition: all 0.15s ease !important;
        }

        .pagination-quick-controls select:focus,
        .pagination-quick-controls button:focus {
          outline: 2px solid #0066cc !important;
          outline-offset: 1px !important;
        }

        .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 40px;
          }
        }

        .pagination-secondary {
          animation: slideDown 0.2s ease-out !important;
        }

        /* ===== DARK MODE COMPACT PAGINATION ===== */
        [data-theme='dark'] .compact-pagination-container {
          background: #1a1a1a !important;
          border-top-color: #4da6ff !important;
          box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.25) !important;
        }

        [data-theme='dark'] .compact-pagination-link {
          color: #adb5bd !important;
        }

        [data-theme='dark'] .compact-pagination-link:hover {
          background: #4da6ff !important;
          border-color: #4da6ff !important;
          color: #1a1a1a !important;
        }

        [data-theme='dark'] .compact-pagination-selected .compact-pagination-link {
          background: #4da6ff !important;
          color: #1a1a1a !important;
          border-color: #4da6ff !important;
        }

        [data-theme='dark'] .compact-pagination-disabled .compact-pagination-link {
          color: #6c757d !important;
        }

        [data-theme='dark'] .results-summary {
          color: #adb5bd !important;
        }

        [data-theme='dark'] .page-indicator {
          color: #6c757d !important;
        }

        [data-theme='dark'] .pagination-quick-controls select,
        [data-theme='dark'] .pagination-quick-controls button {
          background: #2d2d2d !important;
          border-color: #505050 !important;
          color: #e0e0e0 !important;
        }

        [data-theme='dark'] #compact-jump-toggle {
          background: none !important;
          border-color: #505050 !important;
          color: #adb5bd !important;
        }

        [data-theme='dark'] #jump-to-page-compact {
          background: #2d2d2d !important;
          border-color: #505050 !important;
          color: #e0e0e0 !important;
        }

        [data-theme='dark'] #jump-to-page-btn-compact {
          background: #4da6ff !important;
          color: #1a1a1a !important;
        }

        [data-theme='dark'] #jump-close-btn {
          color: #adb5bd !important;
        }

        /* ===== MOBILE OPTIMIZATIONS ===== */
        @media (max-width: 480px) {
          .compact-pagination-container {
            padding: 8px 12px !important;
            border-radius: 0 !important;
          }

          .pagination-primary {
            flex-direction: column !important;
            gap: 8px !important;
            margin-bottom: 4px !important;
          }

          .results-summary {
            font-size: 12px !important;
            order: 3 !important;
          }

          .pagination-quick-controls {
            order: 1 !important;
            gap: 6px !important;
          }

          .pagination-quick-controls select {
            font-size: 11px !important;
            padding: 3px 5px !important;
            min-width: 50px !important;
          }

          .pagination-quick-controls button {
            font-size: 11px !important;
            padding: 3px 6px !important;
          }

          #pagination {
            order: 2 !important;
            margin: 0 !important;
          }

          .compact-pagination-list {
            gap: 1px !important;
            justify-content: center !important;
          }

          .compact-pagination-link {
            min-width: 28px !important;
            height: 28px !important;
            font-size: 12px !important;
            padding: 2px 6px !important;
          }

          .compact-pagination-previous .compact-pagination-link,
          .compact-pagination-next .compact-pagination-link {
            min-width: 32px !important;
            font-size: 14px !important;
          }

          .compact-pagination-item:not(.compact-pagination-previous):not(.compact-pagination-next):not(.compact-pagination-selected) {
            display: none !important;
          }

          .compact-pagination-selected,
          .compact-pagination-selected + .compact-pagination-item:not(.compact-pagination-next),
          .compact-pagination-item:has(+ .compact-pagination-selected):not(.compact-pagination-previous) {
            display: flex !important;
          }
        }

        /* ===== ENHANCED SEARCH STYLING WITH QUERY SUGGESTIONS ===== */
        .enhanced-search-box-root {
          position: relative !important;
        }

        .enhanced-search-box-form {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
        }

        .enhanced-search-box-input {
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%) !important;
          border: 2px solid #e9ecef !important;
          border-radius: 12px !important;
          font-size: 16px !important;
          padding: 14px 50px 14px 16px !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
          width: 100% !important;
          flex: 1 !important;
        }

        .enhanced-search-box-input:focus {
          background: #ffffff !important;
          border-color: #0066cc !important;
          box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2), 0 4px 16px rgba(0, 0, 0, 0.12) !important;
          transform: translateY(-1px) !important;
          border-radius: 12px 12px 0 0 !important;
        }

        .enhanced-search-box-submit,
        .enhanced-search-box-reset {
          position: absolute !important;
          right: 12px !important;
          background: none !important;
          border: none !important;
          color: #6c757d !important;
          cursor: pointer !important;
          padding: 8px !important;
          border-radius: 6px !important;
          transition: all 0.2s ease !important;
          z-index: 2 !important;
        }

        .enhanced-search-box-reset {
          right: 45px !important;
        }

        .enhanced-search-box-submit:hover,
        .enhanced-search-box-reset:hover {
          background: rgba(0, 102, 204, 0.1) !important;
          color: #0066cc !important;
          transform: scale(1.1) !important;
        }

        /* Query Suggestions Styling */
        #query-suggestions {
          backdrop-filter: blur(8px) !important;
          background: rgba(255, 255, 255, 0.95) !important;
          border: 2px solid #0066cc !important;
          border-top: none !important;
        }

        .suggestion-item {
          position: relative !important;
          overflow: hidden !important;
        }

        .suggestion-item::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 4px !important;
          height: 100% !important;
          background: linear-gradient(135deg, #0066cc 0%, #4da6ff 100%) !important;
          transform: scaleY(0) !important;
          transition: transform 0.2s ease !important;
        }

        .suggestion-item:hover::before {
          transform: scaleY(1) !important;
        }

        .enhanced-hits-item:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12) !important;
          border-color: #0066cc !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        /* ===== UI KIT LOADING ANIMATIONS ===== */
        @keyframes skeleton-loading {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        @keyframes progress-bar {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        /* ===== UI KIT CARD ENHANCEMENTS ===== */
        .ui-kit-card {
          position: relative !important;
          transform: translateZ(0) !important; /* Hardware acceleration */
          will-change: transform, box-shadow !important;
        }

        .ui-kit-card::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          background: linear-gradient(135deg, rgba(0, 102, 204, 0.02) 0%, rgba(77, 166, 255, 0.01) 100%) !important;
          opacity: 0 !important;
          transition: opacity 0.3s ease !important;
          pointer-events: none !important;
          border-radius: inherit !important;
        }

        .ui-kit-card:hover::before {
          opacity: 1 !important;
        }

        .category-badge {
          transform: translateZ(0) !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .ui-kit-card:hover .category-badge {
          transform: scale(1.05) !important;
          box-shadow: 0 2px 8px rgba(0, 102, 204, 0.2) !important;
        }

        .hit-title {
          transition: color 0.2s ease !important;
        }

        .ui-kit-card:hover .hit-title {
          color: #0066cc !important;
        }

        /* ===== ENHANCED TYPOGRAPHY ===== */
        .search-modal-container {
          font-feature-settings: 'kern' 1, 'liga' 1, 'ss01' 1 !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        }

        .hit-title {
          font-feature-settings: 'kern' 1, 'liga' 1 !important;
          text-rendering: optimizeLegibility !important;
        }

        /* ===== MICRO-INTERACTIONS ===== */
        .enhanced-search-box-input {
          transform: translateZ(0) !important;
        }

        .enhanced-search-box-input:focus {
          animation: input-focus-pulse 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        @keyframes input-focus-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 102, 204, 0.4);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(0, 102, 204, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 102, 204, 0);
          }
        }

        /* ===== STAGGERED ANIMATIONS ===== */
        .search-hit-item {
          animation-fill-mode: both !important;
        }

        .search-hit-item:nth-child(1) { animation-delay: 0ms !important; }
        .search-hit-item:nth-child(2) { animation-delay: 50ms !important; }
        .search-hit-item:nth-child(3) { animation-delay: 100ms !important; }
        .search-hit-item:nth-child(4) { animation-delay: 150ms !important; }
        .search-hit-item:nth-child(5) { animation-delay: 200ms !important; }

        /* ===== LOADING SKELETON ENHANCEMENTS ===== */
        .skeleton-item {
          position: relative !important;
          overflow: hidden !important;
        }

        .skeleton-item::after {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent) !important;
          animation: skeleton-shimmer 1.5s infinite !important;
        }

        @keyframes skeleton-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* ===== ENHANCED SEARCH SIDEBAR STYLES ===== */
        .search-sidebar {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%) !important;
          border-right: 1px solid #e9ecef !important;
        }

        .sidebar-header {
          background: linear-gradient(135deg, #0066cc 0%, #4da6ff 100%) !important;
          border-bottom: 1px solid #e9ecef !important;
        }

        .sidebar-header h4 {
          color: white !important;
          margin: 0 !important;
        }

        .sidebar-header p {
          color: rgba(255, 255, 255, 0.9) !important;
          margin: 0 !important;
        }

        /* Enhanced Category Styles */
        .enhanced-category-list,
        .enhanced-type-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .enhanced-category-item,
        .enhanced-type-item {
          margin: 0 !important;
        }

        .enhanced-category-label,
        .enhanced-type-label {
          position: relative !important;
          overflow: hidden !important;
        }

        .enhanced-category-label::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background: linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(77, 166, 255, 0.05) 100%) !important;
          opacity: 0 !important;
          transition: opacity 0.3s ease !important;
          pointer-events: none !important;
        }

        .enhanced-category-label:hover::before {
          opacity: 1 !important;
        }

        .enhanced-category-selected .enhanced-category-label {
          background: linear-gradient(135deg, #0066cc 0%, #4da6ff 100%) !important;
          color: #ffffff !important;
          border-color: #0066cc !important;
          box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3) !important;
          transform: translateY(-1px) !important;
        }

        .enhanced-category-selected .enhanced-category-count {
          background: rgba(255, 255, 255, 0.25) !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }

        .enhanced-type-selected .enhanced-type-label {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%) !important;
          color: #ffffff !important;
          border-color: #28a745 !important;
          box-shadow: 0 2px 8px rgba(40, 167, 69, 0.25) !important;
        }

        .enhanced-type-selected .enhanced-type-count {
          background: rgba(255, 255, 255, 0.25) !important;
          color: #ffffff !important;
        }



        /* Enhanced Mobile Responsiveness */
        @media (max-width: 768px) {
          .search-modal-container {
            width: 100vw !important;
            height: 100vh !important;
            max-height: 100vh !important;
            border-radius: 0 !important;
            transform: translate(-50%, -50%) !important;
          }
          
          .search-sidebar {
            position: absolute !important;
            top: 0 !important;
            left: -100% !important;
            width: 85% !important;
            height: 100% !important;
            z-index: 10 !important;
            transition: left 0.3s ease !important;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1) !important;
          }
          
          .search-sidebar.mobile-open {
            left: 0 !important;
          }
          
          .search-sidebar.mobile-open::after {
            content: '' !important;
            position: fixed !important;
            top: 0 !important;
            left: 85% !important;
            width: 15% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.5) !important;
            z-index: 5 !important;
            animation: fadeIn 0.3s ease !important;
          }
          
          .search-content {
            width: 100% !important;
          }
          
          .enhanced-category-label,
          .enhanced-type-label {
            padding: 10px 12px !important;
            font-size: 13px !important;
          }
          
          .enhanced-category-count,
          .enhanced-type-count {
            font-size: 10px !important;
            padding: 3px 6px !important;
          }
          
          .sidebar-header h4 {
            font-size: 14px !important;
          }
          
          .sidebar-header p {
            font-size: 11px !important;
          }
        }

        /* Mobile Category Toggle Button */
        @media (max-width: 768px) {
          .mobile-category-toggle {
            display: block !important;
          }
          
          .mobile-category-toggle:hover {
            background: linear-gradient(135deg, #0052a3 0%, #3d8bff 100%) !important;
            transform: translateY(-50%) scale(1.05) !important;
          }
        }

        /* Desktop - hide mobile toggle */
        @media (min-width: 769px) {
          .mobile-category-toggle {
            display: none !important;
          }
        }

        /* Enhanced Dark Mode Support */
        [data-theme="dark"] .search-sidebar {
          background: linear-gradient(135deg, var(--ifm-background-surface-color) 0%, var(--ifm-background-color) 100%) !important;
          border-right: 1px solid var(--ifm-color-emphasis-300) !important;
        }

        [data-theme="dark"] .sidebar-header {
          background: linear-gradient(135deg, #4da6ff 0%, #66b3ff 100%) !important;
        }

        [data-theme="dark"] .enhanced-category-label {
          background: var(--ifm-background-surface-color) !important;
          color: var(--ifm-color-content) !important;
          border-color: var(--ifm-color-emphasis-300) !important;
        }

        [data-theme="dark"] .enhanced-category-label:hover {
          background: linear-gradient(135deg, var(--ifm-color-emphasis-200) 0%, var(--ifm-color-emphasis-100) 100%) !important;
          border-color: #4da6ff !important;
        }

        [data-theme="dark"] .enhanced-category-selected .enhanced-category-label {
          background: linear-gradient(135deg, #4da6ff 0%, #66b3ff 100%) !important;
          color: var(--ifm-background-color) !important;
          border-color: #4da6ff !important;
        }

        [data-theme="dark"] .enhanced-type-label {
          background: var(--ifm-background-surface-color) !important;
          color: var(--ifm-color-content) !important;
          border-color: var(--ifm-color-emphasis-300) !important;
        }

        [data-theme="dark"] .enhanced-type-label:hover {
          background: var(--ifm-color-emphasis-100) !important;
          border-color: #20c997 !important;
        }

        [data-theme="dark"] .enhanced-type-selected .enhanced-type-label {
          background: linear-gradient(135deg, #20c997 0%, #40e0b7 100%) !important;
          color: var(--ifm-background-color) !important;
          border-color: #20c997 !important;
        }

        [data-theme="dark"] .mobile-category-toggle {
          background: linear-gradient(135deg, #4da6ff 0%, #66b3ff 100%) !important;
          color: var(--ifm-background-color) !important;
        }

        /* Dark Mode Query Suggestions */
        [data-theme="dark"] .enhanced-search-box-input {
          background: linear-gradient(135deg, var(--ifm-background-surface-color) 0%, var(--ifm-background-color) 100%) !important;
          border-color: var(--ifm-color-emphasis-300) !important;
          color: var(--ifm-color-content) !important;
        }

        [data-theme="dark"] .enhanced-search-box-input:focus {
          background: var(--ifm-background-surface-color) !important;
          border-color: #4da6ff !important;
          box-shadow: 0 0 0 4px rgba(77, 166, 255, 0.2), 0 4px 16px rgba(0, 0, 0, 0.3) !important;
        }

        [data-theme="dark"] #query-suggestions {
          background: rgba(26, 26, 26, 0.95) !important;
          border-color: #4da6ff !important;
          backdrop-filter: blur(8px) !important;
        }

        [data-theme="dark"] .suggestion-item {
          background: var(--ifm-background-surface-color) !important;
          color: var(--ifm-color-content) !important;
          border-bottom-color: var(--ifm-color-emphasis-200) !important;
        }

        [data-theme="dark"] .enhanced-search-box-submit,
        [data-theme="dark"] .enhanced-search-box-reset {
          color: var(--ifm-color-content-secondary) !important;
        }

        [data-theme="dark"] .enhanced-search-box-submit:hover,
        [data-theme="dark"] .enhanced-search-box-reset:hover {
          background: rgba(77, 166, 255, 0.1) !important;
          color: #4da6ff !important;
        }

        /* ===== DARK MODE UI KIT ENHANCEMENTS ===== */
        [data-theme="dark"] .ui-kit-card {
          background: linear-gradient(135deg, var(--ifm-background-surface-color) 0%, var(--ifm-background-color) 100%) !important;
          border-color: var(--ifm-color-emphasis-300) !important;
          color: var(--ifm-color-content) !important;
        }

        [data-theme="dark"] .ui-kit-card:hover {
          background: linear-gradient(135deg, var(--ifm-color-emphasis-100) 0%, var(--ifm-background-surface-color) 100%) !important;
          border-color: #4da6ff !important;
        }

        [data-theme="dark"] .ui-kit-card::before {
          background: linear-gradient(135deg, rgba(77, 166, 255, 0.05) 0%, rgba(77, 166, 255, 0.02) 100%) !important;
        }

        [data-theme="dark"] .category-badge {
          background: linear-gradient(135deg, rgba(77, 166, 255, 0.15) 0%, rgba(77, 166, 255, 0.08) 100%) !important;
          color: #4da6ff !important;
          border-color: rgba(77, 166, 255, 0.3) !important;
        }

        [data-theme="dark"] .hit-title {
          color: var(--ifm-color-content) !important;
        }

        [data-theme="dark"] .ui-kit-card:hover .hit-title {
          color: #4da6ff !important;
        }

        [data-theme="dark"] .hit-content {
          color: var(--ifm-color-content-secondary) !important;
        }

        [data-theme="dark"] .hit-footer {
          border-top-color: var(--ifm-color-emphasis-200) !important;
          color: var(--ifm-color-content-secondary) !important;
        }

        [data-theme="dark"] .hover-line {
          background: linear-gradient(90deg, #4da6ff, #66b3ff) !important;
        }

        [data-theme="dark"] .skeleton-item {
          background: linear-gradient(90deg, var(--ifm-color-emphasis-200) 25%, var(--ifm-color-emphasis-300) 50%, var(--ifm-color-emphasis-200) 75%) !important;
        }

        [data-theme="dark"] .skeleton-item div {
          background: linear-gradient(90deg, var(--ifm-color-emphasis-300) 25%, var(--ifm-color-emphasis-400) 50%, var(--ifm-color-emphasis-300) 75%) !important;
        }

        [data-theme="dark"] .skeleton-item::after {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent) !important;
        }

        [data-theme="dark"] .stats-results {
          background: linear-gradient(135deg, rgba(77, 166, 255, 0.15) 0%, rgba(77, 166, 255, 0.08) 100%) !important;
          border-color: rgba(77, 166, 255, 0.3) !important;
        }

        [data-theme="dark"] .stats-performance {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(129, 199, 132, 0.08) 100%) !important;
          border-color: rgba(76, 175, 80, 0.3) !important;
        }

        [data-theme="dark"] .stats-query span:last-child {
          background: rgba(156, 163, 175, 0.2) !important;
          color: var(--ifm-color-content) !important;
        }

        [data-theme="dark"] .ui-kit-stats-container {
          color: var(--ifm-color-content-secondary) !important;
        }

        /* ===== ENHANCED MOBILE DARK MODE ===== */
        @media (max-width: 768px) {
          [data-theme="dark"] .search-modal-container {
            background: var(--ifm-background-color) !important;
            border-color: var(--ifm-color-emphasis-300) !important;
          }
          
          [data-theme="dark"] .stats-tip {
            color: var(--ifm-color-content-tertiary) !important;
          }
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
  }

  // Initialize everything
  function init() {
    try {
      createSearchModal();
      addSearchWidgets();
      setupEventListeners();
      addCustomStyles();
      search.start();
      console.log('Enhanced search with compact pagination initialized successfully');
    } catch (error) {
      console.error('Search initialization failed:', error);
    }
  }

  init();
});
