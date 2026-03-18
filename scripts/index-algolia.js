#!/usr/bin/env node

/**
 * Algolia Index Script for UAGC DX Documentation
 * 
 * Produces DocSearch v4-compatible records so the Docusaurus
 * @docusaurus/theme-search-algolia integration renders results correctly.
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
  process.exit(1);
}

const client = algoliasearch(APP_ID, WRITE_API_KEY);

const DOCS_CONFIG = {
  baseUrl: 'https://omac049.github.io/uagc-dx-documentation',
  docsPath: './new-docs',
  excludeFiles: ['.DS_Store', 'README.md'],
  categories: {
    'getting-started': 'Getting Started',
    'index': 'Home',
    'how-to-use': 'Getting Started',
    'team-collaboration-guide': 'Getting Started',
    'programs/': 'Program SEO',
    'guides/': 'Guides',
    'guides/seo-hygiene': 'SEO Strategy',
    'analytics-standards': 'Analytics',
    'ga4-setup-event-tracking': 'Analytics',
    'gtm-configuration-datalayer': 'Analytics',
    'digital-experience-enrollment-funnel': 'Analytics',
    'enrollment-funnel-kpis': 'Analytics',
    'canonical-links-url-taxonomy': 'SEO',
    'ui-ux-best-practices': 'Design',
    'wcag-compliance': 'Accessibility',
    'accessibility': 'Accessibility',
    'accessibility-checklist': 'Accessibility',
    'development-workflows': 'Development',
    'day-to-day-ops': 'Operations',
    'common-tasks': 'Operations',
    'documentation-workflow': 'Operations',
    'who-does-what': 'Team',
    'asana': 'Tools',
    'content-updates': 'Content',
    'content-templates': 'Content',
    'request-information-form': 'Forms',
    'user-consent-procedures': 'Compliance',
    'cookie-organization': 'Compliance',
    'ab-testing': 'Testing',
    'growth-roadmap': 'Strategy',
    'why-this-exists': 'About',
    'recent-updates': 'Updates',
    'sitemap': 'Navigation',
    'keyboard_shortcuts': 'Reference',
  }
};

function getCategory(relativePath) {
  const match = Object.keys(DOCS_CONFIG.categories).find(key =>
    relativePath === key.replace('/', '') || relativePath.startsWith(key)
  );
  return match ? DOCS_CONFIG.categories[match] : 'Documentation';
}

function extractFrontmatter(content) {
  const fm = {};
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (match) {
    match[1].split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) {
        fm[key.trim()] = rest.join(':').trim().replace(/['"]/g, '');
      }
    });
  }
  return fm;
}

function cleanText(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    .replace(/<[^>]*>/g, '')
    .replace(/:::[^:]*:::/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Build DocSearch v4-compatible records from a markdown file.
 * 
 * DocSearch expects:
 * - type: "lvl0" | "lvl1" | "lvl2" | "lvl3" | "lvl4" | "lvl5" | "content"
 * - hierarchy: { lvl0, lvl1, lvl2, lvl3, lvl4, lvl5, lvl6 } (null for unused)
 * - url, url_without_anchor, anchor, content
 * - language, docusaurus_tag (for contextual search faceting)
 */
