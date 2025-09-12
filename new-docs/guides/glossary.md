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

#### **UAGC Website Architecture Overview**

The UAGC website follows a hierarchical structure organized into nine main content categories as defined in the [sitemap index](https://www.uagc.edu/sitemap.xml):

```
uagc.edu/
├── online-degrees/          # Academic program catalog
├── admissions/             # Enrollment processes and requirements
├── tuition-financial-aid/  # Financial information and aid
├── student-experience/     # Student support and services
├── partnerships/           # Corporate and academic partnerships
├── about/                  # Institutional information
├── blog/                   # Content marketing and news
├── google-news/           # Press releases and media
└── generic/               # Supporting pages and utilities
```

#### Academic Program Pages

**Main Academic Navigation Structure:**
- `/online-degrees/` - Main program catalog
  - `/online-degrees/bachelors/` - Bachelor's degree hub
  - `/online-degrees/masters/` - Master's degree hub
  - `/online-degrees/doctoral/` - Doctoral degree hub
  - `/online-degrees/associate/` - Associate degree hub
  - `/online-degrees/certificates/` - Certificate programs

**Programs by Academic Interest:**
- `/online-degrees/business/` - Business programs
- `/online-degrees/criminal-justice/` - Criminal justice programs
- `/online-degrees/education/` - Education programs
- `/online-degrees/health-care/` - Healthcare programs
- `/online-degrees/information-technology/` - IT programs
- `/online-degrees/liberal-arts/` - Liberal arts programs
- `/online-degrees/social-behavioral-science/` - Social & behavioral science

**Programs by College:**
- `/college-of-professional-advancement/` - Professional programs
- `/college-of-integrative-learning/` - Integrative studies

**Individual Program Pages Pattern:** `/online-degrees/[level]/[program-name]/`
Examples:
- `/online-degrees/bachelors/business-information-systems/`
- `/online-degrees/masters/health-care-administration/`
- `/online-degrees/doctoral/psychology/`

**Program Tools & Resources:**
- `/online-degrees/find-your-degree/` - Degree finder tool
- `/online-degrees/comparison/` - Degree comparison tool
- `/online-degrees/emphases/` - Area of emphasis options

#### Information & Service Pages

**Admissions Structure:**
- `/admissions/` - Main admissions hub
  - `/admissions/new-students/` - New student resources
  - `/admissions/returning-students/` - Returning student process
  - `/admissions/traditional/` - Traditional credit transfer
  - `/admissions/non-traditional/` - Non-traditional credit transfer
  - `/admissions/bachelors/` - Bachelor's admission requirements
  - `/admissions/masters/` - Master's admission requirements
  - `/admissions/doctorate/` - Doctoral admission requirements
  - `/admissions/associates/` - Associate admission requirements
  - `/admissions/international/` - International student requirements
  - `/admissions/registrar/` - Registrar services
  - `/admissions/week-in-the-life/` - Student experience preview

**Financial Aid Structure:**
- `/tuition-financial-aid/` - Main financial hub
  - `/tuition-financial-aid/scholarships/` - Scholarship information
  - `/tuition-financial-aid/grants/` - Grant programs
  - `/tuition-financial-aid/our-promise/` - 3-week trial promise
  - `/tuition-financial-aid/payment-options/` - Payment plans
  - `/tuition-financial-aid/faq/` - Financial aid FAQ

**Student Experience Structure:**
- `/student-experience/` - Main student support hub
  - `/student-experience/office-student-affairs/` - Student affairs
  - `/student-experience/student-support-services/` - Support services
  - `/student-experience/alumni/` - Alumni services
  - `/student-experience/peer-mentoring/` - Peer mentoring program
  - `/student-experience/career-services/` - Career support
  - `/student-experience/honor-societies/` - Honor societies
  - `/student-experience/student-resources/` - General resources
  - `/student-experience/graduation/` - Graduation information
  - `/student-experience/deans-list/` - Academic recognition
  - `/student-experience/transcript-request/` - Transcript services
  - `/student-experience/student-organizations/` - Student organizations
  - `/student-experience/writing-center/` - Writing support

**About UAGC Structure:**
- `/about/` - Institutional information hub
  - `/about/accreditation/` - Accreditation details
  - `/about/why-uagc/` - Value proposition
  - `/about/university-awards/` - Awards and recognition
  - `/about/professional-affiliations-memberships/` - Professional affiliations
  - `/about/leadership/` - Executive team
  - `/about/faculty/` - Faculty information
  - `/about/media-room/` - Press and media
  - `/about/contact-us/` - Contact information

#### Military-Focused Pages

**Military Structure:**
- `/military/` - Main military hub
  - `/military/active-duty/` - Active duty services
  - `/military/veterans/` - Veteran services
  - `/military/spouses-dependents/` - Military family services
  - `/military/tuition-financial-aid/` - Military financial benefits
  - `/military/air-force/` - Air Force specific
  - `/military/army/` - Army specific
  - `/military/coast-guard/` - Coast Guard specific
  - `/military/marines/` - Marines specific
  - `/military/navy/` - Navy specific
  - `/military/space-force/` - Space Force specific
  - `/military/admissions/transfer/` - Military credit transfer

**Military Alliance:**
- `/military-alliance/` - Military partnership programs

#### Partnership Pages

**Partnership Structure:**
- `/partnerships/` - Main partnership hub
  - `/partnerships/organizations/` - Corporate partnerships
  - `/partnerships/academic/` - Academic partnerships

#### Content & News

**Blog Structure:**
- `/blog/` - Main blog hub with educational content and thought leadership

**News & Media:**
- `/google-news/` - Press releases and news articles
- `/events/` - University events

#### Specialized Domains & Platforms

**Student Portals:**
- `login.uagc.edu/` - Student login portal
- `connect.uagc.edu/` - UAGC Connect community platform

**Application Platform:**
- `cloud.mail.uagc.edu/apply/` - Online application system

**International:**
- `china.uagc.edu/` - China-specific site

#### Paid Campaign Pages
- **Generic Campaign Pages**: `/success/[page-name]` or `/success/[page-name]-v[version]`
  - Examples: `/success/back-to-school-v5`, `/success/attend-v5`, `/success/get-ahead-v5`

- **Degree Type Landing Pages**: `/success/degree-types/[degree-level]`
  - Examples: 
    - `/success/degree-types/bachelors-degrees-v5`
    - `/success/degree-types/masters-degrees-v5` 
    - `/success/degree-types/doctoral-degrees-v5`

- **Program-Specific Pages**: `/success/degree/[program-name]`
  - Examples: 
    - `/success/degree/ba-business-economics-v5`
    - `/success/degree/ma-education-v5`
    - `/success/degree/doctorate-psychology-v5`

- **Field of Study Pages**: `/success/programs/[field-name]`
  - Examples: `/success/programs/business-v5`, `/success/programs/health-care-v5`

- **Military-Focused Pages**: `/success/military/[audience]`
  - Examples: `/success/military/active-duty-v5`, `/success/military/veteran-v5`

- **College-Specific Pages**: `/success/college/[college-name]`
  - Examples: `/success/college/forbes-business-school-v5`

#### Paid Campaign URL Parameters
Tracking parameters commonly added to paid URLs:
- `sourceid` - Campaign source identifier
- `affiliateID` - Affiliate tracking  
- `utm_vendor` - UTM vendor parameter
- `alr` - Audience/lead routing
- `dsaccountid` - Data source account ID
- `dsaccounttype` - Platform type (e.g., GOOGLE)
- `device` - Device targeting (m=mobile, etc.)
- Campaign-specific parameters: `adgroup`, `ad`, `match`, `clickid`

**Example Full Paid URL:**
```
https://www.uagc.edu/success/degree-types/bachelors-degrees-v5?sourceid=18SGB&affiliateID=&clickid=&utm_vendor=&alr=21995198608&adgroup=&ad=&match=&device=m&c3api=2591,,&sourceid=18SGB&dsaccountid=700000002770196&dsaccounttype=GOOGLE
```

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