# WCAG Compliance & Legal Requirements

Comprehensive guide to Web Content Accessibility Guidelines (WCAG) compliance for UAGC digital properties, ensuring legal compliance and inclusive user experiences.

## Legal Framework & Requirements

### Applicable Laws & Standards

**Federal Requirements:**
- **Section 508**: Federal agencies must make electronic content accessible
- **Americans with Disabilities Act (ADA)**: Prohibits discrimination based on disability
- **Section 504 of Rehabilitation Act**: Applies to federally funded programs (including universities)
- **Title III ADA**: Public accommodations must be accessible

**Educational Institution Obligations:**
- **Higher Education Opportunity Act**: Requires accessible instructional materials
- **Department of Education OCR**: Office for Civil Rights enforcement and guidance
- **State Accessibility Laws**: Additional state-level requirements
- **Vendor Accessibility Requirements**: Third-party tool compliance obligations

### WCAG 2.2 Compliance Levels

**Level A (Minimum)**
- Basic accessibility features
- Essential for legal compliance baseline
- Addresses major barriers for users with disabilities

**Level AA (Standard)**
- **UAGC Target Level**: Industry standard for public-facing websites
- Required for Section 508 compliance
- Recommended by Department of Justice for ADA compliance
- Covers 95% of accessibility barriers

**Level AAA (Enhanced)**
- Highest level of accessibility
- Not required for full compliance
- Applied selectively for critical user paths

:::info Legal Compliance Strategy
UAGC targets **WCAG 2.2 AA compliance** across all digital properties to meet federal requirements and provide inclusive access to educational opportunities.
:::

## WCAG 2.2 Implementation Framework

### The Four Principles (POUR)

#### **1. Perceivable**
*Information must be presentable in ways users can perceive*

**Text Alternatives (1.1):**
- All images have meaningful alt text describing content/function
- Decorative images use empty alt attributes (`alt=""`)
- Complex images (charts, graphs) include detailed descriptions
- Form controls have associated labels

**Time-Based Media (1.2):**
- Videos have closed captions for speech and sounds
- Audio content includes transcripts
- Live streams provide real-time captions when possible
- Audio descriptions for visual content in videos

**Adaptable Content (1.3):**
- Information structure is programmatically determinable
- Content meaning doesn't rely solely on sensory characteristics
- Logical reading order maintained across devices
- Clear headings and labels structure content

**Distinguishable Content (1.4):**
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Resize Text**: Content remains functional at 200% zoom
- **Audio Control**: Auto-playing audio can be paused/stopped
- **Focus Indicators**: Keyboard focus is clearly visible

#### **2. Operable**
*Interface components must be operable by all users*

**Keyboard Accessible (2.1):**
- All functionality available via keyboard
- No keyboard traps (users can navigate away from any element)
- Bypass mechanisms for repetitive content (skip links)
- Keyboard shortcuts don't conflict with assistive technology

**Enough Time (2.2):**
- Time limits can be turned off, adjusted, or extended
- Content doesn't auto-update unless user can control it
- Session timeouts provide adequate warning
- Pause/stop controls for moving content

**Seizures & Physical Reactions (2.3):**
- Content doesn't flash more than 3 times per second
- Motion-triggered functionality has alternative input methods
- Users can disable animations and motion effects

**Navigable (2.4):**
- Descriptive page titles for all pages
- Logical focus order through page content
- Clear link text describing destination/purpose
- Multiple navigation methods (search, sitemap, breadcrumbs)
- Clear headings organize content sections

#### **3. Understandable**
*Information and UI operation must be understandable*

**Readable (3.1):**
- Page language programmatically identified
- Foreign language passages identified
- Content written at appropriate reading level
- Unusual words defined or explained

**Predictable (3.2):**
- Consistent navigation across site
- Functions triggered only by user action
- Help and contact information consistently located
- Error identification and correction guidance

**Input Assistance (3.3):**
- Clear error identification and description
- Form labels and instructions provided
- Suggestions for error correction
- Error prevention for critical actions (confirmations)

#### **4. Robust**
*Content must work with current and future assistive technologies*

**Compatible (4.1):**
- Valid, semantic HTML markup
- Proper use of ARIA attributes and roles
- Compatible with screen readers and other assistive technology
- Graceful degradation for older technology

## Implementation Standards

### HTML & Semantic Markup

