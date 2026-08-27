import "./MobileNotice.css";

// Hiển thị lời nhắc chuyển sang màn hình lớn để trải nghiệm portfolio đầy đủ hơn.
export default function MobileNotice() {
  return (
    <aside className="mobile-notice" role="status" aria-live="polite">
      <div className="mobile-notice-card">
        <p className="mobile-notice-eyebrow">Mobile experience in progress</p>
        <h2>The mobile version is under development.</h2>
        <p className="mobile-notice-copy">
          For now, please switch to a laptop or desktop to explore the
          portfolio in full detail.
        </p>

        <div className="mobile-notice-footer">
          <span>Desktop preview available</span>
          <span aria-hidden="true">01 / 01</span>
        </div>
      </div>
    </aside>
  );
}
