import React from 'react';

export default function PermissionIntro({ onAccept }) {
  return (
    <div className="permission-overlay">
      <div className="permission-card noor-glass">
        <div className="permission-glow"></div>
        <div className="permission-icon animated-icon">🕋</div>
        <h2>Noor</h2>
        <h3>تجربة روحانية متكاملة</h3>
        <p>
          يحتاج Noor إلى بعض الصلاحيات ليقدم لك تجربة إسلامية دقيقة ومتكاملة.
        </p>

        <div className="permission-item">
          <span>📍</span>
          <div>
            <strong>الموقع</strong>
            <p>لحساب مواقيت الصلاة المحلية وتحديد اتجاه القبلة.</p>
          </div>
        </div>

        <div className="permission-item">
          <span>🔔</span>
          <div>
            <strong>الإشعارات</strong>
            <p>لتنبيهات الأذان وتذكيرات القرآن والأذكار.</p>
          </div>
        </div>

        <button className="permission-button" onClick={onAccept}>
          السماح والمتابعة
        </button>
      </div>
    </div>
  );
}
