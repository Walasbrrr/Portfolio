import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../stores/languageStore';

export default function LanguageDropdown() {
    const { lang, setLang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLLIElement>(null);

    const toggleDropdown = () => setIsOpen(prev => !prev);

    const handleSelect = (newLang: 'en' | 'es') => {
        setLang(newLang);
        setIsOpen(false);
    };

    // Cierra el dropdown al hacer click fuera
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [isOpen]);

    return (
        <li ref={ref} className={`lang-dropdown ${isOpen ? 'open' : ''}`}>
            <button
                className="lang-btn"
                type="button"
                onClick={toggleDropdown}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <i className="fas fa-globe" aria-hidden="true"></i>
                <span>{lang === 'en' ? 'EN' : 'ES'}</span>
                <i className="fas fa-caret-down lang-caret" aria-hidden="true"></i>
            </button>

            <ul className="lang-menu" role="listbox" aria-label="Select language">
                <li>
                    <button
                        onClick={() => handleSelect('es')}
                        className={`lang-option ${lang === 'es' ? 'active' : ''}`}
                        type="button"
                        role="option"
                        aria-selected={lang === 'es'}
                    >
                        <span className="lang-flag" aria-hidden="true">🇪🇸</span>
                        <span>Español</span>
                        <i className="fas fa-check lang-option-check" aria-hidden="true"></i>
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleSelect('en')}
                        className={`lang-option ${lang === 'en' ? 'active' : ''}`}
                        type="button"
                        role="option"
                        aria-selected={lang === 'en'}
                    >
                        <span className="lang-flag" aria-hidden="true">🇺🇸</span>
                        <span>English</span>
                        <i className="fas fa-check lang-option-check" aria-hidden="true"></i>
                    </button>
                </li>
            </ul>
        </li>
    );
}
