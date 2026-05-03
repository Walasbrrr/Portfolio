/// <reference types="astro/client" />

interface ImportMetaEnv {
    /** Inyectado en build por `astro.config.mjs` desde `process.env.VERCEL_ENV`. */
    readonly VERCEL_ENV: "" | "development" | "preview" | "production";
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
