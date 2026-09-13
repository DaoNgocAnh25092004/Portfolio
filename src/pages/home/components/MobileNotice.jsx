import "../styles/mobile-notice.css";
import { useLanguage } from "../../../i18n/LanguageContext";

// Hiển thị lời nhắc chuyển sang màn hình lớn để trải nghiệm portfolio đầy đủ hơn.
export default function MobileNotice() {
  const { t } = useLanguage();

  return (
    <aside className="mobile-notice" role="status" aria-live="polite">
      <div className="mobile-notice-card">
        <p className="mobile-notice-eyebrow">{t.mobile.eyebrow}</p>
        <h2>{t.mobile.title}</h2>
        <p className="mobile-notice-copy">{t.mobile.copy}</p>

        <div className="mobile-notice-footer">
          <span>{t.mobile.footer}</span>
          <span aria-hidden="true">01 / 01</span>
        </div>
      </div>
    </aside>
  );
}
