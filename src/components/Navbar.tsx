import { useLanguage } from '../context/LanguageContext';
import LanguageDropdown from './LanguageDropdown';

export default function Navbar() {
    const { t } = useLanguage();

    return (
        <nav>
            <div className="container nav-shell">
                <a className="brand-text" href="#home">Walen I Calderon</a>

                <input type="checkbox" id="click" />

                <label htmlFor="click" className="menu-btn" aria-label="Open menu">
                    <i className="fas fa-bars" aria-hidden="true"></i>
                </label>

                <ul id="primary-navigation">

                    {<LanguageDropdown />}


                    {/* Enlaces listos */}
                    <li><a className="nav-link" href="#home">{t("home")}</a></li>

                    <li><a className="nav-link" href="#about">{t("about")}</a></li>

                    <li><a className="nav-link" href="#projects">{t("projects")}</a></li>

                    <li><a className="nav-link" href="#skills">{t("skills")}</a></li>

                    <li><a className="nav-link" href="#contact">{t("contact")}</a></li>


                </ul>
            </div>
        </nav>
    );
}
