import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'server', // or 'static' for static sites
  integrations: [react(), tailwind({applyBaseStyles: false,})],
  i18n: {
    defaultLocale: "en",
    locales: ["bg", "en"],
  }
});