#!/bin/bash

# Setup script for UAGC DX Documentation

echo "Setting up UAGC DX Documentation environment..."

# Check for Python installation
if command -v python3 &>/dev/null; then
    echo "Python found!"
else
    echo "Python 3 is required but not found. Please install Python 3 before continuing."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
pip3 install -r requirements.txt

# Add Python bin to PATH for this session
export PATH=$PATH:$HOME/Library/Python/3.9/bin

# Verify installation
if command -v mkdocs &>/dev/null; then
    echo "MkDocs installed successfully!"
else
    echo "MkDocs not found in PATH. You may need to add it manually:"
    echo "export PATH=\$PATH:\$HOME/Library/Python/3.9/bin"
    exit 1
fi

echo "Setup complete! You can now run the documentation server with:"
echo "mkdocs serve"
echo ""
echo "To view the documentation, visit http://localhost:8000 in your browser." 