// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
});
