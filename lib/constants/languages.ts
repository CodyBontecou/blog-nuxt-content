import { parse } from 'yaml'
import { readFileSync } from 'fs'
import { join } from 'path'

export interface Language {
    code: string
    language: string
    name: string
    file: string
}

const yamlFile = readFileSync(join(__dirname, 'unity_nllb-200.yml'), 'utf8')
const parsedYaml = parse(yamlFile)

// Add English as the first language since it's our default
export const languages: Language[] = [
    // { code: 'eng', language: 'English', file: 'en.yml' },
    ...parsedYaml.langs,
]
