import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const vercelEnv = process.env.VERCEL_ENV ?? '';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    define: {
      'import.meta.env.VERCEL_ENV': JSON.stringify(vercelEnv),
    },
  },
});