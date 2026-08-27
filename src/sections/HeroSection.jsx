import { ArrowUpRight, ChevronDown } from "lucide-react";
import Lanyard from "../components/lanyard/Lanyard";
import TextType from "../components/text-type/TextType";

// Tạo hero hai cột với thông tin thật của Đào Ngọc Anh và thẻ lanyard 3D tương tác.
export default function HeroSection() {
  return (
    <section className="hero wrap" id="top">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-kicker">Đào Ngọc Anh / Software Engineer</div>
          <h1>
            <TextType
              className="hero-title-type"
              text={[
                "I am a Fullstack Developer.",
                "I build scalable web products.",
                "I craft interfaces with React & Next.js.",
                "I architect APIs with Node.js & NestJS.",
                "I design systems with PostgreSQL, Redis & Kafka.",
                "I ship reliable software with Docker & CI/CD.",
                "I integrate AI with LLMs, RAG & vector databases.",
                "I build with OpenAI APIs, AI agents & prompt engineering.",
                "I turn ideas into production-ready systems.",
              ]}
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
              Fullstack Developer with <strong>10 months of experience</strong>{" "}
              building scalable web applications and event-driven systems.
              Proficient in React, Next.js, Node.js, NestJS, PostgreSQL, Redis
              and Kafka, with hands-on experience integrating OpenAI/GenAI APIs,
              RAG pipelines, vector databases and AI agents.
            </p>
            <div className="hero-actions">
              <a className="hero-button hero-button-primary" href="#work">
                View projects <ArrowUpRight size={17} />
              </a>
              <a
                className="hero-button hero-button-secondary"
                href="https://github.com/DaoNgocAnh25092004"
                target="_blank"
                rel="noreferrer"
              >
                GitHub profile <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Thẻ profile tương tác">
          <Lanyard
            position={[0, 0, 25]}
            gravity={[0, -40, 0]}
            frontImage="/assets/profile.png"
            backImage="/assets/profile.png"
            imageFit="center"
            lanyardWidth={1}
          />
        </div>
      </div>
    </section>
  );
}
