import { useState } from "react";
import Navigation from "./components/Navigation";
import MobileNotice from "./components/MobileNotice";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";

// Ghép các section của portfolio một trang; navigation dùng anchor để giữ trải nghiệm nhẹ và dễ deploy.
export default function HomePage({ isVisible = true }) {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <main
      className={`site-shell ${isVisible ? "" : "site-shell--pending"}`.trim()}
      aria-hidden={!isVisible}
    >
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <AboutSection />
      <MobileNotice />
    </main>
  );
}
