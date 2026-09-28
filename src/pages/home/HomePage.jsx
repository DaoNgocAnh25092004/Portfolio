import { useState } from "react";
import Navigation from "./components/Navigation";
import MobileNotice from "./components/MobileNotice";
import HeroSection from "./sections/HeroSection";
import AboutMeSection from "./sections/AboutMeSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import AboutSection from "./sections/AboutSection";

// Ghép các section của portfolio theo thứ tự giới thiệu, hồ sơ, kinh nghiệm, kỹ năng và dự án.
export default function HomePage({ isVisible = true }) {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <main
      className={`site-shell ${isVisible ? "" : "site-shell--pending"}`.trim()}
      aria-hidden={!isVisible}
    >
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection isVisible={isVisible} />
      <AboutMeSection />
      <ExperienceSection />
      <AboutSection />
      <ProjectsSection />
      <MobileNotice />
    </main>
  );
}
