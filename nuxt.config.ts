export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,
  plugins: [],
  devtools: { enabled: true },
  modules: [
    "nuxt-zod-i18n",
    "@nuxtjs/i18n",
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
  ],
  imports: {
    dirs: ["store", "services"],
  },
  googleFonts: {
    families: {
      "DM Sans": true,
    },
  },
  i18n: {
    defaultLocale: "pt-BR",
    vueI18n: "./i18n.config.ts",
    locales: [{ code: "pt-BR", file: "pt-BR.json" }],
    lazy: true,
  },
  zodI18n: {
    localeCodesMapping: {
      "pt-BR": "pt-BR",
    },
    useModuleLocale: true,
  },
});
