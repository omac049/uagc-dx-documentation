#!/usr/bin/env node

/**
 * Algolia Index Script for UAGC DX Documentation
 * 
 * Indexes documentation content to Algolia for search functionality.
 * Uses algoliasearch v5 API.
 * 
 * Usage: node scripts/index-algolia.js
 */

require('dotenv').config();
const { algoliasearch } = require('algoliasearch');
const fs = require('fs');
const path = require('path');

const APP_ID = process.env.ALGOLIA_APP_ID || 'DRLUZYJNEF';
const WRITE_API_KEY = process.env.ALGOLIA_WRITE_API_KEY;
const INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || 'uagc-dx-documentation';

if (!WRITE_API_KEY) {
  console.error('ALGOLIA_WRITE_API_KEY environment variable is required.');
  console.error('   Set it before running this script:');
  console.error('   export ALGOLIA_WRITE_API_KEY="your-write-api-key"');
  process.exit(1);
}

const client = algoliasearch(APP_ID, WRITE_API_KEY);

const DOCS_CONFIG = {
  baseUrl: 'https://omac049.github.io/uagc-dx-documentation',
  docsPath: './new-docs',
  excludeFiles: ['.DS_Store', 'README.md'],
  categories: {
    'getting-started': { weight: 100, category: 'Getting Started' },
    'index': { weight: 95, category: 'Home' },
    'how-to-use': { weight: 90, category: 'Getting Started' },
    'team-collaboration-guide': { weight: 85, category: 'Getting Started' },
    
    'programs/': { weight: 95, category: 'Program SEO' },
    'programs/index': { weight: 100, category: 'Program SEO' },
    'programs/academic-programs-catalog': { weight: 98, category: 'Program SEO' },
    'programs/program-specifications': { weight: 95, category: 'Program SEO' },
    
    'programs/ba-business-economics': { weight: 92, category: 'Bachelor Programs' },
    'programs/ba-communication-studies': { weight: 92, category: 'Bachelor Programs' },
    'programs/ba-health-wellness': { weight: 92, category: 'Bachelor Programs' },
    'programs/ba-social-science': { weight: 92, category: 'Bachelor Programs' },
    'programs/ba-supply-chain-management': { weight: 92, category: 'Bachelor Programs' },
    'programs/ma-teaching-learning-technology': { weight: 90, category: 'Master Programs' },
    'programs/mps-leadership': { weight: 90, category: 'Master Programs' },
    'programs/dps-organizational-development-leadership': { weight: 88, category: 'Doctoral Programs' },
    
    'guides/': { weight: 90, category: 'Guides' },
    'guides/getting-started': { weight: 95, category: 'Guides' },
    'guides/seo-hygiene': { weight: 95, category: 'SEO Strategy' },
    'guides/glossary': { weight: 85, category: 'Guides' },
    'guides/checklist': { weight: 80, category: 'Guides' },
    
    'analytics-standards': { weight: 85, category: 'Analytics' },
    'ga4-setup-event-tracking': { weight: 83, category: 'Analytics' },
    'gtm-configuration-datalayer': { weight: 83, category: 'Analytics' },
    'digital-experience-enrollment-funnel': { weight: 80, category: 'Analytics' },
    'enrollment-funnel-kpis': { weight: 80, category: 'Analytics' },
    
    'canonical-links-url-taxonomy': { weight: 85, category: 'SEO' },
    'ui-ux-best-practices': { weight: 75, category: 'Design' },
    'wcag-compliance': { weight: 80, category: 'Accessibility' },
    'accessibility': { weight: 78, category: 'Accessibility' },
    'accessibility-checklist': { weight: 76, category: 'Accessibility' },
    
    'development-workflows': { weight: 70, category: 'Development' },
    'day-to-day-ops': { weight: 68, category: 'Operations' },
    'common-tasks': { weight: 65, category: 'Operations' },
    'documentation-workflow': { weight: 65, category: 'Operations' },
    
    'who-does-what': { weight: 70, category: 'Team' },
    'asana': { weight: 65, category: 'Tools' },
    'content-updates': { weight: 63, category: 'Content' },
    'content-templates': { weight: 63, category: 'Content' },
    
    'request-information-form': { weight: 75, category: 'Forms' },
    'user-consent-procedures': { weight: 70, category: 'Compliance' },
    'cookie-organization': { weight: 68, category: 'Compliance' },
    
    'ab-testing': { weight: 60, category: 'Testing' },
    'growth-roadmap': { weight: 58, category: 'Strategy' },
    'why-this-exists': { weight: 55, category: 'About' },
    'recent-updates': { weight: 50, category: 'Updates' },
    'sitemap': { weight: 45, category: 'Navigation' },
    'keyboard_shortcuts': { weight: 40, category: 'Reference' }
  }
};

