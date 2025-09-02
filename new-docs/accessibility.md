# Accessibility

This documentation site is designed to be accessible to all users, including those with disabilities. We strive to meet or exceed the [Web Content Accessibility Guidelines (WCAG) 2.1 Level AA](https://www.w3.org/TR/WCAG21/) standards.

## Accessibility Features

### Keyboard Navigation

- All interactive elements are accessible via keyboard
- A visible focus indicator is provided for keyboard users
- [Keyboard shortcuts](keyboard_shortcuts.md) are available for quick navigation
- Skip to content link appears when you first press Tab

### Screen Readers

- Semantic HTML structure helps screen readers interpret the content correctly
- All images have descriptive alt text
- ARIA landmarks are used to identify different sections of the page
- Form controls have associated labels
- Tables include appropriate headers and captions

### Visual Design

- The site respects user's color scheme preferences (light/dark mode)
- Text has sufficient contrast against background colors
- Font sizes are specified in relative units to allow resizing
- The layout is responsive and supports zoom up to 200% without loss of content or functionality
- No content flashes more than three times per second

### Language

- The primary language of the page is specified
- Changes in language within the content are marked up appropriately
- Technical terminology is defined or explained where possible

## Accessibility Tools

### Skip to Content

A "Skip to Content" link appears when you press the Tab key, allowing you to bypass the navigation and header sections.

### Keyboard Shortcut Help

Press the <kbd>?</kbd> key at any time to display a list of available keyboard shortcuts.

## Known Limitations

We are continuously working to improve the accessibility of our documentation. Known issues include:

- Some complex diagrams may not be fully accessible to screen reader users
- Third-party embedded content may have accessibility limitations beyond our control

## Feedback

If you encounter any accessibility issues or have suggestions for improvement, please provide feedback through the appropriate channels.

## Testing

This documentation site is regularly tested for accessibility using:

- Automated testing tools (Lighthouse, axe, WAVE)
- Keyboard-only navigation
- Screen reader testing (NVDA, VoiceOver, JAWS)
- Manual testing by users with disabilities

## Resources

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM: Web Accessibility in Mind](https://webaim.org/) 