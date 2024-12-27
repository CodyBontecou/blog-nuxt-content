import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { visit } from 'unist-util-visit'
import { HfInference } from '@huggingface/inference'
import yaml from 'yaml'
import fs from 'fs/promises'
import { sluggify } from '../utils/sluggify'

export class ASTMarkdownTranslator {
    private hf: HfInference
    private model: string
    private endpoint: string
    private translatableFrontmatterFields = ['title', 'description']

    constructor(
        apiKey: string,
        endpoint: string,
        model: string = 'facebook/seamless-m4t-v2-large'
    ) {
        this.hf = new HfInference(apiKey)
        this.endpoint = endpoint
        this.model = model
    }

    private async translateText(
        text: string,
        sourceLang: string,
        targetLang: string
    ): Promise<string> {
        try {
            const response = await this.hf.endpoint(this.endpoint).translation({
                model: this.model,
                inputs: text,
                parameters: {
                    src_lang: sourceLang,
                    tgt_lang: targetLang,
                },
            })

            if (Array.isArray(response)) {
                return response[0]?.translation_text || String(response[0])
            }

            return response?.translation_text || String(response)
        } catch (error) {
            console.error('Translation error:', error)
            throw error
        }
    }

    private async translateFrontmatter(
        frontmatter: Record<string, any>,
        sourceLang: string,
        targetLang: string
    ): Promise<Record<string, any>> {
        const translatedFrontmatter = { ...frontmatter }

        // Set the lang property to the target language
        translatedFrontmatter.lang = targetLang

        for (const field of this.translatableFrontmatterFields) {
            const value = frontmatter[field]
            if (!value) continue

            if (typeof value === 'string' && value.trim()) {
                translatedFrontmatter[field] = await this.translateText(
                    value,
                    sourceLang,
                    targetLang
                )
            } else if (Array.isArray(value)) {
                translatedFrontmatter[field] = await Promise.all(
                    value.map(async item =>
                        typeof item === 'string' && item.trim()
                            ? await this.translateText(
                                  item,
                                  sourceLang,
                                  targetLang
                              )
                            : item
                    )
                )
            }
        }

        return translatedFrontmatter
    }

    private extractFrontmatter(content: string): {
        frontmatter: Record<string, any> | null
        content: string
    } {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
        const match = content.match(frontmatterRegex)

        if (!match) {
            return { frontmatter: null, content }
        }

        try {
            const frontmatter = yaml.parse(match[1])
            return { frontmatter, content: match[2] }
        } catch (error) {
            console.warn('Error parsing frontmatter:', error)
            return { frontmatter: null, content }
        }
    }

    private async translateMarkdownAST(
        tree: any,
        sourceLang: string,
        targetLang: string
    ) {
        const translateNode = async (node: any) => {
            if (node.type === 'text' && node.value.trim()) {
                node.value = await this.translateText(
                    node.value,
                    sourceLang,
                    targetLang
                )
            }
            if (node.type === 'heading' || node.type === 'paragraph') {
                for (const child of node.children || []) {
                    if (child.type === 'text' && child.value.trim()) {
                        child.value = await this.translateText(
                            child.value,
                            sourceLang,
                            targetLang
                        )
                    }
                }
            }
        }

        const promises: Promise<void>[] = []
        visit(tree, node => {
            if (node.type !== 'code' && node.type !== 'inlineCode') {
                promises.push(translateNode(node))
            }
        })

        await Promise.all(promises)
    }

    public checkFrontmatterCondition(
        content: string,
        condition: (frontmatter: Record<string, any>) => boolean
    ): boolean {
        const { frontmatter } = this.extractFrontmatter(content)
        if (!frontmatter) return false
        return condition(frontmatter)
    }

