#!/usr/bin/env node

/**
 * Timestamp Manager Script
 * 
 * Manages timestamps across documentation files for consistency and automation.
 * 
 * Usage:
 *   node scripts/timestamp-manager.js <command> [options]
 *   
 * Commands:
 *   validate    - Check for outdated timestamps and review dates
 *   update      - Update specific file timestamps
 *   report      - Generate timestamp status report
 *   schedule    - Show upcoming review schedules
 * 
 * Examples:
 *   node scripts/timestamp-manager.js validate
 *   node scripts/timestamp-manager.js update --file recent-updates.md
 *   node scripts/timestamp-manager.js report --format json
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_DIR = 'new-docs/';
const TIMESTAMP_CONFIG_FILE = 'timestamp-config.json';
const OUTPUT_DIR = 'timestamp-reports/';

// Default configuration
const DEFAULT_CONFIG = {
  reviewCycles: {
    quarterly: 90,
    monthly: 30,
    weekly: 7
  },
  warningThresholds: {
    overdue: 0,
    nearDue: 7,
    stale: 180
  },
  timestampFormats: {
    display: { year: 'numeric', month: 'long', day: 'numeric' },
    iso: { year: 'numeric', month: '2-digit', day: '2-digit' },
    full: { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }
  }
};

function loadConfig() {
  try {
    if (fs.existsSync(TIMESTAMP_CONFIG_FILE)) {
      const config = JSON.parse(fs.readFileSync(TIMESTAMP_CONFIG_FILE, 'utf8'));
      return { ...DEFAULT_CONFIG, ...config };
    }
  } catch (error) {
    console.warn('⚠️  Warning: Could not load timestamp config, using defaults');
  }
  return DEFAULT_CONFIG;
}

function saveConfig(config) {
  try {
    fs.writeFileSync(TIMESTAMP_CONFIG_FILE, JSON.stringify(config, null, 2));
    console.log('✅ Configuration saved');
  } catch (error) {
    console.error('❌ Error saving configuration:', error.message);
  }
}

function formatDate(date, format = 'display') {
  const config = loadConfig();
  const formatOptions = config.timestampFormats[format] || config.timestampFormats.display;
  return date.toLocaleDateString('en-US', formatOptions);
}

function parseMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const timestamps = [];
    
    // Extract dates from markdown headers
    const headerRegex = /^###?\s+(.+?\d{4})/gm;
    let match;
    while ((match = headerRegex.exec(content)) !== null) {
      const dateString = match[1];
      const parsedDate = new Date(dateString);
      if (!isNaN(parsedDate.getTime())) {
        timestamps.push({
          type: 'header',
          original: dateString,
          parsed: parsedDate,
          line: content.substr(0, match.index).split('\n').length
        });
      }
    }
    
    // Extract review dates
    const reviewRegex = /Next.*?Review.*?:.*?([A-Za-z]+ \d+, \d{4})/gi;
    while ((match = reviewRegex.exec(content)) !== null) {
      const dateString = match[1];
      const parsedDate = new Date(dateString);
      if (!isNaN(parsedDate.getTime())) {
        timestamps.push({
          type: 'review',
          original: dateString,
          parsed: parsedDate,
          line: content.substr(0, match.index).split('\n').length
        });
      }
    }
    
    return timestamps;
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return [];
  }
}

function getFileModificationTime(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch (error) {
    return null;
  }
}

function getGitLastModified(filePath) {
  try {
    const command = `git log -1 --format="%ad" --date=iso -- "${filePath}"`;
    const output = execSync(command, { encoding: 'utf8' }).trim();
    return output ? new Date(output) : null;
  } catch (error) {
    return null;
  }
}

function analyzeTimestamps() {
  const config = loadConfig();
  const now = new Date();
  const results = [];
  
  // Find all markdown files
  const findCommand = `find ${DOCS_DIR} -name "*.md" -type f`;
  const files = execSync(findCommand, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(f => f.length > 0);
  
  files.forEach(filePath => {
    const relativePath = path.relative(process.cwd(), filePath);
    const fileModTime = getFileModificationTime(filePath);
    const gitModTime = getGitLastModified(filePath);
    const timestamps = parseMarkdownFile(filePath);
    
    const analysis = {
      file: relativePath,
      fileModified: fileModTime,
      gitModified: gitModTime,
      timestamps: timestamps,
      issues: [],
      status: 'ok'
    };
    
    // Check for issues
    timestamps.forEach(ts => {
      const daysDiff = Math.floor((now - ts.parsed) / (1000 * 60 * 60 * 24));
      
      if (ts.type === 'review' && ts.parsed < now) {
        analysis.issues.push({
          type: 'overdue_review',
          severity: 'high',
          message: `Review date ${ts.original} is overdue by ${Math.abs(daysDiff)} days`,
          line: ts.line
        });
        analysis.status = 'needs_attention';
      }
      
      if (daysDiff > config.warningThresholds.stale) {
        analysis.issues.push({
          type: 'stale_timestamp',
          severity: 'medium',
          message: `Timestamp ${ts.original} is ${daysDiff} days old`,
          line: ts.line
        });
        if (analysis.status === 'ok') analysis.status = 'stale';
      }
    });
    
    results.push(analysis);
  });
  
  return results;
}

function validateTimestamps() {
  console.log('🔍 Validating timestamps across documentation...\n');
  
  const analysis = analyzeTimestamps();
  const config = loadConfig();
  
  let totalIssues = 0;
  let needsAttention = 0;
  let staleFiles = 0;
  
  analysis.forEach(file => {
    if (file.issues.length > 0) {
      console.log(`📄 ${file.file}`);
      file.issues.forEach(issue => {
        const severity = issue.severity === 'high' ? '🔴' : 
                        issue.severity === 'medium' ? '🟡' : '🔵';
        console.log(`  ${severity} Line ${issue.line}: ${issue.message}`);
        totalIssues++;
      });
      
      if (file.status === 'needs_attention') needsAttention++;
      if (file.status === 'stale') staleFiles++;
      
      console.log('');
    }
  });
  
  // Summary
  console.log('📊 Validation Summary:');
  console.log(`   Total files analyzed: ${analysis.length}`);
  console.log(`   Files needing attention: ${needsAttention}`);
  console.log(`   Files with stale timestamps: ${staleFiles}`);
  console.log(`   Total issues found: ${totalIssues}`);
  
  if (totalIssues === 0) {
    console.log('✅ All timestamps are current and valid!');
  } else {
    console.log('\n💡 Suggestions:');
    console.log('   • Run `npm run updates` to generate recent changes');
    console.log('   • Update review dates for overdue items');
    console.log('   • Consider archiving very old content');
  }
}

function generateReport(format = 'text') {
  const analysis = analyzeTimestamps();
  const now = new Date();
  
  if (format === 'json') {
    const report = {
      generated: now.toISOString(),
      summary: {
        totalFiles: analysis.length,
        issueCount: analysis.reduce((acc, f) => acc + f.issues.length, 0),
        needsAttention: analysis.filter(f => f.status === 'needs_attention').length,
        staleFiles: analysis.filter(f => f.status === 'stale').length
      },
      files: analysis
    };
    
    console.log(JSON.stringify(report, null, 2));
  } else {
    // Text format
    console.log('📈 Timestamp Status Report');
    console.log('=' .repeat(50));
    console.log(`Generated: ${formatDate(now, 'full')}`);
    console.log('');
    
    analysis.forEach(file => {
      const statusEmoji = file.status === 'ok' ? '✅' : 
                         file.status === 'stale' ? '🟡' : '🔴';
      console.log(`${statusEmoji} ${file.file}`);
      
      if (file.gitModified) {
        console.log(`   Last modified: ${formatDate(file.gitModified)}`);
      }
      
      if (file.timestamps.length > 0) {
        console.log(`   Timestamps found: ${file.timestamps.length}`);
        file.timestamps.forEach(ts => {
          console.log(`     • ${ts.type}: ${ts.original}`);
        });
      }
      
      if (file.issues.length > 0) {
        file.issues.forEach(issue => {
          console.log(`   ⚠️  ${issue.message}`);
        });
      }
      
      console.log('');
    });
  }
}

function showSchedule() {
  console.log('📅 Upcoming Review Schedule');
  console.log('=' .repeat(40));
  
  const analysis = analyzeTimestamps();
  const upcomingReviews = [];
  
  analysis.forEach(file => {
    file.timestamps.forEach(ts => {
      if (ts.type === 'review') {
        upcomingReviews.push({
          file: file.file,
          date: ts.parsed,
          dateString: ts.original
        });
      }
    });
  });
  
  upcomingReviews.sort((a, b) => a.date - b.date);
  
  const now = new Date();
  upcomingReviews.forEach(review => {
    const isOverdue = review.date < now;
    const daysDiff = Math.floor((review.date - now) / (1000 * 60 * 60 * 24));
    const status = isOverdue ? '🔴 OVERDUE' : 
                  daysDiff <= 7 ? '🟡 DUE SOON' : '🟢 SCHEDULED';
    
    console.log(`${status} ${review.dateString}`);
    console.log(`   📁 ${review.file}`);
    
    if (isOverdue) {
      console.log(`   ⏰ Overdue by ${Math.abs(daysDiff)} days`);
    } else if (daysDiff <= 7) {
      console.log(`   ⏰ Due in ${daysDiff} days`);
    }
    
    console.log('');
  });
}

function main() {
  const command = process.argv[2] || 'validate';
  const args = process.argv.slice(3);
  
  // Parse arguments
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    if (args[i].startsWith('--')) {
      options[args[i].substring(2)] = args[i + 1];
    }
  }
  
  switch (command) {
    case 'validate':
      validateTimestamps();
      break;
    case 'report':
      generateReport(options.format);
      break;
    case 'schedule':
      showSchedule();
      break;
    case 'init':
      saveConfig(DEFAULT_CONFIG);
      break;
    default:
      console.log('Usage: node scripts/timestamp-manager.js <command> [options]');
      console.log('Commands: validate, report, schedule, init');
      console.log('Options: --format json|text');
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  analyzeTimestamps,
  validateTimestamps,
  formatDate,
  parseMarkdownFile
};
