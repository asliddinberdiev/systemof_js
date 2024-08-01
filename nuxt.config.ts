import vuetify, {transformAssetUrls} from "vite-plugin-vuetify";

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL || 'http://localhost:8000',
        }
    },
    compatibilityDate: "2024-04-03",
    devtools: {enabled: true},
    ssr: false,
    pages: true,
    build: {
        transpile: ["vuetify"],
    },
    plugins: [
        {src: "~/plugins/toast"},
    ],
    modules: [
        "@pinia/nuxt",
        '@nuxt/image',
        (_options, nuxt) => {
            nuxt.hooks.hook("vite:extendConfig", (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({autoImport: true}));
            });
        },
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
});
