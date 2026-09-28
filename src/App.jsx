import { useState } from "react";
import GalaxyBackground from "./components/background/GalaxyBackground";
import GalaxyIntro from "./components/intro/GalaxyIntro";
import HomePage from "./pages/home/HomePage";
import { LanguageProvider } from "./i18n/LanguageContext";

// Giữ Galaxy canvas xuyên suốt và chỉ hiện Home sau khi intro đã hoàn tất fade-out.
function PortfolioApp() {
  const [showIntro, setShowIntro] = useState(true);
  const [showHome, setShowHome] = useState(false);

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