    public async translateMarkdownFile(
        content: string,
        sourceLang: string = 'eng',
        targetLang: {
            code: string
            language: string
            name: string
            file: string
        }
    ): Promise<{ content: string; frontmatter: Record<string, any> | null }> {
        try {
            const { frontmatter, content: markdownContent } =
                this.extractFrontmatter(content)

            // Create translated frontmatter with translate set to false
            const translatedFrontmatter = frontmatter
                ? {
                      ...(await this.translateFrontmatter(
                          frontmatter,
                          sourceLang,
                          targetLang.code
                      )),
                      translate: false,
                      lang: targetLang.language,
                  }
                : null

            // Add translation notice
            const originalSlug = sluggify(frontmatter?.title ?? 'error')
            const translationNotice = `This article has been translated by Artificial Intelligence. [View the original article written in English here](/${originalSlug})\n\n`
            const contentWithNotice = translationNotice + markdownContent

            const processor = unified()
                .use(remarkParse)
                .use(addSpacesAroundLinks)
                .use(remarkStringify)
                .data('settings', {
                    bullet: '-',
                    fence: '`',
                    fences: true,
                    incrementListMarker: true,
                })

            const tree = processor.parse(contentWithNotice)
            await this.translateMarkdownAST(tree, sourceLang, targetLang.code)

            let translatedContent = processor.stringify(tree)
            translatedContent = fixSpacingAfterParentheses(translatedContent)
            translatedContent = fixSpacingBeforeLinks(translatedContent)

            const finalContent = translatedFrontmatter
                ? `---\n${yaml.stringify(translatedFrontmatter)}---\n${translatedContent}`
                : translatedContent

            // Create target directory if it doesn't exist
            const targetDir = `content/${targetLang.language}`
            try {
                await fs.mkdir(targetDir, { recursive: true })
            } catch (error) {
                console.error(`Error creating directory ${targetDir}:`, error)
                throw error
            }

            // Create the translated file using the original slug
            const filePath = `${targetDir}/${originalSlug}.md`
            await fs.writeFile(filePath, finalContent, 'utf-8')
            console.log(`Translation completed! Output saved to ${filePath}`)

            // Update original file's frontmatter to track translations
            if (frontmatter) {
                // Read the current content again to get the latest translated_to array
                const currentContent = await fs.readFile(
                    `content/${originalSlug}.md`,
                    'utf-8'
                )
                const { frontmatter: currentFrontmatter } =
                    this.extractFrontmatter(currentContent)

                // Ensure we have the latest translated_to array
                const currentTranslations =
                    currentFrontmatter?.translated_to || []
                const updatedTranslations = Array.isArray(currentTranslations)
                    ? currentTranslations
                    : [currentTranslations]

                const updatedOriginalFrontmatter = {
                    ...currentFrontmatter,
                    translate: false,
                    last_modified: new Date().toISOString(),
                    translated_to: Array.from(
                        new Set([...updatedTranslations, targetLang.language])
                    ),
                }
                const updatedOriginalContent = `---\n${yaml.stringify(updatedOriginalFrontmatter)}---\n${markdownContent}`
                const originalFilePath = `content/${originalSlug}.md`
                await fs.writeFile(
                    originalFilePath,
                    updatedOriginalContent,
                    'utf-8'
                )
                console.log(`Original file updated: ${originalFilePath}`)
            }

            return { content: finalContent, frontmatter }
        } catch (error) {
            console.error('Error translating markdown file:', error)
            throw error
        }
    }
}

function fixSpacingAfterParentheses(text: string) {
    // Fix missing spaces after closing parenthesis
    text = text.replace(/\)(\S)/g, ') $1')

    return text
}

function fixSpacingBeforeLinks(text: string) {
    // Fix missing spaces between punctuation and markdown links, but exclude image markdown
    text = text.replace(/([.,?])(\[)/g, '$1 $2')

    // Remove any spaces between ! and [ for images
    text = text.replace(/!\s+\[/g, '![')

    return text
}

function addSpacesAroundLinks() {
    return tree => {
        visit(tree, 'text', node => {
            // Handle markdown-style links
            node.value = node.value.replace(
                /(\[([^\]]+)\]\(([^)]+)\))([^\s])/g,
                '$1 $4'
            )
            node.value = node.value.replace(
                /([^\s])(\[([^\]]+)\]\(([^)]+)\))/g,
                '$1 $2'
            )

            // Fix malformed URLs with a single, comprehensive replacement
            node.value = node.value.replace(
                /https:\s*(?:https:\s*)?(?:\/\/)?\s*(www\.|[a-zA-Z0-9])/gi,
                'https://$1'
            )
        })
    }
}
