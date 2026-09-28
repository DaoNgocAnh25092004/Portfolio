import { useLanguage } from "../../../i18n/LanguageContext";

// Hiển thị thông tin bản quyền ở cuối trang để xác định chủ sở hữu portfolio.
export default function FooterSection() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer wrap">
      <span>{t.footer.copyright}</span>
      <span>{t.footer.label}</span>
    </footer>
  );
}
