# Glossary of Internal Acronyms & Naming Conventions

This glossary provides definitions for commonly used acronyms, terms, and naming conventions used within the UAGC Digital Experience team.

!!! tip "Living Document"
    This glossary is a living document. If you encounter a term that isn't included, please add it following the existing format.

## Acronyms & Abbreviations

### General

| Acronym | Full Term | Definition |
|---------|-----------|------------|
| UAGC | University of Arizona Global Campus | Our institution name |
| DX | Digital Experience | Our team responsible for digital properties |
| RFI | Request for Information | Form filled out by prospects to get more information |
| CMS | Content Management System | Software for creating/managing digital content (Drupal) |
| SEO | Search Engine Optimization | Practices to improve search visibility |
| SERP | Search Engine Results Page | Results page after a search query |
| CTA | Call to Action | Prompt encouraging user to take specific action |
| KPI | Key Performance Indicator | Metric used to evaluate success |
| ROI | Return on Investment | Value gained relative to cost |
| SLA | Service Level Agreement | Commitment between service provider and client |
| SOW | Statement of Work | Document outlining project deliverables |
| UAT | User Acceptance Testing | Final testing phase before release |
| UX | User Experience | Overall experience of a user with a product |
| UI | User Interface | Visual elements users interact with |

### Technical

| Acronym | Full Term | Definition |
|---------|-----------|------------|
| API | Application Programming Interface | Protocol for building and integrating software |
| CDN | Content Delivery Network | Distributed servers for content delivery |
| CI/CD | Continuous Integration/Continuous Deployment | Automated methods for software delivery |
| CWV | Core Web Vitals | Google's page experience metrics |
| DNS | Domain Name System | System for converting domain names to IP addresses |
| GA4 | Google Analytics 4 | Google's latest analytics platform |
| GTM | Google Tag Manager | Tag management system for analytics and marketing |
| HTML | HyperText Markup Language | Standard markup language for web pages |
| HTTP | HyperText Transfer Protocol | Protocol for transmitting hypermedia documents |
| HTTPS | HTTP Secure | Encrypted version of HTTP |
| JS | JavaScript | Programming language for web development |
| LCP | Largest Contentful Paint | Core Web Vital measuring loading performance |
| CLS | Cumulative Layout Shift | Core Web Vital measuring visual stability |
| FID | First Input Delay | Core Web Vital measuring interactivity |
| PHP | PHP: Hypertext Preprocessor | Server-side scripting language |
| REST | Representational State Transfer | Architectural style for API design |
| SSL | Secure Sockets Layer | Technology for securing internet connections |
| WCAG | Web Content Accessibility Guidelines | Accessibility standards for web content |

### Project-Specific

| Acronym | Full Term | Definition |
|---------|-----------|------------|
| ECM | Enrollment Contact Method | System for tracking enrollment inquiries |
| FPP | Full Program Page | Pages detailing full academic programs |
| BPP | Brief Program Page | Shortened program information pages |
| EPP | Enrollment Processing Platform | System for processing student enrollments |
| LSP | Lead Submission Process | Workflow for processing prospective student leads |
| PSO | Program-Specific Outcomes | Academic outcomes for specific programs |
| MCE | Multi-Channel Experience | Cross-channel marketing and engagement |
| PCR | Page Change Request | Process for requesting content changes |
| TMA | Traffic-Monitoring Algorithm | System for tracking website traffic patterns |

## Naming Conventions

### File Naming

- **Images**: `[section]-[descriptor]-[dimension].[extension]`
  - Example: `hero-nursing-1200x600.jpg`

- **Documents**: `[type]-[topic]-[version].[extension]`
  - Example: `policy-privacy-v2.pdf`

- **Code Files**: `[functionality].[language extension]`
  - Example: `lead-form-validation.js`

### URL Structure

#### Academic Program Pages
- **Bachelor's Programs**: `/online-degrees/bachelors/[program-name]`
  - Examples:
    - `/online-degrees/bachelors/business-economics`
    - `/online-degrees/bachelors/communication-studies`
    - `/online-degrees/bachelors/health-and-wellness`
    - `/online-degrees/bachelors/social-science`
    - `/online-degrees/bachelors/supply-chain-management`

