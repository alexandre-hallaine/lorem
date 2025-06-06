export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: [
        '@nuxt/eslint',
        '@nuxt/ui-pro',
        '@nuxt/test-utils',
        '@vueuse/nuxt'
    ],
    css: ['~/assets/css/main.css'],
    app: {head: {title: 'Lorem Minimal'}},
})