function cleanMarkdownContent(content) {
  return content
    .replace(/^---[\s\S]*?---\n?/m, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    .replace(/<[^>]*>/g, '')
    .replace(/:::[^:]*:::/g, '')
    .replace(/!!![^!]*!!!/g, '')
    .replace(/\n\s*\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractContentFromMarkdown(filePath, relativePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    let frontMatter = {};
    let contentStart = 0;
    
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
    
    const contentLines = lines.slice(contentStart);
    const sections = [];
    let currentSection = { level: 0, title: '', content: '', anchor: '' };
    
    contentLines.forEach((line) => {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      
      if (headingMatch) {
        if (currentSection.title || currentSection.content) {
          currentSection.content = cleanMarkdownContent(currentSection.content);
          if (currentSection.content.length > 0) {
            sections.push({ ...currentSection });
          }
        }
        
        const level = headingMatch[1].length;
        const title = cleanMarkdownContent(headingMatch[2]);
        const anchor = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        
        currentSection = { level, title, content: '', anchor };
      } else {
        if (line.trim() && !line.match(/^#{1,6}/)) {
          currentSection.content += line + ' ';
        }
      }
    });
    
    if (currentSection.title || currentSection.content) {
      currentSection.content = cleanMarkdownContent(currentSection.content);
      if (currentSection.content.length > 0) {
        sections.push(currentSection);
      }
    }
    
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

function createAlgoliaRecords(docData) {
  const { frontMatter, sections, relativePath, fullContent } = docData;
  const records = [];
  
  const categoryKey = Object.keys(DOCS_CONFIG.categories).find(key => 
    relativePath.includes(key) || relativePath === key.replace('/', '')
  );
  const categoryInfo = DOCS_CONFIG.categories[categoryKey] || { weight: 50, category: 'Documentation' };
  
  const mainRecord = {
    objectID: relativePath,
    title: frontMatter.title || sections.find(s => s.level === 1)?.title || 'UAGC DX Documentation',
    content: fullContent.substring(0, 5000),
    url: `${DOCS_CONFIG.baseUrl}/${relativePath}`,
    category: categoryInfo.category,
    weight: categoryInfo.weight,
    type: 'page',
    lang: 'en',
    language: 'en',
    version: ['current'],
    docusaurus_tag: ['default', 'docs-default-current'],
    hierarchy: {
      lvl0: categoryInfo.category,
      lvl1: frontMatter.title || sections.find(s => s.level === 1)?.title || 'UAGC DX Documentation'
    }
  };
  
  records.push(mainRecord);
  
  sections.forEach((section) => {
    if (section.title && section.content.trim()) {
      const sectionRecord = {
        objectID: `${relativePath}#${section.anchor}`,
        title: section.title,
        content: section.content.trim().substring(0, 2000),
        url: `${DOCS_CONFIG.baseUrl}/${relativePath}#${section.anchor}`,
        category: categoryInfo.category,
        weight: categoryInfo.weight - (section.level * 5),
        type: 'section',
        lang: 'en',
        language: 'en',
        version: ['current'],
        docusaurus_tag: ['default', 'docs-default-current'],
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

async function indexDocumentation() {
  console.log('Starting Algolia indexing for UAGC DX Documentation...');
  
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
        console.log(`  Processing: ${relativePath}`);
        const docData = extractContentFromMarkdown(fullPath, relativePath);
        
        if (docData) {
          const records = createAlgoliaRecords(docData);
          allRecords.push(...records);
          console.log(`    Created ${records.length} records`);
        }
      }
    });
  }
  
  scanDirectory(DOCS_CONFIG.docsPath);
  
  console.log(`\nTotal records created: ${allRecords.length}`);
  
  try {
    console.log('Uploading to Algolia...');
    
    await client.clearObjects({ indexName: INDEX_NAME });
    console.log('Cleared existing index');
    
    const batchSize = 1000;
    for (let i = 0; i < allRecords.length; i += batchSize) {
      const batch = allRecords.slice(i, i + batchSize);
      await client.saveObjects({ indexName: INDEX_NAME, objects: batch });
      console.log(`  Uploaded batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allRecords.length / batchSize)}`);
    }
    
    await client.setSettings({
      indexName: INDEX_NAME,
      indexSettings: {
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
          'type',
          'lang',
          'language',
          'version',
          'docusaurus_tag'
        ],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
        minWordSizefor1Typo: 3,
        minWordSizefor2Typos: 7,
        allowTyposOnNumericTokens: false,
      },
    });
    
    console.log('Index settings configured');
    console.log('\nAlgolia indexing completed successfully!');
    console.log(`Search available at: ${DOCS_CONFIG.baseUrl}`);
    
  } catch (error) {
    console.error('Error uploading to Algolia:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  indexDocumentation().catch(error => {
    console.error('Indexing failed:', error);
    process.exit(1);
  });
}

module.exports = { indexDocumentation };
