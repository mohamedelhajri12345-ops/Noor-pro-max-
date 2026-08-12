import React, { useEffect, useState } from 'react';
import { getStoredPrayerData, getNextPrayer } from '../services/prayerService';
import { hideStartIoBanner, showStartIoBanner } from '../services/startIoNative';

const cards = [
  ['Quran', 'القرآن الكريم', 'تلاوة وقراءة هادئة'], ['Prayer', 'مواقيت الصلاة', 'الصلاة القادمة والوقت المتبقي'],
  ['Tasbeeh', 'المسبحة', 'ذكرٌ بلا إنترنت'], ['Qibla', 'اتجاه القبلة', 'بوصلة القبلة'],
  ['Azkar', 'الأذكار', 'صباحًا ومساءً'], ['Planner', 'المفكرة', 'عباداتك وأهدافك'],
  ['Library', 'المكتبة', 'محتوى إسلامي مختار'], ['NoorAI', 'Noor AI', 'مساعد إسلامي Online']
];

export default function Home({ setPage }) {
  const [prayer, setPrayer] = useState(getStoredPrayerData());

  useEffect(() => {
    const id = setInterval(() => setPrayer(getStoredPrayerData()), 30000);
    showStartIoBanner('Home').catch(() => {});
    return () => {
      clearInterval(id);
      hideStartIoBanner().catch(() => {});
    };
  }, []);

  const next = getNextPrayer(prayer);
  return <section className="home fade-in">
    <div className="hero-card"><span className="hero-glow">✦</span><p className="eyebrow">السلام عليكم</p><h1>نورٌ في يومك، وطمأنينة في قلبك</h1><p>كل ما تحتاجه لعبادتك في مساحة واحدة هادئة.</p><button className="primary" onClick={() => setPage('Quran')}>ابدأ بالقرآن</button></div>
    <div className="next-card"><div><span>الصلاة القادمة</span><strong>{next?.name || '—'}</strong></div><div className="next-time">{next?.time || '--:--'}<small>{next?.remaining || ''}</small></div></div>
    <div className="section-heading"><h2>الوصول السريع</h2><span>نور</span></div>
    <div className="feature-grid">{cards.map(([id, title, text], i) => <button className="feature-card" key={id} onClick={() => setPage(id)}><span className="card-icon">{['۞','◷','●','◉','☼','✎','▤','✦'][i]}</span><strong>{title}</strong><small>{text}</small></button>)}</div>
  </section>;
}
