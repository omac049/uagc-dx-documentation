/**
 * Custom InstantSearch.js Implementation for UAGC DX Documentation
 * 
 * This replaces DocSearch with a custom search interface that properly
 * handles our custom Algolia index structure, eliminating the "#" symbol issues.
 */

// Wait for DOM to be ready and libraries to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if libraries are loaded
  if (typeof algoliasearch === 'undefined' || typeof instantsearch === 'undefined') {
    console.error('InstantSearch.js or Algoliasearch libraries not loaded');
    return;
  }

  // Algolia configuration
  const searchClient = algoliasearch('DRLUZYJNEF', '023ae40f566d93964e26d0cd7bfb7acb');
  
  // Create search instance
  const search = instantsearch({
    indexName: 'uagc-dx-documentation',
    searchClient,
    routing: false,
  });

  // Create search modal HTML
  function createSearchModal() {
    const modalHtml = `
      <div id="search-modal" style="
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        backdrop-filter: blur(4px);
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 800px;
          max-height: 80vh;
          background: var(--ifm-background-color);
          border-radius: var(--ifm-global-radius);
          box-shadow: var(--ifm-global-shadow-lw);
          border: 1px solid var(--ifm-color-emphasis-200);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: var(--ifm-font-family-base);
        ">
          <!-- Search Header -->
          <div style="
            padding: var(--ifm-spacing-vertical) var(--ifm-spacing-horizontal);
            border-bottom: 1px solid var(--ifm-color-emphasis-200);
            display: flex;
            align-items: center;
            gap: var(--ifm-spacing-horizontal);
            background: var(--ifm-background-surface-color);
          ">
            <div id="searchbox" style="flex: 1;"></div>
            <button id="close-search" style="
              background: none;
              border: none;
              font-size: var(--ifm-h4-font-size);
              cursor: pointer;
              color: var(--ifm-color-content-secondary);
              padding: var(--ifm-button-padding-vertical);
              border-radius: var(--ifm-button-border-radius);
              transition: var(--ifm-transition-fast) all;
              font-family: var(--ifm-font-family-base);
            " aria-label="Close search" 
               onmouseover="this.style.background='var(--ifm-color-emphasis-200)'; this.style.color='var(--ifm-color-content)'"
               onmouseout="this.style.background='none'; this.style.color='var(--ifm-color-content-secondary)'">✕</button>
          </div>

          <!-- Search Body -->
          <div style="
            display: flex;
            flex: 1;
            min-height: 0;
          ">
            <!-- Sidebar with filters -->
            <div style="
              width: 200px;
              padding: var(--ifm-spacing-vertical) var(--ifm-spacing-horizontal);
              border-right: 1px solid var(--ifm-color-emphasis-200);
              background: var(--ifm-background-surface-color);
            ">
              <h3 style="
                margin: 0 0 var(--ifm-spacing-vertical) 0;
                font-size: var(--ifm-font-size-sm);
                font-weight: var(--ifm-font-weight-semibold);
                color: var(--ifm-color-content-secondary);
                text-transform: uppercase;
                letter-spacing: var(--ifm-heading-letter-spacing);
                font-family: var(--ifm-heading-font-family);
              ">Categories</h3>
              <div id="category-refinement"></div>
              
              <div style="margin-top: 20px;">
                <div id="clear-refinements"></div>
              </div>
            </div>

            <!-- Main content area -->
            <div style="
              flex: 1;
              display: flex;
              flex-direction: column;
              min-width: 0;
            ">
              <!-- Search stats -->
              <div style="
                padding: calc(var(--ifm-spacing-vertical) * 0.75) var(--ifm-spacing-horizontal);
                border-bottom: 1px solid var(--ifm-color-emphasis-200);
                background: var(--ifm-background-surface-color);
              ">
                <div id="stats"></div>
              </div>

              <!-- Search results -->
              <div style="
                flex: 1;
                overflow-y: auto;
                padding: 0;
              ">
                <div id="hits"></div>
              </div>

              <!-- Pagination -->
              <div style="
                padding: var(--ifm-spacing-vertical) var(--ifm-spacing-horizontal);
                border-top: 1px solid var(--ifm-color-emphasis-200);
                text-align: center;
                background: var(--ifm-background-surface-color);
              ">
                <div id="pagination"></div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="
            padding: calc(var(--ifm-spacing-vertical) * 0.75) var(--ifm-spacing-horizontal);
            border-top: 1px solid var(--ifm-color-emphasis-200);
            text-align: center;
            background: var(--ifm-background-surface-color);
          ">
            <div id="powered-by"></div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  // Add search widgets
  function addSearchWidgets() {
          // Search box widget with enhanced styling
      search.addWidgets([
        instantsearch.widgets.searchBox({
          container: '#searchbox',
          placeholder: 'Search UAGC DX Documentation...',
          autofocus: true,
          showSubmit: true,
          showReset: true,
          showLoadingIndicator: true,
          cssClasses: {
            root: 'custom-search-box-root',
            form: 'custom-search-box-form',
            input: 'custom-search-box-input',
            submit: 'custom-search-box-submit',
            reset: 'custom-search-box-reset',
            loadingIndicator: 'custom-search-box-loading',
          },
        }),

             // Enhanced Hits (search results) widget with custom template
       instantsearch.widgets.hits({
         container: '#hits',
         cssClasses: {
           root: 'custom-hits-root',
           list: 'custom-hits-list',
           item: 'custom-hits-item',
           empty: 'custom-hits-empty',
         },
         templates: {
          item: function(hit) {
            const category = hit.category || 'Documentation';
            const title = hit.title || 'Untitled';
            const content = hit.content || '';
            const url = hit.url || '#';
            
            // Truncate content for display
            const truncatedContent = content.length > 200 
              ? content.substring(0, 200) + '...' 
              : content;

            // Get the base URL for proper linking
            const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
            const fullUrl = url.startsWith('http') ? url : baseUrl + '/' + url.replace(/^\/+/, '');

            return `
              <div class="search-hit-item" style="
                padding: var(--ifm-spacing-vertical) var(--ifm-spacing-horizontal);
                border-bottom: 1px solid var(--ifm-color-emphasis-200);
                cursor: pointer;
                transition: var(--ifm-transition-fast) background-color;
                border-radius: var(--ifm-global-radius);
                margin: 2px;
                background: #ffffff;
              " onmouseover="this.style.backgroundColor='#f8f9fa'" 
                 onmouseout="this.style.backgroundColor='#ffffff'"
                 onclick="window.open('${fullUrl}', '_blank')">
                
                <div style="
                  display: flex;
                  align-items: center;
                  gap: var(--ifm-spacing-horizontal);
                  margin-bottom: var(--ifm-spacing-vertical);
                ">
                  <span class="search-category-badge" style="
                    background: #ffffff;
                    color: #333333;
                    padding: var(--ifm-badge-padding-vertical) var(--ifm-badge-padding-horizontal);
                    border-radius: var(--ifm-badge-border-radius);
                    font-size: var(--ifm-badge-font-size);
                    font-weight: var(--ifm-font-weight-semibold);
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                    border: 2px solid var(--ifm-color-primary);
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                  ">${category}</span>
                </div>

                <h3 style="
                  margin: 0 0 var(--ifm-spacing-vertical) 0;
                  font-size: var(--ifm-h5-font-size);
                  font-weight: var(--ifm-font-weight-semibold);
                  color: var(--ifm-color-primary);
                  line-height: var(--ifm-heading-line-height);
                  font-family: var(--ifm-heading-font-family);
                ">${title}</h3>

                ${truncatedContent ? `
                  <p style="
                    margin: 0;
                    font-size: var(--ifm-font-size-sm);
                    color: var(--ifm-color-content-secondary);
                    line-height: var(--ifm-line-height-base);
                    font-family: var(--ifm-font-family-base);
                  ">${truncatedContent}</p>
                ` : ''}
              </div>
            `;
          },
          empty: function() {
            return `
              <div style="
                text-align: center;
                padding: 60px 20px;
                color: var(--ifm-color-content-secondary, #666);
              ">
                <div style="font-size: 48px; margin-bottom: 20px;">🔍</div>
                <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">No results found</h3>
                <p style="margin: 0; font-size: 14px;">Try adjusting your search terms or clearing filters.</p>
              </div>
            `;
          }
        },
        cssClasses: {
          root: 'hits-root',
          list: 'hits-list',
          item: 'hits-item',
        },
      }),

             // Enhanced Category refinement widget
       instantsearch.widgets.refinementList({
         container: '#category-refinement',
         attribute: 'category',
         limit: 10,
         showMore: true,
         cssClasses: {
           root: 'custom-refinement-root',
           list: 'custom-refinement-list',
           item: 'custom-refinement-item',
           checkbox: 'custom-refinement-checkbox',
           labelText: 'custom-refinement-label',
           count: 'custom-refinement-count',
           showMore: 'custom-refinement-showmore',
         },
         templates: {
          item: function(item) {
            return `
              <label style="
                display: flex;
                align-items: center;
                padding: 8px 0;
                cursor: pointer;
                font-size: 14px;
                color: var(--ifm-color-content, #000);
              ">
                <input 
                  type="checkbox" 
                  ${item.isRefined ? 'checked' : ''}
                  style="margin-right: 8px;"
                >
                <span style="flex: 1;">${item.label}</span>
                <span style="
                  background: var(--ifm-color-emphasis-300, #ccc);
                  color: var(--ifm-color-content, #000);
                  padding: 2px 6px;
                  border-radius: 10px;
                  font-size: 11px;
                  font-weight: 500;
                ">${item.count}</span>
              </label>
            `;
          }
        },
        cssClasses: {
          root: 'refinement-list-root',
          list: 'refinement-list-list',
          item: 'refinement-list-item',
        },
      }),

      // Enhanced Clear refinements widget
      instantsearch.widgets.clearRefinements({
        container: '#clear-refinements',
        templates: {
          resetLabel: '🗑️ Clear Filters',
        },
        cssClasses: {
          root: 'custom-clear-root',
          button: 'custom-clear-button',
          disabledButton: 'custom-clear-disabled',
        },
      }),

      // Enhanced Stats widget
      instantsearch.widgets.stats({
        container: '#stats',
        cssClasses: {
          root: 'custom-stats-root',
          text: 'custom-stats-text',
        },
        templates: {
          text: function(data) {
            return `
              <div class="custom-stats-container">
                <span class="custom-stats-results">
                  📊 ${data.nbHits.toLocaleString()} result${data.nbHits !== 1 ? 's' : ''}
                </span>
                <span class="custom-stats-time">
                  ⚡ ${data.processingTimeMS}ms
                </span>
              </div>
            `;
          }
        },
      }),

      // Enhanced Pagination widget
      instantsearch.widgets.pagination({
        container: '#pagination',
        maxPages: 20,
        showFirst: true,
        showLast: true,
        showPrevious: true,
        showNext: true,
        cssClasses: {
          root: 'custom-pagination-root',
          list: 'custom-pagination-list',
          item: 'custom-pagination-item',
          firstPageItem: 'custom-pagination-first',
          lastPageItem: 'custom-pagination-last',
          previousPageItem: 'custom-pagination-previous',
          nextPageItem: 'custom-pagination-next',
          pageItem: 'custom-pagination-page',
          selectedItem: 'custom-pagination-selected',
          disabledItem: 'custom-pagination-disabled',
          link: 'custom-pagination-link',
        },
      }),

      // Enhanced Powered by Algolia
      instantsearch.widgets.poweredBy({
        container: '#powered-by',
        cssClasses: {
          root: 'custom-poweredby-root',
          link: 'custom-poweredby-link',
          logo: 'custom-poweredby-logo',
        },
      }),
    ]);
  }

  // Modal control functions
  function openSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      // Focus search input after a brief delay
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
    }
  }

  // Event listeners
  function setupEventListeners() {
    // Search button click
    function attachSearchButtonListener() {
      const searchButton = document.getElementById('custom-search-button');
      if (searchButton) {
        searchButton.addEventListener('click', openSearchModal);
      } else {
        // Retry after a delay if button not found
        setTimeout(attachSearchButtonListener, 500);
      }
    }
    attachSearchButtonListener();

    // Close button click
    document.addEventListener('click', function(e) {
      if (e.target.id === 'close-search') {
        closeSearchModal();
      }
    });

    // Modal overlay click
    document.addEventListener('click', function(e) {
      if (e.target.id === 'search-modal') {
        closeSearchModal();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      // Open search with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      
      // Close search with Escape
      if (e.key === 'Escape') {
        closeSearchModal();
      }
    });
  }

  // Add custom CSS
  function addCustomStyles() {
    const styles = `
      <style>
        /* ===== SEARCH MODAL ROOT - NO OPACITY ===== */
        #search-modal {
          font-family: var(--ifm-font-family-base);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* ===== INSTANTSEARCH.JS OVERRIDES ===== */
        
        /* Enhanced SearchBox Widget Styling */
        .ais-SearchBox,
        .custom-search-box-root {
          position: relative !important;
          width: 100% !important;
        }
        
        .ais-SearchBox-form,
        .custom-search-box-form {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
        }
        
        .ais-SearchBox-input,
        .custom-search-box-input {
          width: 100% !important;
          padding: var(--ifm-button-padding-vertical) calc(var(--ifm-button-padding-horizontal) * 2.5) var(--ifm-button-padding-vertical) var(--ifm-button-padding-horizontal) !important;
          border: 2px solid var(--ifm-color-emphasis-300) !important;
          border-radius: var(--ifm-button-border-radius) !important;
          font-size: var(--ifm-font-size-base) !important;
          font-family: var(--ifm-font-family-base) !important;
          line-height: var(--ifm-line-height-base) !important;
          outline: none !important;
          transition: var(--ifm-transition-fast) all !important;
          background: #ffffff !important;
          color: var(--ifm-color-content) !important;
          opacity: 1 !important; /* NO OPACITY */
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        }
        
        .ais-SearchBox-input:focus,
        .custom-search-box-input:focus {
          border-color: var(--ifm-color-primary) !important;
          box-shadow: 0 0 0 3px var(--ifm-color-primary-lighter), 0 2px 8px rgba(0, 0, 0, 0.15) !important;
          background: #ffffff !important;
          opacity: 1 !important; /* NO OPACITY */
          transform: translateY(-1px) !important;
        }
        
        .ais-SearchBox-input::placeholder,
        .custom-search-box-input::placeholder {
          color: var(--ifm-color-content-secondary) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        /* Enhanced Submit Button Styling */
        .ais-SearchBox-submit,
        .custom-search-box-submit {
          position: absolute !important;
          right: 40px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          background: none !important;
          border: none !important;
          cursor: pointer !important;
          padding: 8px !important;
          border-radius: var(--ifm-button-border-radius) !important;
          transition: var(--ifm-transition-fast) all !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-SearchBox-submit:hover,
        .custom-search-box-submit:hover {
          background: var(--ifm-color-primary-lighter) !important;
          transform: translateY(-50%) scale(1.1) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        /* Submit Icon Styling */
        .ais-SearchBox-submitIcon,
        .ais-SearchBox-submitIcon path {
          fill: var(--ifm-color-primary) !important;
          width: 18px !important;
          height: 18px !important;
          transition: var(--ifm-transition-fast) fill !important;
        }
        
        .ais-SearchBox-submit:hover .ais-SearchBox-submitIcon path {
          fill: var(--ifm-color-primary-dark) !important;
        }
        
        /* Enhanced Reset Button Styling */
        .ais-SearchBox-reset,
        .custom-search-box-reset {
          position: absolute !important;
          right: 12px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          background: none !important;
          border: none !important;
          cursor: pointer !important;
          padding: 8px !important;
          border-radius: var(--ifm-button-border-radius) !important;
          transition: var(--ifm-transition-fast) all !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-SearchBox-reset:hover,
        .custom-search-box-reset:hover {
          background: var(--ifm-color-danger-lighter) !important;
          transform: translateY(-50%) scale(1.1) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        /* Reset Icon Styling */
        .ais-SearchBox-resetIcon,
        .ais-SearchBox-resetIcon path {
          fill: var(--ifm-color-content-secondary) !important;
          width: 16px !important;
          height: 16px !important;
          transition: var(--ifm-transition-fast) fill !important;
        }
        
        .ais-SearchBox-reset:hover .ais-SearchBox-resetIcon path {
          fill: var(--ifm-color-danger) !important;
        }
        
        /* Loading Indicator Styling */
        .ais-SearchBox-loadingIndicator,
        .custom-search-box-loading {
          position: absolute !important;
          right: 70px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          width: 16px !important;
          height: 16px !important;
        }
        
        .ais-SearchBox-loadingIcon {
          animation: searchBoxSpin 1s linear infinite !important;
        }
        
        .ais-SearchBox-loadingIcon path {
          fill: var(--ifm-color-primary) !important;
        }
        
        @keyframes searchBoxSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Stats Widget */
        .ais-Stats {
          font-size: var(--ifm-font-size-sm) !important;
          color: var(--ifm-color-content-secondary) !important;
          font-weight: var(--ifm-font-weight-normal) !important;
          font-family: var(--ifm-font-family-base) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* RefinementList Widget */
        .ais-RefinementList {
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-RefinementList-item {
          display: flex !important;
          align-items: center !important;
          padding: calc(var(--ifm-spacing-vertical) * 0.5) 0 !important;
          cursor: pointer !important;
          font-size: var(--ifm-font-size-sm) !important;
          font-weight: var(--ifm-font-weight-normal) !important;
          color: var(--ifm-color-content) !important;
          transition: var(--ifm-transition-fast) color !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-RefinementList-item:hover {
          color: var(--ifm-color-primary) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-RefinementList-checkbox {
          accent-color: var(--ifm-color-primary) !important;
          margin-right: var(--ifm-spacing-horizontal) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-RefinementList-labelText {
          flex: 1 !important;
          font-family: var(--ifm-font-family-base) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-RefinementList-count {
          background: var(--ifm-color-emphasis-300) !important;
          color: var(--ifm-color-content) !important;
          padding: 2px 8px !important;
          border-radius: var(--ifm-badge-border-radius) !important;
          font-size: var(--ifm-font-size-tiny) !important;
          font-weight: var(--ifm-font-weight-semibold) !important;
          font-family: var(--ifm-font-family-base) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        .ais-RefinementList-showMore {
          background: none !important;
          border: none !important;
          color: var(--ifm-color-primary) !important;
          font-size: var(--ifm-font-size-sm) !important;
          cursor: pointer !important;
          margin-top: var(--ifm-spacing-vertical) !important;
          padding: calc(var(--ifm-spacing-vertical) * 0.5) 0 !important;
          font-weight: var(--ifm-font-weight-semibold) !important;
          font-family: var(--ifm-font-family-base) !important;
          transition: var(--ifm-transition-fast) color !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-RefinementList-showMore:hover {
          color: var(--ifm-color-primary-dark) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* Hits Widget */
        .ais-Hits {
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-Hits-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-Hits-item {
          padding: var(--ifm-spacing-vertical) var(--ifm-spacing-horizontal) !important;
          border-bottom: 1px solid var(--ifm-color-emphasis-200) !important;
          cursor: pointer !important;
          transition: var(--ifm-transition-fast) all !important;
          border-radius: var(--ifm-global-radius) !important;
          margin: 2px !important;
          background: #ffffff !important; /* SOLID WHITE BACKGROUND */
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-Hits-item:hover {
          background: #f8f9fa !important; /* LIGHT GRAY HOVER ON WHITE BASE */
          box-shadow: var(--ifm-global-shadow-lw) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* Custom search hit styling */
        .search-hit-item {
          background: #ffffff !important; /* SOLID WHITE BACKGROUND */
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .search-category-badge {
          background: #ffffff !important; /* WHITE BACKGROUND */
          color: #333333 !important; /* DARK TEXT FOR CONTRAST */
          padding: var(--ifm-badge-padding-vertical) var(--ifm-badge-padding-horizontal) !important;
          border-radius: var(--ifm-badge-border-radius) !important;
          font-size: var(--ifm-badge-font-size) !important;
          font-weight: var(--ifm-font-weight-semibold) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.02em !important;
          border: 2px solid var(--ifm-color-primary) !important;
          font-family: var(--ifm-font-family-base) !important;
          opacity: 1 !important; /* NO OPACITY */
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important; /* SUBTLE SHADOW */
        }

        /* Pagination Widget */
        .ais-Pagination {
          display: flex !important;
          justify-content: center !important;
          margin: var(--ifm-spacing-vertical) 0 !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-Pagination-list {
          display: flex !important;
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
          gap: var(--ifm-spacing-horizontal) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-Pagination-item {
          display: flex !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-Pagination-link {
          padding: var(--ifm-button-padding-vertical) var(--ifm-button-padding-horizontal) !important;
          border: var(--ifm-button-border-width) solid var(--ifm-color-emphasis-300) !important;
          border-radius: var(--ifm-button-border-radius) !important;
          text-decoration: none !important;
          color: var(--ifm-color-content) !important;
          font-size: var(--ifm-font-size-sm) !important;
          font-weight: var(--ifm-font-weight-semibold) !important;
          transition: var(--ifm-transition-fast) all !important;
          background: var(--ifm-background-color) !important;
          min-width: 44px !important;
          text-align: center !important;
          font-family: var(--ifm-font-family-base) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-Pagination-link:hover {
          background: var(--ifm-color-emphasis-200) !important;
          color: var(--ifm-color-content) !important;
          text-decoration: none !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-Pagination-item--selected .ais-Pagination-link {
          background: var(--ifm-color-primary) !important;
          color: var(--ifm-color-primary-contrast-background) !important;
          border-color: var(--ifm-color-primary) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-Pagination-item--selected .ais-Pagination-link:hover {
          background: var(--ifm-color-primary-dark) !important;
          border-color: var(--ifm-color-primary-dark) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* ClearRefinements Widget */
        .ais-ClearRefinements-button {
          background: var(--ifm-color-danger) !important;
          color: var(--ifm-color-danger-contrast-background) !important;
          border: none !important;
          padding: var(--ifm-button-padding-vertical) var(--ifm-button-padding-horizontal) !important;
          border-radius: var(--ifm-button-border-radius) !important;
          font-size: var(--ifm-font-size-sm) !important;
          font-weight: var(--ifm-font-weight-semibold) !important;
          cursor: pointer !important;
          transition: var(--ifm-transition-fast) background-color !important;
          font-family: var(--ifm-font-family-base) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-ClearRefinements-button:hover {
          background: var(--ifm-color-danger-dark) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-ClearRefinements-button:disabled {
          background: var(--ifm-color-emphasis-300) !important;
          color: var(--ifm-color-content-secondary) !important;
          cursor: not-allowed !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* PoweredBy Widget */
        .ais-PoweredBy {
          font-size: var(--ifm-font-size-xs) !important;
          color: var(--ifm-color-content-secondary) !important;
          font-family: var(--ifm-font-family-base) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-PoweredBy-link {
          color: var(--ifm-color-content-secondary) !important;
          text-decoration: none !important;
          transition: var(--ifm-transition-fast) color !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-PoweredBy-link:hover {
          color: var(--ifm-color-primary) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* Hit highlighting - NO OPACITY */
        .ais-Highlight-highlighted {
          background: var(--ifm-color-warning-lighter) !important;
          color: var(--ifm-color-warning-contrast-background) !important;
          font-weight: var(--ifm-font-weight-semibold) !important;
          padding: 1px 3px !important;
          border-radius: 3px !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* Empty state styling */
        .ais-Hits--empty {
          text-align: center !important;
          padding: calc(var(--ifm-spacing-vertical) * 3) var(--ifm-spacing-horizontal) !important;
          color: var(--ifm-color-content-secondary) !important;
          font-family: var(--ifm-font-family-base) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* Custom legacy class fallbacks */
        .search-box-root, .search-box-form, .search-box-input, .search-box-reset,
        .refinement-list-item, .pagination-root, .pagination-list, .pagination-item,
        .pagination-link, .clear-refinements-button {
          opacity: 1 !important; /* NO OPACITY */
        }

        /* ===== DARK MODE ADJUSTMENTS ===== */
        [data-theme='dark'] .ais-SearchBox-input:focus {
          box-shadow: 0 0 0 3px var(--ifm-color-primary-darker) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        [data-theme='dark'] .ais-Highlight-highlighted {
          background: var(--ifm-color-warning-dark) !important;
          color: var(--ifm-color-warning-contrast-foreground) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 996px) {
          #search-modal > div {
            width: 95% !important;
            max-height: 90vh !important;
          }
          #search-modal > div > div:nth-child(2) {
            flex-direction: column !important;
          }
          #search-modal > div > div:nth-child(2) > div:first-child {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid var(--ifm-color-emphasis-200) !important;
            padding-bottom: var(--ifm-spacing-vertical) !important;
          }
        }

        @media (max-width: 768px) {
          .ais-Pagination-link {
            padding: var(--ifm-button-padding-vertical) calc(var(--ifm-button-padding-horizontal) * 0.75) !important;
            font-size: var(--ifm-font-size-xs) !important;
            min-width: 36px !important;
          }
        }

        @media (max-width: 480px) {
          #search-modal > div {
            width: 98% !important;
            margin: 1% !important;
          }
          .ais-SearchBox-input {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
        }

        /* ===== ADDITIONAL ENHANCEMENTS ===== */
        
        /* Focus trap for accessibility */
        #search-modal:focus-within {
          outline: 2px solid var(--ifm-color-primary) !important;
          outline-offset: 2px !important;
        }

        /* Smooth animations for modal content */
        #search-modal > div {
          animation: searchModalSlideIn 0.2s ease-out !important;
        }
        
        @keyframes searchModalSlideIn {
          from {
            transform: translate(-50%, -60%) scale(0.95) !important;
            opacity: 0 !important;
          }
          to {
            transform: translate(-50%, -50%) scale(1) !important;
            opacity: 1 !important; /* Ends with NO OPACITY */
          }
        }

        /* ===== CUSTOM WIDGET ENHANCEMENTS ===== */

        /* Custom Hits Widget */
        .custom-hits-root {
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-hits-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-hits-item {
          background: #ffffff !important; /* SOLID WHITE BACKGROUND */
          border: 1px solid var(--ifm-color-emphasis-200) !important;
          border-radius: var(--ifm-global-radius) !important;
          margin: calc(var(--ifm-spacing-vertical) * 0.5) 0 !important;
          padding: var(--ifm-spacing-vertical) var(--ifm-spacing-horizontal) !important;
          cursor: pointer !important;
          transition: var(--ifm-transition-fast) all !important;
          opacity: 1 !important; /* NO OPACITY */
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
        }
        
        .custom-hits-item:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          border-color: var(--ifm-color-primary-lighter) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-hits-empty {
          text-align: center !important;
          padding: calc(var(--ifm-spacing-vertical) * 3) var(--ifm-spacing-horizontal) !important;
          color: var(--ifm-color-content-secondary) !important;
          background: #ffffff !important;
          border-radius: var(--ifm-global-radius) !important;
          border: 2px dashed var(--ifm-color-emphasis-300) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* Custom Refinement List Widget */
        .custom-refinement-root {
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-refinement-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-refinement-item {
          display: flex !important;
          align-items: center !important;
          padding: calc(var(--ifm-spacing-vertical) * 0.5) 0 !important;
          border-radius: var(--ifm-button-border-radius) !important;
          transition: var(--ifm-transition-fast) all !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-refinement-item:hover {
          background: var(--ifm-color-emphasis-100) !important;
          padding-left: calc(var(--ifm-spacing-horizontal) * 0.5) !important;
          margin-left: calc(var(--ifm-spacing-horizontal) * -0.5) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-refinement-checkbox {
          accent-color: var(--ifm-color-primary) !important;
          margin-right: var(--ifm-spacing-horizontal) !important;
          transform: scale(1.1) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-refinement-label {
          flex: 1 !important;
          font-family: var(--ifm-font-family-base) !important;
          font-size: var(--ifm-font-size-sm) !important;
          font-weight: var(--ifm-font-weight-normal) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-refinement-count {
          background: var(--ifm-color-primary-lighter) !important;
          color: var(--ifm-color-primary-dark) !important;
          padding: 2px 8px !important;
          border-radius: var(--ifm-badge-border-radius) !important;
          font-size: var(--ifm-font-size-tiny) !important;
          font-weight: var(--ifm-font-weight-bold) !important;
          opacity: 1 !important; /* NO OPACITY */
          border: 1px solid var(--ifm-color-primary) !important;
        }
        
        .custom-refinement-showmore {
          background: none !important;
          border: 2px solid var(--ifm-color-primary) !important;
          color: var(--ifm-color-primary) !important;
          padding: calc(var(--ifm-spacing-vertical) * 0.5) var(--ifm-spacing-horizontal) !important;
          border-radius: var(--ifm-button-border-radius) !important;
          font-size: var(--ifm-font-size-sm) !important;
          font-weight: var(--ifm-font-weight-semibold) !important;
          cursor: pointer !important;
          margin-top: var(--ifm-spacing-vertical) !important;
          width: 100% !important;
          transition: var(--ifm-transition-fast) all !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-refinement-showmore:hover {
          background: var(--ifm-color-primary) !important;
          color: white !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* Custom Clear Refinements Widget */
        .custom-clear-root {
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-clear-button {
          background: var(--ifm-color-danger) !important;
          color: white !important;
          border: none !important;
          padding: var(--ifm-button-padding-vertical) var(--ifm-button-padding-horizontal) !important;
          border-radius: var(--ifm-button-border-radius) !important;
          font-size: var(--ifm-font-size-sm) !important;
          font-weight: var(--ifm-font-weight-semibold) !important;
          cursor: pointer !important;
          transition: var(--ifm-transition-fast) all !important;
          width: 100% !important;
          box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-clear-button:hover {
          background: var(--ifm-color-danger-dark) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 8px rgba(220, 53, 69, 0.4) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-clear-disabled {
          background: var(--ifm-color-emphasis-300) !important;
          color: var(--ifm-color-content-secondary) !important;
          cursor: not-allowed !important;
          box-shadow: none !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* Custom Stats Widget */
        .custom-stats-root {
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-stats-text {
          font-family: var(--ifm-font-family-base) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-stats-container {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: var(--ifm-spacing-horizontal) !important;
          padding: calc(var(--ifm-spacing-vertical) * 0.5) var(--ifm-spacing-horizontal) !important;
          background: var(--ifm-color-emphasis-100) !important;
          border-radius: var(--ifm-button-border-radius) !important;
          border-left: 4px solid var(--ifm-color-primary) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-stats-results {
          font-size: var(--ifm-font-size-sm) !important;
          font-weight: var(--ifm-font-weight-semibold) !important;
          color: var(--ifm-color-content) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-stats-time {
          font-size: var(--ifm-font-size-xs) !important;
          color: var(--ifm-color-content-secondary) !important;
          font-weight: var(--ifm-font-weight-normal) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* Custom Pagination Widget */
        .custom-pagination-root {
          display: flex !important;
          justify-content: center !important;
          margin: var(--ifm-spacing-vertical) 0 !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-pagination-list {
          display: flex !important;
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
          gap: calc(var(--ifm-spacing-horizontal) * 0.5) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-pagination-item {
          display: flex !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-pagination-link {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-width: 44px !important;
          height: 44px !important;
          padding: var(--ifm-button-padding-vertical) var(--ifm-button-padding-horizontal) !important;
          border: 2px solid var(--ifm-color-emphasis-300) !important;
          border-radius: var(--ifm-button-border-radius) !important;
          text-decoration: none !important;
          color: var(--ifm-color-content) !important;
          font-size: var(--ifm-font-size-sm) !important;
          font-weight: var(--ifm-font-weight-semibold) !important;
          background: #ffffff !important;
          transition: var(--ifm-transition-fast) all !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-pagination-link:hover {
          background: var(--ifm-color-primary-lighter) !important;
          border-color: var(--ifm-color-primary) !important;
          color: var(--ifm-color-primary-dark) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-pagination-selected .custom-pagination-link {
          background: var(--ifm-color-primary) !important;
          color: white !important;
          border-color: var(--ifm-color-primary) !important;
          box-shadow: 0 0 0 3px var(--ifm-color-primary-lighter) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-pagination-disabled .custom-pagination-link {
          background: var(--ifm-color-emphasis-100) !important;
          color: var(--ifm-color-content-secondary) !important;
          cursor: not-allowed !important;
          border-color: var(--ifm-color-emphasis-200) !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* Custom PoweredBy Widget */
        .custom-poweredby-root {
          text-align: center !important;
          padding: var(--ifm-spacing-vertical) 0 !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-poweredby-link {
          display: inline-flex !important;
          align-items: center !important;
          gap: calc(var(--ifm-spacing-horizontal) * 0.5) !important;
          color: var(--ifm-color-content-secondary) !important;
          text-decoration: none !important;
          font-size: var(--ifm-font-size-xs) !important;
          font-weight: var(--ifm-font-weight-normal) !important;
          transition: var(--ifm-transition-fast) all !important;
          padding: calc(var(--ifm-spacing-vertical) * 0.5) var(--ifm-spacing-horizontal) !important;
          border-radius: var(--ifm-button-border-radius) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-poweredby-link:hover {
          color: var(--ifm-color-primary) !important;
          background: var(--ifm-color-emphasis-100) !important;
          transform: translateY(-1px) !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .custom-poweredby-logo {
          width: 16px !important;
          height: 16px !important;
          opacity: 1 !important; /* NO OPACITY */
        }

        /* Enhanced hover states for all widgets */
        .ais-Hits-item,
        .custom-hits-item,
        .ais-RefinementList-item,
        .custom-refinement-item,
        .ais-Pagination-link,
        .custom-pagination-link,
        .ais-ClearRefinements-button,
        .custom-clear-button {
          transform: none !important;
          opacity: 1 !important; /* NO OPACITY */
        }
        
        .ais-Hits-item:hover,
        .custom-hits-item:hover {
          transform: translateY(-2px) !important;
          transition: var(--ifm-transition-fast) all !important;
          opacity: 1 !important; /* NO OPACITY */
        }
      </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
  }

  // Initialize everything
  function init() {
    createSearchModal();
    addCustomStyles();
    addSearchWidgets();
    setupEventListeners();
    
    // Start InstantSearch
    search.start();
    
    console.log('✅ Custom InstantSearch.js implementation loaded successfully');
  }

  // Initialize after a short delay to ensure DOM is ready
  setTimeout(init, 100);
});
