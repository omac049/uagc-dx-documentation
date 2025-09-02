---
is_guide: true
owner: Brian (Front-End & QA Lead)
last_updated: 2023-11-15
difficulty: Intermediate
description: "This guide ensures UAGC web properties meet WCAG 2.2 AA accessibility standards, helping create inclusive digital experiences for all users regardless of ability."
related_guides:
  - title: QA Smoke Test
    url: ../qa-smoke-test/
  - title: Performance & Core Web Vitals
    url: ../performance-web-vitals/
  - title: Drupal Coding Standards
    url: ../drupal-standards/
---

# Accessibility & Inclusive Design

This guide provides best practices for ensuring our digital experiences meet WCAG 2.2 AA accessibility standards.

!!! info "Why Accessibility Matters"
    Accessibility isn't just a compliance requirement—it ensures our content and services are available to everyone, regardless of ability or disability.

## WCAG 2.2 AA Quick Reference

The Web Content Accessibility Guidelines (WCAG) 2.2 AA standards are organized around four principles:

=== "Perceivable"
    Content must be presentable in ways all users can perceive.
    
    - Provide text alternatives for non-text content
    - Provide captions and alternatives for multimedia
    - Create content that can be presented in different ways
    - Make it easier for users to see and hear content

=== "Operable"
    User interface components must be operable by all users.
    
    - Make all functionality available from keyboard
    - Give users enough time to read and use content
    - Do not use content that causes seizures
    - Provide ways to help users navigate and find content

=== "Understandable"
    Information and operation must be understandable.
    
    - Make text readable and understandable
    - Make content appear and operate in predictable ways
    - Help users avoid and correct mistakes

=== "Robust"
    Content must be robust enough to work with current and future technologies.
    
    - Maximize compatibility with current and future tools

## Website Brand Guidelines

Our digital brand must maintain accessibility while staying true to our visual identity:

1. **Color Usage**
   - Always maintain a 4.5:1 contrast ratio for text
   - Don't rely solely on color to convey meaning
   - Use our accessible color palette from the design system

2. **Typography**
   - Use our brand fonts (Roboto)
   - Minimum text size: 16px for body text
   - Maintain proper heading hierarchy (H1 → H6)

3. **Imagery**
   - All images require meaningful alt text
   - Decorative images should have empty alt attributes (alt="")
   - Avoid text in images; if necessary, duplicate text in the alt attribute

## Website Design Blocks

When using our design system components:

!!! example "Button Components"
    - Must be keyboard accessible
    - Need clear focus states
    - Require sufficient color contrast
    - Should have descriptive text

!!! example "Card Components"
    - Must have proper heading structure
    - Need keyboard-accessible interactive elements
    - Should maintain spacing for readability
    - Require sufficient color contrast

!!! example "Navigation Components"
    - Must be keyboard navigable
    - Need clear focus indicators
    - Should have proper ARIA attributes
    - Must be usable at different screen sizes

## Form Blocks

Forms require special attention for accessibility:

1. **Labels**
   - Every input must have a properly associated label
   - Use explicit labels with the `for` attribute
   - Don't rely on placeholder text as the only label

2. **Error Handling**
   - Error messages must be clearly associated with inputs
   - Use both color and text/icons to indicate errors
   - Provide clear instructions for correction

3. **Keyboard Accessibility**
   - Tab order must be logical
   - Form can be completed using keyboard alone
   - Custom controls require keyboard event handlers

4. **Screen Reader Support**
   - Use appropriate ARIA attributes when needed
   - Test with screen readers
   - Complex components need additional ARIA roles/states

## Testing For Accessibility

Before deploying any new feature:

1. **Automated Testing**
   - Run axe DevTools or Lighthouse accessibility audit
   - Fix all critical and serious issues

2. **Keyboard Testing**
   - Navigate using Tab, Shift+Tab, Enter, Space, Arrow keys
   - Ensure all interactive elements can be accessed and activated

3. **Screen Reader Testing**
   - Test with VoiceOver (Mac) or NVDA (Windows)
   - Verify all content is announced properly
   - Check form inputs, buttons, and navigation

4. **Visual Testing**
   - Test at 200% zoom
   - Check color contrast with WebAIM Contrast Checker
   - Verify the site works with high contrast mode

## Resources

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Accessible Rich Internet Applications (ARIA)](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [The A11Y Project](https://www.a11yproject.com/) 