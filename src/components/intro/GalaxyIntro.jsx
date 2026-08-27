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
  const [hasStarted, setHasStarted] = useState(false);

  // Luôn giữ callback mới nhất mà không làm reset timeline khi component bắt đầu fade-out.
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  // Bắt đầu audio ngay trong thao tác người dùng để trình duyệt cho phép phát tiếng.
  const handleEnter = () => {
    const audio = audioRef.current;
    setHasStarted(true);

    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!hasStarted) return undefined;

    let finishTimer;
    let leaveTimer;

    // Đồng bộ fade-out với timeline để chữ biến mất mềm trước khi render HomePage.
    finishTimer = window.setTimeout(
      () => {
        setIsLeaving(true);
        leaveTimer = window.setTimeout(() => onFinishRef.current?.(), 620);
      },
      Math.max(0, duration - 620),
    );

    return () => {
      window.clearTimeout(finishTimer);
      window.clearTimeout(leaveTimer);
      audio?.pause();
    };
  }, [duration, hasStarted]);

  // Giữ intro đứng ở màn hình mở đầu cho tới khi audio được kích hoạt bằng một click hợp lệ.
  const introGate = !hasStarted && !isLeaving;

  return (
    <section
      className={`galaxy-intro ${hasStarted ? "is-started" : ""} ${
        isLeaving ? "is-leaving" : ""
      }`}
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

      {introGate && (
        <div className="galaxy-intro__gate" role="dialog" aria-modal="true">
          <div className="galaxy-intro__gate-card">
            <img
              className="galaxy-intro__gate-mark"
              src="/assets/icon-favicon.png"
              alt=""
              aria-hidden="true"
            />
            <p className="galaxy-intro__gate-label">Đào Ngọc Anh · Portfolio</p>
            <h1>Enter the experience.</h1>
            <p className="galaxy-intro__gate-copy">
              Turn on sound to experience the full introduction.
            </p>
            <button type="button" onClick={handleEnter}>
              Enter portfolio <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      )}

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