function buildRecords(filePath, relativePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = extractFrontmatter(raw);
  const body = raw.replace(/^---[\s\S]*?---\n?/, '');

  const slug = relativePath.replace(/\.md$/, '');
  const urlPath = slug.replace(/\/index$/, '').replace(/^index$/, '');
  const pageUrl = urlPath ? `${DOCS_CONFIG.baseUrl}/${urlPath}` : DOCS_CONFIG.baseUrl;

  const category = getCategory(slug);
  const lines = body.split('\n');

  let pageTitle = fm.title || null;
  const sections = [];
  let currentContent = [];

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.+)$/);
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    const h4 = line.match(/^####\s+(.+)$/);

    if (h1) {
      if (!pageTitle) pageTitle = cleanText(h1[1]);
      flushContent(sections, currentContent);
      currentContent = [];
      continue;
    }

    if (h2 || h3 || h4) {
      flushContent(sections, currentContent);
      currentContent = [];
      const level = h2 ? 2 : h3 ? 3 : 4;
      const title = cleanText((h2 || h3 || h4)[1]);
      sections.push({ level, title, anchor: slugify(title), content: [] });
      continue;
    }

    const trimmed = line.trim();
    if (trimmed && !trimmed.match(/^#{1,6}\s/)) {
      if (sections.length > 0) {
        sections[sections.length - 1].content.push(trimmed);
      } else {
        currentContent.push(trimmed);
      }
    }
  }
  flushContent(sections, currentContent);

  if (!pageTitle) {
    pageTitle = slug.split('/').pop().replace(/-/g, ' ');
    pageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  }

  const baseHierarchy = {
    lvl0: category,
    lvl1: pageTitle,
    lvl2: null,
    lvl3: null,
    lvl4: null,
    lvl5: null,
    lvl6: null,
  };

  const baseMeta = {
    language: 'en',
    docusaurus_tag: 'docs-default-current',
    'docusaurus_tag.0': 'docs-default-current',
  };

  const records = [];
  let position = 0;

  records.push({
    objectID: `${slug}-lvl1`,
    type: 'lvl1',
    url: pageUrl,
    url_without_anchor: pageUrl,
    anchor: null,
    content: null,
    hierarchy: { ...baseHierarchy },
    weight: { page_rank: 100, level: 90, position: position++ },
    ...baseMeta,
  });

  const introText = cleanText(currentContent.join(' '));
  if (introText.length > 30) {
    records.push({
      objectID: `${slug}-intro`,
      type: 'content',
      url: pageUrl,
      url_without_anchor: pageUrl,
      anchor: null,
      content: introText.substring(0, 3000),
      hierarchy: { ...baseHierarchy },
      weight: { page_rank: 90, level: 0, position: position++ },
      ...baseMeta,
    });
  }

  for (const section of sections) {
    const lvlKey = `lvl${section.level}`;
    const sectionHierarchy = { ...baseHierarchy, [lvlKey]: section.title };

    if (section.level === 3) sectionHierarchy.lvl2 = findParent(sections, section, 2);
    if (section.level === 4) {
      sectionHierarchy.lvl2 = findParent(sections, section, 2);
      sectionHierarchy.lvl3 = findParent(sections, section, 3);
    }

    const sectionUrl = `${pageUrl}#${section.anchor}`;

    records.push({
      objectID: `${slug}-${section.anchor}-${lvlKey}`,
      type: lvlKey,
      url: sectionUrl,
      url_without_anchor: pageUrl,
      anchor: section.anchor,
      content: null,
      hierarchy: sectionHierarchy,
      weight: { page_rank: 80, level: 90 - section.level * 10, position: position++ },
      ...baseMeta,
    });

    const sectionText = cleanText(section.content.join(' '));
    if (sectionText.length > 30) {
      records.push({
        objectID: `${slug}-${section.anchor}-content`,
        type: 'content',
        url: sectionUrl,
        url_without_anchor: pageUrl,
        anchor: section.anchor,
        content: sectionText.substring(0, 3000),
        hierarchy: sectionHierarchy,
        weight: { page_rank: 70, level: 0, position: position++ },
        ...baseMeta,
      });
    }
  }

  return records;
}

function flushContent(sections, buffer) {
  // nothing to do – content tracked separately
}

function findParent(sections, current, targetLevel) {
  const idx = sections.indexOf(current);
  for (let i = idx - 1; i >= 0; i--) {
    if (sections[i].level === targetLevel) return sections[i].title;
  }
  return null;
}

async function indexDocumentation() {
  console.log('Starting Algolia indexing (DocSearch v4 format)...');

  const allRecords = [];

  function scanDirectory(dirPath, baseDir = '') {
    for (const item of fs.readdirSync(dirPath)) {
      if (DOCS_CONFIG.excludeFiles.includes(item)) continue;

      const fullPath = path.join(dirPath, item);
      const relativePath = baseDir ? `${baseDir}/${item}` : item;

      if (fs.statSync(fullPath).isDirectory()) {
        scanDirectory(fullPath, relativePath);
      } else if (item.endsWith('.md')) {
        console.log(`  Processing: ${relativePath}`);
        const records = buildRecords(fullPath, relativePath);
        allRecords.push(...records);
        console.log(`    ${records.length} records`);
      }
    }
  }

  scanDirectory(DOCS_CONFIG.docsPath);
  console.log(`\nTotal records: ${allRecords.length}`);

  try {
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
          'unordered(hierarchy.lvl0)',
          'unordered(hierarchy.lvl1)',
          'unordered(hierarchy.lvl2)',
          'unordered(hierarchy.lvl3)',
          'unordered(hierarchy.lvl4)',
          'unordered(hierarchy.lvl5)',
          'unordered(hierarchy.lvl6)',
          'content',
        ],
        attributesToRetrieve: [
          'hierarchy',
          'content',
          'anchor',
          'url',
          'url_without_anchor',
          'type',
        ],
        attributesToHighlight: [
          'hierarchy',
          'content',
        ],
        attributesForFaceting: [
          'type',
          'language',
          'docusaurus_tag',
        ],
        ranking: [
          'words',
          'filters',
          'typo',
          'attribute',
          'proximity',
          'exact',
          'custom',
        ],
        customRanking: [
          'desc(weight.page_rank)',
          'desc(weight.level)',
          'asc(weight.position)',
        ],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
        minWordSizefor1Typo: 3,
        minWordSizefor2Typos: 7,
        allowTyposOnNumericTokens: false,
        distinct: true,
        attributeForDistinct: 'url',
      },
    });

    console.log('Index settings configured');
    console.log('\nIndexing completed successfully!');

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
