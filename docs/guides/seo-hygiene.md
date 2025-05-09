# SEO Hygiene

This guide outlines the essential SEO practices and maintenance tasks for keeping the UAGC website optimized for search engines.

## On-Page SEO Best Practices

Ensure these elements are properly optimized on every page:

- **Page Titles** 
  - Include primary keyword at the beginning when possible
  - Keep each title unique across the website
  - Limit to under 60 characters to avoid truncation in search results
  - Use Drupal tokens for consistency: `[node:title] | [site:name]`
  - For program pages, follow format: `[Program Name] Degree | UAGC`
  - Avoid keyword stuffing or excessive punctuation
- **Meta Descriptions** - Compelling summary, include keywords, under 160 characters
- **H1 Headings** - One per page, include primary keyword
- **URL Structure** - Readable, keyword-rich, avoid parameters
- **Content Quality** - Relevant, comprehensive, well-structured
- **Internal Linking** - Strategic links to related content
- **Image Optimization** - Descriptive filenames, alt text, appropriate file size

### Page Title Configuration in Drupal

To set up proper page titles in Drupal:

1. Navigate to **Configuration > Search and metadata > Metatag**
2. Select the appropriate content type
3. Under "Page title," configure the token pattern: `[node:title] | [site:name]`
4. For custom landing pages, you may specify: `[node:field_custom_title] | [site:name]`

!!! example "Example Page Titles"
    - Homepage: `UAGC | University of Arizona Global Campus`
    - Program page: `Bachelor of Science in Computer Science | UAGC`
    - Blog post: `5 Tips for Student Success | UAGC`

!!! warning "Important"
    Always review how titles display in search results using Google Search Console. Titles that are too long will be truncated, potentially cutting off important information.

## Technical SEO

Regular checks for these technical elements:

- **Schema Markup** - Verify JSON-LD implementation
- **XML Sitemaps** - Keep updated, submit in Search Console
- **Robots.txt** - Ensure proper configuration
- **Canonicalization** - Check for correct canonical tags
- **Mobile Responsiveness** - Test on multiple devices
- **Page Speed** - Monitor Core Web Vitals
- **SSL Certificate** - Verify security implementation

## Monthly SEO Audit Process

Omar conducts a monthly audit that includes:

1. Crawling the site for technical issues
2. Identifying broken links and 404 errors
3. Checking redirect implementations
4. Verifying schema markup for errors
5. Analyzing search performance in Google Search Console
6. Reviewing keyword rankings
7. Creating Asana tasks for needed fixes

## Redirect Management

Guidelines for implementing redirects:

- Use 301 (permanent) redirects for content that has moved permanently
- Use 302 (temporary) redirects for temporary changes
- Maintain a central redirect log
- Avoid redirect chains (redirects pointing to redirects)
- Regularly audit redirects for relevance

## SEO Tools

Key tools used in our SEO workflow:

- Google Search Console
- Google Analytics
- Screaming Frog
- SEMrush
- Ahrefs

## Contact

For SEO-related questions and issues, contact Omar (SEO & Tracking Manager). 