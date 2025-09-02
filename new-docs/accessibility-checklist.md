# Accessibility Testing Checklist

Quick reference checklist for ensuring WCAG 2.2 AA compliance across UAGC digital properties.

## Pre-Launch Accessibility Checklist

### Page Structure & Semantics

**HTML Foundation:**
- [ ] Valid HTML5 markup (passes W3C validator)
- [ ] Proper DOCTYPE declaration
- [ ] Language attribute set (`<html lang="en">`)
- [ ] Logical heading hierarchy (H1 → H2 → H3, no skipped levels)
- [ ] Only one H1 per page
- [ ] Semantic HTML elements used appropriately (`<main>`, `<nav>`, `<article>`, `<section>`)

**Document Structure:**
- [ ] Page has descriptive, unique title
- [ ] Meta description provides accurate summary
- [ ] Landmark roles properly identify page regions
- [ ] Skip links provided for repetitive content
- [ ] Breadcrumb navigation when appropriate

### Images & Media

**Image Accessibility:**
- [ ] All informative images have meaningful alt text
- [ ] Decorative images have empty alt attributes (`alt=""`)
- [ ] Complex images (charts, graphs) have detailed descriptions
- [ ] Alt text is concise and descriptive (under 125 characters)
- [ ] No "image of" or "picture of" in alt text
- [ ] Images of text avoided; when necessary, text repeated in alt attribute

**Video & Audio:**
- [ ] Videos have accurate closed captions
- [ ] Audio content includes transcripts
- [ ] Auto-playing media can be paused/stopped/muted
- [ ] Video descriptions provided for visual content
- [ ] Media controls are keyboard accessible

### Color & Contrast

**Visual Design:**
- [ ] Text meets minimum contrast ratio (4.5:1 for normal text, 3:1 for large text)
- [ ] Interactive elements meet 3:1 contrast ratio
- [ ] Focus indicators are visible and meet contrast requirements
- [ ] Information doesn't rely solely on color
- [ ] Color-blind users can distinguish all content
- [ ] High contrast mode support available

**Testing Tools:**
- [ ] WebAIM Contrast Checker results documented
- [ ] Color blindness simulator testing completed
- [ ] High contrast mode testing passed

### Keyboard Navigation

**Keyboard Accessibility:**
- [ ] All interactive elements accessible via keyboard
- [ ] Tab order is logical and intuitive
- [ ] Focus indicators clearly visible on all elements
- [ ] No keyboard traps (users can navigate away from any element)
- [ ] Enter/Space keys activate buttons and links
- [ ] Arrow keys navigate within components (menus, tabs)
- [ ] Escape key closes modal dialogs and dropdowns

**Focus Management:**
- [ ] Focus moves to appropriate element after actions
- [ ] Modal dialogs trap focus appropriately
- [ ] Focus returns to trigger element when modals close
- [ ] Skip links function correctly
- [ ] Focus doesn't move unexpectedly during page load

### Forms & Input

**Form Structure:**
- [ ] All form inputs have associated labels
- [ ] Labels properly associated using `for` attribute or wrapping
- [ ] Required fields clearly identified
- [ ] Fieldsets and legends used for grouped inputs
- [ ] Form instructions provided before form elements

**Error Handling:**
- [ ] Error messages clearly identify problematic fields
- [ ] Error descriptions are helpful and specific
- [ ] Errors announced to screen readers (`role="alert"`)
- [ ] Error prevention for critical actions (confirmations)
- [ ] Success messages provided after form submission

**Input Assistance:**
- [ ] Format requirements clearly stated
- [ ] Auto-complete attributes used appropriately
- [ ] Timeout warnings provided with extension options
- [ ] Sensitive data entry confirmed before submission

### Interactive Elements

**Links & Buttons:**
- [ ] Link text describes destination or purpose
- [ ] Button text describes action that will occur
- [ ] Links that open new windows/tabs are identified
- [ ] Visited link states are visually distinct
- [ ] Adjacent links separated by more than white space

**Navigation:**
- [ ] Multiple navigation methods available (menu, search, sitemap)
- [ ] Current page identified in navigation
- [ ] Consistent navigation across site
- [ ] Search functionality includes accessible results

**Dynamic Content:**
- [ ] Status updates announced to screen readers (`aria-live`)
- [ ] Loading states communicated to users
- [ ] Content changes don't cause context changes
- [ ] Auto-updating content can be controlled by user

### Screen Reader Testing

**VoiceOver (macOS):**
- [ ] All content read in logical order
- [ ] Headings navigate properly (Control+Option+Cmd+H)
- [ ] Links list is meaningful (Control+Option+Cmd+L)
- [ ] Form controls properly labeled and announced
- [ ] Dynamic content changes announced appropriately

**NVDA (Windows):**
- [ ] Content navigation using heading shortcuts (H, 1-6)
- [ ] Form mode functions correctly for input fields
- [ ] Table navigation works properly (Ctrl+Alt+Arrow keys)
- [ ] ARIA roles and properties announced correctly

### Mobile Accessibility

**Touch & Gestures:**
- [ ] Touch targets minimum 44px × 44px
- [ ] Adequate spacing between touch targets
- [ ] Complex gestures have alternative input methods
- [ ] Content works in both portrait and landscape orientations

