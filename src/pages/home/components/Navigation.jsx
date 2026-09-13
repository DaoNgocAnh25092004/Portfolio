import { Menu, X } from "lucide-react";
import LanguageToggle from "../../../components/LanguageToggle";
import { useLanguage } from "../../../i18n/LanguageContext";

// Hiển thị navigation và đóng menu mobile ngay sau khi người dùng chọn một section.
export default function Navigation({ menuOpen, setMenuOpen }) {
  const { t } = useLanguage();

  return (
    <nav className="nav wrap">
      <a className="brand" href="#top">
        <img
          className="brand-mark"
          src="/assets/icons/site-icon.png"
          alt=""
          aria-hidden="true"
        />
        <span className="brand-name">Anh.dev</span>
      </a>
      <div className="nav-controls">
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>
            {t.navigation.projects}
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            {t.navigation.about}
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            {t.navigation.contact}
          </a>
        </div>
        <LanguageToggle />
      </div>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? t.navigation.closeMenu : t.navigation.openMenu}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </nav>
  );
}
