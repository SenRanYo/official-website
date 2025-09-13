import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/scripts", "@nuxt/test-utils", "@nuxt/ui", "@unocss/nuxt"],

  css: ["~/assets/css/main.scss"],

  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/css/variables.scss" as *;
            @use "~/assets/css/mixins.scss" as *;
          `,
        },
      },
    },
  },

  components: {
    dirs: [
      {
        path: "~/components",
        extensions: [".vue", ".ts"],
        pattern: "**/index.{vue,ts}",
        pathPrefix: false,
      },
    ],
  },
})
