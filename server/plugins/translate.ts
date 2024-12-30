import { ASTMarkdownTranslator } from '~/lib/translations/ast-translations'
import yaml from 'yaml'
import fs from 'fs/promises'
import path from 'path'

export default defineNitroPlugin(async nitroApp => {
    const { HUGGINGFACE_API_KEY, HUGGING_FACE_INFERENCE_ENDPOINT } =
        useRuntimeConfig()

    // Load NLLB languages
    const nllbYamlPath = path.join(
        process.cwd(),
        'lib/constants/unity_nllb-200.yml'
    )
    const nllbYaml = yaml.parse(await fs.readFile(nllbYamlPath, 'utf8'))
    const supportedLanguages = nllbYaml.langs

    // nitroApp.hooks.hook('content:file:beforeParse', async file => {
    //     const translator = new ASTMarkdownTranslator(
    //         HUGGINGFACE_API_KEY,
    //         HUGGING_FACE_INFERENCE_ENDPOINT
    //     )

    //     // Check if translation is needed based on frontmatter
    //     const shouldTranslate = translator.checkFrontmatterCondition(
    //         file.body,
    //         frontmatter => frontmatter.translate === true
    //     )

    //     if (shouldTranslate) {
    //         // Get existing translations from frontmatter
    //         const { frontmatter } = translator.extractFrontmatter(file.body)
    //         const existingTranslations = frontmatter?.translated_to || []

    //         // Filter out languages that should not be translated
    //         const languagesToTranslate = supportedLanguages.filter(
    //             lang =>
    //                 !existingTranslations.includes(lang) &&
    //                 lang.code !== 'eng' &&
    //                 lang.target.includes('Tx') &&
    //                 lang.source.includes('Tx')
    //         )

    //         // Translate to each new language
    //         for (const targetLang of languagesToTranslate) {
    //             try {
    //                 const { content } = await translator.translateMarkdownFile(
    //                     file.body,
    //                     'eng',
    //                     targetLang
    //                 )
    //                 console.log(`Successfully translated to ${targetLang}`)
    //             } catch (error) {
    //                 console.error(
    //                     `Failed to translate to ${targetLang}:`,
    //                     error
    //                 )
    //             }
    //         }

    //         // Update the file body with the latest version (after translations)
    //         const { content: updatedContent } = translator.extractFrontmatter(
    //             file.body
    //         )
    //         file.body = updatedContent
    //     }
    // })
})
