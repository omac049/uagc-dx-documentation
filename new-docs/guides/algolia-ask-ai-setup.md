---
title: Algolia Ask AI Setup Guide
sidebar_label: Algolia Ask AI
description: How to set up and configure Algolia's Ask AI feature for intelligent documentation search
keywords: [algolia, ask ai, search, AI assistant, documentation]
---

# Algolia Ask AI Setup Guide

This guide explains how to configure and use Algolia's **Ask AI** feature for AI-powered documentation search.

:::tip What is Ask AI?
Ask AI combines traditional search with conversational AI, allowing users to ask natural language questions and receive intelligent, context-aware answers directly from your documentation.
:::

## Overview

Our documentation uses **DocSearch v4** with Ask AI integration:

| Component | Description |
|-----------|-------------|
| **Main Index** | `uagc-dx-documentation` - Standard search results |
| **Markdown Index** | `uagc-dx-documentation-markdown` - Optimized for Ask AI |
| **Application ID** | `DRLUZYJNEF` |

## Prerequisites

Before enabling Ask AI, you need:

1. ✅ An Algolia account with DocSearch access
2. ✅ Write API key (for indexing)
3. ⏳ **AI Assistant ID** (created in Algolia Dashboard)

## Step 1: Create an AI Assistant

1. Go to [Algolia Dashboard](https://dashboard.algolia.com/)
2. Navigate to **AI Assistants** (or search for "AI Assistants")
3. Click **Create Assistant**
4. Configure your assistant:
   - **Name**: UAGC DX Documentation Assistant
   - **Index**: `uagc-dx-documentation-markdown`
   - **Language**: English
5. Note your **Assistant ID** (looks like: `UpR727VnXnoG`)

## Step 2: Index Your Markdown Content

Run the markdown indexing script to create the AI-optimized index:

```bash
# Set your Write API key
export ALGOLIA_WRITE_API_KEY="your-write-api-key"

# Run the markdown indexer
npm run index-markdown
```

This creates a separate index optimized for LLM context with:
- Clean, chunked text content
- Proper metadata for filtering
- Docusaurus-specific facets

## Step 3: Enable Ask AI in Configuration

Update `docusaurus.config.js` to enable Ask AI:

```javascript
algolia: {
  appId: 'DRLUZYJNEF',
  apiKey: '023ae40f566d93964e26d0cd7bfb7acb',
  indexName: 'uagc-dx-documentation',
  contextualSearch: true,
  
  // Uncomment and configure:
  askAi: {
    indexName: 'uagc-dx-documentation-markdown',
    apiKey: '023ae40f566d93964e26d0cd7bfb7acb',
    appId: 'DRLUZYJNEF',
    assistantId: 'YOUR_ASSISTANT_ID', // ← Replace with your Assistant ID
    searchParameters: {
      facetFilters: ['language:en'],
    },
  },
},
```

## Step 4: Test the Integration

1. Run the development server:
   ```bash
   npm start
   ```

2. Open the search modal (`Cmd/Ctrl + K`)

3. Look for the **Ask AI** button or tab

4. Try asking a question like:
   - "How do I set up Google Analytics?"
   - "What are the SEO best practices?"
   - "How do I run a QA smoke test?"

## Indexing Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Main Index | `npm run index-algolia` | Standard DocSearch index |
| Markdown Index | `npm run index-markdown` | Ask AI optimized index |
| Both Indexes | `npm run search-index` | Build + index both |

## Configuration Reference

### Environment Variables

```bash
# Required for write operations
ALGOLIA_APP_ID=DRLUZYJNEF
ALGOLIA_WRITE_API_KEY=d0c35d822324fc4e7ad70a3c7cfe5870

# Optional overrides
ALGOLIA_INDEX_NAME=uagc-dx-documentation
ALGOLIA_MARKDOWN_INDEX=uagc-dx-documentation-markdown
```

### Index Settings

The markdown index is configured with:

```javascript
{
  attributesForFaceting: ['lang', 'language', 'version', 'docusaurus_tag'],
  searchableAttributes: ['title', 'heading', 'unordered(text)'],
  ignorePlurals: true,
  typoTolerance: false,
}
```

## Troubleshooting

### Search not showing results?

1. Verify the index exists in Algolia Dashboard
2. Check the API key has search permissions
3. Run `npm run index-algolia` to re-index

### Ask AI not appearing?

1. Ensure `askAi` config is uncommented in `docusaurus.config.js`
2. Verify the `assistantId` is correct
3. Check browser console for errors

### Index out of date?

```bash
# Full re-index
npm run build
npm run search-index
```

## Resources

- [DocSearch v4 Documentation](https://docsearch.algolia.com/docs/v4/)
- [Ask AI Markdown Indexing](https://docsearch.algolia.com/docs/v4/askai-markdown-indexing/)
- [Algolia Dashboard](https://dashboard.algolia.com/)
- [Ask AI API Reference](https://docsearch.algolia.com/docs/v4/askai-api-reference/)

---

:::info Need Help?
Contact the DX team if you need assistance with Algolia configuration or API keys.
:::
