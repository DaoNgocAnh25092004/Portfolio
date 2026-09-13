import { useLanguage } from "../i18n/LanguageContext";

// Hiển thị cờ của ngôn ngữ đích và cho phép đổi ngôn ngữ bằng chuột hoặc bàn phím.
export default function LanguageToggle({ className = "" }) {
  const { language, t, toggleLanguage } = useLanguage();
  const nextFlag = language === "en" ? "vi.webp" : "us.jpg";

  return (
    <button
      className={`language-toggle ${className}`.trim()}
      type="button"
      onClick={toggleLanguage}
      aria-label={t.language.switchTo}
      title={t.language.switchTo}
    >
      <img
        src={`/assets/images/languages/${nextFlag}`}
        alt=""
        aria-hidden="true"
      />
      <span aria-hidden="true">{t.language.code}</span>
    </button>
  );
}
