#!/bin/bash

# Deploy UAGC DX documentation to GitHub Pages

echo "Starting deployment to GitHub Pages..."

# Ensure we have the latest dependencies
pip install -r requirements.txt

# Build documentation
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy --force

echo "Deployment complete! Your documentation is now available at the GitHub Pages URL."
echo "Check your repository settings to find the URL." 