# Day-to-Day Operations

This page provides a high-level overview of routine operations for the DX team.

## Content Edits

Process for standard content updates:

1. DX Team member updates content via Drupal admin
2. Brian performs QA on the changes
3. Changes are published after verification

**Key Contact:** Brian (QA Lead)

## Experiments

Workflow for creating and deploying experiments:

=== "Planning Phase"
    1. Define test hypothesis
    2. Determine success metrics
    3. Identify target pages and audience
    4. Create Asana ticket using experiment template

=== "Building Phase"
    1. Anthony creates test in Optimizely
    2. Omar sets up tracking events
    3. Brian performs QA on test implementation
    4. Fix any identified issues

=== "Launch Phase"
    1. Get approval from Thomas
    2. Activate experiment
    3. Monitor performance
    4. Document results in changelog

**Key Contacts:** Anthony (Implementation), Omar (Tracking)

## SEO Sweeps

Monthly SEO maintenance process:

1. Omar runs a monthly audit
2. Tasks for fixes/redirects are logged in Asana
3. Team addresses issues based on priority

SEO audit includes checking:
- List of redirects
- Schema markup (JSON) errors
- Broken links

**Key Contact:** Omar (SEO & Tracking Manager)

## Releases

Release schedule and process:

=== "Planning"
    - Identify content/features for release
    - Create release schedule
    - Assign priorities to items
    - Document scope in Asana

=== "Development"
    - Code changes implemented
    - Features built and tested
    - Release notes drafted
    - QA performed in dev/staging

=== "Deployment"
    - Release cutoff is Monday of deployment week
    - Jason handles backend deployment
    - Brian verifies frontend
    - Thomas signs off on all releases

**Key Contacts:** Jason (Backend), Thomas (Approval)

## Common Support Tasks

Frequently performed support activities:

!!! example "Content Updates"
    - Text changes
    - Image updates
    - Link corrections
    
    **Process:** Submit via Asana → Brian QA → Publish

!!! example "Form Adjustments"
    - Field modifications
    - Validation updates
    - Tracking changes
    
    **Process:** Submit via Asana → Anthony implements → Omar verifies tracking → Publish

!!! example "SEO Fixes"
    - Meta tag updates
    - Redirect implementation
    - Schema.org markup fixes
    
    **Process:** Omar identifies → Task created → Developer implements → Omar verifies 