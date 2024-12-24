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
    private translatableFrontmatterFields = ['title', 'topics', 'description']

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
        sourceLang = 'eng',
        targetLang = 'spa'
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

            return typeof response === 'object' && response !== null
                ? response.translation_text || String(response)
                : String(response)
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

    public async translateMarkdownFile(
        content: string,
        sourceLang: string = 'eng',
        targetLang: string = 'spa'
    ): Promise<void> {
        try {
            const { frontmatter, content: markdownContent } =
                this.extractFrontmatter(content)
            let translatedContent = ''
            let translatedFrontmatter

            if (frontmatter) {
                translatedFrontmatter = await this.translateFrontmatter(
                    frontmatter,
                    sourceLang,
                    targetLang
                )
                translatedContent +=
                    '---\n' + yaml.stringify(translatedFrontmatter) + '---\n\n'
            }

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

            const tree = processor.parse(markdownContent)
            await this.translateMarkdownAST(tree, sourceLang, targetLang)
            translatedContent += processor.stringify(tree)
            translatedContent = fixSpacingAfterParentheses(translatedContent)

            const filePath = `content/es/${sluggify(translatedFrontmatter?.title) ?? 'error'}.md`
            await fs.writeFile(filePath, translatedContent, 'utf-8')
            console.log(`Translation completed! Output saved to ${filePath}`)
        } catch (error) {
            console.error('Error during file translation:', error)
            throw error
        }
    }
}

function fixSpacingAfterParentheses(text: string) {
    // Fix missing spaces after closing parenthesis
    text = text.replace(/\)(\S)/g, ') $1')

    return text
}

function addSpacesAroundLinks() {
    return tree => {
        visit(tree, 'text', node => {
            // Ensure space after a link if it is followed by non-space characters
            node.value = node.value.replace(
                /(\[([^\]]+)\]\(([^)]+)\))([^\s])/g,
                '$1 $4'
            )
            // Ensure space before a link if it is preceded by non-space characters
            node.value = node.value.replace(
                /([^\s])(\[([^\]]+)\]\(([^)]+)\))/g,
                '$1 $2'
            )
        })
    }
}
