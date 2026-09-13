import { useEffect, useMemo, useRef } from "react";
import { BrainCircuit, Cloud, Code2, Database, Server } from "lucide-react";
import InfiniteSpiral from "../../../components/infinite-spiral/InfiniteSpiral";
import { useLanguage } from "../../../i18n/LanguageContext";

// Ghép lần lượt ảnh trong thư mục skills với frontend, backend, data, AI và DevOps.
const SPIRAL_ITEMS = [
  { id: "skill-frontend", src: "/assets/images/skills/1.png", alt: "Frontend interface and web design" },
  { id: "skill-backend", src: "/assets/images/skills/2.png", alt: "Backend server infrastructure" },
  { id: "skill-architecture", src: "/assets/images/skills/3.png", alt: "Connected nodes representing system architecture" },
  { id: "skill-database", src: "/assets/images/skills/4.png", alt: "Database layers and data storage" },
  { id: "skill-messaging", src: "/assets/images/skills/5.png", alt: "Data streams moving through a messaging system" },
  { id: "skill-ai", src: "/assets/images/skills/6.png", alt: "Neural network representing artificial intelligence" },
  { id: "skill-rag", src: "/assets/images/skills/7.png", alt: "AI knowledge graph and connected information" },
  { id: "skill-cloud", src: "/assets/images/skills/8.png", alt: "Cloud infrastructure connected to servers" },
  { id: "skill-devops", src: "/assets/images/skills/9.png", alt: "Automated deployment pipeline and containers" },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  // Cập nhật mô tả ảnh theo ngôn ngữ mà không tạo lại cấu hình gallery ở mỗi lần render.
  const spiralItems = useMemo(
    () => SPIRAL_ITEMS.map((item, index) => ({ ...item, alt: t.skills.galleryItems[index] })),
    [t.skills.galleryItems],
  );

  // Hiện từng nhóm kỹ năng khi cuộn tới section và ngắt observer sau khi nhóm đã xuất hiện.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const items = section.querySelectorAll("[data-about-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    section.classList.add("about-section--animated");
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -24px 0px" });

    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      section.classList.remove("about-section--animated");
    };
  }, []);

  return (
    <section className="about-section wrap" id="about" aria-labelledby="skills-title" ref={sectionRef}>
      <header className="about-section__header" data-about-reveal>
        <div className="about-section__intro">
          <h2 className="about-section__title" id="skills-title">
            <span className="about-section__title-word">{t.skills.titleFirst}</span>{" "}
            <span className="about-section__title-word about-section__title-word--accent">{t.skills.titleAccent}</span>
          </h2>
          <p className="about-section__description">
            {t.skills.description}
          </p>
        </div>
        <dl className="about-section__stats" aria-label={t.skills.overview}>
          <div><dt>{t.skills.focusAreas}</dt><dd>05</dd></div>
          <div><dt>{t.skills.technologies}</dt><dd>32</dd></div>
        </dl>
      </header>

      <div className="about-section__layout">
        <div
          className="about-visual"
          data-about-reveal
          role="group"
          aria-label={t.skills.gallery}
        >
          <InfiniteSpiral
            items={spiralItems}
            animationMode="auto"
            speed={0.55}
            radius={164}
            cardWidth={136}
            cardHeight={162}
            verticalSpacing={58}
            perspective={1000}
            cardsPerTurn={7}
            cardRadius={12}
            centerScale={1.14}
            edgeFade={0.3}
            edgeBlur={4}
            pauseOnHover
            imageFit="cover"
            grayscale={1}
            className="about-spiral"
          />
        </div>

        <section className="about-skills" aria-labelledby="skills-title">
          <p className="about-skills__eyebrow">{t.skills.eyebrow}</p>
          <div className="about-skills__grid">
            <article className="about-skills__group" data-about-reveal>
              <div className="about-skills__group-heading">
                <div className="about-skills__label">
                  <span className="about-skills__icon"><Code2 size={17} strokeWidth={1.7} /></span>
                  <h4>{t.skills.groups[0]}</h4>
                </div>
                <span>01</span>
              </div>
              <ul className="about-skills__tags" aria-label={t.skills.groupLabels[0]}>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/javascript.svg" alt="" aria-hidden="true" />JavaScript (ES6+)</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/typescript.svg" alt="" aria-hidden="true" />TypeScript</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/react.svg" alt="" aria-hidden="true" />React.js</li>
                <li><img className="about-skills__tag-icon about-skills__tag-icon--light" src="/assets/icons/tech/nextjs.svg" alt="" aria-hidden="true" />Next.js</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/tailwind.svg" alt="" aria-hidden="true" />Tailwind CSS</li>
                <li><img className="about-skills__tag-icon about-skills__tag-icon--light" src="/assets/icons/tech/vercel.svg" alt="" aria-hidden="true" />shadcn/ui</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/redux.svg" alt="" aria-hidden="true" />Redux</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/react.svg" alt="" aria-hidden="true" />TanStack Query</li>
              </ul>
            </article>

            <article className="about-skills__group" data-about-reveal>
              <div className="about-skills__group-heading">
                <div className="about-skills__label">
                  <span className="about-skills__icon"><Server size={17} strokeWidth={1.7} /></span>
                  <h4>{t.skills.groups[1]}</h4>
                </div>
                <span>02</span>
              </div>
              <ul className="about-skills__tags" aria-label={t.skills.groupLabels[1]}>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/nodejs.svg" alt="" aria-hidden="true" />Node.js</li>
                <li><img className="about-skills__tag-icon about-skills__tag-icon--light" src="/assets/icons/tech/express.svg" alt="" aria-hidden="true" />Express.js</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/nestjs.svg" alt="" aria-hidden="true" />NestJS</li>
                <li><img className="about-skills__tag-icon about-skills__tag-icon--light" src="/assets/icons/tech/openapi.svg" alt="" aria-hidden="true" />REST APIs</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/microservices.svg" alt="" aria-hidden="true" />Microservices</li>
                <li><img className="about-skills__tag-icon about-skills__tag-icon--light" src="/assets/icons/tech/event-driven.svg" alt="" aria-hidden="true" />{t.skills.eventDriven}</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/oop.svg" alt="" aria-hidden="true" />OOP</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/solid.svg" alt="" aria-hidden="true" />SOLID</li>
              </ul>
            </article>

            <article className="about-skills__group" data-about-reveal>
              <div className="about-skills__group-heading">
                <div className="about-skills__label">
                  <span className="about-skills__icon"><Database size={17} strokeWidth={1.7} /></span>
                  <h4>{t.skills.groups[2]}</h4>
                </div>
                <span>03</span>
              </div>
              <ul className="about-skills__tags" aria-label={t.skills.groupLabels[2]}>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/mongodb.svg" alt="" aria-hidden="true" />MongoDB</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/postgresql.svg" alt="" aria-hidden="true" />PostgreSQL</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/redis.svg" alt="" aria-hidden="true" />Redis</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/kafka.svg" alt="" aria-hidden="true" />Apache Kafka</li>
              </ul>
            </article>

            <article className="about-skills__group" data-about-reveal>
              <div className="about-skills__group-heading">
                <div className="about-skills__label">
                  <span className="about-skills__icon"><BrainCircuit size={17} strokeWidth={1.7} /></span>
                  <h4>{t.skills.groups[3]}</h4>
                </div>
                <span>04</span>
              </div>
              <ul className="about-skills__tags" aria-label={t.skills.groupLabels[3]}>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/genai.svg" alt="" aria-hidden="true" />OpenAI / GenAI APIs</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/rag.svg" alt="" aria-hidden="true" />RAG</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/agents.svg" alt="" aria-hidden="true" />{t.skills.aiAgents}</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/vector-db.svg" alt="" aria-hidden="true" />{t.skills.vectorDatabases}</li>
                <li><img className="about-skills__tag-icon about-skills__tag-icon--light" src="/assets/icons/tech/prompt.svg" alt="" aria-hidden="true" />{t.skills.promptEngineering}</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/ai-coding.svg" alt="" aria-hidden="true" />{t.skills.aiCoding}</li>
              </ul>
            </article>

            <article className="about-skills__group" data-about-reveal>
              <div className="about-skills__group-heading">
                <div className="about-skills__label">
                  <span className="about-skills__icon"><Cloud size={17} strokeWidth={1.7} /></span>
                  <h4>{t.skills.groups[4]}</h4>
                </div>
                <span>05</span>
              </div>
              <ul className="about-skills__tags" aria-label={t.skills.groupLabels[4]}>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/git.svg" alt="" aria-hidden="true" />Git &amp; GitHub</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/docker.svg" alt="" aria-hidden="true" />Docker</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/nginx.svg" alt="" aria-hidden="true" />Nginx</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/aws.svg" alt="" aria-hidden="true" />AWS</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/github-actions.svg" alt="" aria-hidden="true" />GitHub Actions</li>
                <li><img className="about-skills__tag-icon" src="/assets/icons/tech/cicd.svg" alt="" aria-hidden="true" />CI/CD</li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
}
