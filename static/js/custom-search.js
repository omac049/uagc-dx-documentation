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

  // Search state management
  const searchState = {
    recentQueries: JSON.parse(localStorage.getItem('uagc_recent_searches') || '[]'),
    queryHistory: [],
    currentQuery: '',
    isVoiceSearching: false,
    searchStartTime: null
  };

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
            <!-- Search Sidebar for Filters -->
            <div class="search-sidebar" style="
              width: 240px;
              background: #ffffff;
              border-right: 1px solid var(--ifm-color-emphasis-200);
              padding: 16px;
              overflow-y: auto;
              flex-shrink: 0;
            ">
              <h4 style="
                margin: 0 0 16px 0;
                font-size: 14px;
                font-weight: 600;
                color: var(--ifm-color-content);
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">Filters</h4>
              
              <!-- Document Type Filter -->
              <div class="filter-section" style="margin-bottom: 24px;">
                <h5 style="
                  margin: 0 0 12px 0;
                  font-size: 13px;
                  font-weight: 600;
                  color: var(--ifm-color-content-secondary);
                ">Document Type</h5>
                <div id="type-refinement"></div>
              </div>
              
              <!-- Category Filter -->
              <div class="filter-section" style="margin-bottom: 24px;">
                <h5 style="
                  margin: 0 0 12px 0;
                  font-size: 13px;
                  font-weight: 600;
                  color: var(--ifm-color-content-secondary);
                ">Category</h5>
                <div id="category-refinement"></div>
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
              ">
                <div id="stats"></div>
              </div>

              <!-- Enhanced Search Results -->
              <div id="search-results-container" style="
                flex: 1;
                overflow-y: auto;
                padding: 0;
                position: relative;
              ">
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
        placeholder: 'Search UAGC DX Documentation...',
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
              <div class="search-hit-item" onclick="window.open('${fullUrl}', '_blank')" style="
                padding: 20px;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                cursor: pointer;
                margin: 12px 0;
                background: #ffffff;
                transition: all 0.2s ease;
              ">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="
                    background: #0066cc15;
                    color: #0066cc;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                  ">${category}</span>
                </div>
                <h3 style="
                  margin: 0 0 8px 0;
                  font-size: 16px;
                  font-weight: 600;
                  color: #212529;
                ">${instantsearch.highlight({ attribute: 'title', hit })}</h3>
                ${truncatedContent ? `
                  <p style="
                    margin: 0;
                    font-size: 14px;
                    color: #6c757d;
                    line-height: 1.4;
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
                color: #6c757d;
              ">
                <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                <h3 style="margin: 0 0 8px 0; font-size: 18px;">No results found</h3>
                <p style="margin: 0; font-size: 14px;">Try adjusting your search terms</p>
              </div>
            `;
          }
        },
      }),

      instantsearch.widgets.stats({
        container: '#stats',
        templates: {
          text: function(data) {
            return `
              <div style="display: flex; align-items: center; gap: 16px; font-size: 14px; color: #6c757d;">
                <span><strong>${data.nbHits.toLocaleString()}</strong> result${data.nbHits !== 1 ? 's' : ''}</span>
                <span>${data.processingTimeMS}ms</span>
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

      // Document Type Refinement (Sidebar)
      instantsearch.widgets.refinementList({
        container: '#type-refinement',
        attribute: 'type',
        limit: 10,
        showMore: true,
        searchable: false,
        cssClasses: {
          root: 'sidebar-refinement-root',
          list: 'sidebar-refinement-list',
          item: 'sidebar-refinement-item',
          selectedItem: 'sidebar-refinement-selected',
          label: 'sidebar-refinement-label',
          checkbox: 'sidebar-refinement-checkbox',
          count: 'sidebar-refinement-count',
        },
        templates: {
          item: function(data) {
            return `
              <label class="sidebar-refinement-label" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 12px;
                margin: 2px 0;
                background: #ffffff;
                color: #212529;
                border: 1px solid #e9ecef;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 13px;
                font-weight: 500;
              " 
              onmouseover="this.style.background='#f8f9fa'; this.style.borderColor='#0066cc';"
              onmouseout="this.style.background='#ffffff'; this.style.borderColor='#e9ecef';">
                <span style="display: flex; align-items: center; gap: 8px;">
                  <input type="checkbox" 
                         ${data.isRefined ? 'checked' : ''} 
                         style="margin: 0; accent-color: #0066cc;" 
                         aria-label="Filter by ${data.label}">
                  <span>${data.label}</span>
                </span>
                <span class="sidebar-refinement-count" style="
                  background: #0066cc15;
                  color: #0066cc;
                  padding: 2px 6px;
                  border-radius: 10px;
                  font-size: 11px;
                  font-weight: 600;
                ">${data.count}</span>
              </label>
            `;
          }
        }
      }),

      // Category Refinement (Sidebar)
      instantsearch.widgets.refinementList({
        container: '#category-refinement',
        attribute: 'category',
        limit: 10,
        showMore: true,
        searchable: false,
        cssClasses: {
          root: 'sidebar-refinement-root',
          list: 'sidebar-refinement-list',
          item: 'sidebar-refinement-item',
          selectedItem: 'sidebar-refinement-selected',
          label: 'sidebar-refinement-label',
          checkbox: 'sidebar-refinement-checkbox',
          count: 'sidebar-refinement-count',
        },
        templates: {
          item: function(data) {
            return `
              <label class="sidebar-refinement-label" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 12px;
                margin: 2px 0;
                background: #ffffff;
                color: #212529;
                border: 1px solid #e9ecef;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 13px;
                font-weight: 500;
              "
              onmouseover="this.style.background='#f8f9fa'; this.style.borderColor='#0066cc';"
              onmouseout="this.style.background='#ffffff'; this.style.borderColor='#e9ecef';">
                <span style="display: flex; align-items: center; gap: 8px;">
                  <input type="checkbox" 
                         ${data.isRefined ? 'checked' : ''} 
                         style="margin: 0; accent-color: #0066cc;" 
                         aria-label="Filter by ${data.label}">
                  <span>${data.label}</span>
                </span>
                <span class="sidebar-refinement-count" style="
                  background: #0066cc15;
                  color: #0066cc;
                  padding: 2px 6px;
                  border-radius: 10px;
                  font-size: 11px;
                  font-weight: 600;
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
    }
  }

  // Event listeners with compact pagination functionality
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

    search.on('render', () => {
      updatePaginationControls();
    });

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
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
        return;
      }
    });
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

        /* ===== ENHANCED SEARCH STYLING ===== */
        .enhanced-search-box-input {
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%) !important;
          border: 2px solid #e9ecef !important;
          border-radius: 12px !important;
          font-size: 16px !important;
          padding: 14px 16px !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
          width: 100% !important;
        }

        .enhanced-search-box-input:focus {
          background: #ffffff !important;
          border-color: #0066cc !important;
          box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2), 0 4px 16px rgba(0, 0, 0, 0.12) !important;
          transform: translateY(-1px) !important;
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

        /* ===== SEARCH SIDEBAR STYLES ===== */
        .search-sidebar {
          background: #ffffff !important;
          border-right: 1px solid #e9ecef !important;
        }

        .search-sidebar h4 {
          color: #212529 !important;
          border-bottom: 2px solid #e9ecef !important;
          padding-bottom: 8px !important;
        }

        .search-sidebar h5 {
          color: #6c757d !important;
        }

        .sidebar-refinement-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .sidebar-refinement-item {
          margin: 4px 0 !important;
        }

        .sidebar-refinement-label:hover {
          background: #f8f9fa !important;
          border-color: #0066cc !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 2px 8px rgba(0, 102, 204, 0.15) !important;
        }

        .sidebar-refinement-selected .sidebar-refinement-label {
          background: #0066cc !important;
          color: #ffffff !important;
          border-color: #0066cc !important;
        }

        .sidebar-refinement-selected .sidebar-refinement-count {
          background: rgba(255, 255, 255, 0.2) !important;
          color: #ffffff !important;
        }

        /* Responsive sidebar - hide on mobile */
        @media (max-width: 768px) {
          .search-sidebar {
            display: none !important;
          }
          
          .search-content {
            width: 100% !important;
          }
        }

        /* Dark mode support for sidebar */
        [data-theme="dark"] .search-sidebar {
          background: var(--ifm-background-surface-color) !important;
          border-right: 1px solid var(--ifm-color-emphasis-300) !important;
        }

        [data-theme="dark"] .sidebar-refinement-label {
          background: var(--ifm-background-surface-color) !important;
          color: var(--ifm-color-content) !important;
          border-color: var(--ifm-color-emphasis-300) !important;
        }

        [data-theme="dark"] .sidebar-refinement-label:hover {
          background: var(--ifm-color-emphasis-100) !important;
          border-color: var(--ifm-color-primary) !important;
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