**Mobile Screen Readers:**
- [ ] iOS VoiceOver navigation functions properly
- [ ] Android TalkBack announces content correctly
- [ ] Touch exploration works as expected
- [ ] Gesture navigation doesn't conflict with assistive technology

### Data Tables

**Table Structure:**
- [ ] Tables have descriptive captions
- [ ] Column and row headers properly marked (`<th>`)
- [ ] Headers associated with data cells (`scope` attribute)
- [ ] Complex tables use `id` and `headers` attributes
- [ ] Table summary provided when needed

### PDF Documents

**PDF Accessibility:**
- [ ] Tagged PDF with proper structure
- [ ] Reading order is logical
- [ ] Images in PDF have alt text
- [ ] Form fields properly labeled
- [ ] HTML alternative provided when possible

## Automated Testing

### Required Tools

**Browser Extensions:**
- [ ] axe DevTools scan completed (0 violations)
- [ ] WAVE report shows no errors
- [ ] Lighthouse accessibility score 90+

**Command Line Testing:**
- [ ] Pa11y command line test passed
- [ ] axe-core automated tests pass
- [ ] HTML validator shows no errors

### Testing Environment

**Browser Testing:**
- [ ] Chrome with accessibility extensions
- [ ] Firefox with accessibility toolbar
- [ ] Safari with VoiceOver enabled
- [ ] Edge with accessibility insights

**Device Testing:**
- [ ] Desktop at various zoom levels (100%, 150%, 200%)
- [ ] Tablet in portrait and landscape modes
- [ ] Mobile phone with screen reader enabled
- [ ] High contrast mode on Windows/Mac

## Common Issues Checklist

### Critical Issues (Must Fix)

**Content Issues:**
- [ ] Missing alt text on informative images
- [ ] Insufficient color contrast
- [ ] Form inputs without labels
- [ ] Missing focus indicators
- [ ] Keyboard navigation blocked

**Structure Issues:**
- [ ] Missing page title
- [ ] Skipped heading levels
- [ ] No main landmark
- [ ] Missing skip links
- [ ] Invalid HTML markup

### Serious Issues (High Priority)

**Navigation Issues:**
- [ ] Unclear link text ("click here", "read more")
- [ ] Inconsistent navigation structure
- [ ] Missing breadcrumbs on deep pages
- [ ] Inaccessible dropdown menus

**Content Issues:**
- [ ] Auto-playing media without controls
- [ ] Timeout without user control
- [ ] Error messages not associated with inputs
- [ ] Moving content without pause control

### Moderate Issues (Medium Priority)

**User Experience:**
- [ ] Small touch targets on mobile
- [ ] Inconsistent focus indicators
- [ ] Missing status updates for dynamic content
- [ ] Unclear form instructions

## Post-Launch Monitoring

### Ongoing Checks

**Monthly Reviews:**
- [ ] New content accessibility verified
- [ ] User feedback on accessibility reviewed
- [ ] Third-party tool compliance confirmed
- [ ] Staff training completion tracked

**Quarterly Audits:**
- [ ] Full site accessibility audit completed
- [ ] Compliance documentation updated
- [ ] Remediation plan progress reviewed
- [ ] Legal requirements assessment updated

### User Feedback

**Feedback Channels:**
- [ ] Accessibility feedback form available
- [ ] Contact information for accessibility issues provided
- [ ] Response time commitments documented
- [ ] Resolution tracking system in place

## Emergency Remediation

### Critical Issue Response

**Immediate Actions (Within 24 Hours):**
- [ ] Acknowledge accessibility issue receipt
- [ ] Assess severity and impact
- [ ] Implement temporary workaround if possible
- [ ] Document issue and initial response

**Short-term Resolution (Within 1 Week):**
- [ ] Develop comprehensive fix
- [ ] Test solution with assistive technology
- [ ] Deploy fix to production
- [ ] Verify resolution with original reporter

**Long-term Prevention:**
- [ ] Update testing procedures to catch similar issues
- [ ] Additional staff training if needed
- [ ] Process improvements documented
- [ ] Compliance documentation updated

## Team Responsibilities

### Content Creators
- [ ] Alt text written for all images
- [ ] Headings used for structure, not styling
- [ ] Link text is descriptive
- [ ] Plain language principles followed

### Developers
- [ ] Semantic HTML markup implemented
- [ ] ARIA attributes used correctly
- [ ] Keyboard navigation supported
- [ ] Focus management implemented properly

### Designers
- [ ] Color contrast requirements met
- [ ] Focus indicators designed
- [ ] Touch targets appropriately sized
- [ ] Visual hierarchy supports screen readers

### QA Testers
- [ ] Manual accessibility testing completed
- [ ] Automated tools run on all new features
- [ ] Screen reader testing performed
- [ ] Documentation updated with test results

---

## Quick Reference Links

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/): Browser extension for automated testing
- [WAVE](https://wave.webaim.org/): Web accessibility evaluation tool
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/): Desktop app for contrast testing
- [Screen Reader Testing](https://webaim.org/articles/screenreader_testing/): Screen reader testing guide

### Standards & Guidelines
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/): Interactive WCAG guidelines
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist): Simplified WCAG checklist
- [Section 508 Checklist](https://www.section508.gov/test/): Federal compliance checklist

---

**For accessibility testing support and training, contact Brian (Front-End & QA Lead).**

*This checklist is updated quarterly to reflect current testing standards and procedures.*
