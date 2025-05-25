# Markdown Frontmatter Validation

This directory contains Python scripts to validate the consistency of frontmatter across all markdown files in the Nuxt Content blog.

## Files

- `validate_frontmatter.py` - Main validation script
- `test_validator.py` - Test script to verify the validator works
- `requirements.txt` - Python dependencies
- `VALIDATION_README.md` - This documentation

## Installation

1. Install Python 3.7+ on your system
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Basic Validation

Run validation on all markdown files in the content directory:

```bash
python validate_frontmatter.py
```

### Verbose Output

Show detailed validation results for each file:

```bash
python validate_frontmatter.py --verbose
```

### Custom Content Directory

Specify a different content directory:

```bash
python validate_frontmatter.py --content-dir path/to/content
```

## Validation Rules

The script validates against a modern frontmatter schema:

### Required Fields
- `title` (string) - Article title
- `draft` (boolean) - Whether the article is a draft
- `ignore` (boolean) - Whether to ignore the article in builds
- `topics` (array of strings) - Article topics/tags

### Optional Fields
- `created_at` (ISO date string) - Creation timestamp
- `date` (ISO date string) - Publication date
- `last_modified` (ISO date string) - Last modification timestamp
- `description` (string) - Article description

### Deprecated Fields
The script will warn about these legacy fields that should be migrated:
- `type`
- `author`
- `category`
- `dropdown`
- `tags` (use `topics` instead)
- `meta`

## Common Issues Found

1. **Malformed YAML**: Extra quotes in title fields
2. **Missing required fields**: Files without title, draft, ignore, or topics
3. **Inconsistent field names**: Using `tags` instead of `topics`
4. **Invalid date formats**: Non-ISO date strings
5. **Empty fields**: Empty topics arrays or blank titles

## Example Valid Frontmatter

```yaml
---
title: How to Validate Markdown Frontmatter
draft: false
ignore: false
topics:
  - markdown
  - validation
  - nuxt
created_at: 2025-05-25T03:00:00
date: 2025-05-25T03:00:00
last_modified: 2025-05-25T03:00:00
description: A guide to validating frontmatter consistency
---
```

## Testing

Test the validator functions:

```bash
python test_validator.py
```

## Exit Codes

- `0` - All files passed validation
- `1` - Validation failed (files have errors or setup issues)

## Future Enhancements

- Auto-fix functionality for common issues
- Integration with CI/CD pipelines
- Custom validation rules configuration
- Frontmatter normalization/formatting