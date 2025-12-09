#!/usr/bin/env node

/**
 * Algolia Markdown Index Script for Ask AI
 * 
 * Creates an optimized markdown index for Algolia's Ask AI feature.
 * This index provides clean, chunked content for LLM context.
 * 
 * Usage: node scripts/index-algolia-markdown.js
 * 
 * @see https://docsearch.algolia.com/docs/v4/askai-markdown-indexing/
 */

const algoliasearch = require('algoliasearch');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION - DX Documentation
// ============================================
const CONFIG = {
  // Algolia credentials
  APP_ID: process.env.ALGOLIA_APP_ID || 'DRLUZYJNEF',
  WRITE_API_KEY: process.env.ALGOLIA_WRITE_API_KEY || 'd0c35d822324fc4e7ad70a3c7cfe5870', // Write API Key
  
  // Index names
  MAIN_INDEX: 'uagc-dx-documentation',
  MARKDOWN_INDEX: 'uagc-dx-documentation-markdown', // Dedicated index for Ask AI
  
  // Documentation config
  BASE_URL: 'https://omac049.github.io/uagc-dx-documentation',
  DOCS_PATH: './new-docs',
  
  // Chunking settings - Algolia free tier has 10KB limit per record
  MAX_RECORD_BYTES: 8000, // Keep under 10KB limit with room for metadata
  
  // Files to exclude
  EXCLUDE_FILES: ['.DS_Store', 'README.md', '404.md'],
};

// Initialize Algolia client
const client = algoliasearch(CONFIG.APP_ID, CONFIG.WRITE_API_KEY);
const markdownIndex = client.initIndex(CONFIG.MARKDOWN_INDEX);

/**
 * Convert markdown content to clean text suitable for LLM context
 */
function markdownToCleanText(content) {
  return content
    // Remove frontmatter
    .replace(/^---[\s\S]*?---\n?/m, '')
    // Remove code blocks but keep content description
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `[Code block${lang ? ` (${lang})` : ''}]: ${code.trim().substring(0, 200)}...`;
    })
    // Remove inline code but keep text
    .replace(/`([^`]+)`/g, '$1')
    // Convert markdown headers to text with hierarchy
    .replace(/^#{1,6}\s+(.+)$/gm, '\n$1\n')
    // Convert markdown links to text with URL
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    // Remove markdown images but keep alt text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Remove bold/italic markers
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Convert markdown list markers to text
    .replace(/^[\s]*[-*+]\s+/gm, '• ')
    .replace(/^[\s]*(\d+)\.\s+/gm, '$1. ')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove Docusaurus admonitions but keep content
    .replace(/:::(\w+)?\s*([\s\S]*?):::/g, '$2')
    // Clean up excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

/**
 * Extract frontmatter from markdown file
 */
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

/**
 * Extract the main heading from markdown content
 */
function extractMainHeading(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * Split text into records based on byte size
 * Similar to Algolia's helpers.splitTextIntoRecords
 */
function splitTextIntoRecords(text, baseRecord, maxBytes = CONFIG.MAX_RECORD_BYTES) {
  const records = [];
  const encoder = new TextEncoder();
  
  // Split by paragraphs first
  const paragraphs = text.split(/\n\n+/);
  let currentChunk = '';
  let partNumber = 0;
  
  for (const paragraph of paragraphs) {
    const testChunk = currentChunk ? `${currentChunk}\n\n${paragraph}` : paragraph;
    const bytes = encoder.encode(testChunk).length;
    
    if (bytes > maxBytes && currentChunk) {
      // Save current chunk and start new one
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
  
  // Add final chunk
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

/**
 * Process a single markdown file into Algolia records for Ask AI
 */
function processMarkdownFile(filePath, relativePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = extractFrontmatter(content);
    const cleanText = markdownToCleanText(content);
    
    if (!cleanText || cleanText.length < 50) {
      console.log(`   ⏭️  Skipping (too short): ${relativePath}`);
      return [];
    }
    
    // Build URL path
    const urlPath = relativePath
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '');
    
    const url = urlPath 
      ? `${CONFIG.BASE_URL}/${urlPath}`
      : CONFIG.BASE_URL;
    
    // Extract title
    const title = frontmatter.title || 
                  extractMainHeading(content) || 
                  path.basename(relativePath, '.md').replace(/-/g, ' ');
    
    // Get main heading for better searchability
    const h1 = extractMainHeading(content) || title;
    
    // Base record with metadata for Docusaurus
    const baseRecord = {
      url,
      objectID: urlPath || 'index',
      title,
      heading: h1,
      lang: 'en',
      language: 'en', // Required for Docusaurus faceting
      version: ['current'], // Docusaurus version
      docusaurus_tag: ['default', 'docs-default-current'], // Docusaurus tags
    };
    
    // Split into chunks for better Ask AI context
    const records = splitTextIntoRecords(cleanText, baseRecord);
    
    return records;
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Recursively scan documentation directory
 */
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
        // Recursively scan subdirectories
        const subRecords = scanDocsDirectory(fullPath, relativePath);
        allRecords.push(...subRecords);
      } else if (item.endsWith('.md')) {
        console.log(`📄 Processing: ${relativePath}`);
        const records = processMarkdownFile(fullPath, relativePath);
        
        if (records.length > 0) {
          allRecords.push(...records);
          console.log(`   ✅ Created ${records.length} record(s)`);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error scanning directory ${dirPath}:`, error.message);
  }
  
  return allRecords;
}

