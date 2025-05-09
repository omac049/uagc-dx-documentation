"""
MkDocs Macros module for the UAGC Digital Experience documentation.
This module provides utility functions for the documentation site.
"""

import datetime
import re


def define_env(env):
    """
    Define environment variables, macros and filters for MkDocs.

    Args:
        env: The MkDocs environment.
    """
    @env.macro
    def now(format_string="%Y-%m-%d %H:%M:%S"):
        """
        Return the current date and time in the specified format.
        
        Args:
            format_string: The format string for the datetime.
            
        Returns:
            str: The formatted date and time.
        """
        return datetime.datetime.now().strftime(format_string)

    @env.macro
    def context():
        """
        Return information about the current documentation context.
        
        Returns:
            dict: Information about the documentation context.
        """
        return {
            "version": env.variables.get("version", {}).get("default", "latest"),
            "page_title": env.page.title,
            "page_url": env.page.url,
            "site_name": env.variables.get("site_name", "UAGC DX Documentation")
        }

    @env.macro
    def macros_info():
        """
        Return information about available macros.
        
        Returns:
            list: List of available macros.
        """
        return [f for f in dir(env.macros) if not f.startswith("_") and callable(getattr(env.macros, f))]
        
    @env.macro
    def fix_url(url):
        """
        Fix URLs to ensure they have the correct format.
        
        Args:
            url: The URL to fix.
            
        Returns:
            str: The fixed URL.
        """
        if not url:
            return ""
            
        url = str(url)
        if not url.startswith(("http://", "https://", "/")):
            url = "/" + url.lstrip("/")
        return url
        
    @env.filter
    def pretty(text):
        """
        Format text to make it look prettier.
        
        Args:
            text: The text to format.
            
        Returns:
            str: The formatted text.
        """
        if not text:
            return ""
            
        text = str(text)
        # Title case and remove underscores
        return text.replace("_", " ").title() 