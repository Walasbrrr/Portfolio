import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageDropdown() {
    // 1. Así traemos nuestro idioma activo y nuestras funciones ¡desde cualquier parte!
    const { lang, setLang, t } = useLanguage();

    // 2. Necesitamos un estado para saber si el menú está abierto o cerrado.
    const [isOpen, setIsOpen] = useState(false);

    // TODO PARA TI: Crea una función que simplemente invierta el valor de "isOpen".
    // Si es true que lo pase a false, y viceversa.
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Función que se llama al pulsar sobre un idioma
    const handleSelect = (newLang: 'en' | 'es') => {
        setLang(newLang); // ¡Cambia el contexto general!
        setIsOpen(false); // Cierra el menú al elegir
    };

    return (
        // React usa "className" en lugar de "class". 
        // Y añadimos la clase "open" solamente si nuestro estado 'isOpen' es verdadero
        <li className={`lang-dropdown ${isOpen ? 'open' : ''}`}>

            {/* Al hacer click en el botón, llamamos a toggleDropdown */}
            <button
                className="lang-btn"
                type="button"
                onClick={toggleDropdown}
            >
                {/* Aquí llamamos  a la función 't' de nuestro Contexto para que traiga la palabra "Idioma" / "Language" automática */}
                <span>{t("language")}</span>
                <i className="fas fa-caret-down" aria-hidden="true"></i>
            </button>

            <ul className="lang-menu">
                <li>
                    <button
                        onClick={() => handleSelect('es')}
                        className="lang-option"
                        type="button"
                    >
                        Español
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleSelect('en')}
                        className="lang-option"
                        type="button"
                    >
                        English
                    </button>
                </li>
            </ul>
        </li>
    );
}
