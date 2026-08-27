import { useState } from "react";
import Navigation from "../components/navigation/Navigation";
import GalaxyBackground from "../components/background/GalaxyBackground";
import MobileNotice from "../components/mobile-notice/MobileNotice";
import HeroSection from "../sections/HeroSection";

// Ghép các section của portfolio một trang; navigation dùng anchor để giữ trải nghiệm nhẹ và dễ deploy.
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <main className="site-shell">
      <GalaxyBackground />
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <MobileNotice />
    </main>
  );
}
