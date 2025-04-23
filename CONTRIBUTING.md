# Contributing to UAGC DX Documentation

Thank you for contributing to our documentation! This guide explains how to make changes and get them published.

## Getting Started

1. **Request access** to the repository by contacting Omar.
2. **Clone the repository** to your local machine:
   ```
   git clone https://github.com/omac049/uagc-dx-documentation.git
   cd uagc-dx-documentation
   ```
3. **Install dependencies**:
   ```
   pip install -r requirements.txt
   ```

## Making Changes

### For Small Updates

1. Make your changes directly on the `main` branch
2. Test locally with `mkdocs serve`
3. Commit and push your changes
4. The GitHub Action will automatically deploy your changes

### For Larger Changes

1. Create a new branch:
   ```
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test locally with `mkdocs serve`
4. Commit and push your branch
5. Create a Pull Request on GitHub
6. After review and approval, your changes will be merged and deployed

## Documentation Guidelines

- Use clear, concise language
- Include step-by-step instructions for processes
- Add examples when possible
- Use admonitions (note, warning, etc.) for important information
- Keep navigation logical and organized
- Test any code examples you include

## File Structure

- `docs/`: All documentation files (Markdown)
- `docs/assets/`: Images and other assets
- `docs/guides/`: Step-by-step guides for various tasks
- `mkdocs.yml`: Site configuration

## Formatting Guidelines

### Headings

Use proper heading hierarchy:
```markdown
# Main Page Title (H1)
## Major Section (H2)
### Subsection (H3)
#### Minor subsection (H4)
```

### Admonitions

For important information:
```markdown
!!! note "Note Title"
    This is a note with important information.

!!! warning "Warning Title"
    This is a warning about something to be careful about.
```

### Code Blocks

For code examples:
````markdown
```python
def example_function():
    return "This is a code example"
```
````

## Getting Help

If you need help with the documentation or have questions, contact:
- Omar Corral - SEO & Tracking Manager 