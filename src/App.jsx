import { useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalaxyBackground from "./components/background/GalaxyBackground";
import GalaxyIntro from "./components/intro/GalaxyIntro";
import HomePage from "./pages/home/HomePage";
import { LanguageProvider } from "./i18n/LanguageContext";

// Giữ Galaxy canvas xuyên suốt và chỉ hiện Home sau khi intro đã hoàn tất fade-out.
function PortfolioApp() {
  const [showIntro, setShowIntro] = useState(true);
  const [showHome, setShowHome] = useState(false);

  // Đồng bộ Lenis với GSAP để các hiệu ứng cuộn hiện có tiếp tục bám đúng vị trí trang.
  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      // Giữ cuộn mượt theo yêu cầu kể cả khi trình duyệt báo giảm chuyển động.
      respectReducedMotion: false,
    });
    const updateLenis = (time) => lenis.raf(time * 1000);
    const updateScrollTrigger = () => ScrollTrigger.update();

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(updateLenis);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <GalaxyBackground />
      <HomePage isVisible={showHome} />
      {showIntro && (
        <GalaxyIntro
          audioSrc="/assets/audio/intro.mp3"
          duration={7040}
          onFinish={() => {
            setShowHome(true);
            setShowIntro(false);
          }}
        />
      )}
    </>
  );
}

// Đặt provider ở gốc để intro và mọi section dùng chung lựa chọn ngôn ngữ.
export default function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  );
}
