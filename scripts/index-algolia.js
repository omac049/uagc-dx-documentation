#!/usr/bin/env node

/**
 * Algolia Index Script for UAGC DX Documentation
 * 
 * This script indexes the documentation content to Algolia for search functionality.
 * Run this after content updates to ensure search results are current.
 * 
 * Usage: node scripts/index-algolia.js
 */

const algoliasearch = require('algoliasearch');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Algolia configuration — keys MUST come from environment variables
const APP_ID = process.env.ALGOLIA_APP_ID || 'DRLUZYJNEF';
const WRITE_API_KEY = process.env.ALGOLIA_WRITE_API_KEY;
const INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || 'uagc-dx-documentation';

if (!WRITE_API_KEY) {
  console.error('❌ ALGOLIA_WRITE_API_KEY environment variable is required.');
  console.error('   Set it before running this script:');
  console.error('   export ALGOLIA_WRITE_API_KEY="your-write-api-key"');
  process.exit(1);
}

// Initialize Algolia client
const client = algoliasearch(APP_ID, WRITE_API_KEY);
const index = client.initIndex(INDEX_NAME);

// Documentation structure mapping
const DOCS_CONFIG = {
  baseUrl: 'https://omac049.github.io/uagc-dx-documentation',
  docsPath: './new-docs',
  excludeFiles: ['.DS_Store', 'README.md'],
  categories: {
    // Getting Started & Core
    'getting-started': { weight: 100, category: 'Getting Started' },
    'index': { weight: 95, category: 'Home' },
    'how-to-use': { weight: 90, category: 'Getting Started' },
    'team-collaboration-guide': { weight: 85, category: 'Getting Started' },
    
    // Program SEO - Complete Catalog (NEW COMPREHENSIVE COVERAGE)
    'programs/': { weight: 95, category: 'Program SEO' },
    'programs/index': { weight: 100, category: 'Program SEO' },
    'programs/academic-programs-catalog': { weight: 98, category: 'Program SEO' },
    'programs/program-specifications': { weight: 95, category: 'Program SEO' },
    
    // NEW Program Categories by Degree Level
    'programs/ba-business-economics': { weight: 92, category: 'Bachelor Programs' },
    'programs/ba-communication-studies': { weight: 92, category: 'Bachelor Programs' },
    'programs/ba-health-wellness': { weight: 92, category: 'Bachelor Programs' },
    'programs/ba-social-science': { weight: 92, category: 'Bachelor Programs' },
    'programs/ba-supply-chain-management': { weight: 92, category: 'Bachelor Programs' },
    'programs/ma-teaching-learning-technology': { weight: 90, category: 'Master Programs' },
    'programs/mps-leadership': { weight: 90, category: 'Master Programs' },
    'programs/dps-organizational-development-leadership': { weight: 88, category: 'Doctoral Programs' },
    
    // Guides & Best Practices
    'guides/': { weight: 90, category: 'Guides' },
    'guides/getting-started': { weight: 95, category: 'Guides' },
    'guides/seo-hygiene': { weight: 95, category: 'SEO Strategy' },
    'guides/glossary': { weight: 85, category: 'Guides' },
    'guides/checklist': { weight: 80, category: 'Guides' },
    
    // Analytics & Tracking
    'analytics-standards': { weight: 85, category: 'Analytics' },
    'ga4-setup-event-tracking': { weight: 83, category: 'Analytics' },
    'gtm-configuration-datalayer': { weight: 83, category: 'Analytics' },
    'digital-experience-enrollment-funnel': { weight: 80, category: 'Analytics' },
    'enrollment-funnel-kpis': { weight: 80, category: 'Analytics' },
    
    // SEO & Web Guidelines
    'canonical-links-url-taxonomy': { weight: 85, category: 'SEO' },
    'ui-ux-best-practices': { weight: 75, category: 'Design' },
    'wcag-compliance': { weight: 80, category: 'Accessibility' },
    'accessibility': { weight: 78, category: 'Accessibility' },
    'accessibility-checklist': { weight: 76, category: 'Accessibility' },
    
    // Development & Operations
    'development-workflows': { weight: 70, category: 'Development' },
    'day-to-day-ops': { weight: 68, category: 'Operations' },
    'common-tasks': { weight: 65, category: 'Operations' },
    'documentation-workflow': { weight: 65, category: 'Operations' },
    
    // Team & Process
    'who-does-what': { weight: 70, category: 'Team' },
    'asana': { weight: 65, category: 'Tools' },
    'content-updates': { weight: 63, category: 'Content' },
    'content-templates': { weight: 63, category: 'Content' },
    
    // Forms & Conversion
    'request-information-form': { weight: 75, category: 'Forms' },
    'user-consent-procedures': { weight: 70, category: 'Compliance' },
    'cookie-organization': { weight: 68, category: 'Compliance' },
    
    // Testing & QA
    'ab-testing': { weight: 60, category: 'Testing' },
    'growth-roadmap': { weight: 58, category: 'Strategy' },
    'why-this-exists': { weight: 55, category: 'About' },
    'recent-updates': { weight: 50, category: 'Updates' },
    'sitemap': { weight: 45, category: 'Navigation' },
    'keyboard_shortcuts': { weight: 40, category: 'Reference' }
  }
};

