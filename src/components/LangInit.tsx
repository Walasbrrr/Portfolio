import { useEffect } from 'react';
import { setLang, type Lang } from '../stores/languageStore';

// Componente invisible que lee localStorage y sincroniza el idioma al cargar la página.
// Se monta con client:load para ser el primero en ejecutarse.
export default function LangInit() {
    useEffect(() => {
        const saved = localStorage.getItem('lang') as Lang;
        if (saved === 'en' || saved === 'es') {
            setLang(saved);
        }
    }, []);

    return null;
}
