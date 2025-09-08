# "Request Information" Form (Quick-Guide)

This guide provides an overview of how the "Request Information" (RFI) forms operate and how data passes to the LEAD_API.

## Why It Matters

The RFI form is the **biggest source of inquiries** for UAGC, directly contributing to:
- Lead generation
- Enrollments
- Revenue

## Key Owners

- **Anthony**: Front-end implementation
- **Omar**: Tracking and SEO

## Change Request Checklist

To modify a Request Information form:

1. Log an Asana "RF Change" task
2. Describe the specific tweak needed:
   - Label changes
   - Field additions/removals
   - Validation rules
   - Tracking modifications

## Implementation Process

The standard workflow for RFI form changes:

1. Anthony creates a prototype of the form changes
2. Brian performs QA on the implementation
3. Omar verifies the data layer is capturing correct information
4. Brandy schedules the publish date
5. Post-launch: Verify leads and GA events in dashboard

## Form Structure & Field Specifications

### User-Facing Fields

#### Contact Information Section
| Field Key | Type | Label | Required | Validation/Notes |
|-----------|------|-------|----------|------------------|
| `firstname` | textfield | First Name | ✓ | Max 50 chars, pattern: `^[a-zA-Z]*$` |
| `lastname` | textfield | Last Name | ✓ | Max 50 chars, pattern: `^[a-zA-Z]*$` |
| `phone1` | tel | Phone | ✓ | Max 30 chars, placeholder: "123 123 1234" |
| `emailaddress` | email | Email | ✓ | Max 100 chars, email regex pattern |

