# Development Workflows

This page outlines the standard development workflows for the UAGC Digital Experience team.

## Overview

Our development workflow is designed to ensure code quality, maintain site stability, and enable efficient collaboration among team members.

## Git Workflow

We follow a feature branch workflow:

1. Create a feature branch from `develop`
2. Make changes in your branch
3. Submit a pull request to `develop`
4. After review and approval, merge to `develop`
5. Changes in `develop` are deployed to staging
6. Release branches are created from `develop` and merged to `main`
7. The `main` branch is deployed to production

## Code Review Process

All code changes must go through a review process:

1. Create a pull request with a clear description of changes
2. Automated tests are run
3. Code is reviewed by at least one other developer
4. Changes are approved or feedback is provided
5. After approval, changes can be merged

## Testing Standards

### Types of Testing

- Unit testing for individual functions
- Integration testing for component interaction
- End-to-end testing for complete user flows
- Accessibility testing for WCAG compliance
- Performance testing for Core Web Vitals

### Testing Tools

- PHPUnit for PHP testing
- Jest for JavaScript testing
- Cypress for end-to-end testing
- Lighthouse for performance testing

## Deployment Process

### Environments

- **Dev**: Development and integration testing environment
- **Staging**: Pre-production testing and quality assurance
- **Production**: Live site

### Deployment Steps

1. Code is merged to the appropriate branch
2. CI/CD pipeline runs tests
3. Deployment is triggered automatically
4. Post-deployment tests verify functionality
5. Monitoring alerts are set up for any issues

## Documentation Standards

All new features, major changes, and bug fixes should be documented:

- Code comments for complex logic
- README updates for new features
- Technical documentation in the wiki
- User documentation for end-users

## Related Resources

- [Drupal Coding Standards](guides/drupal-standards.md)
- [QA Smoke Test](guides/qa-smoke-test.md)
- [Release & Incident Procedure](guides/release-incident.md)
- [Performance & Core Web Vitals](guides/performance-web-vitals.md) 