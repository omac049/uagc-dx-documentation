#!/usr/bin/env node

/**
 * Auto-Update Recent Changes Script
 * 
 * This script automatically updates the recent-updates.md file based on 
 * recent git commits and documentation changes. It's designed to run
 * in CI/CD environments for automated maintenance.
 * 
 * Usage:
 *   node scripts/auto-update-recent.js [days-back] [--dry-run]
 */

const { execFileSync, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_DIR = 'new-docs/';
const RECENT_UPDATES_FILE = 'new-docs/recent-updates.md';
const DEFAULT_DAYS = 7; // Only look at very recent changes for automation
const MAX_ENTRIES_PER_DAY = 5; // Limit automated entries to avoid noise

// Enhanced category mapping with significance scoring
const CATEGORY_MAPPING = {
  'analytics': { icon: '📈', category: 'Analytics & Tracking', significance: 3 },
  'accessibility': { icon: '♿', category: 'Accessibility Updates', significance: 3 },
  'ga4': { icon: '📈', category: 'Analytics & Tracking', significance: 3 },
  'gtm': { icon: '📈', category: 'Analytics & Tracking', significance: 3 },
  'rfi': { icon: '📋', category: 'Content Enhancement', significance: 3 },
  'request-information': { icon: '📋', category: 'Content Enhancement', significance: 3 },
  'program': { icon: '📊', category: 'Program Documentation', significance: 3 },
  'enrollment': { icon: '📊', category: 'Program Documentation', significance: 3 },
  'seo': { icon: '🔍', category: 'SEO & Content', significance: 3 },
  'canonical': { icon: '🔍', category: 'SEO & Content', significance: 3 },
  'sitemap': { icon: '🔍', category: 'SEO & Content', significance: 3 },
  'workflow': { icon: '🔧', category: 'Documentation Maintenance', significance: 2 },
  'process': { icon: '🚀', category: 'Process Improvements', significance: 2 },
  'fix': { icon: '🐛', category: 'Bug Fixes', significance: 2 },
  'security': { icon: '🔒', category: 'Security & Compliance', significance: 4 },
  'privacy': { icon: '🔒', category: 'Security & Compliance', significance: 4 },
  'compliance': { icon: '🔒', category: 'Security & Compliance', significance: 4 },
  'ui': { icon: '🎨', category: 'UI/UX Updates', significance: 2 },
  'ux': { icon: '🎨', category: 'UI/UX Updates', significance: 2 },
  'automation': { icon: '🤖', category: 'Automation & Scripts', significance: 3 },
  'script': { icon: '🤖', category: 'Automation & Scripts', significance: 2 },
  'feat': { icon: '🚀', category: 'Process Improvements', significance: 3 },
  'enhancement': { icon: '📋', category: 'Content Enhancement', significance: 3 }
};

// Patterns to exclude from automated updates (too minor or automated)
const EXCLUDE_PATTERNS = [
  /^docs?:/i,
  /^update.*timestamp/i,
  /^automated.*update/i,
  /typo/i,
  /formatting/i,
  /whitespace/i,
  /\[skip-updates\]/i,
  /\[automated-update\]/i,
  /merge branch/i,
  /minor.*fix/i
];

function getGitCommits(daysPast) {
  try {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - daysPast);
    const dateString = sinceDate.toISOString().split('T')[0];
    
    const output = execFileSync('git', [
      'log', `--since=${dateString}`, '--pretty=format:%h|%an|%ad|%s', '--date=short', '--', DOCS_DIR
    ], { encoding: 'utf8' });
    
    if (!output.trim()) return [];
    
    return output.trim().split('\n').map(line => {
      const [hash, author, date, message] = line.split('|');
      return { hash, author, date, message };
    }).filter(commit => {
      return !EXCLUDE_PATTERNS.some(pattern => pattern.test(commit.message));
    });
  } catch (error) {
    console.error('Error getting git commits:', error.message);
    return [];
  }
}

