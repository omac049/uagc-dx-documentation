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

// Algolia configuration
const APP_ID = 'DRLUZYJNEF';
const WRITE_API_KEY = 'd0c35d822324fc4e7ad70a3c7cfe5870'; // Write API Key
const INDEX_NAME = 'uagc-dx-documentation';

// Initialize Algolia client
const client = algoliasearch(APP_ID, WRITE_API_KEY);
const index = client.initIndex(INDEX_NAME);

// Documentation structure mapping
const DOCS_CONFIG = {
  baseUrl: 'https://omac049.github.io/uagc-dx-documentation',
  docsPath: './new-docs',
  excludeFiles: ['.DS_Store', 'README.md'],
  categories: {
    'getting-started': { weight: 100, category: 'Getting Started' },
    'guides/': { weight: 90, category: 'Guides' },
    'analytics-standards': { weight: 85, category: 'Analytics' },
    'guides/seo-hygiene': { weight: 95, category: 'SEO Strategy' },
    'wcag-compliance': { weight: 80, category: 'Accessibility' },
    'ui-ux-best-practices': { weight: 75, category: 'Design' },
    'who-does-what': { weight: 70, category: 'Team' },
    'canonical-links-url-taxonomy': { weight: 85, category: 'SEO' }
  }
};

/**
 * Extract content from markdown files
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
    
    // Extract content sections
    const contentLines = lines.slice(contentStart);
    const sections = [];
    let currentSection = { level: 0, title: '', content: '', anchor: '' };
    
    contentLines.forEach((line, index) => {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      
      if (headingMatch) {
        // Save previous section
        if (currentSection.title || currentSection.content) {
          sections.push({ ...currentSection });
        }
        
        // Start new section
        const level = headingMatch[1].length;
        const title = headingMatch[2].replace(/[#*`]/g, '').trim();
        const anchor = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        
        currentSection = {
          level,
          title,
          content: '',
          anchor
        };
      } else {
        // Add to current section content
        if (line.trim()) {
          currentSection.content += line + ' ';
        }
      }
    });
    
    // Add final section
    if (currentSection.title || currentSection.content) {
      sections.push(currentSection);
    }
    
    return {
      frontMatter,
      sections,
      relativePath: relativePath.replace(/\.md$/, ''),
      fullContent: contentLines.join(' ').replace(/[#*`]/g, '').trim()
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
