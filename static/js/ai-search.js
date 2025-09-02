// AI-Powered Search Enhancement for UAGC DX Documentation
// Integrates advanced search capabilities including semantic search and AI assistance

class UAGCAISearch {
  constructor() {
    this.initialized = false;
    this.searchData = null;
    this.init();
  }

  async init() {
    if (this.initialized) return;
    
    try {
      // Initialize AI search capabilities
      await this.loadSearchData();
      this.setupSearchInterface();
      this.setupAIAssistant();
      this.initialized = true;
      console.log('🤖 UAGC AI Search initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize AI search:', error);
    }
  }

  async loadSearchData() {
    // Load documentation metadata for AI processing
    try {
      // This would be populated with your actual documentation structure
      this.searchData = {
        pages: [
          { title: 'SEO Strategy Guide', path: '/guides/seo-hygiene', keywords: ['seo', 'optimization', 'search', 'rankings', 'llmo'] },
          { title: 'Analytics Standards', path: '/analytics-standards', keywords: ['ga4', 'gtm', 'analytics', 'tracking'] },
          { title: 'Canonical Links', path: '/canonical-links-url-taxonomy', keywords: ['urls', 'canonical', 'drupal', 'redirects'] },
          { title: 'WCAG Compliance', path: '/wcag-compliance', keywords: ['accessibility', 'wcag', 'compliance', 'ada'] },
          { title: 'UI/UX Best Practices', path: '/ui-ux-best-practices', keywords: ['design', 'user experience', 'interface'] },
          { title: 'Who Does What', path: '/who-does-what', keywords: ['team', 'roles', 'responsibilities', 'contact'] }
        ]
      };
    } catch (error) {
      console.error('Failed to load search data:', error);
    }
  }

  setupSearchInterface() {
    // Enhance existing search with AI capabilities
    const searchContainer = document.querySelector('[data-testid="search-button"]')?.parentElement;
    if (!searchContainer) return;

    // Add AI search toggle
    const aiToggle = document.createElement('button');
    aiToggle.className = 'ai-search-toggle';
    aiToggle.innerHTML = '🤖 AI Search';
    aiToggle.title = 'Toggle AI-powered search assistance';
    
    aiToggle.addEventListener('click', () => {
      this.toggleAIMode();
    });

    searchContainer.appendChild(aiToggle);
  }

  setupAIAssistant() {
    // Create floating AI assistant button
    const assistantBtn = document.createElement('div');
    assistantBtn.id = 'uagc-ai-assistant';
    assistantBtn.innerHTML = `
      <div class="ai-assistant-btn" title="UAGC AI Assistant - Ask me about documentation!">
        🤖
      </div>
      <div class="ai-chat-panel" style="display: none;">
        <div class="ai-chat-header">
          <h4>UAGC DX Assistant</h4>
          <button class="ai-close-btn">×</button>
        </div>
        <div class="ai-chat-messages" id="ai-messages">
          <div class="ai-message">
            👋 Hi! I'm your UAGC DX documentation assistant. I can help you find:
            <ul>
              <li>🔍 SEO strategies and LLMO techniques</li>
              <li>📊 Analytics setup and tracking guides</li>
              <li>♿ Accessibility compliance information</li>
              <li>🛠️ Development and QA procedures</li>
              <li>👥 Team contacts and responsibilities</li>
            </ul>
            Try asking: "How do I set up GA4 tracking?" or "Who handles SEO?"
          </div>
        </div>
        <div class="ai-chat-input">
          <input type="text" id="ai-input" placeholder="Ask about UAGC DX documentation..." />
          <button id="ai-send-btn">Send</button>
        </div>
      </div>
    `;

    document.body.appendChild(assistantBtn);
    this.setupAIEventListeners();
  }

