import { ArrowUpRight } from "lucide-react";
import Lanyard from "../../../components/lanyard/Lanyard";
import TextType from "../../../components/text-type/TextType";
import { useLanguage } from "../../../i18n/LanguageContext";

// Tạo hero hai cột với thông tin thật của Đào Ngọc Anh và thẻ lanyard 3D tương tác.
export default function HeroSection() {
  const { language, t } = useLanguage();

  return (
    <section className="hero wrap" id="top">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-kicker">Đào Ngọc Anh / {t.hero.role}</div>
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
