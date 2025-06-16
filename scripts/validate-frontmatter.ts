#!/usr/bin/env tsx

import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { parse } from 'yaml'

interface ValidationError {
  file: string
  field: string
  message: string
  severity: 'error' | 'warning'
}

interface FrontmatterSchema {
  title: string
  description?: string
  date: string
  draft?: boolean
  ignore?: boolean
  topics?: string[]
  created_at?: string
  last_modified?: string
  [key: string]: any
}

const REQUIRED_FIELDS = ['title', 'date'] as const
const RECOMMENDED_FIELDS = ['description', 'topics'] as const
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?(\.\d{3}Z?)?$/

class FrontmatterValidator {
  private errors: ValidationError[] = []

  validate(content: string, filename: string): ValidationError[] {
    this.errors = []
    
    try {
      const frontmatter = this.extractFrontmatter(content)
      if (!frontmatter) {
        this.addError(filename, 'frontmatter', 'No frontmatter found', 'error')
        return this.errors
      }

      this.validateRequiredFields(frontmatter, filename)
      this.validateFieldTypes(frontmatter, filename)
      this.validateDates(frontmatter, filename)
      this.validateRecommendedFields(frontmatter, filename)
      this.validateTitle(frontmatter, filename)
      this.checkDeprecatedFields(frontmatter, filename)

    } catch (error) {
      this.addError(filename, 'parsing', `Failed to parse frontmatter: ${error}`, 'error')
    }

    return this.errors
  }

  private extractFrontmatter(content: string): any {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (!frontmatterMatch) return null
    
    try {
      return parse(frontmatterMatch[1])
    } catch (error) {
      throw new Error(`YAML parsing error: ${error}`)
    }
  }

  private validateRequiredFields(frontmatter: any, filename: string): void {
    for (const field of REQUIRED_FIELDS) {
      if (!frontmatter[field]) {
        this.addError(filename, field, `Required field '${field}' is missing`, 'error')
      }
    }
  }

  private validateFieldTypes(frontmatter: any, filename: string): void {
    if (frontmatter.title && typeof frontmatter.title !== 'string') {
      this.addError(filename, 'title', 'Title must be a string', 'error')
    }

    if (frontmatter.description && typeof frontmatter.description !== 'string') {
      this.addError(filename, 'description', 'Description must be a string', 'error')
    }

    if (frontmatter.draft && typeof frontmatter.draft !== 'boolean') {
      this.addError(filename, 'draft', 'Draft must be a boolean', 'error')
    }

    if (frontmatter.ignore && typeof frontmatter.ignore !== 'boolean') {
      this.addError(filename, 'ignore', 'Ignore must be a boolean', 'error')
    }

    if (frontmatter.topics && !Array.isArray(frontmatter.topics)) {
      this.addError(filename, 'topics', 'Topics must be an array', 'error')
    }

    if (frontmatter.topics && Array.isArray(frontmatter.topics)) {
      frontmatter.topics.forEach((topic: any, index: number) => {
        if (typeof topic !== 'string') {
          this.addError(filename, `topics[${index}]`, 'Topic items must be strings', 'error')
        }
      })
    }
  }

  private validateDates(frontmatter: any, filename: string): void {
    const dateFields = ['date', 'created_at', 'last_modified', 'last_modified_date']
    
    for (const field of dateFields) {
      if (frontmatter[field]) {
        const dateValue = frontmatter[field]
        if (typeof dateValue !== 'string') {
          this.addError(filename, field, `Date field '${field}' must be a string`, 'error')
          continue
        }

        if (!DATE_REGEX.test(dateValue)) {
          this.addError(filename, field, `Date field '${field}' has invalid format. Expected YYYY-MM-DD or ISO 8601`, 'error')
        }
      }
    }

    // Check for date field inconsistencies
    const hasOldFormat = frontmatter.last_modified_date
    const hasNewFormat = frontmatter.created_at || frontmatter.last_modified
    
    if (hasOldFormat && hasNewFormat) {
      this.addError(filename, 'date_consistency', 'Mixed old and new date field formats detected', 'warning')
    }
  }

