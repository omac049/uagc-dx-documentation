# Common Tasks

This guide provides step-by-step instructions for the most frequently performed tasks in managing the UAGC Digital Experience.

## Content Updates

### Update Existing Page Content

1. Navigate to the page in Drupal
2. Click "Edit" in the admin toolbar
3. Make necessary changes in the content editor
4. Click "Save" to publish changes
5. Verify changes are visible on the live site

For more details, see [Content Updates](content-updates.md).

### Update Page Meta Information

1. Navigate to the page in Drupal
2. Click "Edit" in the admin toolbar
3. Scroll to the SEO section
4. Update title, description, or keywords as needed
5. Click "Save" to publish changes

For SEO best practices, see [SEO Hygiene](guides/seo-hygiene.md).

### Upload Media Files

1. In the Drupal admin menu, go to Content > Media
2. Click "Add media"
3. Select the appropriate media type (image, document, video)
4. Upload the file and provide required metadata
5. Click "Save" to add the media to the library

## Page Management

### Create a New Page

1. In Drupal, go to Content > Add content
2. Select the appropriate content type
3. Fill in required fields and content
4. Set up URL alias and SEO metadata
5. Configure any additional settings (layout, blocks, etc.)
6. Set publishing options
7. Click "Save" to create the page

### Set Up a Redirect

1. In Drupal, go to Configuration > Search and Metadata > URL Redirects
2. Click "Add redirect"
3. Enter the source path (old URL) and destination path (new URL)
4. Select the appropriate redirect type (usually 301 Permanent)
5. Click "Save" to activate the redirect

For redirect best practices, see [SEO Redirect Decision Tree](guides/seo-redirects.md).

## Analytics & Tracking

### View Site Analytics

1. Log into Google Analytics 4
2. Navigate to the appropriate property
3. Select date range for analysis
4. View reports or create custom reports as needed

For more details, see [GA4 Setup & Event Tracking](ga4-setup-event-tracking.md).

### Set Up Event Tracking

1. Identify the element or action to track
2. In Google Tag Manager, create a new tag
3. Configure the tag with appropriate event parameters
4. Set up a trigger to fire the tag
5. Test the implementation in preview mode
6. Publish the changes

For implementation details, see [GTM Configuration & dataLayer](gtm-configuration-datalayer.md).

### Create an Optimizely Test

1. Log into Optimizely
2. Create a new experiment
3. Define the audience and pages
4. Create variations
5. Set up metrics and goals
6. QA the test in preview mode
7. Launch the experiment

For comprehensive guidance, see [Optimizely Tests](guides/optimizely-tests.md).

## Troubleshooting

### Debug JavaScript Errors

1. Open browser developer tools (F12 or right-click > Inspect)
2. Go to the Console tab
3. Identify error messages
4. Check the Sources tab for script execution
5. Apply fixes to the codebase
6. Test and verify the solution

### Fix Broken Links

1. Use a tool like Screaming Frog to scan for broken links
2. For each broken link:
   - Determine if the destination should exist
   - Either restore the content or create a redirect
   - Update the link source if possible
3. Verify fixes with another scan

### Resolve Performance Issues

1. Run a Lighthouse audit (via Chrome DevTools)
2. Identify key performance issues
3. Address high-priority items first:
   - Image optimization
   - Script loading optimization
   - CSS optimization
   - Server response time
4. Retest to confirm improvements

For detailed guidance, see [Performance & Core Web Vitals](guides/performance-web-vitals.md).

## Requesting Assistance

If you encounter issues not covered in this guide:

1. Check the [Documentation Workflow](documentation-workflow.md) for relevant procedures
2. Consult the [Glossary](guides/glossary.md) for technical terms
3. Identify the appropriate team member using [Team Roles & Responsibilities](who-does-what.md)
4. Submit a help request using the [RFI Form](request-information-form.md) 