# Frontmatter Validation

This project includes automated validation for markdown frontmatter to ensure consistency across all blog posts.

## Quick Start

Run validation locally:
```bash
npm run validate:frontmatter
# or
npm run lint:frontmatter
```

## Required Fields

All markdown files in the `content/` directory must include:

- **`title`** (string): The article title
- **`date`** (string): Publication date in YYYY-MM-DD or ISO 8601 format

## Recommended Fields

For better SEO and user experience, include:

- **`description`** (string): Meta description for SEO (recommended 150-160 chars)
- **`topics`** (array): Array of topic strings for categorization

## Standard Format

### Modern Format (Recommended)
```yaml
---
title: "Your Article Title"
description: "A brief description of your article for SEO purposes"
date: "2024-01-15"
draft: false
ignore: false
topics: ["nuxt", "vue", "typescript"]
created_at: "2024-01-15T10:30:00.000Z"
last_modified: "2024-01-16T09:15:00.000Z"
---
```

### Field Descriptions

- `title`: Article title (avoid escaped quotes)
- `description`: SEO meta description
- `date`: Publication date (YYYY-MM-DD format)
- `draft`: Boolean flag for draft status
- `ignore`: Boolean flag to exclude from listings
- `topics`: Array of topic strings for categorization
- `created_at`: ISO 8601 timestamp when created
- `last_modified`: ISO 8601 timestamp when last updated

## Deprecated Fields

The following fields are deprecated in the modern format:

- `type`: No longer needed
- `author`: Author info is handled globally
- `slug`: Use filename instead
- `dropdown`: Use `topics` array instead
- `last_modified_date`: Use `last_modified` instead
- `meta`: Rich meta arrays are handled by the system

## Validation Rules

### Errors (Must Fix)
- Missing required fields (`title`, `date`)
- Invalid field types (e.g., non-string title)
- Invalid date formats
- Malformed YAML syntax
- Escaped quotes in title (indicates YAML formatting issues)

### Warnings (Should Fix)
- Missing recommended fields (`description`, `topics`)
- Using deprecated fields
- Mixed old/new date field formats
- Very long titles (>100 chars)

## Continuous Integration

Frontmatter validation runs automatically on:
- Pull requests that modify content files
- Pushes to the main branch

Failed validation will:
- Block PR merges
- Add a comment with failure details
- Exit with error code 1

## Common Issues & Fixes

### Malformed Title
❌ **Wrong:**
```yaml
title: "My \"quoted\" title"
```

✅ **Correct:**
```yaml
title: "My 'quoted' title"
# or
title: My quoted title
```

### Invalid Date Format
❌ **Wrong:**
```yaml
date: "Jan 15, 2024"
```

✅ **Correct:**
```yaml
date: "2024-01-15"
```

### Missing Description
⚠️ **Warning:**
```yaml
title: "My Article"
date: "2024-01-15"
```

✅ **Better:**
```yaml
title: "My Article"
description: "A comprehensive guide to building amazing things"
date: "2024-01-15"
```

## Migration Guide

### From Legacy to Modern Format

1. Remove deprecated fields:
   - `type: post` → remove
   - `author: {...}` → remove
   - `slug: "..."` → remove
   - `dropdown: [...]` → rename to `topics: [...]`
   - `last_modified_date` → rename to `last_modified`

2. Add recommended fields:
   - Add `description` for SEO
   - Convert categorization to `topics` array
   - Add timestamp fields if needed

3. Validate the changes:
   ```bash
   npm run validate:frontmatter
   ```

## Development

The validation script is located at `scripts/validate-frontmatter.ts` and can be extended to add new validation rules as needed.

To add new validation rules:
1. Edit the `FrontmatterValidator` class
2. Add new validation methods
3. Update the schema interface if needed
4. Test against existing content