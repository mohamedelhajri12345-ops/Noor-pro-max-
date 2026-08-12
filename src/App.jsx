import React, {useState} from 'react';
import './styles.css';

export default function App() {
  const [active, setActive] = useState('الرئيسية');

  const pages = {
    'الرئيسية': 'نورٌ يرافقك في طريق الإيمان',
    'القرآن الكريم': 'صفحة القرآن والمشغل المتواصل',
    'الصلاة': 'مواقيت الصلاة والأذان',
    'المسبحة': 'المسبحة الإلكترونية',
    'القبلة': 'بوصلة القبلة',
    'الأذكار': 'أذكار الصباح والمساء',
    'المكتبة': 'المكتبة الإسلامية',
    'المفكرة': 'المفكرة الإسلامية',
    'Noor AI': 'المساعد الإسلامي الذكي'
  };

  const features = Object.keys(pages).filter(p => p !== 'الرئيسية');

  return (
    <main className="noor-app">
      <section className="hero">
        <div className="kaaba-icon">🕋</div>
        <h1>Noor</h1>
        <p>{pages[active]}</p>
      </section>

      <section className="page-view">
        <h2>{active}</h2>
        <p>سيتم تجهيز هذه الصفحة بخصائصها الكاملة.</p>
      </section>

      <section className="features">
        {features.map((item)=>(
          <button className="feature-card" key={item} onClick={()=>setActive(item)}>
            {item}
          </button>
        ))}
      </section>

      <nav className="bottom-nav">
        <button onClick={()=>setActive('الرئيسية')}>⌂</button>
        <button onClick={()=>setActive('القرآن الكريم')}>📖</button>
        <button onClick={()=>setActive('الصلاة')}>🕌</button>
        <button onClick={()=>setActive('Noor AI')}>✨</button>
      </nav>
    </main>
  );
}
