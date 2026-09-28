import { BriefcaseBusiness, Check, Rocket } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLanguage } from "../../../i18n/LanguageContext";

// Ánh xạ tên công nghệ sang SVG local từ bộ icon TechIcons/devicon đã có trong public assets.
const TECHNOLOGY_ICONS = {
  React: "/assets/icons/tech/react.svg",
  TypeScript: "/assets/icons/tech/typescript.svg",
  "Redux Toolkit": "/assets/icons/tech/redux.svg",
  NestJS: "/assets/icons/tech/nestjs.svg",
  PostgreSQL: "/assets/icons/tech/postgresql.svg",
  Redis: "/assets/icons/tech/redis.svg",
  Docker: "/assets/icons/tech/docker.svg",
  Nginx: "/assets/icons/tech/nginx.svg",
  "GitHub Actions": "/assets/icons/tech/github-actions.svg",
};

// Trình bày một kinh nghiệm làm việc nổi bật theo timeline editorial, tối ưu cho nhà tuyển dụng đọc nhanh.
export default function ExperienceSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const experience = t.experience;

  // Kích hoạt reveal nhẹ khi timeline đi vào viewport và dọn observer khi component bị tháo khỏi trang.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const revealItems = section.querySelectorAll("[data-experience-reveal]");
    section.classList.add("experience-section--animated");
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
      section.classList.remove("experience-section--animated");
    };
  }, []);

  return (
    <section
      className="experience-section wrap"
      id="experience"
      aria-labelledby="experience-title"
      ref={sectionRef}
    >
      <header className="experience-section__header" data-experience-reveal>
        <div>
          <h2 className="experience-section__title" id="experience-title">
            <span>{experience.titleFirst}</span>{" "}
            <span className="experience-section__title-accent">{experience.titleAccent}</span>
          </h2>
          <p className="experience-section__description">{experience.description}</p>
        </div>
      </header>

      <div className="experience-section__timeline">
        <article className="experience-entry" data-experience-reveal>
          <div className="experience-entry__rail">
            <span className="experience-entry__marker" aria-hidden="true">
              <BriefcaseBusiness size={17} strokeWidth={1.7} />
            </span>
          </div>

          <div className="experience-entry__content">
            <div className="experience-entry__heading">
              <div>
                <p className="experience-entry__eyebrow">{experience.role}</p>
                <h3>{experience.company}</h3>
              </div>
              <time>{experience.period}</time>
            </div>

            <div className="experience-entry__technologies" aria-label={experience.technologiesLabel}>
              {experience.technologies.map((technology) => (
                <span key={technology}>
                  {TECHNOLOGY_ICONS[technology] && (
                    <img src={TECHNOLOGY_ICONS[technology]} alt="" aria-hidden="true" />
                  )}
                  {technology}
                </span>
              ))}
            </div>

            <ul className="experience-entry__highlights">
              {experience.highlights.map((highlight) => (
                <li key={highlight.title}>
                  <Check size={15} strokeWidth={1.8} aria-hidden="true" />
                  <span>
                    <strong>{highlight.title}</strong>{" "}
                    {highlight.description}
                  </span>
                </li>
              ))}
            </ul>

            <div className="experience-entry__deployment">
              <div className="experience-entry__deployment-heading">
                <span className="experience-entry__deployment-icon" aria-hidden="true">
                  <Rocket size={15} strokeWidth={1.8} />
                </span>
                <strong>{experience.deploymentTitle}</strong>
              </div>
              <p>{experience.deploymentDescription}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
