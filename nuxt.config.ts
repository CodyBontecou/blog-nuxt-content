// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,
        timeline: {
            enabled: true,
        },
    },
    modules: [
        '@nuxt/content',
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        '@nuxtjs/i18n',
        '@nuxt/icon',
        '@nuxtjs/color-mode',
        'nuxt-og-image',
        'nuxt-gtag',
        '@nuxt/test-utils/module',
    ],
    routeRules: {
        '/': { prerender: true },
    },
    compatibilityDate: '2024-10-24',
    css: ['~/assets/css/main.css', '~/assets/css/tailwind.css'],
    content: {
        markdown: {
            anchorLinks: true,
        },
        highlight: {
            theme: 'github-dark', // You can use any Shiki theme (e.g., 'nord', 'monokai', 'dracula')
            preload: [
                'javascript',
                'python',
                'html',
                'css',
                'elixir',
                'scss',
                'sass',
                'toml',
            ], // Languages to preload
        },
    },
    i18n: {
        lazy: true,
        strategy: 'prefix_except_default',
        langDir: 'locales',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'nuxt_i18n',
        },
        defaultLocale: 'en',
        locales: [
            { code: 'en', language: 'en', name: 'English', file: 'en.yml' },
            { code: 'es', language: 'es', name: 'Español', file: 'es.yml' },
            { code: 'spa', language: 'es', name: 'Español', file: 'es.yml' },
            { code: 'fr', language: 'fr', name: 'Français', file: 'fr.yml' },
        ],
    },
    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },
    nitro: {
        prerender: {
            routes: ['/sitemap.xml', '/rss.xml'],
        },
    },
    runtimeConfig: {
        MAILCHIMP_SECRET_KEY: process.env.MAILCHIMP_SECRET_KEY,
        MAILCHIMP_API_SERVER: process.env.MAILCHIMP_API_SERVER,
        MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
        HUGGING_FACE_INFERENCE_ENDPOINT:
            process.env.HUGGING_FACE_INFERENCE_ENDPOINT,
        HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
    },
    site: {
        url: 'https://codybontecou.com',
        name: 'Cody Bontecou',
    },
    gtag: {
        id: 'G-3NM0E524EK',
    },
})
