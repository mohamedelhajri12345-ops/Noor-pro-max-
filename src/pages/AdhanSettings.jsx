import React, { useState } from 'react';

export default function AdhanSettings() {
  const [enabled, setEnabled] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [voice, setVoice] = useState('default');

  return (
    <div className="page adhan-settings">
      <h1>إعدادات الأذان</h1>
      <p>خصص تنبيهات الصلاة حسب رغبتك</p>

      <label>
        <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} />
        تفعيل الأذان
      </label>

      <label>
        <input type="checkbox" checked={reminders} onChange={() => setReminders(!reminders)} />
        تفعيل التذكيرات اليومية
      </label>

      <div>
        <h3>اختيار صوت الأذان</h3>
        <select value={voice} onChange={(e) => setVoice(e.target.value)}>
          <option value="default">أذان افتراضي</option>
          <option value="makkah">أذان مكة</option>
          <option value="madinah">أذان المدينة</option>
          <option value="calm">أذان هادئ</option>
        </select>
      </div>
    </div>
  );
}
