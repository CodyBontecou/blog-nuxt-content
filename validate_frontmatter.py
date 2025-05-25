#!/usr/bin/env python3
"""
Markdown Frontmatter Validation Script

This script validates the consistency of frontmatter across all markdown files 
in the content directory of a Nuxt Content blog.

Usage:
    python validate_frontmatter.py [--fix] [--verbose]
    
Options:
    --fix      Attempt to automatically fix some common issues
    --verbose  Show detailed validation results for each file
"""

import os
import re
import sys
import yaml
import argparse
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Union, Any


class FrontmatterValidator:
    def __init__(self, content_dir: str = "content", verbose: bool = False):
        self.content_dir = Path(content_dir)
        self.verbose = verbose
        self.errors = []
        self.warnings = []
        
        # Define the expected modern frontmatter schema
        self.required_fields = ["title", "draft", "ignore", "topics"]
        self.optional_fields = ["created_at", "date", "last_modified", "description"]
        self.deprecated_fields = ["type", "author", "category", "dropdown", "tags", "meta"]
        
        # Valid topic values (you can extend this list)
        self.valid_topics = {
            "ai", "llm", "agents", "tdd", "typescript", "nuxt", "nuxt content", 
            "seo", "i18n", "vue", "javascript", "python", "nodejs", "cypress",
            "testing", "automation", "travel", "cooking", "lifestyle", "tutorial",
            "guide", "tips", "tools", "development", "web", "frontend", "backend"
        }

    def extract_frontmatter(self, content: str) -> Optional[Dict[str, Any]]:
        """Extract and parse YAML frontmatter from markdown content."""
        frontmatter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
        
        if not frontmatter_match:
            return None
            
        try:
            return yaml.safe_load(frontmatter_match.group(1))
        except yaml.YAMLError as e:
            self.errors.append(f"YAML parsing error: {e}")
            return None

    def validate_title(self, frontmatter: Dict[str, Any], filepath: str) -> List[str]:
        """Validate the title field."""
        issues = []
        
        if "title" not in frontmatter:
            issues.append("Missing required field: title")
            return issues
            
        title = frontmatter["title"]
        
        if not isinstance(title, str):
            issues.append(f"Title must be a string, got {type(title).__name__}")
            return issues
            
        if not title.strip():
            issues.append("Title cannot be empty")
            
        # Check for malformed quotes
        if title.startswith('"') and title.endswith('"') and title.count('"') > 2:
            issues.append(f"Malformed title with extra quotes: {title}")
            
        return issues

    def validate_boolean_fields(self, frontmatter: Dict[str, Any]) -> List[str]:
        """Validate boolean fields like draft and ignore."""
        issues = []
        
        for field in ["draft", "ignore"]:
            if field not in frontmatter:
                issues.append(f"Missing required field: {field}")
                continue
                
            value = frontmatter[field]
            if not isinstance(value, bool):
                issues.append(f"Field '{field}' must be boolean, got {type(value).__name__}: {value}")
                
        return issues

    def validate_topics(self, frontmatter: Dict[str, Any]) -> List[str]:
        """Validate the topics field."""
        issues = []
        
        if "topics" not in frontmatter:
            if "tags" in frontmatter:
                issues.append("Use 'topics' instead of deprecated 'tags' field")
            else:
                issues.append("Missing required field: topics")
            return issues
            
        topics = frontmatter["topics"]
        
        if not isinstance(topics, list):
            issues.append(f"Topics must be a list, got {type(topics).__name__}")
            return issues
            
        if len(topics) == 0:
            issues.append("Topics list cannot be empty")
            
        for topic in topics:
            if not isinstance(topic, str):
                issues.append(f"All topics must be strings, got {type(topic).__name__}: {topic}")
            elif topic.strip() == "":
                issues.append("Topics cannot be empty strings")
                
        return issues

    def validate_dates(self, frontmatter: Dict[str, Any]) -> List[str]:
        """Validate date fields."""
        issues = []
        date_fields = ["created_at", "date", "last_modified"]
        
        for field in date_fields:
            if field in frontmatter:
                date_value = frontmatter[field]
                if isinstance(date_value, str):
                    # Try to parse the date string
                    try:
                        datetime.fromisoformat(date_value.replace('Z', '+00:00'))
                    except ValueError:
                        issues.append(f"Invalid date format in '{field}': {date_value}")
                elif not isinstance(date_value, datetime):
                    issues.append(f"Date field '{field}' must be a string or datetime, got {type(date_value).__name__}")
                    
        return issues

    def check_deprecated_fields(self, frontmatter: Dict[str, Any]) -> List[str]:
        """Check for deprecated fields."""
        warnings = []
        
        for field in self.deprecated_fields:
            if field in frontmatter:
                warnings.append(f"Deprecated field found: '{field}' - consider migrating to modern format")
                
        return warnings

    def validate_file(self, filepath: Path) -> Dict[str, Any]:
        """Validate a single markdown file."""
        result = {
            "filepath": str(filepath.relative_to(self.content_dir.parent)),
            "errors": [],
            "warnings": [],
            "has_frontmatter": False,
            "frontmatter": None
        }
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            result["errors"].append(f"Failed to read file: {e}")
            return result
            
        frontmatter = self.extract_frontmatter(content)
        
        if frontmatter is None:
            result["errors"].append("No valid frontmatter found")
            return result
            
        result["has_frontmatter"] = True
        result["frontmatter"] = frontmatter
        
        # Run all validations
        result["errors"].extend(self.validate_title(frontmatter, str(filepath)))
        result["errors"].extend(self.validate_boolean_fields(frontmatter))
        result["errors"].extend(self.validate_topics(frontmatter))
        result["errors"].extend(self.validate_dates(frontmatter))
        
        # Check for deprecated fields (warnings)
        result["warnings"].extend(self.check_deprecated_fields(frontmatter))
        
        return result

    def scan_content_directory(self) -> List[Dict[str, Any]]:
        """Scan all markdown files in the content directory."""
        results = []
        
        if not self.content_dir.exists():
            self.errors.append(f"Content directory not found: {self.content_dir}")
            return results
            
        # Find all markdown files, excluding templates
        md_files = []
        for md_file in self.content_dir.rglob("*.md"):
            # Skip template files
            if "template" in str(md_file).lower():
                continue
            md_files.append(md_file)
            
        if not md_files:
            self.warnings.append("No markdown files found in content directory")
            return results
            
        for md_file in sorted(md_files):
            if self.verbose:
                print(f"Validating: {md_file.relative_to(self.content_dir.parent)}")
            
            result = self.validate_file(md_file)
            results.append(result)
            
        return results

    def generate_report(self, results: List[Dict[str, Any]]) -> None:
        """Generate a validation report."""
        total_files = len(results)
        files_with_errors = len([r for r in results if r["errors"]])
        files_with_warnings = len([r for r in results if r["warnings"]])
        
        print(f"\n{'='*50}")
        print("FRONTMATTER VALIDATION REPORT")
        print(f"{'='*50}")
        print(f"Total files processed: {total_files}")
        print(f"Files with errors: {files_with_errors}")
        print(f"Files with warnings: {files_with_warnings}")
        print(f"Files passed: {total_files - files_with_errors}")
        
        if files_with_errors > 0:
            print(f"\n{'='*50}")
            print("FILES WITH ERRORS:")
            print(f"{'='*50}")
            
            for result in results:
                if result["errors"]:
                    print(f"\n❌ {result['filepath']}")
                    for error in result["errors"]:
                        print(f"   • {error}")
                        
        if files_with_warnings > 0 and self.verbose:
            print(f"\n{'='*50}")
            print("FILES WITH WARNINGS:")
            print(f"{'='*50}")
            
            for result in results:
                if result["warnings"]:
                    print(f"\n⚠️  {result['filepath']}")
                    for warning in result["warnings"]:
                        print(f"   • {warning}")
                        
        # Summary of common issues
        all_errors = []
        for result in results:
            all_errors.extend(result["errors"])
            
        if all_errors:
            print(f"\n{'='*50}")
            print("COMMON ISSUES SUMMARY:")
            print(f"{'='*50}")
            
            error_counts = {}
            for error in all_errors:
                # Group similar errors
                error_key = error.split(':')[0] if ':' in error else error
                error_counts[error_key] = error_counts.get(error_key, 0) + 1
                
            for error_type, count in sorted(error_counts.items(), key=lambda x: x[1], reverse=True):
                print(f"• {error_type}: {count} occurrence(s)")


def main():
    parser = argparse.ArgumentParser(description="Validate Nuxt Content markdown frontmatter")
    parser.add_argument("--content-dir", default="content", help="Path to content directory")
    parser.add_argument("--verbose", "-v", action="store_true", help="Show detailed output")
    parser.add_argument("--fix", action="store_true", help="Attempt to fix common issues (not implemented yet)")
    
    args = parser.parse_args()
    
    if args.fix:
        print("⚠️  Auto-fix functionality not yet implemented")
        
    validator = FrontmatterValidator(content_dir=args.content_dir, verbose=args.verbose)
    results = validator.scan_content_directory()
    
    if validator.errors:
        print("❌ Validation setup errors:")
        for error in validator.errors:
            print(f"   • {error}")
        sys.exit(1)
        
    validator.generate_report(results)
    
    # Exit with error code if any files have errors
    files_with_errors = len([r for r in results if r["errors"]])
    if files_with_errors > 0:
        print(f"\n💥 Validation failed: {files_with_errors} file(s) have errors")
        sys.exit(1)
    else:
        print(f"\n✅ All files passed validation!")
        sys.exit(0)


if __name__ == "__main__":
    main()