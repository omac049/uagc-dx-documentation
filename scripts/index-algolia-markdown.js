#!/usr/bin/env node

/**
 * Algolia Markdown Index Script for Ask AI
 * 
 * Creates an optimized markdown index for Algolia's Ask AI feature.
 * Uses algoliasearch v5 API.
 * 
 * Usage: node scripts/index-algolia-markdown.js
 * 
 * @see https://docsearch.algolia.com/docs/v4/askai-markdown-indexing/
 */

require('dotenv').config();
const { algoliasearch } = require('algoliasearch');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  APP_ID: process.env.ALGOLIA_APP_ID || 'DRLUZYJNEF',
  WRITE_API_KEY: process.env.ALGOLIA_WRITE_API_KEY,
  
  MAIN_INDEX: 'uagc-dx-documentation',
  MARKDOWN_INDEX: 'uagc-dx-documentation-markdown',
  
  BASE_URL: 'https://omac049.github.io/uagc-dx-documentation',
  DOCS_PATH: './new-docs',
  
  MAX_RECORD_BYTES: 8000,
  EXCLUDE_FILES: ['.DS_Store', 'README.md', '404.md'],
};

const client = algoliasearch(CONFIG.APP_ID, CONFIG.WRITE_API_KEY);

function markdownToCleanText(content) {
  return content
    .replace(/^---[\s\S]*?---\n?/m, '')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `[Code block${lang ? ` (${lang})` : ''}]: ${code.trim().substring(0, 200)}...`;
    })
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#{1,6}\s+(.+)$/gm, '\n$1\n')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/^[\s]*[-*+]\s+/gm, '• ')
    .replace(/^[\s]*(\d+)\.\s+/gm, '$1. ')
    .replace(/<[^>]*>/g, '')
    .replace(/:::(\w+)?\s*([\s\S]*?):::/g, '$2')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function extractFrontmatter(content) {
  const frontmatter = {};
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (match) {
    const lines = match[1].split('\n');
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        frontmatter[key.trim()] = valueParts.join(':').trim().replace(/['"]/g, '');
      }
    });
  }
  
  return frontmatter;
}

function extractMainHeading(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function splitTextIntoRecords(text, baseRecord, maxBytes = CONFIG.MAX_RECORD_BYTES) {
  const records = [];
  const encoder = new TextEncoder();
  const paragraphs = text.split(/\n\n+/);
  let currentChunk = '';
  let partNumber = 0;
  
  for (const paragraph of paragraphs) {
    const testChunk = currentChunk ? `${currentChunk}\n\n${paragraph}` : paragraph;
    const bytes = encoder.encode(testChunk).length;
    
    if (bytes > maxBytes && currentChunk) {
      records.push({
        ...baseRecord,
        objectID: `${baseRecord.objectID}_part${partNumber}`,
        text: currentChunk.trim(),
        part: partNumber,
      });
      partNumber++;
      currentChunk = paragraph;
    } else {
      currentChunk = testChunk;
    }
  }
  
  if (currentChunk.trim()) {
    records.push({
      ...baseRecord,
      objectID: partNumber > 0 ? `${baseRecord.objectID}_part${partNumber}` : baseRecord.objectID,
      text: currentChunk.trim(),
      part: partNumber,
    });
  }
  
  return records;
}

function processMarkdownFile(filePath, relativePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = extractFrontmatter(content);
    const cleanText = markdownToCleanText(content);
    
    if (!cleanText || cleanText.length < 50) {
      console.log(`  Skipping (too short): ${relativePath}`);
      return [];
    }
    
    const urlPath = relativePath
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '');
    
    const url = urlPath 
      ? `${CONFIG.BASE_URL}/${urlPath}`
      : CONFIG.BASE_URL;
    
    const title = frontmatter.title || 
                  extractMainHeading(content) || 
                  path.basename(relativePath, '.md').replace(/-/g, ' ');
    
    const h1 = extractMainHeading(content) || title;
    
    const baseRecord = {
      url,
      objectID: urlPath || 'index',
      title,
      heading: h1,
      lang: 'en',
      language: 'en',
      version: ['current'],
      docusaurus_tag: ['default', 'docs-default-current'],
    };
    
    return splitTextIntoRecords(cleanText, baseRecord);
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return [];
  }
}