function getChangedFiles(daysPast) {
  try {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - daysPast);
    const dateString = sinceDate.toISOString().split('T')[0];
    
    const gitOutput = execFileSync('git', [
      'log', `--since=${dateString}`, '--name-only', '--pretty=format:', '--', DOCS_DIR
    ], { encoding: 'utf8' });
    
    const files = gitOutput.trim().split('\n').filter(f => f.length > 0);
    return [...new Set(files)].sort();
  } catch (error) {
    console.error('Error getting changed files:', error.message);
    return [];
  }
}

function categorizeUpdate(message, filepath) {
  const text = (message + ' ' + filepath).toLowerCase();
  let bestMatch = { icon: '📋', category: 'Content Enhancement', significance: 1 };
  
  for (const [keyword, config] of Object.entries(CATEGORY_MAPPING)) {
    if (text.includes(keyword)) {
      if (config.significance > bestMatch.significance) {
        bestMatch = config;
      }
    }
  }
  
  return bestMatch;
}

function shouldIncludeCommit(commit) {
  const category = categorizeUpdate(commit.message, '');
  
  // Only include commits with significance >= 2
  if (category.significance < 2) return false;
  
  // Additional filters for quality
  if (commit.message.length < 10) return false; // Too short
  if (commit.message.toLowerCase().includes('wip')) return false; // Work in progress
  
  return true;
}

function generateSmartDescription(commit) {
  let message = commit.message;
  
  // Clean up commit message
  message = message.replace(/^(feat|fix|docs|style|refactor|test|chore):\s*/i, '');
  message = message.charAt(0).toUpperCase() + message.slice(1);
  
  // Add smart descriptions based on content
  if (message.toLowerCase().includes('analytics') || message.toLowerCase().includes('ga4')) {
    return `${message} - Enhanced tracking capabilities and analytics implementation`;
  }
  
  if (message.toLowerCase().includes('seo') || message.toLowerCase().includes('sitemap')) {
    return `${message} - Improved search engine optimization and discoverability`;
  }
  
  if (message.toLowerCase().includes('accessibility') || message.toLowerCase().includes('a11y')) {
    return `${message} - Enhanced accessibility compliance and user experience`;
  }
  
  if (message.toLowerCase().includes('security') || message.toLowerCase().includes('privacy')) {
    return `${message} - Strengthened security measures and privacy compliance`;
  }
  
  if (message.toLowerCase().includes('automation') || message.toLowerCase().includes('workflow')) {
    return `${message} - Improved development workflow and automation processes`;
  }
  
  return `${message} - Updated documentation with latest changes and improvements`;
}

function readCurrentRecentUpdates() {
  try {
    return fs.readFileSync(RECENT_UPDATES_FILE, 'utf8');
  } catch (error) {
    console.error('Error reading recent updates file:', error.message);
    return '';
  }
}

function insertNewEntries(content, newEntries) {
  if (newEntries.length === 0) return content;
  
  const lines = content.split('\n');
  const currentMonth = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  
  // Find insertion point (after the current month header or create it)
  let insertIndex = -1;
  let monthExists = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(`## ${currentMonth}`)) {
      monthExists = true;
      insertIndex = i + 1;
      break;
    }
    // If we hit an older month, insert before it
    if (lines[i].startsWith('## ') && i > 10) { // Skip header sections
      insertIndex = i;
      break;
    }
  }
  
  // If no month found, insert after the info box
  if (insertIndex === -1) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(':::')) {
        insertIndex = i + 2;
        break;
      }
    }
  }
  
  // Insert new content
  const newContent = [];
  
  if (!monthExists) {
    newContent.push(`## ${currentMonth}`, '');
  }
  
  newContent.push(...newEntries, '');
  
  lines.splice(insertIndex, 0, ...newContent);
  
  return lines.join('\n');
}

