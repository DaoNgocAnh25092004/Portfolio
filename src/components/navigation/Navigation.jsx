import { Menu, X } from "lucide-react";

// Hiển thị navigation và đóng menu mobile ngay sau khi người dùng chọn một section.
export default function Navigation({ menuOpen, setMenuOpen }) {
  return (
    <nav className="nav wrap">
      <a className="brand" href="#top">
        <img
          className="brand-mark"
          src="/assets/icon.png"
          alt=""
          aria-hidden="true"
        />
        <span className="brand-name">Anh.dev</span>
      </a>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#work" onClick={() => setMenuOpen(false)}>
          Projects
        </a>
        <a href="#about" onClick={() => setMenuOpen(false)}>
          About me
        </a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>
      </div>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Mở menu"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </nav>
  );
}
