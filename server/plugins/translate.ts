import { ASTMarkdownTranslator } from '~/lib/translations/ast-translations'

export default defineNitroPlugin(nitroApp => {
    const { HUGGINGFACE_API_KEY, HUGGING_FACE_INFERENCE_ENDPOINT } =
        useRuntimeConfig()

    nitroApp.hooks.hook('content:file:beforeParse', async file => {
        const wikiLinkRegex = /\[\[(.*?)\]\]/g
        if (file._id.endsWith('.md')) {
            file.body = file.body.replace(wikiLinkRegex, (_, linkText) => {
                const [pageName, altText] = linkText.split('|')
                const displayText = altText || pageName
                const slug = pageName
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]/g, '')
                return `[${displayText.trim()}](/${slug})`
            })
        }

        if (file._id.endsWith('.md') && file._id.includes('anki')) {
            const translator = new ASTMarkdownTranslator(
                HUGGINGFACE_API_KEY,
                HUGGING_FACE_INFERENCE_ENDPOINT
            )
            await translator.translateMarkdownFile(file.body, 'eng', 'spa')
        }
    })
})