/**
 * Configure index settings optimized for Ask AI
 */
async function configureIndexSettings() {
  const settings = {
    // Faceting for filtering by language/version (Docusaurus requirement)
    attributesForFaceting: [
      'lang',
      'language',
      'version',
      'docusaurus_tag',
    ],
    
    // Search configuration
    searchableAttributes: [
      'title',
      'heading',
      'unordered(text)',
    ],
    
    // Typo tolerance settings
    ignorePlurals: true,
    minProximity: 1,
    removeStopWords: false,
    removeWordsIfNoResults: 'lastWords',
    typoTolerance: false,
    advancedSyntax: false,
    
    // Highlighting
    attributesToHighlight: ['title', 'text'],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
  };
  
  await markdownIndex.setSettings(settings);
  console.log('⚙️  Index settings configured for Ask AI');
}

/**
 * Main indexing function
 */
async function indexMarkdownForAskAI() {
  console.log('🚀 Starting Algolia Markdown Indexing for Ask AI...\n');
  console.log(`📁 Source: ${CONFIG.DOCS_PATH}`);
  console.log(`🔍 Index: ${CONFIG.MARKDOWN_INDEX}`);
  console.log(`🌐 Base URL: ${CONFIG.BASE_URL}\n`);
  
  // Check for API key
  if (CONFIG.WRITE_API_KEY === 'YOUR_WRITE_API_KEY') {
    console.error('❌ Error: ALGOLIA_WRITE_API_KEY environment variable not set');
    console.log('\n💡 Set your write API key:');
    console.log('   export ALGOLIA_WRITE_API_KEY="your-write-api-key"');
    console.log('   npm run index-markdown');
    process.exit(1);
  }
  
  // Scan and process all markdown files
  const allRecords = scanDocsDirectory(CONFIG.DOCS_PATH);
  
  console.log(`\n📊 Total records created: ${allRecords.length}`);
  
  if (allRecords.length === 0) {
    console.log('⚠️  No records to upload');
    return;
  }
  
  try {
    console.log('\n🔄 Uploading to Algolia...');
    
    // Clear existing index
    await markdownIndex.clearObjects();
    console.log('🧹 Cleared existing markdown index');
    
    // Upload records in batches
    const batchSize = 1000;
    for (let i = 0; i < allRecords.length; i += batchSize) {
      const batch = allRecords.slice(i, i + batchSize);
      await markdownIndex.saveObjects(batch);
      console.log(`   ✅ Uploaded batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allRecords.length / batchSize)}`);
    }
    
    // Configure index settings
    await configureIndexSettings();
    
    console.log('\n🎉 Markdown indexing completed successfully!');
    console.log(`\n📝 Next steps to enable Ask AI:`);
    console.log('   1. Go to your Algolia Dashboard');
    console.log('   2. Create an AI Assistant at https://dashboard.algolia.com/account/ai-assistants');
    console.log('   3. Note your Assistant ID');
    console.log('   4. Update docusaurus.config.js with your assistantId');
    console.log(`\n   Index name for Ask AI: ${CONFIG.MARKDOWN_INDEX}`);
    
  } catch (error) {
    console.error('\n❌ Error uploading to Algolia:', error.message);
    
    if (error.message.includes('Invalid Application-ID')) {
      console.log('\n💡 Check your ALGOLIA_APP_ID in the config');
    }
    if (error.message.includes('Invalid API key')) {
      console.log('\n💡 Make sure you\'re using a Write API key, not Search API key');
    }
    
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  indexMarkdownForAskAI().catch(error => {
    console.error('❌ Indexing failed:', error);
    process.exit(1);
  });
}

module.exports = { indexMarkdownForAskAI, CONFIG };