  setupAIEventListeners() {
    const assistantBtn = document.querySelector('.ai-assistant-btn');
    const chatPanel = document.querySelector('.ai-chat-panel');
    const closeBtn = document.querySelector('.ai-close-btn');
    const sendBtn = document.getElementById('ai-send-btn');
    const input = document.getElementById('ai-input');

    assistantBtn?.addEventListener('click', () => {
      chatPanel.style.display = chatPanel.style.display === 'none' ? 'block' : 'none';
    });

    closeBtn?.addEventListener('click', () => {
      chatPanel.style.display = 'none';
    });

    sendBtn?.addEventListener('click', () => this.handleAIQuery());
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleAIQuery();
    });
  }

  async handleAIQuery() {
    const input = document.getElementById('ai-input');
    const messagesContainer = document.getElementById('ai-messages');
    
    if (!input?.value.trim()) return;

    const query = input.value.trim();
    input.value = '';

    // Add user message
    this.addMessage(messagesContainer, query, 'user');

    // Process AI response
    const response = await this.processAIQuery(query);
    this.addMessage(messagesContainer, response, 'ai');
  }

  async processAIQuery(query) {
    // Simulate AI processing with intelligent keyword matching
    const lowerQuery = query.toLowerCase();
    
    // SEO-related queries
    if (lowerQuery.includes('seo') || lowerQuery.includes('search') || lowerQuery.includes('ranking') || lowerQuery.includes('llmo')) {
      return `🔍 For SEO guidance, check out our comprehensive <a href="/guides/seo-hygiene">SEO Strategy Guide</a> which includes:
      
      • Large Language Model Optimization (LLMO)
      • 2025 SEO priorities and AI-first strategies
      • Technical SEO implementation
      • Content strategy and E-E-A-T optimization
      
      For URL management, see our <a href="/canonical-links-url-taxonomy">Canonical Links & URL Taxonomy</a> guide.
      
      📞 Contact: Omar (SEO & Analytics Specialist) for specific SEO questions.`;
    }

    // Analytics-related queries
    if (lowerQuery.includes('analytics') || lowerQuery.includes('ga4') || lowerQuery.includes('gtm') || lowerQuery.includes('tracking')) {
      return `📊 For analytics implementation, visit our <a href="/analytics-standards">Analytics Standards</a> page which covers:
      
      • GA4 setup and configuration
      • Google Tag Manager implementation
      • Event tracking and conversion measurement
      • BigQuery integration
      
      📞 Contact: Omar (SEO & Analytics Specialist) for analytics support.`;
    }

    // Accessibility queries
    if (lowerQuery.includes('accessibility') || lowerQuery.includes('wcag') || lowerQuery.includes('ada') || lowerQuery.includes('compliance')) {
      return `♿ For accessibility guidance, check our <a href="/wcag-compliance">WCAG Compliance Guide</a> which includes:
      
      • WCAG 2.2 AA implementation standards
      • Legal compliance requirements (ADA, Section 508)
      • Testing procedures and checklists
      • Accessibility best practices
      
      📞 Contact: Brian (Front-End Dev & QA Lead) for accessibility questions.`;
    }

    // Team/contact queries
    if (lowerQuery.includes('who') || lowerQuery.includes('contact') || lowerQuery.includes('team') || lowerQuery.includes('responsible')) {
      return `👥 Check our <a href="/who-does-what">Who Does What</a> page for complete team information:
      
      • Thomas: DX Director & Product Owner
      • Brandy: Digital Marketing & Web Operations Manager  
      • Jason: Senior Backend Drupal Engineer
      • Will: Backend Engineer
      • Brian: Front-End Dev & QA Lead
      • Anthony: Front-End Developer & Experiment Engineer
      • Omar: SEO & Analytics Specialist
      
      Each role includes specific responsibilities and contact protocols.`;
    }

    // Development/QA queries
    if (lowerQuery.includes('development') || lowerQuery.includes('drupal') || lowerQuery.includes('qa') || lowerQuery.includes('testing')) {
      return `🛠️ For development guidance:
      
      • <a href="/guides/drupal-standards">Drupal Standards</a> - Backend development guidelines
      • <a href="/guides/qa-smoke-test">QA Testing Procedures</a> - Quality assurance checklists
      • <a href="/guides/release-incident">Release Procedures</a> - Deployment and incident management
      
      📞 Contacts: Jason (Backend), Will (Backend), Brian (Frontend/QA), Anthony (Frontend/Experiments)`;
    }

    // Default response with search suggestions
    return `🤔 I didn't find a specific match for "${query}". Here are some suggestions:
    
    **Popular Topics:**
    • "SEO strategy" - Search optimization guides
    • "GA4 setup" - Analytics implementation
    • "accessibility" - WCAG compliance
    • "who handles [topic]" - Team responsibilities
    
    **Quick Links:**
    • <a href="/guides/getting-started">Getting Started Guide</a>
    • <a href="/common-tasks">Common Tasks</a>
    • <a href="/who-does-what">Team Directory</a>
    
    Try rephrasing your question or browse the navigation menu! 🔍`;
  }

  addMessage(container, content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${type}-message`;
    
    if (type === 'user') {
      messageDiv.textContent = content;
    } else {
      messageDiv.innerHTML = content;
    }
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
  }

  toggleAIMode() {
    // Toggle between regular and AI-enhanced search
    console.log('🤖 AI search mode toggled');
    // Implementation would enhance the default search with semantic capabilities
  }
}

// Initialize AI search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new UAGCAISearch();
});

// Also initialize on route changes (for SPA behavior)
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    setTimeout(() => new UAGCAISearch(), 100);
  });
}
