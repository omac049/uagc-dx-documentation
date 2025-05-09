# QA Smoke Test

This guide provides a quick checklist for performing basic quality assurance testing on new or updated pages.

## Pre-Launch Checklist

Before any page goes live, verify these essential elements:

### Functionality
- [ ] All links work correctly
- [ ] Forms submit properly
- [ ] Required form validation works
- [ ] Buttons and CTAs function as expected
- [ ] Interactive elements (dropdowns, tabs, etc.) work

### Visual Quality
- [ ] Content displays correctly on desktop, tablet, and mobile
- [ ] Images load properly and aren't distorted
- [ ] Fonts are consistent with brand guidelines
- [ ] Spacing and alignment follow design standards
- [ ] No overlapping elements on any screen size

### Technical Health
- [ ] No JavaScript errors in console
- [ ] No 404 resources
- [ ] Page load time is acceptable
- [ ] Proper metadata is in place
- [ ] Analytics tracking is working

## Device Testing

Test pages on these key device types:

| Device Type | Examples |
|-------------|----------|
| Desktop | Windows PC, Mac |
| Tablet | iPad, Samsung Galaxy Tab |
| Mobile | iPhone, Android phones |

For critical pages, use our device farm to test on a wider range of devices.

## Browser Compatibility

Verify functionality in these browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility Checks

Verify these basic accessibility elements:

- [ ] Proper heading structure (H1, H2, etc.)
- [ ] All images have alt text
- [ ] Sufficient color contrast
- [ ] Keyboard navigation works
- [ ] Form fields have labels

For deeper accessibility testing, use the [WCAG 2.2 AA Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/).

## Bug Reporting

When reporting bugs:

1. Create an Asana task using the "Bug" template
2. Include the URL where the issue occurs
3. Add screenshots or screen recordings
4. Describe expected vs. actual behavior
5. Note browser/device information

## Contact

For QA-related questions, contact Brian (Front-End Dev & QA Lead). 