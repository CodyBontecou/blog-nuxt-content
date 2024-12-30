import { HfInference } from '@huggingface/inference'
import yaml from 'yaml'
import fs from 'fs/promises'
import path from 'path'

const HUGGINGFACE_API_KEY = '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'
const HUGGING_FACE_INFERENCE_ENDPOINT =
    'https://vbo45ojjmrr5p7w3.us-east-1.aws.endpoints.huggingface.cloud'
const MODEL = 'facebook/seamless-m4t-v2-large'

interface Language {
    code: string
    language: string
    name: string
    file: string
}

async function translateYamlFile() {
    if (!HUGGINGFACE_API_KEY) {
        throw new Error('HUGGINGFACE_API_KEY environment variable is not set')
    }

    const hf = new HfInference(HUGGINGFACE_API_KEY)

    // Read the English YAML file
    const engYamlContent = await fs.readFile(
        path.join(process.cwd(), 'locales/eng.yml'),
        'utf-8'
    )
    const engYaml = yaml.parse(engYamlContent)

    // Read the languages configuration
    const langsContent = await fs.readFile(
        path.join(process.cwd(), 'lib/constants/unity_nllb-200.yml'),
        'utf-8'
    )
    const langs = yaml.parse(langsContent).langs as Language[]

    // Function to translate text
    async function translateText(
        text: string,
        targetLang: string
    ): Promise<string> {
        try {
            const response = await hf
                .endpoint(HUGGING_FACE_INFERENCE_ENDPOINT)
                .translation({
                    model: MODEL,
                    inputs: text,
                    parameters: {
                        src_lang: 'eng',
                        tgt_lang: targetLang,
                    },
                })

            if (Array.isArray(response)) {
                return response[0]?.translation_text || String(response[0])
            }
            return response?.translation_text || String(response)
        } catch (error) {
            console.error(`Translation error for ${targetLang}:`, error)
            throw error
        }
    }

    // Function to recursively translate object values
    async function translateObject(obj: any, targetLang: string): Promise<any> {
        const result: any = {}

        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null) {
                result[key] = await translateObject(value, targetLang)
            } else if (typeof value === 'string') {
                result[key] = await translateText(value, targetLang)
            } else {
                result[key] = value
            }
        }

        return result
    }

    // Translate for each language
    for (const lang of langs) {
        try {
            console.log(`Translating to ${lang.name} (${lang.code})...`)

            const translatedYaml = await translateObject(engYaml, lang.code)
            const outputPath = path.join(process.cwd(), 'locales', lang.file)

            await fs.writeFile(
                outputPath,
                yaml.stringify(translatedYaml),
                'utf-8'
            )

            console.log(`Successfully created ${lang.file}`)
        } catch (error) {
            console.error(`Error translating to ${lang.code}:`, error)
        }
    }
}

translateYamlFile().catch(console.error)
