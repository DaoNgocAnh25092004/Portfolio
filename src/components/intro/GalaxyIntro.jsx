import { useEffect, useRef, useState } from "react";
import Galaxy from "../background/Galaxy";
import "./GalaxyIntro.css";

// Điều phối intro Galaxy trong 7.04 giây, giữ chữ và audio cũ rồi báo cho App chuyển sang portfolio.
export default function GalaxyIntro({
  audioSrc = "/assets/video.mp4",
  duration = 7040,
  onFinish,
}) {
  const audioRef = useRef(null);
  const onFinishRef = useRef(onFinish);
  const [isLeaving, setIsLeaving] = useState(false);

  // Luôn giữ callback mới nhất mà không làm reset timeline khi component bắt đầu fade-out.
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const audio = audioRef.current;
    let finishTimer;
    let leaveTimer;

    // Cho phép autoplay khi trình duyệt hỗ trợ, còn lần chạm đầu tiên sẽ mở tiếng nếu autoplay bị chặn.
    const playAudio = () => {
      if (!audio) return;
      audio.play().catch(() => {});
    };

    playAudio();
    window.addEventListener("pointerdown", playAudio, { passive: true });

    // Đồng bộ fade-out với timeline để chữ biến mất mềm trước khi render HomePage.
    finishTimer = window.setTimeout(
      () => {
        setIsLeaving(true);
        leaveTimer = window.setTimeout(() => onFinishRef.current?.(), 620);
      },
      Math.max(0, duration - 620),
    );

    return () => {
      window.removeEventListener("pointerdown", playAudio);
      window.clearTimeout(finishTimer);
      window.clearTimeout(leaveTimer);
      audio?.pause();
    };
  }, [duration]);

  return (
    <section
      className={`galaxy-intro ${isLeaving ? "is-leaving" : ""}`}
      aria-label="Intro portfolio"
    >
      <div className="galaxy-intro__scene" aria-hidden="true">
        <Galaxy
          starSpeed={0.5}
          density={1}
          hueShift={140}
          speed={0.8}
          glowIntensity={0.42}
          saturation={0}
          mouseInteraction
          mouseRepulsion
          repulsionStrength={2}
          twinkleIntensity={0.42}
          rotationSpeed={0.06}
          transparent={false}
        />
      </div>

      <div className="galaxy-intro__copy">
        <p className="galaxy-intro__eyebrow">I'M A</p>
        <h1>FULLSTACK DEVELOPER</h1>
        <span className="galaxy-intro__rule" aria-hidden="true" />
        <p className="galaxy-intro__tagline">
          Always learning, constantly building, continuously growing.
        </p>
      </div>

      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </section>
  );
}
