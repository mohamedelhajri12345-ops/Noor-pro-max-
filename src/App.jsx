import React, {useState} from 'react';
import './styles.css';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('الرئيسية');

  React.useEffect(()=>{
    const timer = setTimeout(()=>setLoading(false), 2500);
    return ()=>clearTimeout(timer);
  },[]);

  if(loading) return <SplashScreen />;

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
      <section className="page-view"><h2>{active}</h2></section>
      <section className="features">
        {features.map((item)=>(
          <button className="feature-card" key={item} onClick={()=>setActive(item)}>{item}</button>
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
