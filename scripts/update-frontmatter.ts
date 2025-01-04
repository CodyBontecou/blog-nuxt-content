import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import { sluggify } from '~/lib/utils/sluggify'

// Function to process a single markdown file
function processMarkdownFile(filePath: string): void {
    try {
        // Read the file
        const fileContent = fs.readFileSync(filePath, 'utf8')

        // Parse frontmatter
        const { data, content } = matter(fileContent)

        // Only process if there's a title
        if (!data.title) {
            console.warn(`No title found in ${filePath}`)
            return
        }

        // Create updated frontmatter
        const updatedData = {
            ...data,
            slug: data.slug || sluggify(data.title),
            translate: data.transte || true,
            translated_to: data.translated_to || '',
        }

        // Create new file content
        const updatedFileContent = matter.stringify(content, updatedData)

        // Write back to file
        fs.writeFileSync(filePath, updatedFileContent)
        console.log(`Updated ${filePath}`)
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error)
    }
}

// Main function to process all markdown files
function processDirectory(): void {
    const contentDir = path.join(process.cwd(), 'content')

    try {
        // Read directory
        const files = fs.readdirSync(contentDir)

        // Filter for markdown files
        const markdownFiles = files.filter(
            file =>
                path.extname(file).toLowerCase() === '.md' &&
                fs.statSync(path.join(contentDir, file)).isFile()
        )

        // Process each markdown file
        markdownFiles.forEach(file => {
            const filePath = path.join(contentDir, file)
            processMarkdownFile(filePath)
        })

        console.log('Finished processing markdown files in content directory')
    } catch (error) {
        console.error('Error reading content directory:', error)
    }
}

// Run the script
processDirectory()