**Proper Document Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Descriptive Page Title | UAGC</title>
</head>
<body>
  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <!-- Navigation content -->
    </nav>
  </header>
  <main role="main">
    <!-- Main content -->
  </main>
  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
</body>
</html>
```

**Heading Hierarchy:**
```html
<h1>Page Title (Only One H1 Per Page)</h1>
  <h2>Main Section</h2>
    <h3>Subsection</h3>
    <h3>Another Subsection</h3>
  <h2>Another Main Section</h2>
    <h3>Subsection</h3>
```

**Form Accessibility:**
```html
<form>
  <label for="email">Email Address (Required)</label>
  <input type="email" id="email" name="email" required 
         aria-describedby="email-error email-help">
  <div id="email-help">We'll never share your email</div>
  <div id="email-error" role="alert" aria-live="polite">
    <!-- Error messages appear here -->
  </div>
</form>
```

### ARIA (Accessible Rich Internet Applications)

**Essential ARIA Attributes:**
- `aria-label`: Accessible name when visible text insufficient
- `aria-labelledby`: References other elements that describe current element
- `aria-describedby`: References elements that provide additional description
- `aria-expanded`: Current state of collapsible elements
- `aria-hidden`: Hides decorative elements from screen readers
- `role`: Defines element's purpose when semantic HTML insufficient

**Common ARIA Patterns:**
```html
<!-- Skip Links -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Accessible Buttons -->
<button aria-expanded="false" aria-controls="mobile-menu">
  Menu
</button>

<!-- Form Errors -->
<div role="alert" aria-live="assertive">
  Please correct the errors below
</div>

<!-- Loading States -->
<div aria-live="polite" aria-busy="true">
  Loading content...
</div>
```

### Color & Contrast Standards

**WCAG 2.2 Contrast Requirements:**
- **Normal Text**: 4.5:1 minimum contrast ratio
- **Large Text** (18pt+ or 14pt+ bold): 3:1 minimum contrast ratio
- **Graphical Objects**: 3:1 minimum for UI components and graphics
- **Focus Indicators**: 3:1 minimum against adjacent colors

**UAGC Brand Color Accessibility:**
```css
/* Primary Brand Colors - WCAG AA Compliant */
:root {
  --uagc-primary: #0C234B; /* Navy Blue - High contrast */
  --uagc-secondary: #AB0520; /* Cardinal Red - Use carefully */
  --uagc-text-primary: #333333; /* Dark gray for body text */
  --uagc-text-secondary: #666666; /* Medium gray for secondary text */
  --uagc-background: #FFFFFF; /* White background */
}

