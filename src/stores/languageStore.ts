import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';
import { useCallback } from 'react';
import { translations, type Lang } from '../i18n/translations';

// El átomo es un singleton de módulo: todos los islands comparten este mismo estado
export const $lang = atom<Lang>('en');

// Re-exportamos el tipo para que los componentes no necesiten importarlo desde otro sitio
export type { Lang };

export function setLang(lang: Lang): void {
    $lang.set(lang);
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('lang', lang);
    }
}

// Hook con la misma API que el anterior useLanguage() — migración sin cambiar los componentes
export function useLanguage() {
    const lang = useStore($lang);

    const t = useCallback(
        (key: string) => translations[lang][key as keyof typeof translations['en']] || key,
        [lang]
    );

    return { lang, setLang, t };
}
