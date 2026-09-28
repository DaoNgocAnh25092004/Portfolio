import { ArrowUpRight } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Lanyard from "../../../components/lanyard/Lanyard";
import TextType from "../../../components/text-type/TextType";
import { useLanguage } from "../../../i18n/LanguageContext";

// Táº¡o hero hai cá»™t vá»›i thÃ´ng tin tháº­t cá»§a ÄÃ o Ngá»c Anh vÃ  tháº» lanyard 3D tÆ°Æ¡ng tÃ¡c.
// Chá»‰ táº¡o canvas lanyard khi Home Ä‘Ã£ hiá»ƒn thá»‹, trÃ¡nh cháº¡y WebGL áº©n bÃªn dÆ°á»›i intro.
// Trì hoãn WebGL/Rapier c?a th? profile d? không tranh GPU v?i frame d?u và lúc intro v?a k?t thúc.
function DeferredLanyard({ isVisible }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isVisible) return undefined;
    let delayedTimer;
    const idleCallback = window.requestIdleCallback;
    const timer = idleCallback
      ? idleCallback(() => { delayedTimer = window.setTimeout(() => setReady(true), 900); }, { timeout: 2200 })
      : window.setTimeout(() => setReady(true), 1500);
    return () => {
      window.clearTimeout(delayedTimer);
      if (idleCallback) window.cancelIdleCallback(timer);
      else window.clearTimeout(timer);
    };
  }, [isVisible]);

  if (!isVisible || !ready) return <div className="hero-visual__fallback" aria-hidden="true" />;
  return <Suspense fallback={<div className="hero-visual__fallback" aria-hidden="true" />}><Lanyard position={[0, 0, 25]} gravity={[0, -40, 0]} frontImage="/assets/images/profile.png" backImage="/assets/images/profile.png" imageFit="center" lanyardWidth={1} /></Suspense>;
}

export default function HeroSection({ isVisible = true }) {
  const { language, t } = useLanguage();

  return (
    <section className="hero wrap" id="top">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-kicker">ÄÃ o Ngá»c Anh / {t.hero.role}</div>
          <h1>
            <TextType
              key={language}
              className="hero-title-type"
              text={t.hero.statements}
              typingSpeed={72}
              deletingSpeed={38}
              pauseDuration={1800}
              initialDelay={250}
              showCursor
              cursorCharacter="_"
            />
          </h1>
          <div className="hero-footer">
            <p className="hero-intro">
              {t.hero.introBefore} <strong>{t.hero.experience}</strong>{" "}
              {t.hero.introAfter}
            </p>
            <div className="hero-actions">
              <a className="hero-button hero-button-primary" href="#work">
                {t.hero.viewProjects} <ArrowUpRight size={17} />
              </a>
              <a
                className="hero-button hero-button-secondary"
                href="https://github.com/DaoNgocAnh25092004"
                target="_blank"
                rel="noreferrer"
              >
                {t.hero.githubProfile} <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label={t.hero.profileLabel}>
          <Lanyard
            position={[0, 0, 25]}
            gravity={[0, -40, 0]}
            frontImage="/assets/images/profile.png"
            backImage="/assets/images/profile.png"
            imageFit="center"
            lanyardWidth={1}
          />
        </div>
      </div>
    </section>
  );
}