  private validateRecommendedFields(frontmatter: any, filename: string): void {
    for (const field of RECOMMENDED_FIELDS) {
      if (!frontmatter[field]) {
        this.addError(filename, field, `Recommended field '${field}' is missing`, 'warning')
      }
    }
  }

  private validateTitle(frontmatter: any, filename: string): void {
    if (frontmatter.title) {
      const title = frontmatter.title
      
      // Check for escaped quotes which might indicate malformed YAML
      if (title.includes('\\"') || title.includes("\\'")) {
        this.addError(filename, 'title', 'Title contains escaped quotes - check YAML formatting', 'error')
      }

      // Check for excessively long titles
      if (title.length > 100) {
        this.addError(filename, 'title', 'Title is very long (>100 chars) - consider shortening for SEO', 'warning')
      }
    }
  }

  private checkDeprecatedFields(frontmatter: any, filename: string): void {
    const deprecatedFields = [
      { field: 'type', message: 'Type field is deprecated in modern format' },
      { field: 'author', message: 'Author field is deprecated in modern format' }, 
      { field: 'slug', message: 'Slug field is deprecated - use filename instead' },
      { field: 'dropdown', message: 'Dropdown field is deprecated - use topics instead' },
      { field: 'last_modified_date', message: 'Use last_modified instead of last_modified_date' }
    ]

    for (const { field, message } of deprecatedFields) {
      if (frontmatter[field]) {
        this.addError(filename, field, message, 'warning')
      }
    }
  }

  private addError(file: string, field: string, message: string, severity: 'error' | 'warning'): void {
    this.errors.push({ file, field, message, severity })
  }
}

async function validateAllMarkdownFiles(): Promise<void> {
  const contentDir = join(process.cwd(), 'content')
  const validator = new FrontmatterValidator()
  const allErrors: ValidationError[] = []

  try {
    const files = await readdir(contentDir, { recursive: true })
    const markdownFiles = files
      .filter(file => typeof file === 'string' && file.endsWith('.md'))
      .filter(file => !file.includes('template')) // Skip template files

    console.log(`\n🔍 Validating frontmatter in ${markdownFiles.length} markdown files...\n`)

    for (const file of markdownFiles) {
      const filepath = join(contentDir, file)
      const content = await readFile(filepath, 'utf-8')
      const errors = validator.validate(content, file)
      allErrors.push(...errors)
    }

    // Report results
    const errorCount = allErrors.filter(e => e.severity === 'error').length
    const warningCount = allErrors.filter(e => e.severity === 'warning').length

    if (allErrors.length === 0) {
      console.log('✅ All frontmatter validation passed!')
    } else {
      console.log(`📊 Validation Results:`)
      console.log(`   ${errorCount} errors`)
      console.log(`   ${warningCount} warnings`)
      console.log(`   ${markdownFiles.length - allErrors.filter(e => e.severity === 'error').reduce((acc, err) => {
        if (!acc.includes(err.file)) acc.push(err.file)
        return acc
      }, [] as string[]).length} files passed\n`)

      // Group errors by file
      const errorsByFile: Record<string, ValidationError[]> = {}
      allErrors.forEach(error => {
        if (!errorsByFile[error.file]) {
          errorsByFile[error.file] = []
        }
        errorsByFile[error.file].push(error)
      })

      // Display errors
      Object.entries(errorsByFile).forEach(([file, fileErrors]) => {
        console.log(`📄 ${file}:`)
        fileErrors.forEach(error => {
          const icon = error.severity === 'error' ? '❌' : '⚠️'
          console.log(`   ${icon} ${error.field}: ${error.message}`)
        })
        console.log('')
      })
    }

    // Exit with error code if there are validation errors
    if (errorCount > 0) {
      process.exit(1)
    }

  } catch (error) {
    console.error('Failed to validate frontmatter:', error)
    process.exit(1)
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateAllMarkdownFiles()
}

export { FrontmatterValidator, type ValidationError, type FrontmatterSchema }