- **Master's Programs**: `/online-degrees/masters/[program-name]`
  - Examples:
    - `/online-degrees/masters/teaching-and-learning-with-technology`
    - `/online-degrees/masters/leadership`

- **Doctoral Programs**: `/online-degrees/doctoral/[program-name]`
  - Examples:
    - `/online-degrees/doctoral/organizational-development-leadership`

#### Information & Service Pages
- **Admissions Pages**: `/admissions/[topic]/`
  - Examples: `/admissions/apply-now/`, `/admissions/transfer-credits/`

- **Financial Pages**: `/financial-aid/[topic]/`
  - Examples: `/financial-aid/tuition/`, `/financial-aid/scholarships/`

- **About Pages**: `/about/[section]/`
  - Examples: `/about/accreditation/`, `/about/faculty/`

- **Student Services**: `/student-services/[service]/`
  - Examples: `/student-services/advising/`, `/student-services/library/`

#### Marketing & Campaign Pages
- **Landing Pages**: `/[campaign-source]/[campaign-name]/`
  - Examples: `/google/nursing-2023/`, `/social/business-promo/`

- **Resource Pages**: `/resources/[topic]/`
  - Examples: `/resources/career-guides/`, `/resources/student-success/`

#### URL Conventions
- All URLs use **lowercase letters**
- Multi-word phrases separated by **hyphens** (`-`)
- No special characters or spaces
- Descriptive and SEO-friendly naming
- Consistent structure across degree levels

### Database Naming

- **Tables**: `uagc_[entity]_[function]`
  - Example: `uagc_user_preferences`

- **Fields**: `field_[entity]_[attribute]`
  - Example: `field_student_phone`

### Component Naming

- **UI Components**: `uagc-[component-type]--[variant]`
  - Example: `uagc-button--primary`

- **Blocks**: `block-[section]-[function]`
  - Example: `block-header-navigation`

## Common Terms

### Business Terms

| Term | Definition |
|------|------------|
| Conversion | When a user completes a desired action (form submission, enrollment) |
| Funnel | The journey a user takes from initial awareness to conversion |
| Lead | A potential student who has shown interest by submitting information |
| Prospect | An individual who may become a student but hasn't applied |
| Applicant | Someone who has submitted an application but isn't enrolled |
| Enrolled Student | Individual who has completed enrollment and is taking courses |
| Academic Program | A course of study leading to a degree or certificate |
| Modality | Method of delivering education (online, hybrid, in-person) |

### Technical Terms

| Term | Definition |
|------|------------|
| Cache | Temporary storage of web pages and assets to improve performance |
| Dependency | External code/library that a project relies on |
| Endpoint | URL where an API can be accessed |
| Environment | Server setup where code runs (development, staging, production) |
| Middleware | Software that connects applications or components |
| Migration | Process of moving data or code from one system to another |
| Refactoring | Restructuring code without changing functionality |
| Regression | When new changes break existing functionality |
| Rendering | Process of generating visual output from code |
| Responsive | Design approach that adapts to different screen sizes |
| Schema | Structure that defines how data is organized |
| Sandbox | Isolated testing environment |
| Staging | Pre-production environment for testing |
| Version Control | System for tracking and managing code changes |

## Department Codes

| Code | Department |
|------|------------|
| ADMN | Administration |
| ADMS | Admissions |
| ADVS | Advising |
| FINS | Financial Services |
| MKTG | Marketing |
| REGR | Registrar |
| TECH | Technology Services |
| ACAD | Academic Affairs |

## Status Codes

| Code | Status | Definition |
|------|--------|------------|
| ACT | Active | Currently in use or ongoing |
| ARCH | Archived | No longer in use but preserved |
| DPRC | Deprecated | Still available but being phased out |
| DRAF | Draft | In development, not yet approved |
| PEND | Pending | Awaiting approval or implementation |
| REV | In Review | Being evaluated for approval |
| SUSP | Suspended | Temporarily unavailable |

## Resources

- [UAGC Brand Guidelines](https://brand.uagc.edu/)
- [Web Development Standards](https://webstandards.uagc.edu/)
- [Editorial Style Guide](https://editorial.uagc.edu/)

**Key Contact:** Brandy (Digital Marketing & Web Operations Manager) 