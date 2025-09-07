# Recent Updates

This page lists recent significant updates to the UAGC Digital Experience Documentation.

:::tip Auto-Update Process
This page is maintained through our [Documentation Workflow](documentation-workflow.md) and updated during quarterly "Docs Day" reviews. See [How to Add Updates](#how-to-add-updates) below.
:::

## December 2024

### December 20, 2024
**📋 Content Enhancement**
- **Enhanced RFI Documentation**: Added comprehensive field mappings, validation rules, and degree program IDs to the Request Information Form guide
- **Technical Specifications**: Documented all 40+ hidden fields and their purposes for Lead API integration
- **Developer Resources**: Added complete value mappings for area of interest and degree program selections

### December 15, 2024
**🔧 Documentation Maintenance**
- Updated documentation workflow to include recent updates tracking
- Created automated update templates and guidelines
- Enhanced quarterly review process integration

## November 2024

### November 28, 2024
**📈 Analytics & Tracking**
- Updated GA4 setup documentation with latest event tracking standards
- Enhanced GTM configuration guides with new datalayer specifications
- Added cookie organization best practices

### November 15, 2024
**♿ Accessibility Updates**
- Expanded WCAG compliance documentation
- Added new accessibility testing checklist
- Updated screen reader compatibility guidelines

### November 1, 2024
**🚀 Process Improvements**
- Streamlined development workflow documentation
- Updated Asana integration procedures
- Enhanced day-to-day operations guide

## October 2024

### October 25, 2024
**📊 Program Documentation**
- Updated all program pages with current requirements
- Enhanced enrollment funnel KPI documentation
- Added new program-specific content templates

### October 10, 2024
**🔍 SEO & Content**
- Updated canonical links and URL taxonomy guide
- Enhanced content update procedures
- Improved keyword research documentation

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

### 3. Quarterly "Docs Day" Process

During each quarterly review:

1. **Review Git History**: Check commits for undocumented changes
2. **Team Survey**: Ask each section owner what major updates occurred
3. **Consolidate Entries**: Group related updates and remove minor items
4. **Archive Old Updates**: Move updates older than 6 months to archive section

### 4. Automation Helpers

Use these commands to help identify recent changes:

```bash
# Get recent commits affecting documentation
git log --since="1 month ago" --pretty=format:"%h - %an, %ar : %s" -- new-docs/

# Find recently modified files
find new-docs/ -type f -mtime -30 -name "*.md"

# Check for TODO comments that might indicate work in progress
grep -r "TODO\|FIXME\|NOTE:" new-docs/
```

## Archived Updates

Updates older than 6 months are moved here for reference:

<details>
<summary>September 2024 and Earlier</summary>

### September 2024
- Initial migration from legacy documentation system
- Created Docusaurus-based documentation structure
- Established team ownership and review processes

### August 2024
- Documentation audit and content inventory
- Created initial style guides and templates
- Set up Git-based workflow for documentation

</details>

## Maintenance Schedule

| Task | Frequency | Owner | Next Due |
|------|-----------|-------|----------|
| Add significant updates | As they occur | Content creators | Ongoing |
| Review and consolidate | Monthly | Documentation team | 1st of each month |
| Quarterly archive cleanup | Quarterly | All section owners | Next Docs Day |
| Annual structure review | Annually | Documentation lead | January 2025 |

## Integration with Documentation Workflow

This page is integrated with our standard workflow:

1. **Step 6 (Publish)**: Add entry to Recent Updates when publishing significant changes
2. **Step 7 (Announce)**: Reference the update in Slack announcements
3. **Step 8 (Maintain)**: Review and update during quarterly reviews

:::warning Section Owner Responsibility
Each [section owner](documentation-workflow.md#documentation-ownership) is responsible for adding updates when they publish changes to their areas.
:::

## Contributing Updates

If you notice missing updates or have suggestions:

1. **For immediate additions**: Create a PR with the update entry
2. **For process improvements**: Submit feedback via the [Documentation Workflow](documentation-workflow.md)
3. **For automation ideas**: Contact the documentation team lead

## Automated Update Integration

Future enhancements planned:
- Git hook integration to prompt for update entries
- Slack bot reminders for section owners
- Monthly automated summary generation
- Integration with Asana task completion 