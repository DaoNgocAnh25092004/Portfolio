import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../i18n/LanguageContext";

const PROJECT_COVER = "/assets/images/feature/background-showcase/background.png";
const PROJECT_GITHUB_URL = "https://github.com/Bin-E-Commerce";
const PROJECT_DEMO_URL = "https://www.binecommerce.site/";

const FEATURE_IMAGES = {
  recommendation: "/assets/images/feature/recommendation/img.png",
  imageOptimization: "/assets/images/feature/ai-image-optimization/img.png",
  authorization: "/assets/images/feature/authorization/image.png",
  deployment: "/assets/images/feature/platform-operations/image.png",
};

const FEATURE_TECHNICAL_LINKS = {
  recommendation: "https://www.binecommerce.site/showcase/recommendation",
  imageOptimization: "https://www.binecommerce.site/showcase/ai-optimization",
  authorization: "https://www.binecommerce.site/showcase/authorization-management",
  deployment: "https://www.binecommerce.site/showcase/platform-operations",
};

const TECHNOLOGY_ICONS = {
  "Next.js": "/assets/images/feature/tech-stack/nextjs.svg",
  TypeScript: "/assets/images/feature/tech-stack/typescript.svg",
  NestJS: "/assets/images/feature/tech-stack/nestjs.svg",
  "API Gateway": "/assets/images/feature/tech-stack/openapi.svg",
  PostgreSQL: "/assets/images/feature/tech-stack/postgresql.svg",
  Redis: "/assets/images/feature/tech-stack/redis.svg",
  Kafka: "/assets/images/feature/tech-stack/apache-kafka.svg",
  "Apache Kafka": "/assets/images/feature/tech-stack/apache-kafka.svg",
  Qdrant: "/assets/images/feature/tech-stack/qdrant.svg",
  FastAPI: "/assets/images/feature/tech-stack/fastapi.svg",
  Python: "/assets/images/feature/tech-stack/python.svg",
  OpenAI: "/assets/images/feature/tech-stack/openai.svg",
  Keycloak: "/assets/images/feature/tech-stack/keycloak.svg",
  "JWT + JWKS": "/assets/images/feature/tech-stack/jwt.svg",
  "GitHub Actions": "/assets/images/feature/tech-stack/github-actions.svg",
  Docker: "/assets/images/feature/tech-stack/docker.svg",
  AWS: "/assets/images/feature/tech-stack/aws.svg",
  K3s: "/assets/images/feature/tech-stack/k3s.svg",
  Kubernetes: "/assets/images/feature/tech-stack/kubernetes.svg",
  Prometheus: "/assets/images/feature/tech-stack/prometheus.svg",
  Grafana: "/assets/images/feature/tech-stack/grafana.svg",
};

