import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import LanguageToggle from "../LanguageToggle";
import { useLanguage } from "../../i18n/LanguageContext";
import "./GalaxyIntro.css";

// Điều phối chữ và audio của intro trong khi dùng chung Galaxy canvas để chuyển cảnh không chớp.
export default function GalaxyIntro({
  audioSrc = "/assets/audio/intro.mp3",
  duration = 7040,
  onFinish,
}) {
  const { language, t } = useLanguage();
  const audioRef = useRef(null);
  const onFinishRef = useRef(onFinish);
  const leaveTimerRef = useRef(null);
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

  // Unmount intro abia sau khi trình duyệt vẽ xong fade để tránh cắt mất frame chuyển cảnh cuối.
  const handleTransitionEnd = (event) => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "opacity" ||
      !isLeaving
    ) {
      return;
    }

    window.clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = null;
    onFinishRef.current?.();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!hasStarted) return undefined;

    let finishTimer;
    // Đồng bộ fade-out với timeline để chữ biến mất mềm trước khi render HomePage.
    finishTimer = window.setTimeout(
      () => {
        setIsLeaving(true);
        // transitionend là chuẩn; timer dài hơn chỉ cứu trường hợp sự kiện không phát sinh.
        leaveTimerRef.current = window.setTimeout(
          () => onFinishRef.current?.(),
          700,
        );
      },
      Math.max(0, duration - 620),
    );

    return () => {
      window.clearTimeout(finishTimer);
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
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
      lang={language}
      aria-label={t.intro.ariaLabel}
      onTransitionEnd={handleTransitionEnd}
    >
      {introGate && (
        <div className="galaxy-intro__gate" role="dialog" aria-modal="true">
          <div className="galaxy-intro__gate-card">
            <div className="galaxy-intro__gate-topline">
              <span>{t.intro.profession}</span>
              <LanguageToggle className="language-toggle--intro" />
            </div>

            <div className="galaxy-intro__gate-content">
              <img
                className="galaxy-intro__gate-mark"
                src="/assets/icons/favicon.png"
                alt=""
                aria-hidden="true"
              />
              <p className="galaxy-intro__gate-label">
                Đào Ngọc Anh <span>/</span> {t.intro.portfolio}
              </p>
              <h2>
                {t.intro.enterTitle} <span>{t.intro.enterTitleAccent}</span>
              </h2>

              <button className="galaxy-intro__enter-button" type="button" onClick={handleEnter}>
                {t.intro.enterButton} <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <div className="galaxy-intro__gate-bottomline">
              <span></span>
              <span>{t.intro.city}</span>
            </div>
          </div>
        </div>
      )}

      <div className="galaxy-intro__copy">
        <p className="galaxy-intro__eyebrow">{t.intro.eyebrow}</p>
        <h1>{t.intro.title}</h1>
        <span className="galaxy-intro__rule" aria-hidden="true" />
        <p className="galaxy-intro__tagline">
          {t.intro.tagline}
        </p>
      </div>

      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </section>
  );
}