/* Ensure sufficient contrast */
.text-primary { color: var(--uagc-text-primary); } /* 12.6:1 ratio */
.text-secondary { color: var(--uagc-text-secondary); } /* 7.3:1 ratio */
.brand-navy { color: var(--uagc-primary); } /* 13.8:1 ratio */
```

**Color Usage Guidelines:**
- Never rely solely on color to convey information
- Use icons, text, or patterns alongside color
- Test all color combinations with contrast checking tools
- Provide high contrast mode support

### Typography & Readability

**Font Size Standards:**
- **Minimum Body Text**: 16px (1rem)
- **Small Text**: 14px minimum (12px only for legal disclaimers)
- **Large Text**: 18px+ for improved readability
- **Heading Sizes**: Logical progression (H1 > H2 > H3)

**Line Height & Spacing:**
- **Line Height**: 1.4-1.6 for body text
- **Paragraph Spacing**: Adequate white space between paragraphs
- **Letter Spacing**: Normal (avoid condensed fonts)
- **Word Spacing**: Normal (avoid justified text that creates uneven spacing)

## Testing & Validation

### Automated Testing Tools

**Browser Extensions:**
- **axe DevTools**: Comprehensive accessibility scanning
- **WAVE**: Web accessibility evaluation
- **Lighthouse**: Google's accessibility audit
- **Colour Contrast Analyser**: Color contrast testing

**Command Line Tools:**
- **axe-core**: Automated testing framework
- **Pa11y**: Command-line accessibility tester
- **Accessibility Insights**: Microsoft's testing suite

### Manual Testing Procedures

**Keyboard Navigation Testing:**
1. **Tab Order**: Verify logical progression through interactive elements
2. **Focus Management**: Ensure visible focus indicators on all elements
3. **Keyboard Shortcuts**: Test all custom keyboard interactions
4. **Trapped Focus**: Verify modal dialogs trap focus appropriately
5. **Skip Links**: Test bypass mechanisms for repetitive content

**Screen Reader Testing:**
1. **VoiceOver (macOS)**: Cmd+F5 to enable, test all content
2. **NVDA (Windows)**: Free screen reader for comprehensive testing
3. **JAWS (Windows)**: Industry standard screen reader testing
4. **Mobile Screen Readers**: Test iOS VoiceOver and Android TalkBack

**Visual Testing:**
1. **Zoom Testing**: Test at 200% and 400% zoom levels
2. **High Contrast Mode**: Windows/Mac high contrast testing
3. **Color Blindness**: Test with color blindness simulators
4. **Mobile Testing**: Various device sizes and orientations

### Testing Checklist

**Page-Level Testing:**
- [ ] Page has descriptive title
- [ ] Language is properly identified
- [ ] Heading structure is logical (H1 → H2 → H3)
- [ ] All images have appropriate alt text
- [ ] Links have descriptive text or context
- [ ] Color contrast meets WCAG AA standards
- [ ] Page is fully keyboard accessible
- [ ] Focus indicators are visible
- [ ] No auto-playing media without controls

**Form Testing:**
- [ ] All inputs have associated labels
- [ ] Error messages are clear and helpful
- [ ] Required fields are properly identified
- [ ] Form can be completed using keyboard alone
- [ ] Success/error states are announced to screen readers

**Interactive Component Testing:**
- [ ] Buttons have descriptive text or labels
- [ ] Dropdown menus are keyboard accessible
- [ ] Modal dialogs trap focus appropriately
- [ ] Carousel/slider controls are accessible
- [ ] Data tables have proper headers and captions

## Content & Editorial Guidelines

### Writing for Accessibility

**Plain Language Principles:**
- Use common words and short sentences
- Explain technical terms and acronyms
- Structure content with clear headings
- Use active voice when possible
- Include clear calls-to-action

**Link Text Best Practices:**
```html
<!-- Good: Descriptive link text -->
<a href="/programs/computer-science">Learn about our Computer Science program</a>

<!-- Avoid: Generic link text -->
<a href="/programs/computer-science">Click here</a>
```

**Image Alt Text Guidelines:**
```html
<!-- Informative image -->
<img src="graduation-ceremony.jpg" 
     alt="UAGC graduates in caps and gowns celebrating at outdoor ceremony">

<!-- Decorative image -->
<img src="decorative-border.png" alt="" role="presentation">

<!-- Complex image (chart/graph) -->
<img src="enrollment-chart.png" 
     alt="Enrollment trends 2020-2024"
     longdesc="#chart-description">
<div id="chart-description">
  <p>Detailed description of enrollment data...</p>
