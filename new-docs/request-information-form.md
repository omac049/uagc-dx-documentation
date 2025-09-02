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

## Deep-Dive Documentation

For detailed technical specifications and API documentation, refer to the [RFI Technical Documentation](https://path-to-detailed-documentation) in the "Dev Reference" folder. 