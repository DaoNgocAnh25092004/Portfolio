import { useState } from "react";
import GalaxyIntro from "./components/intro/GalaxyIntro";
import HomePage from "./pages/HomePage";

// Điều phối intro Galaxy và portfolio, chỉ hiển thị HomePage sau khi intro hoàn tất.
export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return showIntro ? (
    <GalaxyIntro
      audioSrc="/assets/video.mp4"
      duration={7040}
      onFinish={() => setShowIntro(false)}
    />
  ) : (
    <HomePage />
  );
}
