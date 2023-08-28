import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue({
    appEntrypoint: '/src/pages/_app'
  }), sanity({
    projectId: 'j63jnjq3',
    dataset: 'production',
    apiVersion: '2023-02-08',
    useCdn: false,
  })]
});