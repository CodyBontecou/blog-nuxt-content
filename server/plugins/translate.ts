import { ASTMarkdownTranslator } from '~/lib/translations/ast-translations'
import { languages } from '~/locales/languages'

export default defineNitroPlugin(async nitroApp => {
    const { HUGGINGFACE_API_KEY, HUGGING_FACE_INFERENCE_ENDPOINT } =
        useRuntimeConfig()
    const translator = new ASTMarkdownTranslator(
        HUGGINGFACE_API_KEY,
        HUGGING_FACE_INFERENCE_ENDPOINT
    )

    // Queue to handle files sequentially
    let processingQueue = Promise.resolve()

    nitroApp.hooks.hook('content:file:beforeParse', async file => {
        processingQueue = processingQueue
            .then(async () => {
                const shouldTranslate = translator.checkFrontmatterCondition(
                    file.body,
                    frontmatter =>
                        frontmatter.translate === true &&
                        frontmatter.draft !== true &&
                        frontmatter.ignore !== true
                )

                if (shouldTranslate) {
                    const { frontmatter } = translator.extractFrontmatter(
                        file.body
                    )
                    const existingTranslations =
                        frontmatter?.translated_to || []

                    const languagesToTranslate = languages.filter(
                        lang =>
                            !existingTranslations.includes(lang.code) &&
                            lang.code !== 'eng' &&
                            lang.target.includes('Tx') &&
                            lang.source.includes('Tx')
                    )

                    for (const targetLang of languagesToTranslate) {
                        try {
                            await translator.translateMarkdownFile(
                                file.body,
                                'eng',
                                targetLang
                            )
                            console.log(
                                `Successfully translated to ${targetLang.code}`
                            )
                        } catch (error) {
                            console.error(
                                `Failed to translate to ${targetLang.code}:`,
                                error
                            )
                        }
                    }

                    const { content: updatedContent } =
                        translator.extractFrontmatter(file.body)
                    file.body = updatedContent
                }
            })
            .catch(error => {
                console.error('Error processing file:', error)
            })

        await processingQueue
    })
})
