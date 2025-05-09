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

## Common Form Elements

Standard components in our RFI forms:

- Name fields (First/Last)
- Email field
- Phone field
- Program interest selection
- Military affiliation options
- Privacy policy acceptance
- Submit button

## Data Flow

1. User submits form
2. Form data is validated client-side
3. Data is sent to LEAD_API
4. API processes the information
5. Lead is created in CRM
6. Thank you message is displayed to user
7. GA event is triggered

## RFI Values Sent to Lead API

The RFI form collects and sends the following values to the Lead API:

### Contact Information
| Field Name | Description | Status |
|------------|-------------|--------|
| First Name | User's first name | Required |
| Last Name | User's last name | Required |
| Phone | Call-center outreach number | Required |
| Email | Digital contact channel | Required |
| State | Visitor's state of residence | Required |

### Program Interest
| Field Name | Description | Status |
|------------|-------------|--------|
| Area of Interest | Broad discipline chosen | Required |
| Select Your Degree | Specific program picked | Required |
| Are you currently a licensed RN? | Nursing licensure filter | Conditional |
| Are you a member of the military? | Flags military messaging | Optional |

### Consent & Privacy
| Field Name | Description | Status |
|------------|-------------|--------|
| TCPA Checkbox | Consent to be contacted | Required |
| leadid_tcpa_disclosure | Flag that disclosure script fired | System |

### Technical & Tracking
| Field Name | Description | Status |
|------------|-------------|--------|
| webLandingURL | Page where form rendered; includes UTM & affiliate params | System |
| (clientid) | UU ID / Visitor Id - Unique visitor identifier | System |
| (device_type) | Device Type (desktop, mobile, tablet) | System |
| UAGC Analytics Google ID | GA Client-ID cookie | System |
| sourceid | Traffic broker ID | System |
| (referrer) | Previous page - Internal page or external source | System |
| (originpage) | Landing page - with UTMs | System |

### Experimentation & Testing
| Field Name | Description | Status |
|------------|-------------|--------|
| Test Variation | Optimizely variation name | System |
| Experiment ID1-4 | Optimizely experiment IDs | System |
| Experience Variation1-4 | Variation slugs for experiments | System |

### Internal Form Tracking
| Field Name | Description | Status |
|------------|-------------|--------|
| RFI Form Name | Internal RFI - Form name | System |
| RFI Form Type | Internal RFI - Form type | System |
| RFI Form ID | Internal RFI - Form id | System |

### Partner Information
| Field Name | Description | Status |
|------------|-------------|--------|
| Partner ID | Partner unique identifier | System |
| Partner Name | Partner company name | System |
| Portal Activation Link | Lead API post - user password activation link | System |
| Salesforce Program ID | Program record in Salesforce | System |

## Deep-Dive Documentation

For detailed technical specifications and API documentation, refer to the [RFI Technical Documentation](https://path-to-detailed-documentation) in the "Dev Reference" folder. 