// Hiển thị dự án BIN E-Commerce bằng một project hero và các feature card có thể quét nhanh.
export default function ProjectsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const dialogCloseRef = useRef(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState(null);
  const projects = t.projects;
  const selectedFeature = projects.features.find((feature) => feature.id === selectedFeatureId) ?? null;

  // Kích hoạt reveal nhẹ cho project content và tắt observer sau khi từng phần đã xuất hiện.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const revealItems = section.querySelectorAll("[data-project-reveal]");
    section.classList.add("projects-section--animated");
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
      section.classList.remove("projects-section--animated");
    };
  }, []);

  // Khóa scroll nền, hỗ trợ phím Escape và đưa focus vào nút đóng khi modal mở.
  useEffect(() => {
    if (!selectedFeature) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedFeatureId(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => dialogCloseRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFeature]);

  // Mở đúng thông tin chi tiết tương ứng với feature card được chọn.
  const handleOpenFeature = (featureId) => setSelectedFeatureId(featureId);

  // Đóng modal từ nút đóng, phím Escape hoặc vùng nền bên ngoài.
  const handleCloseFeature = () => setSelectedFeatureId(null);

  // Chỉ đóng modal khi người dùng click vào backdrop, không đóng khi click nội dung.
  const handleDialogBackdropClick = (event) => {
    if (event.target === event.currentTarget) handleCloseFeature();
  };

  return (
    <section
      className="projects-section wrap"
      id="projects"
      aria-labelledby="projects-title"
      ref={sectionRef}
    >
      <header className="projects-section__header" data-project-reveal>
        <h2 className="projects-section__title" id="projects-title">
          <span>{projects.titleFirst}</span>{" "}
          <span className="projects-section__title-accent">{projects.titleAccent}</span>
        </h2>
        <p className="projects-section__description">{projects.description}</p>
      </header>

      <article className="projects-featured" data-project-reveal>
        <div className="projects-featured__visual">
          <img
            src={PROJECT_COVER}
            alt={projects.coverAlt}
            width="1672"
            height="941"
            decoding="async"
          />
        </div>
        <div className="projects-featured__content">
          <p className="projects-featured__eyebrow">{projects.projectName}</p>
          <h3>{projects.architecture}</h3>
          <p className="projects-featured__description">{projects.projectDescription}</p>
          <p className="projects-featured__tech-label">{projects.technologiesTitle}</p>
          <ul className="projects-featured__technologies" aria-label={projects.technologiesLabel}>
            {projects.technologies.map((technology) => (
              <li key={technology}>
                {TECHNOLOGY_ICONS[technology] && (
                  <img src={TECHNOLOGY_ICONS[technology]} alt="" aria-hidden="true" />
                )}
                {technology}
              </li>
            ))}
          </ul>
          <div className="projects-featured__actions" aria-label={projects.projectLinksLabel}>
            <a
              className="projects-featured__action projects-featured__action--primary"
              href={PROJECT_GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/icons/tech/github.svg" alt="" aria-hidden="true" />
              <span>{projects.githubLinkLabel}</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M11 4h5v5" />
                <path d="m16 4-7 7" />
                <path d="M15 11v4H5V5h4" />
              </svg>
            </a>
            <a
              className="projects-featured__action projects-featured__action--primary"
              href={PROJECT_DEMO_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span>{projects.demoLinkLabel}</span>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M11 4h5v5" />
                <path d="m16 4-7 7" />
                <path d="M15 11v4H5V5h4" />
              </svg>
            </a>
            <button
              className="projects-featured__action projects-featured__action--placeholder"
              type="button"
              disabled
              title={projects.linkComingSoon}
            >
              <span>{projects.videoLinkLabel}</span>
              <small>{projects.linkComingSoon}</small>
            </button>
          </div>
        </div>
      </article>

      <div className="projects-features-heading" data-project-reveal>
        <span className="projects-features-heading__icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" role="presentation">
            <path d="m3 6 7-3 7 3-7 3-7-3Z" />
            <path d="m3 10 7 3 7-3" />
            <path d="m3 14 7 3 7-3" />
          </svg>
        </span>
        <div className="projects-features-heading__copy">
          <h3>{projects.featuresTitle}</h3>
          <span>{projects.featuresDescription}</span>
        </div>
        <span className="projects-features-heading__count">{projects.featuresCount}</span>
      </div>

      <div className="projects-grid">
        {projects.features.map((feature) => (
          <article className="project-card" data-project-reveal key={feature.id}>
            <div className="project-card__visual">
              <img
                src={FEATURE_IMAGES[feature.id]}
                alt={feature.imageAlt}
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="project-card__content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <ul className="project-card__technologies" aria-label={projects.technologiesLabel}>
                {feature.technologies.map((technology) => (
                  <li key={technology}>
                    {TECHNOLOGY_ICONS[technology] && (
                      <img src={TECHNOLOGY_ICONS[technology]} alt="" aria-hidden="true" />
                    )}
                    {technology}
                  </li>
                ))}
              </ul>
              <button
                className="project-card__action"
                type="button"
                onClick={() => handleOpenFeature(feature.id)}
                aria-haspopup="dialog"
              >
                <span>{projects.viewDetails}</span>
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10h11" />
                  <path d="m11 5 5 5-5 5" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedFeature && (
        <div className="project-dialog" role="presentation" onMouseDown={handleDialogBackdropClick}>
          <div
            className="project-dialog__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-dialog-title-${selectedFeature.id}`}
            aria-describedby={`project-dialog-description-${selectedFeature.id}`}
          >
            <div className="project-dialog__header">
              <div>
                <h2 id={`project-dialog-title-${selectedFeature.id}`}>{selectedFeature.title}</h2>
              </div>
              <button
                className="project-dialog__close"
                type="button"
                onClick={handleCloseFeature}
                aria-label={projects.closeLabel}
                ref={dialogCloseRef}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m5 5 10 10" />
                  <path d="m15 5-10 10" />
                </svg>
              </button>
            </div>

            <p
              className="project-dialog__description"
              id={`project-dialog-description-${selectedFeature.id}`}
            >
              {selectedFeature.description}
            </p>

            <div className="project-dialog__section">
              <p className="project-dialog__label">{projects.technologiesTitle}</p>
              <ul className="project-dialog__technologies" aria-label={projects.technologiesLabel}>
                {selectedFeature.technologies.map((technology) => (
                  <li key={technology}>
                    {TECHNOLOGY_ICONS[technology] && (
                      <img src={TECHNOLOGY_ICONS[technology]} alt="" aria-hidden="true" />
                    )}
                    {technology}
                  </li>
                ))}
              </ul>
            </div>

            <div className="project-dialog__actions">
              <a
                className="project-dialog__link"
                href={FEATURE_TECHNICAL_LINKS[selectedFeature.id]}
                target="_blank"
                rel="noreferrer"
              >
                <span>{projects.technicalLinkLabel}</span>
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M11 4h5v5" />
                  <path d="m16 4-7 7" />
                  <path d="M15 11v4H5V5h4" />
                </svg>
              </a>
              <div className="project-dialog__video" aria-label={projects.videoLabel}>
                <span>{projects.videoLabel}</span>
                <small>{projects.videoComingSoon}</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
