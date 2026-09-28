import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { useLanguage } from "../../../i18n/LanguageContext";

// Tạo lời mời liên hệ cuối portfolio bằng các kênh đã có sẵn, không yêu cầu backend xử lý form.
export default function ContactSection() {
  const { t } = useLanguage();
  const contact = t.contact;

  return (
    <section
      className="contact-section wrap"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-section__card">
        <div className="contact-section__content">
          <p className="contact-section__eyebrow">{contact.eyebrow}</p>
          <h2 id="contact-title">
            {contact.titleFirst} <span>{contact.titleAccent}</span>
          </h2>
          <p className="contact-section__description">{contact.description}</p>

        </div>

        <div className="contact-section__details" aria-label={contact.detailsLabel}>
          <a className="contact-section__link" href="mailto:daongocanh25042004@gmail.com">
            <Mail size={18} strokeWidth={1.7} aria-hidden="true" />
            <span>
              <small>{contact.emailLabel}</small>
              <strong>daongocanh25042004@gmail.com</strong>
            </span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>

          <a className="contact-section__link" href="tel:+84353707544">
            <Phone size={18} strokeWidth={1.7} aria-hidden="true" />
            <span>
              <small>{contact.phoneLabel}</small>
              <strong>0353 707 544</strong>
            </span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>

          <a
            className="contact-section__link"
            href="https://github.com/DaoNgocAnh25092004"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="contact-section__github-icon"
              src="/assets/icons/tech/github.svg"
              alt=""
              aria-hidden="true"
            />
            <span>
              <small>{contact.githubLabel}</small>
              <strong>DaoNgocAnh25092004</strong>
            </span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
