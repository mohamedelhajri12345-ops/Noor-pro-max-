import React from 'react';

export default function PermissionIntro({ onAccept }) {
  return (
    <div className="permission-overlay">
      <div className="permission-card">
        <div className="permission-icon">🕌</div>
        <h2>مرحباً بك في Noor</h2>
        <p>
          لمساعدتك في معرفة مواقيت الصلاة بدقة وتشغيل تنبيهات الأذان،
          يحتاج التطبيق إلى إذن الموقع والإشعارات.
        </p>
        <ul>
          <li>📍 الموقع: لحساب أوقات الصلاة واتجاه القبلة.</li>
          <li>🔔 الإشعارات: لتذكيرك بالأذان والعبادات اليومية.</li>
        </ul>
        <button onClick={onAccept}>السماح والمتابعة</button>
      </div>
    </div>
  );
}
