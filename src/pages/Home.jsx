import React, { useEffect, useState } from 'react';
import { getStoredPrayerData, getNextPrayer } from '../services/prayerService';
import { hideStartIoBanner, showStartIoBanner } from '../services/startIoNative';

const tools = [
  ['Quran', 'القرآن الكريم', 'قراءة وتلاوة', '۞'],
  ['Prayer', 'مواقيت الصلاة', 'الصلوات القادمة', '◷'],
  ['Tasbeeh', 'المسبحة', 'ذكر يومي', '●'],
  ['Qibla', 'القبلة', 'اتجاه مكة', '◉'],
  ['Azkar', 'الأذكار', 'أذكار اليوم', '☼'],
  ['Planner', 'المفكرة', 'خطتك وعباداتك', '✎']
];

export default function Home({ setPage }) {
  const [prayer, setPrayer] = useState(getStoredPrayerData());

  useEffect(() => {
    const refresh = () => setPrayer(getStoredPrayerData());
    const id = setInterval(refresh, 30000);
    showStartIoBanner('Home').catch(() => {});
    return () => { clearInterval(id); hideStartIoBanner().catch(() => {}); };
  }, []);

  const next = getNextPrayer(prayer);
  return (
    <section className="home fade-in">
      <div className="home-intro">
        <div>
          <span className="eyebrow">السلام عليكم</span>
          <h1>نورٌ يرافق يومك</h1>
          <p>عبادتك، قراءتك، وطمأنينتك في تجربة إسلامية واحدة.</p>
        </div>
        <button className="brand-seal" onClick={() => setPage('About')} aria-label="عن Noor">ن</button>
      </div>

      <div className="hero-card hero-prayer">
        <div className="hero-prayer-copy">
          <span className="eyebrow">الصلاة القادمة</span>
          <strong>{next?.name || '—'}</strong>
          <b>{next?.time || '--:--'}</b>
          <small>{next?.remaining || 'بانتظار تحديث المواقيت'}</small>
        </div>
        <div className="hero-moon" aria-hidden="true">☾</div>
        <button className="secondary" onClick={() => setPage('Prayer')}>عرض المواقيت</button>
      </div>

      <div className="daily-strip">
        <span>آية اليوم</span>
        <strong>وَاذْكُر رَّبَّكَ إِذَا نَسِيتَ</strong>
        <small>الكهف · 24</small>
      </div>

      <div className="section-heading"><h2>أدواتك اليومية</h2><button className="text-button" onClick={() => setPage('More')}>عرض الكل</button></div>
      <div className="feature-grid home-tools">
        {tools.map(([id, title, text, icon]) => (
          <button className="feature-card" key={id} onClick={() => setPage(id)}>
            <span className="card-icon">{icon}</span>
            <strong>{title}</strong>
            <small>{text}</small>
          </button>
        ))}
      </div>

      <div className="home-ai" onClick={() => setPage('NoorAI')} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setPage('NoorAI')}>
        <span>✦</span><div><strong>اسأل Noor AI</strong><small>مساعد معرفي متصل بالإنترنت، مع إظهار المصدر عند توفره.</small></div><b>‹</b>
      </div>
    </section>
  );
}