function scanDocsDirectory(dirPath, baseDir = '') {
  const allRecords = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      if (CONFIG.EXCLUDE_FILES.includes(item)) continue;
      
      const fullPath = path.join(dirPath, item);
      const relativePath = baseDir ? `${baseDir}/${item}` : item;
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        allRecords.push(...scanDocsDirectory(fullPath, relativePath));
      } else if (item.endsWith('.md')) {
        console.log(`  Processing: ${relativePath}`);
        const records = processMarkdownFile(fullPath, relativePath);
        
        if (records.length > 0) {
          allRecords.push(...records);
          console.log(`    Created ${records.length} record(s)`);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error.message);
  }
  
  return allRecords;
}

async function configureIndexSettings() {
  await client.setSettings({
    indexName: CONFIG.MARKDOWN_INDEX,
    indexSettings: {
      attributesForFaceting: [
        'lang',
        'language',
        'version',
        'docusaurus_tag',
      ],
      searchableAttributes: [
        'title',
        'heading',
        'unordered(text)',
      ],
      ignorePlurals: true,
      minProximity: 1,
      removeStopWords: false,
      removeWordsIfNoResults: 'lastWords',
      typoTolerance: false,
      advancedSyntax: false,
      attributesToHighlight: ['title', 'text'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
    },
  });
  console.log('Index settings configured for Ask AI');
}

async function indexMarkdownForAskAI() {
  console.log('Starting Algolia Markdown Indexing for Ask AI...\n');
  console.log(`Source: ${CONFIG.DOCS_PATH}`);
  console.log(`Index: ${CONFIG.MARKDOWN_INDEX}`);
  console.log(`Base URL: ${CONFIG.BASE_URL}\n`);
  
  if (!CONFIG.WRITE_API_KEY) {
    console.error('ALGOLIA_WRITE_API_KEY environment variable is required.');
    console.error('   Set it before running this script:');
    console.error('   export ALGOLIA_WRITE_API_KEY="your-write-api-key"');
    process.exit(1);
  }
  
  const allRecords = scanDocsDirectory(CONFIG.DOCS_PATH);
  
  console.log(`\nTotal records created: ${allRecords.length}`);
  
  if (allRecords.length === 0) {
    console.log('No records to upload');
    return;
  }
  
  try {
    console.log('\nUploading to Algolia...');
    
    await client.clearObjects({ indexName: CONFIG.MARKDOWN_INDEX });
    console.log('Cleared existing markdown index');
    
    const batchSize = 1000;
    for (let i = 0; i < allRecords.length; i += batchSize) {
      const batch = allRecords.slice(i, i + batchSize);
      await client.saveObjects({ indexName: CONFIG.MARKDOWN_INDEX, objects: batch });
      console.log(`  Uploaded batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allRecords.length / batchSize)}`);
    }
    
    await configureIndexSettings();
    
    console.log('\nMarkdown indexing completed successfully!');
    console.log(`\nIndex name for Ask AI: ${CONFIG.MARKDOWN_INDEX}`);
    
  } catch (error) {
    console.error('\nError uploading to Algolia:', error.message);
    
    if (error.message.includes('Invalid Application-ID')) {
      console.log('\nCheck your ALGOLIA_APP_ID in the config');
    }
    if (error.message.includes('Invalid API key')) {
      console.log('\nMake sure you\'re using a Write API key, not Search API key');
    }
    
    process.exit(1);
  }
}

if (require.main === module) {
  indexMarkdownForAskAI().catch(error => {
    console.error('Indexing failed:', error);
    process.exit(1);
  });
}

module.exports = { indexMarkdownForAskAI, CONFIG };
