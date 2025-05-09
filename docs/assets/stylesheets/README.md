# UAGC DX Documentation CSS Architecture

This directory contains the CSS styling for the UAGC DX Documentation site built with MkDocs and the Material theme.

## CSS Architecture Overview

**As of [Current Date]**, we've implemented a consolidated, component-based CSS architecture to replace the previous fragmented approach that relied heavily on `!important` declarations and inline styles.

### Key Features

- **Single Source of Truth**: All custom styling is in `custom.css`
- **CSS Custom Properties**: Centralized design tokens as CSS variables
- **Component-Based Organization**: CSS is organized by component type
- **No !important Declarations**: Improved specificity through proper selector hierarchy
- **Responsive Design**: Mobile-first approach with consistent breakpoints
- **Clear Documentation**: Comments and section organization

## File Structure

- `custom.css` - Main consolidated CSS file (load this in mkdocs.yml)
- `deprecated/` - Legacy CSS files (kept for reference, do not use)
- `README.md` - This documentation file

## Best Practices

When modifying or adding CSS:

1. **Never use !important** - Fix specificity issues properly through selector hierarchy
2. **Use the existing variables** - Find them at the top of custom.css
3. **Follow the component organization** - Add styles to the appropriate section
4. **Document your changes** - Add comments for non-obvious styling decisions
5. **Test all breakpoints** - Ensure changes work on mobile, tablet and desktop
6. **Keep specificity low** - Use the minimum needed specificity for selectors

## Roadmap for Future Improvements

### Phase 1: Maintenance & Monitoring (Current)
- Monitor for any regressions or issues with the consolidated approach
- Fine-tune responsive breakpoints as needed
- Address any edge cases discovered in testing

### Phase 2: Preprocessing & Build Process
- Implement SASS/SCSS preprocessing
- Split custom.css into modular component files
- Create a build process for compiling and minimizing CSS

### Phase 3: Advanced Architecture
- Implement a formal design token system
- Create a component library documentation
- Add automated linting for CSS via stylelint
- Consider adopting a methodology like BEM, ITCSS, or Utility-first

## Deprecation Notice

Files in the `deprecated/` directory are kept for reference only and will be removed after [Date 3 months from now]. Do not reference these files in new code.

## How to Add New Components

1. Identify the appropriate section in `custom.css`
2. Follow the existing patterns and naming conventions
3. Use CSS variables for colors, spacing, etc.
4. Add comments explaining the component's purpose
5. Test across all breakpoints before committing

## Troubleshooting

If you encounter styling issues:

1. Check browser inspector to identify the problematic styles
2. Look for specificity conflicts (avoid solving with !important)
3. Ensure the component follows the documented organization
4. Verify that responsive styles are properly applied

For further questions, contact the DX team. 