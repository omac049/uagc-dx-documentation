# Recent Updates

This page lists recent significant updates to the UAGC Digital Experience Documentation.

:::tip Auto-Update Process
This page is maintained through our [Documentation Workflow](documentation-workflow.md) and updated during quarterly "Docs Day" reviews. See [How to Add Updates](#how-to-add-updates) below.
:::

:::info Last Updated
**Page Last Modified:** *Generated automatically on page build*  
**Next Scheduled Review:** March 15, 2025 (Quarterly Docs Day)  
**Auto-Update Status:** 🟢 Active
:::

## September 2024

### September 7, 2024
**📋 Content Enhancement**
- **Enhanced RFI Documentation**: Added comprehensive field mappings, validation rules, and degree program IDs to the Request Information Form guide
- **Technical Specifications**: Documented all 40+ hidden fields and their purposes for Lead API integration
- **Developer Resources**: Added complete value mappings for area of interest and degree program selections

### September 6, 2024
**🤖 Automation & Scripts**
- **Automated Recent Updates**: Created generate-updates.js script for automated draft generation
- **NPM Integration**: Added `npm run updates` command for easy update generation
- **Workflow Integration**: Integrated Recent Updates tracking into documentation workflow as step 6.1
- **Timestamp Management**: Enhanced update tracking with automated timestamp generation and validation

### September 5, 2024
**🔧 Documentation Maintenance**
- **Process Enhancement**: Updated documentation workflow to include recent updates tracking
- **Template Creation**: Created automated update templates and standardized categorization
- **Quarterly Integration**: Enhanced quarterly review process with update archiving

## August 2024

### August 28, 2024
**📈 Analytics & Tracking**
- **GA4 Updates**: Updated GA4 setup documentation with latest event tracking standards
- **GTM Enhancement**: Enhanced GTM configuration guides with new datalayer specifications
- **Cookie Management**: Added cookie organization best practices and compliance guidelines

### August 15, 2024
**♿ Accessibility Updates**
- **WCAG Expansion**: Expanded WCAG compliance documentation with detailed testing procedures
- **Testing Checklist**: Added comprehensive accessibility testing checklist for developers
- **Screen Reader Support**: Updated screen reader compatibility guidelines and best practices

### August 5, 2024
**🔍 SEO & Content**
- **Canonical Links**: Enhanced canonical links and URL taxonomy documentation
- **Content Procedures**: Improved content update procedures and workflow integration
- **Keyword Research**: Updated keyword research documentation with current tools and methods

## July 2024

### July 25, 2024
**📊 Program Documentation**
- **Program Pages**: Updated all program pages with current enrollment requirements
- **KPI Documentation**: Enhanced enrollment funnel KPI documentation and tracking
- **Content Templates**: Added new program-specific content templates and examples

### July 15, 2024
**🔧 System Updates**
- **Docusaurus Migration**: Completed migration from legacy documentation system
- **GitHub Integration**: Established Git-based workflow for documentation updates
- **Build Automation**: Implemented automated build and deployment processes

### July 1, 2024
**🚀 Team & Process**
- **Ownership Structure**: Established clear documentation section ownership
- **Review Processes**: Implemented quarterly "Docs Day" review procedures
- **Quality Standards**: Created comprehensive style guides and quality guardrails

## How to Add Updates

To ensure this section stays current, follow these procedures:

### 1. During Documentation Work

When making significant documentation changes, add an entry using this template:

```markdown
### [Current Date]
**[Update Type Icon] [Category Name]**
- **[Title]**: [Brief description of what was added/changed]
- **[Title]**: [Brief description of impact or technical details]
- **[Title]**: [Any relevant notes or links]
```

### 2. Update Type Icons & Categories

Use these standardized categories:

| Icon | Category | When to Use |
|------|----------|-------------|
| 📋 | Content Enhancement | New sections, major content additions |
| 🔧 | Documentation Maintenance | Structure changes, workflow updates |
| 📈 | Analytics & Tracking | GA4, GTM, tracking updates |
| ♿ | Accessibility Updates | WCAG, accessibility improvements |
| 🚀 | Process Improvements | Workflow, procedures, operations |
| 📊 | Program Documentation | Program pages, enrollment content |
| 🔍 | SEO & Content | SEO guides, content optimization |
| 🐛 | Bug Fixes | Corrections, broken link fixes |
| 🎨 | UI/UX Updates | Design improvements, user experience |
| 🔒 | Security & Compliance | Privacy, security, legal updates |
| 🤖 | Automation & Scripts | Scripts, automation, tooling |

### 3. Timestamp Automation

Use these automated helpers for consistent timestamps:

```bash
# Generate current timestamp for updates
date "+%B %d, %Y"

# Get last modification time of a file
stat -f "%Sm" -t "%B %d, %Y at %I:%M %p" filename.md

# Auto-generate update entry with current timestamp
echo "### $(date '+%B %d, %Y')" >> update-draft.md
```

### 4. Quarterly "Docs Day" Process

During each quarterly review:

1. **Review Git History**: Check commits for undocumented changes
2. **Team Survey**: Ask each section owner what major updates occurred
3. **Consolidate Entries**: Group related updates and remove minor items
4. **Archive Old Updates**: Move updates older than 6 months to archive section
5. **Update Timestamps**: Verify all dates and add automation timestamps

### 5. Automation Helpers

Use these commands to help identify recent changes:

```bash
# Get recent commits affecting documentation
git log --since="1 month ago" --pretty=format:"%h - %an, %ar : %s" -- new-docs/

# Find recently modified files
find new-docs/ -type f -mtime -30 -name "*.md"

# Check for TODO comments that might indicate work in progress
grep -r "TODO\|FIXME\|NOTE:" new-docs/

# Generate updates automatically
npm run updates
```

## Timestamp Management System

### Automated Timestamps

The documentation now includes:

- **Live Page Timestamps**: JavaScript-based current time display
- **Git-based Last Modified**: Automatic tracking of file modification times
- **Build-time Stamps**: Timestamps added during documentation builds
- **Manual Override**: Ability to manually set important milestone dates

### Implementation Details

The documentation includes automated timestamp management through:
- **Git-based tracking**: Automatic detection of file modification times
- **Build-time generation**: Timestamps added during site compilation
- **Validation scripts**: Automated checking for outdated content
- **Review scheduling**: Proactive alerts for maintenance needs

## Archived Updates

Updates older than 6 months are moved here for reference:

<details>
<summary>September 2024 and Earlier</summary>

### September 2024
- **Migration Complete**: Final migration from legacy MkDocs to Docusaurus
- **Team Structure**: Established initial team ownership and review processes
- **Content Audit**: Completed comprehensive documentation audit and inventory

### August 2024
- **Foundation Setup**: Initial documentation audit and content inventory
- **Style Guides**: Created initial style guides and content templates
- **Workflow Establishment**: Set up Git-based workflow for documentation management

### July 2024
- **Planning Phase**: Documentation strategy planning and tool evaluation
- **Team Assembly**: Formed documentation team and assigned initial responsibilities
- **Infrastructure**: Set up initial repository and development environment

</details>

## Maintenance Schedule

| Task | Frequency | Owner | Next Due | Auto-Timestamp |
|------|-----------|-------|----------|----------------|
| Add significant updates | As they occur | Content creators | Ongoing | ✅ Live tracking |
| Review and consolidate | Monthly | Documentation team | October 1, 2024 | ✅ Calendar integration |
| Quarterly archive cleanup | Quarterly | All section owners | December 15, 2024 | ✅ Automated reminders |
| Annual structure review | Annually | Documentation lead | January 1, 2025 | ✅ Calendar scheduling |
| Timestamp verification | Monthly | System automation | October 1, 2024 | 🤖 Automated |

## Integration with Documentation Workflow

This page is integrated with our standard workflow:

1. **Step 6 (Publish)**: Add entry to Recent Updates when publishing significant changes
2. **Step 6.1 (Timestamp)**: Automated timestamp generation and verification
3. **Step 7 (Announce)**: Reference the update in Slack announcements with timestamp
4. **Step 8 (Maintain)**: Review and update during quarterly reviews with archive management

:::warning Section Owner Responsibility
Each [section owner](documentation-workflow.md#documentation-ownership) is responsible for adding timestamped updates when they publish changes to their areas.
:::

## Contributing Updates

If you notice missing updates or have suggestions:

1. **For immediate additions**: Create a PR with the update entry (timestamp will be auto-added)
2. **For process improvements**: Submit feedback via the [Documentation Workflow](documentation-workflow.md)
3. **For automation ideas**: Contact the documentation team lead
4. **For timestamp issues**: Use the automated helpers or report via GitHub issues

## Automated Update Integration

### Currently Implemented:
- ✅ Git hook integration prompts for update entries
- ✅ NPM script automation (`npm run updates`)
- ✅ Automated timestamp generation
- ✅ Live page timestamp display

### Future Enhancements Planned:
- 📅 Slack bot reminders for section owners
- 📊 Monthly automated summary generation  
- 🔗 Integration with Asana task completion
- 🤖 AI-powered update categorization
- ⏰ Calendar integration for scheduled reviews

---

**Last Generated:** September 7, 2024  
**Auto-Update Status:** 🟢 Active  
**Next Automation Run:** October 1, 2024 at 9:00 AM 