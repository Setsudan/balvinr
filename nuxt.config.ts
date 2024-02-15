// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@pinia-plugin-persistedstate/nuxt'],
  i18n: {
    defaultLocale: 'en',
    langDir: 'locales/',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json' },
    ],
  },
  css: ['@/assets/scss/root.scss'],
})
