#!/usr/bin/env node

/**
 * Generate Recent Updates Helper Script
 * 
 * This script helps generate entries for the recent-updates.md file
 * by analyzing git history and file changes.
 * 
 * Usage:
 *   node scripts/generate-updates.js [days-back]
 *   
 * Example:
 *   node scripts/generate-updates.js 30  # Last 30 days
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_DIR = 'new-docs/';
const OUTPUT_FILE = 'recent-updates-draft.md';
const DEFAULT_DAYS = 30;

// Category mapping based on file paths and commit messages
const CATEGORY_MAPPING = {
  'analytics': { icon: '📈', category: 'Analytics & Tracking' },
  'accessibility': { icon: '♿', category: 'Accessibility Updates' },
  'ga4': { icon: '📈', category: 'Analytics & Tracking' },
  'gtm': { icon: '📈', category: 'Analytics & Tracking' },
  'rfi': { icon: '📋', category: 'Content Enhancement' },
  'request-information': { icon: '📋', category: 'Content Enhancement' },
  'program': { icon: '📊', category: 'Program Documentation' },
  'enrollment': { icon: '📊', category: 'Program Documentation' },
  'seo': { icon: '🔍', category: 'SEO & Content' },
  'workflow': { icon: '🔧', category: 'Documentation Maintenance' },
  'fix': { icon: '🐛', category: 'Bug Fixes' },
  'security': { icon: '🔒', category: 'Security & Compliance' },
  'ui': { icon: '🎨', category: 'UI/UX Updates' },
  'ux': { icon: '🎨', category: 'UI/UX Updates' }
};

function getGitCommits(daysPast) {
  try {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - daysPast);
    const dateString = sinceDate.toISOString().split('T')[0];
    
    const command = `git log --since="${dateString}" --pretty=format:"%h|%an|%ad|%s" --date=short -- ${DOCS_DIR}`;
    const output = execSync(command, { encoding: 'utf8' });
    
    return output.trim().split('\n').filter(line => line.length > 0).map(line => {
      const [hash, author, date, message] = line.split('|');
      return { hash, author, date, message };
    });
  } catch (error) {
    console.error('Error getting git commits:', error.message);
    return [];
  }
}

function getModifiedFiles(daysPast) {
  try {
    const command = `find ${DOCS_DIR} -name "*.md" -mtime -${daysPast} -type f`;
    const output = execSync(command, { encoding: 'utf8' });
    
    return output.trim().split('\n').filter(file => file.length > 0);
  } catch (error) {
    console.error('Error getting modified files:', error.message);
    return [];
  }
}

function categorizeUpdate(message, filepath) {
  const text = (message + ' ' + filepath).toLowerCase();
  
  for (const [keyword, config] of Object.entries(CATEGORY_MAPPING)) {
    if (text.includes(keyword)) {
      return config;
    }
  }
  
  // Default category
  return { icon: '📋', category: 'Content Enhancement' };
}

function groupCommitsByDate(commits) {
  const grouped = {};
  
  commits.forEach(commit => {
    if (!grouped[commit.date]) {
      grouped[commit.date] = [];
    }
    grouped[commit.date].push(commit);
  });
  
  return grouped;
}

function generateUpdateEntries(commits, modifiedFiles) {
  const grouped = groupCommitsByDate(commits);
  const entries = [];
  
  // Sort dates in descending order
  const sortedDates = Object.keys(grouped).sort().reverse();
  
  sortedDates.forEach(date => {
    const dateCommits = grouped[date];
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    entries.push(`### ${formattedDate}`);
    
    // Group commits by category
    const categorized = {};
    dateCommits.forEach(commit => {
      const category = categorizeUpdate(commit.message, '');
      const key = `${category.icon} ${category.category}`;
      
      if (!categorized[key]) {
        categorized[key] = [];
      }
      
      categorized[key].push({
        title: commit.message,
        hash: commit.hash,
        author: commit.author
      });
    });
    
    // Output categorized entries
    Object.entries(categorized).forEach(([categoryLabel, items]) => {
      entries.push(`**${categoryLabel}**`);
      
      items.forEach(item => {
        // Clean up commit message for display
        let title = item.title;
        
        // Remove common prefixes
        title = title.replace(/^(feat|fix|docs|style|refactor|test|chore):\s*/i, '');
        title = title.charAt(0).toUpperCase() + title.slice(1);
        
        // Add entry
        entries.push(`- **${title}**: [Add description of impact and changes]`);
      });
      
      entries.push(''); // Add blank line between categories
    });
  });
  
  return entries;
}

function generateDraftFile(entries, daysPast) {
  const header = `# Recent Updates Draft

This file was automatically generated on ${new Date().toLocaleDateString()}.
Based on git commits from the last ${daysPast} days.

**Instructions:**
1. Review each entry below
2. Add detailed descriptions where noted
3. Remove entries that are too minor for recent updates
4. Copy relevant entries to new-docs/recent-updates.md
5. Delete this draft file when done

---

`;

  const content = header + entries.join('\n');
  
  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(`Draft updates written to: ${OUTPUT_FILE}`);
}

function main() {
  const daysPast = parseInt(process.argv[2]) || DEFAULT_DAYS;
  
  console.log(`Analyzing documentation changes from the last ${daysPast} days...`);
  
  // Get git commits
  const commits = getGitCommits(daysPast);
  console.log(`Found ${commits.length} commits in documentation files.`);
  
  // Get modified files
  const modifiedFiles = getModifiedFiles(daysPast);
  console.log(`Found ${modifiedFiles.length} recently modified files.`);
  
  if (commits.length === 0) {
    console.log('No recent commits found. Nothing to generate.');
    return;
  }
  
  // Generate entries
  const entries = generateUpdateEntries(commits, modifiedFiles);
  
  // Write draft file
  generateDraftFile(entries, daysPast);
  
  console.log('\nNext steps:');
  console.log('1. Review the generated draft file');
  console.log('2. Edit and enhance the descriptions');
  console.log('3. Copy relevant entries to new-docs/recent-updates.md');
  console.log('4. Remove the draft file when done');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  getGitCommits,
  getModifiedFiles,
  categorizeUpdate,
  generateUpdateEntries
};