</div>
```

### Document Structure

**Content Organization:**
- Use descriptive headings to organize content
- Include table of contents for long documents
- Provide summary or overview sections
- Use lists for sequential or grouped information
- Include consistent navigation and orientation cues

**PDF Accessibility:**
- Create tagged PDFs with proper structure
- Include alt text for images in PDFs
- Ensure proper reading order
- Provide HTML alternatives when possible
- Test PDF accessibility with screen readers

## Mobile Accessibility

### Responsive Design Requirements

**Touch Target Standards:**
- **Minimum Size**: 44px × 44px for touch targets
- **Spacing**: Adequate space between touch targets
- **Gesture Support**: Provide alternatives to complex gestures
- **Orientation Support**: Content works in portrait and landscape

**Mobile-Specific Considerations:**
- Zoom functionality available up to 200%
- Content reflows appropriately at different sizes
- Navigation remains accessible on small screens
- Form inputs are appropriately sized for mobile
- Audio/video controls are touch-accessible

### Platform-Specific Guidelines

**iOS Accessibility:**
- VoiceOver support with proper labels
- Dynamic Type support for font sizing
- Proper use of accessibility traits
- Support for Switch Control navigation

**Android Accessibility:**
- TalkBack support with clear announcements
- Focus management for screen readers
- Support for high contrast themes
- Appropriate content descriptions

## Third-Party Tool Compliance

### Vendor Accessibility Requirements

**Evaluation Criteria:**
- WCAG 2.2 AA compliance certification
- Section 508 compliance documentation
- Voluntary Product Accessibility Template (VPAT)
- Regular accessibility testing and updates
- Accessibility support documentation

**Common Tools & Platforms:**
- **Learning Management Systems**: Canvas, Blackboard accessibility
- **Video Platforms**: YouTube, Vimeo captioning requirements
- **Form Builders**: Accessible form creation tools
- **Chat/Support**: Accessible customer service tools
- **Analytics**: Accessible dashboard and reporting tools

### Implementation Guidelines

**Integration Requirements:**
- Maintain site accessibility when embedding third-party content
- Provide accessible alternatives when tools aren't compliant
- Regular testing of integrated accessibility features
- Documentation of accessibility limitations and workarounds

## Legal Compliance & Risk Management

### Documentation Requirements

**Compliance Records:**
- Regular accessibility audits and remediation plans
- Third-party tool accessibility evaluations
- Staff training records and certifications
- User feedback and resolution tracking
- Legal consultation and compliance verification

**Risk Mitigation:**
- Proactive accessibility testing and remediation
- Clear accessibility policy and commitment statements
- Regular staff training on accessibility requirements
- Established feedback channels for accessibility issues
- Legal review of digital accessibility practices

### Incident Response

**Accessibility Complaint Process:**
1. **Immediate Response**: Acknowledge receipt within 48 hours
2. **Assessment**: Evaluate reported accessibility barriers
3. **Remediation**: Implement fixes based on priority level
4. **Follow-up**: Confirm resolution with complainant
5. **Documentation**: Record issue and resolution for compliance tracking

## Training & Professional Development

### Team Training Requirements

**All Staff:**
- Basic accessibility awareness and principles
- Understanding of legal requirements and implications
- How to identify common accessibility barriers
- When and how to escalate accessibility issues

**Technical Staff:**
- WCAG 2.2 implementation techniques
- Accessibility testing tools and procedures
- ARIA best practices and semantic HTML
- Accessible design and development workflows

**Content Creators:**
- Plain language writing techniques
- Alternative text and multimedia accessibility
- Accessible document creation (PDF, Word)
- Inclusive design principles

### Certification & Resources

**Professional Development:**
- **IAAP Certification**: International Association of Accessibility Professionals
- **DHS Section 508**: Federal accessibility training programs
- **WebAIM Training**: Practical accessibility training courses
- **Conference Attendance**: CSUN Assistive Technology Conference

**Internal Resources:**
- Accessibility style guide and standards
- Tool-specific training documentation
- Regular lunch-and-learn sessions
- Accessibility testing lab setup

## Monitoring & Continuous Improvement

### Performance Metrics

**Accessibility KPIs:**
- Percentage of pages meeting WCAG 2.2 AA standards
- Time to resolve accessibility issues
- Number of accessibility-related user complaints
- Third-party tool compliance percentage
- Staff training completion rates

**Regular Assessment:**
- **Monthly**: Automated testing of new/updated content
- **Quarterly**: Comprehensive manual accessibility audits
- **Annually**: Full site accessibility evaluation and legal compliance review
- **Ongoing**: User feedback monitoring and resolution tracking

### Technology Updates

**Emerging Standards:**
- Monitor WCAG 2.3 development and requirements
- Track changes in legal interpretations and requirements
- Evaluate new assistive technology compatibility
- Stay current with platform-specific accessibility updates

---

## Related Resources

### **Internal Documentation**
- [Accessibility Guide](/guides/accessibility): Implementation best practices
- [Accessibility Checklist](/accessibility-checklist): Quick reference for testing
- [UI/UX Best Practices](/ui-ux-best-practices): Inclusive design principles

### **External Standards & Tools**
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/): Official W3C standards
- [Section 508](https://www.section508.gov/): Federal accessibility requirements
- [WebAIM](https://webaim.org/): Accessibility testing and training
- [The A11Y Project](https://www.a11yproject.com/): Community accessibility resources

### **Legal & Compliance**
- [ADA.gov](https://www.ada.gov/): Americans with Disabilities Act resources
- [OCR Education](https://www2.ed.gov/about/offices/list/ocr/): Department of Education guidance
- [DOJ Web Accessibility](https://www.ada.gov/resources/web-guidance/): Department of Justice guidance

---

**For WCAG compliance questions and accessibility support, contact Brian (Front-End & QA Lead).**

*This compliance guide is reviewed quarterly and updated to reflect current legal requirements and best practices.*
