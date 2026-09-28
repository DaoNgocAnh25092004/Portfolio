import { Code2, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLanguage } from "../../../i18n/LanguageContext";

// Trình bày học vấn và thông tin liên hệ cá nhân trong một hồ sơ ngắn gọn, dễ quét.
export default function AboutMeSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const about = t.about;

  // Kích hoạt reveal khi section đi vào viewport và dọn observer khi component bị tháo khỏi trang.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const revealItems = section.querySelectorAll("[data-about-me-reveal]");
    section.classList.add("about-me-section--animated");
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -28px 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      section.classList.remove("about-me-section--animated");
    };
  }, []);

  return (
    <section
      className="about-me-section wrap"
      id="about-me"
      aria-labelledby="about-me-title"
      ref={sectionRef}
    >
      <div className="about-me-section__details">
        <div className="about-me-section__left-column">
          <header className="about-me-section__header" data-about-me-reveal>
            <div className="about-me-section__intro">
              <h2 className="about-me-section__title" id="about-me-title">
                <span>{about.titleFirst}</span>{" "}
                <span className="about-me-section__title-accent">{about.titleAccent}</span>
              </h2>
              <p className="about-me-section__description">{about.description}</p>
            </div>
          </header>

          <article className="about-me-section__summary-panel" data-about-me-reveal>
            <div className="about-me-section__summary-flow">
              <p className="about-me-section__summary about-me-section__summary-flow-lead">
                {about.summaryFirst}
              </p>
              <p className="about-me-section__summary about-me-section__summary-flow-support">
                {about.summarySecond}
              </p>
            </div>
          </article>
        </div>

        <div className="about-me-section__right-column">
          <article className="about-me-section__education" data-about-me-reveal>
            <div className="about-me-section__card-heading">
              <span className="about-me-section__card-icon" aria-hidden="true">
                <GraduationCap size={17} strokeWidth={1.7} />
              </span>
              <p className="about-me-section__label">{about.education.eyebrow}</p>
            </div>
            <div className="about-me-section__education-topline">
              <div>
                <h3>{about.education.title}</h3>
                <p>{about.education.detail}</p>
              </div>
              <time>{about.education.meta}</time>
            </div>
            <dl className="about-me-section__academic-facts">
              <div>
                <dt>{about.education.gpaLabel}</dt>
                <dd>{about.education.gpa}</dd>
              </div>
              <div>
                <dt>{about.education.awardsLabel}</dt>
                <dd>{about.education.awards}</dd>
              </div>
            </dl>
          </article>

          <aside
            className="about-me-section__contact-panel"
            data-about-me-reveal
            aria-labelledby="about-me-contact-title"
          >
            <div className="about-me-section__card-heading">
              <span className="about-me-section__card-icon" aria-hidden="true">
                <Code2 size={17} strokeWidth={1.7} />
              </span>
              <p className="about-me-section__label" id="about-me-contact-title">
                {about.contactLabel}
              </p>
            </div>

            <div className="about-me-section__contact-list">
              <div className="about-me-section__contact-item about-me-section__contact-item--location">
                <MapPin size={16} strokeWidth={1.7} aria-hidden="true" />
                <span>
                  <small>{about.location}</small>
                  <strong>{about.city}</strong>
                </span>
              </div>
              <a className="about-me-section__contact-item about-me-section__contact-item--phone" href="tel:+84353707544">
                <Phone size={16} strokeWidth={1.7} aria-hidden="true" />
                <span>
                  <small>{about.phone}</small>
                  <strong>0353 707 544</strong>
                </span>
              </a>
              <a className="about-me-section__contact-item about-me-section__contact-item--email" href="mailto:daongocanh25042004@gmail.com">
                <Mail size={16} strokeWidth={1.7} aria-hidden="true" />
                <span>
                  <small>{about.email}</small>
                  <strong>daongocanh25042004@gmail.com</strong>
                </span>
              </a>
              <a
                className="about-me-section__contact-item about-me-section__contact-item--github"
                href="https://github.com/DaoNgocAnh25092004"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="about-me-section__contact-icon"
                  src="/assets/icons/tech/github.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>
                  <small>{about.github}</small>
                  <strong>DaoNgocAnh25092004</strong>
                </span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
