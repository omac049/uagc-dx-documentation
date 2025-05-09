# ReadTheDocs Configuration for UAGC DX Team Hub

This documentation explains how the ReadTheDocs configuration is set up for the UAGC DX Team Hub.

## Key Configuration Files

1. `.readthedocs.yaml` - Main configuration file for ReadTheDocs
2. `mkdocs.yml` - MkDocs configuration file
3. `requirements.txt` - Python dependencies for the documentation site

## Important Notes

- The site uses the Material for MkDocs theme with custom styling
- Images for team members are handled as initials in the CSS when not available
- The configuration uses a string format for pymdownx.superfences to ensure compatibility with ReadTheDocs
- ReadTheDocs has a limitation with YAML tags that use `!!python/name:` syntax

## Troubleshooting

If you encounter build errors in ReadTheDocs:

1. Check the ReadTheDocs build logs for specific error messages
2. Make sure all referenced files in `mkdocs.yml` navigation actually exist
3. Ensure all dependencies in `requirements.txt` are compatible with each other
4. Avoid using `!!python/name:` syntax in YAML configurations

## Rebuilding Documentation

To test locally:

```bash
# Install dependencies
pip install -r requirements.txt

# Run MkDocs server
mkdocs serve
```

To deploy to ReadTheDocs:

1. Push changes to the GitHub repository
2. ReadTheDocs will automatically build and deploy the documentation 