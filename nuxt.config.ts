export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@nuxt/test-utils',
    '@vueuse/nuxt',
  ],
  devtools: { enabled: true },
  app: { head: {
    title: 'Lorem Minimal',
    htmlAttrs: { lang: 'en' },
  } },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  eslint: {
    config: { stylistic: true },
    checker: true,
  },
})
