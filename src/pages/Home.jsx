import React, { useEffect, useMemo, useState } from 'react';
import { getStoredPrayerData, getNextPrayer } from '../services/prayerService';

const tools = [
  ['Quran', 'القرآن', 'تلاوة وقراءة', 'ق'],
  ['Prayer', 'الصلاة', 'مواقيت اليوم', 'ص'],
  ['Qibla', 'القبلة', 'اتجاه مكة', 'ق'],
  ['Azkar', 'الأذكار', 'أذكار الصباح والمساء', 'ذ'],
  ['Tasbeeh', 'المسبحة', 'ذكر وعدّاد', 'س'],
  ['Planner', 'مفكرتي', 'عبادات وملاحظات', 'م']
];

export default function Home({ setPage }) {
  const [prayer, setPrayer] = useState(getStoredPrayerData());
  const [locationState, setLocationState] = useState('جاري تحديد موقعك…');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
      setPrayer(getStoredPrayerData());
    }, 30000);
    if (!navigator.geolocation) setLocationState('الموقع غير متاح على هذا الجهاز');
    else navigator.geolocation.getCurrentPosition(
      () => setLocationState('تم تحديد موقعك تلقائيًا'),
      () => setLocationState('يمكنك السماح بالموقع لحساب مواقيتك بدقة'),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 }
    );
    return () => clearInterval(timer);
  }, []);

  const next = getNextPrayer(prayer);
  const dateLabel = useMemo(() => new Intl.DateTimeFormat('ar', { weekday: 'long', day: 'numeric', month: 'long' }).format(now), [now]);

  return (
    <section className="home fade-in">
      <div className="home-intro">
        <div>
          <span className="eyebrow">{dateLabel}</span>
          <h1>السلام عليكم</h1>
          <p>نورٌ هادئ لرحلتك اليومية مع الله.</p>
        </div>
        <button className="brand-seal" onClick={() => setPage('About')} aria-label="عن Noor">ن</button>
      </div>

      <div className="hero-card hero-prayer">
        <div className="hero-prayer-copy">
          <span className="eyebrow">الصلاة القادمة</span>
          <strong>{next?.name || 'لم تُحسب بعد'}</strong>
          <b>{next?.time || '--:--'}</b>
          <small>{next?.remaining || 'افتح صفحة الصلاة لتحديث المواقيت'}</small>
        </div>
        <div className="hero-moon" aria-hidden="true">☾</div>
        <button className="primary" onClick={() => setPage('Prayer')}>مواقيت اليوم</button>
      </div>

      <div className="location-chip" role="status">
        <span className="location-dot" />
        <span>{locationState}</span>
        <button onClick={() => setPage('Prayer')}>تحديث</button>
      </div>

      <div className="daily-strip">
        <span>آية اليوم</span>
        <strong>وَاذْكُر رَّبَّكَ إِذَا نَسِيتَ</strong>
        <small>الكهف 24</small>
      </div>

      <div className="section-heading"><h2>يومك مع Noor</h2><button className="text-button" onClick={() => setPage('More')}>كل الخدمات</button></div>
      <div className="feature-grid home-tools">
        {tools.map(([id, title, text, icon], index) => (
          <button className={`feature-card feature-${index % 4}`} key={id} onClick={() => setPage(id)}>
            <span className="card-icon"><b>{icon}</b></span>
            <strong>{title}</strong>
            <small>{text}</small>
          </button>
        ))}
      </div>

      <div className="home-ai" onClick={() => setPage('NoorAI')} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setPage('NoorAI')}>
        <span>✦</span>
        <div><strong>Noor AI</strong><small>مساعد معرفي عبر الإنترنت. لا توجد إجابة مصطنعة عند انقطاع الخدمة.</small></div>
        <b>‹</b>
      </div>

      <div className="home-quiet-note">
        <span>✧</span>
        <div><strong>مصمم ليبقى هادئًا</strong><small>لا تسجيل، لا حساب، والميزات الأساسية مصممة للعمل دون اتصال قدر الإمكان.</small></div>
      </div>
    </section>
  );
}
