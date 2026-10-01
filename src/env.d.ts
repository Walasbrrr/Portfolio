/// <reference types="astro/client" />

interface ImportMetaEnv {
    /** Inyectado en build por `astro.config.mjs` desde `process.env.VERCEL_ENV`. */
    readonly VERCEL_ENV: "" | "development" | "preview" | "production";
    readonly PUBLIC_GA_MEASUREMENT_ID?: string;
    readonly PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
