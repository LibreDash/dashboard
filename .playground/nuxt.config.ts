import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  compatibilityDate: "2024-12-28",
  extends: ["..", "@libredash/core"],
  modules: ["@nuxt/eslint"],
  eslint: {
    config: {
      rootDir: fileURLToPath(new URL("..", import.meta.url)),
    },
  },
});