/**
 * Clean markdown content and extract readable text
 */
function cleanMarkdownContent(content) {
  return content
    // Remove frontmatter
    .replace(/^---[\s\S]*?---\n?/m, '')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove markdown headers (# ## ###)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove markdown links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Remove bold/italic markers
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove markdown list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove admonitions
    .replace(/:::[^:]*:::/g, '')
    .replace(/!!![^!]*!!!/g, '')
    // Clean up whitespace
    .replace(/\n\s*\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract content from markdown files with proper text cleaning
 */
function extractContentFromMarkdown(filePath, relativePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    let frontMatter = {};
    let contentStart = 0;
    
    // Parse frontmatter
    if (lines[0] === '---') {
      const frontMatterEnd = lines.findIndex((line, index) => index > 0 && line === '---');
      if (frontMatterEnd > 0) {
        const frontMatterLines = lines.slice(1, frontMatterEnd);
        frontMatterLines.forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length) {
            frontMatter[key.trim()] = valueParts.join(':').trim().replace(/['"]/g, '');
          }
        });
        contentStart = frontMatterEnd + 1;
      }
    }
    
    // Extract content sections with proper cleaning
    const contentLines = lines.slice(contentStart);
    const sections = [];
    let currentSection = { level: 0, title: '', content: '', anchor: '' };
    
    contentLines.forEach((line, index) => {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      
      if (headingMatch) {
        // Save previous section with cleaned content
        if (currentSection.title || currentSection.content) {
          currentSection.content = cleanMarkdownContent(currentSection.content);
          if (currentSection.content.length > 0) {
            sections.push({ ...currentSection });
          }
        }
        
        // Start new section with clean title
        const level = headingMatch[1].length;
        const title = cleanMarkdownContent(headingMatch[2]);
        const anchor = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        
        currentSection = {
          level,
          title,
          content: '',
          anchor
        };
      } else {
        // Add to current section content (will be cleaned later)
        if (line.trim() && !line.match(/^#{1,6}/)) {
          currentSection.content += line + ' ';
        }
      }
    });
    
    // Add final section with cleaned content
    if (currentSection.title || currentSection.content) {
      currentSection.content = cleanMarkdownContent(currentSection.content);
      if (currentSection.content.length > 0) {
        sections.push(currentSection);
      }
    }
    
    // Clean the full content
    const fullContent = cleanMarkdownContent(contentLines.join(' '));
    
    return {
      frontMatter,
      sections: sections.filter(section => section.title && section.content),
      relativePath: relativePath.replace(/\.md$/, ''),
      fullContent
    };
    
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

/**
 * Create Algolia records from extracted content
 */
function createAlgoliaRecords(docData) {
  const { frontMatter, sections, relativePath, fullContent } = docData;
  const records = [];
  
  // Get category info
  const categoryKey = Object.keys(DOCS_CONFIG.categories).find(key => 
    relativePath.includes(key) || relativePath === key.replace('/', '')
  );
  const categoryInfo = DOCS_CONFIG.categories[categoryKey] || { weight: 50, category: 'Documentation' };
  
  // Main page record
  const mainRecord = {
    objectID: relativePath,
    title: frontMatter.title || sections.find(s => s.level === 1)?.title || 'UAGC DX Documentation',
    content: fullContent.substring(0, 5000), // Limit content length
    url: `${DOCS_CONFIG.baseUrl}/${relativePath}`,
    category: categoryInfo.category,
    weight: categoryInfo.weight,
    type: 'page',
    hierarchy: {
      lvl0: categoryInfo.category,
      lvl1: frontMatter.title || sections.find(s => s.level === 1)?.title || 'UAGC DX Documentation'
    }
  };
  
  records.push(mainRecord);
  
  // Section records
  sections.forEach((section, index) => {
    if (section.title && section.content.trim()) {
      const sectionRecord = {
        objectID: `${relativePath}#${section.anchor}`,
        title: section.title,
        content: section.content.trim().substring(0, 2000),
        url: `${DOCS_CONFIG.baseUrl}/${relativePath}#${section.anchor}`,
        category: categoryInfo.category,
        weight: categoryInfo.weight - (section.level * 5), // Lower weight for deeper sections
        type: 'section',
        hierarchy: {
          lvl0: categoryInfo.category,
          lvl1: frontMatter.title || sections.find(s => s.level === 1)?.title || 'UAGC DX Documentation',
          [`lvl${section.level + 1}`]: section.title
        }
      };
      
      records.push(sectionRecord);
    }
  });
  
  return records;
}

/**
 * Scan documentation directory and create records
 */
async function indexDocumentation() {
  console.log('🚀 Starting Algolia indexing for UAGC DX Documentation...');
  
  const allRecords = [];
  
  function scanDirectory(dirPath, baseDir = '') {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      if (DOCS_CONFIG.excludeFiles.includes(item)) return;
      
      const fullPath = path.join(dirPath, item);
      const relativePath = path.join(baseDir, item);
      
      if (fs.statSync(fullPath).isDirectory()) {
        scanDirectory(fullPath, relativePath);
      } else if (item.endsWith('.md')) {
        console.log(`📄 Processing: ${relativePath}`);
        const docData = extractContentFromMarkdown(fullPath, relativePath);
        
        if (docData) {
          const records = createAlgoliaRecords(docData);
          allRecords.push(...records);
          console.log(`   ✅ Created ${records.length} records`);
        }
      }
    });
  }
  
  // Scan the documentation directory
  scanDirectory(DOCS_CONFIG.docsPath);
  
  console.log(`\n📊 Total records created: ${allRecords.length}`);
  
  // Upload to Algolia
  try {
    console.log('🔄 Uploading to Algolia...');
    
    // Clear existing index
    await index.clearObjects();
    console.log('🧹 Cleared existing index');
    
    // Upload new records
    const { objectIDs } = await index.saveObjects(allRecords);
    console.log(`✅ Successfully indexed ${objectIDs.length} records to Algolia`);
    
    // Configure index settings
    await index.setSettings({
      searchableAttributes: [
        'unordered(title)',
        'unordered(content)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy.lvl4)'
      ],
      ranking: [
        'words',
        'filters',
        'typo',
        'attribute',
        'proximity',
        'exact',
        'custom'
      ],
      customRanking: [
        'desc(weight)',
        'asc(type)'
      ],
      attributesForFaceting: [
        'category',
        'type'
      ],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false
    });
    
    console.log('⚙️  Index settings configured');
    
    console.log('\n🎉 Algolia indexing completed successfully!');
    console.log(`🔍 Your search is now available at: ${DOCS_CONFIG.baseUrl}`);
    
  } catch (error) {
    console.error('❌ Error uploading to Algolia:', error);
    process.exit(1);
  }
}

// Run the indexing process
if (require.main === module) {
  indexDocumentation().catch(error => {
    console.error('❌ Indexing failed:', error);
    process.exit(1);
  });
}

module.exports = { indexDocumentation };