#### Interest Information Section
| Field Key | Type | Label | Required | Options/Notes |
|-----------|------|-------|----------|---------------|
| `state` | select | State | ✓ | Sourced from `taxonomy_term_state` |
| `degree_level` | select | Degree Level | — | Initially hidden, from `taxonomy_term_degree_level` |
| `college_of_interest` | select | Area of Interest | ✓ | See [Area of Interest Values](#area-of-interest-values) |
| `clientdegreeid` | select | Select Your Degree | ✓ | See [Degree Program Values](#degree-program-values) |
| `registerednurse` | radios | Are you currently a licensed RN? | — | Yes/No options |
| `are_you_a_member_of_the_military_` | radios | Are you a member of the military? | — | Yes/No (default: No) |

#### Agreement & Submission
| Field Key | Type | Label | Required | Notes |
|-----------|------|-------|----------|-------|
| `tcpa_checkbox` | checkbox | "I agree to the contact methods..." | ✓ | TCPA compliance |
| `actions` | webform_actions | Submit button | — | Label: "Request Information" |

## Field Value Mappings

### Area of Interest Values
When a user selects an area of interest, these values are sent to the Lead API:

| Display Name | API Value (`college_of_interest`) |
|--------------|-----------------------------------|
| Business | 0 |
| Criminal Justice | 1 |
| Education | 2 |
| Health Care | 3 |
| Information Technology | 4 |
| Liberal Arts | 5 |
| Social & Behavioral Science | 6 |

### Degree Program Values
Each degree program has a specific ID (`clientdegreeid`) sent to the Lead API:

#### Business Programs
| Program Name | ID |
|--------------|-----|
| AA in Business | 1294 |
| AA in Organizational Management | 1297 |
| BA in Accounting | 1298 |
| BA in Business Administration | 1302 |
| BA in Business Leadership | 1305 |
| BA in Finance | 1321 |
| BA in Human Resources Management | 1332 |
| BA in Marketing | 1850 |
| BA in Operations Management and Analysis | 1340 |
| BA in Organizational Management | 1341 |
| BA in Project Management | 1343 |
| MA in Organizational Management | 1371 |
| MS in Finance | 1853 |
| Master of Accountancy | 1688 |
| Master of Business Administration MBA | 1373 |
| Master of Human Resource Management | 1841 |
| * Undecided (Business) | 1830 |

#### Criminal Justice Programs
| Program Name | ID |
|--------------|-----|
| BA in Homeland Security and Emergency Management | 1331 |
| BA in Social and Criminal Justice | 1349 |
| Master of Science in Criminal Justice | 1694 |
| * Undecided (Criminal Justice) | 1832 |

#### Education Programs
| Program Name | ID |
|--------------|-----|
| AA in Early Childhood Education | 1295 |
| BA in Child Development | 1306 |
| BA in Early Childhood Development with Differentiated Instruction | 1849 |
| BA in Early Childhood Education | 1312 |
| BA in Early Childhood Education Administration | 1313 |
| BA in Education Studies | 1315 |
| BA in Instructional Design | 1333 |
| MA in Early Childhood Education Leadership | 1846 |
| MA in Education | 1355 |
| MA in Special Education | 1817 |
| MS in Instructional Design & Technology | 1845 |
| Post Baccalaureate Teaching Certificate | 1921 |
| * Undecided (Education) | 1833 |

#### Health Care Programs
| Program Name | ID |
|--------------|-----|
| BA in Health Care Administration | 1325 |
| BS in Health Information Management | 1681 |
| BS in Nursing (RN to BSN) | 1818 |
| MA in Health Care Administration | 1370 |
| MS in Health Informatics & Analytics | 1854 |
| Master of Public Health (MPH) | 1847 |
| * Undecided (Health Care) | 1834 |

#### Information Technology Programs
| Program Name | ID |
|--------------|-----|
| BA in Business Information Systems | 1304 |
| BS in Computer Software Technology | 1856 |
| BS in Cyber & Data Security Technology | 1857 |
| BS in Information Technology | 1848 |
| MS in Technology Management | 1893 |
| Master of Information Systems Management (MISM) | 1840 |
| * Undecided (Information Technology) | 1835 |

#### Liberal Arts Programs
| Program Name | ID |
|--------------|-----|
| AA in Military Studies | 1296 |
| BA in Liberal Arts | 1337 |
| * Undecided (Liberal Arts) | 1836 |

#### Social & Behavioral Science Programs
| Program Name | ID |
|--------------|-----|
| BA in Applied Behavioral Science | 1300 |
| BA in Health and Human Services | 1323 |
| BA in Psychology | 1344 |
| BA in Sociology | 1351 |
| MA in Human Services | 1890 |
| MA in Psychology | 1689 |
| * Undecided (Social & Behavioral Science) | 1838 |

## Hidden Fields & System Tracking

The RFI form includes numerous hidden fields for tracking and system functionality:

### Lead Tracking Fields
| Field Name | Purpose |
|------------|---------|
| `unique_lead_id` | Lead-tracking UUID |
| `vendor` | Source tag (default: uagc-homegrown) |


### URL Tracking
| Field Name | Purpose |
|------------|---------|
| `weblandingurl` | Landing page URL |
| `callcenterurl` | Call center URL |

### Form & System Identifiers
| Field Name | Purpose |
|------------|---------|
| `clientdocumentid` | Form ID from Drupal |
| `sourceid` | Marketing source code (default: ADE219) |
| `rfi_form_name`, `rfi_form_type`, `rfi_form_id` | Internal form identifiers |

### Analytics & Testing
| Field Name | Purpose |
|------------|---------|
| `referrer`, `originpage`, `clientid` | Analytics/attribution data |
| `device_type` | Device type tracking |
| `uagc_analytics_google_id` | Google Analytics client ID |
| `experiment_id1`...`4`, `experience_variation1`...`4` | Multi-experiment tracking slots |

### Compliance & Legal
| Field Name | Purpose |
|------------|---------|
| `lid_lead_id` | LeadID token for TrustedForm/Jornaya |
| `leadid_tcpa_disclosure` | TCPA disclosure shown flag (default: true) |

### Partnership & Portal
| Field Name | Purpose |
|------------|---------|
| `partner_id`, `partner_name` | Internal partnership tags |
| `programid` | Salesforce Program ID |

## Data Flow

1. User submits form
2. Form data is validated client-side
3. Data is sent to LEAD_API with all field mappings
4. API processes the information using the program IDs and area codes
5. Lead is created in CRM with proper categorization
6. Thank you message is displayed to user
7. GA event is triggered with tracking data

## Technical Notes

- **Validation**: Client-side validation uses specific patterns (e.g., names must be alphabetic only)
- **Dynamic Fields**: Some fields like `degree_level` start hidden and are revealed by JavaScript
- **Undecided Options**: Programs marked with "*" are "Undecided" categories for each area of interest
- **State Restrictions**: Dynamic validation messages show program/state restrictions as needed
- **TCPA Compliance**: Required checkbox with full disclosure paragraph

## Deep-Dive Documentation

For detailed technical specifications and API documentation, refer to the [RFI Technical Documentation](https://path-to-detailed-documentation) in the "Dev Reference" folder.

---

**Data Sources**: Field mappings and specifications pulled from RFI form analysis and Lead API integration documentation. 