function generateNewEntries(commits) {
  if (commits.length === 0) return [];
  
  const grouped = commits.reduce((acc, commit) => {
    if (!acc[commit.date]) acc[commit.date] = [];
    acc[commit.date].push(commit);
    return acc;
  }, {});
  
  const entries = [];
  
  // Sort dates in descending order
  const sortedDates = Object.keys(grouped).sort().reverse();
  
  sortedDates.forEach(date => {
    const dateCommits = grouped[date].slice(0, MAX_ENTRIES_PER_DAY);
    
    const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    entries.push(`### ${formattedDate}`);
    
    // Group by category
    const categorized = {};
    dateCommits.forEach(commit => {
      const category = categorizeUpdate(commit.message, '');
      const key = `${category.icon} ${category.category}`;
      
      if (!categorized[key]) categorized[key] = [];
      categorized[key].push(commit);
    });
    
    // Add categorized entries
    Object.entries(categorized).forEach(([categoryLabel, items]) => {
      entries.push(`**${categoryLabel}**`);
      
      items.forEach(item => {
        const description = generateSmartDescription(item);
        entries.push(`- **${description}**`);
      });
      
      entries.push(''); // Blank line between categories
    });
  });
  
  return entries;
}

function updateLastModifiedTimestamp(content) {
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Update the "Last Generated" line at the bottom
  const lines = content.split('\n');
  const lastLines = lines.slice(-10); // Check last 10 lines
  
  for (let i = lastLines.length - 1; i >= 0; i--) {
    if (lastLines[i].includes('**Last Generated:**')) {
      lines[lines.length - 10 + i] = `**Last Generated:** ${timestamp}`;
      break;
    }
  }
  
  return lines.join('\n');
}

function main() {
  const isDryRun = process.argv.includes('--dry-run');
  const rawDays = parseInt(process.argv[2], 10);
  const daysPast = (Number.isFinite(rawDays) && rawDays > 0) ? Math.min(rawDays, 365) : DEFAULT_DAYS;
  
  console.log(`🔍 Analyzing documentation changes from the last ${daysPast} days...`);
  if (isDryRun) console.log('🧪 DRY RUN MODE - No files will be modified');
  
  // Get commits and filter them
  const allCommits = getGitCommits(daysPast);
  const significantCommits = allCommits.filter(shouldIncludeCommit);
  
  console.log(`📊 Found ${allCommits.length} total commits, ${significantCommits.length} significant`);
  
  if (significantCommits.length === 0) {
    console.log('✅ No significant changes to add to recent updates');
    return;
  }
  
  // Read current content
  const currentContent = readCurrentRecentUpdates();
  if (!currentContent) {
    console.error('❌ Could not read recent updates file');
    return;
  }
  
  // Generate new entries
  const newEntries = generateNewEntries(significantCommits);
  
  if (newEntries.length === 0) {
    console.log('✅ No new entries generated');
    return;
  }
  
  console.log(`📝 Generated ${newEntries.length} new entry lines`);
  
  // Insert new entries
  let updatedContent = insertNewEntries(currentContent, newEntries);
  
  // Update timestamp
  updatedContent = updateLastModifiedTimestamp(updatedContent);
  
  if (isDryRun) {
    console.log('\n🧪 DRY RUN - Would add these entries:');
    console.log('---');
    newEntries.slice(0, 10).forEach(line => console.log(line)); // Show first 10 lines
    if (newEntries.length > 10) console.log(`... and ${newEntries.length - 10} more lines`);
    console.log('---');
  } else {
    // Write updated content
    fs.writeFileSync(RECENT_UPDATES_FILE, updatedContent);
    console.log(`✅ Updated ${RECENT_UPDATES_FILE} with new entries`);
    
    // Log what was added
    console.log('\n📋 Added entries:');
    significantCommits.forEach(commit => {
      const category = categorizeUpdate(commit.message, '');
      console.log(`  ${category.icon} ${commit.date}: ${commit.message}`);
    });
  }
  
  console.log('\n🎉 Auto-update process completed successfully');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  getGitCommits,
  categorizeUpdate,
  shouldIncludeCommit,
  generateNewEntries
};
