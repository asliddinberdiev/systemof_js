import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || "http://localhost:8000",
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  pages: true,
  build: {
    transpile: ["vuetify"],
  },
  plugins: [{ src: "~/plugins/toast" }],
  modules: [
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  vite: {
    server: {
      proxy: {
        "/api/": {
          target: process.env.BASE_URL || 'localhost:8000', // Your backend server
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
