import React from 'react';
import './styles.css';

export default function App() {
  const features = [
    {icon:'📖', name:'القرآن الكريم'},
    {icon:'🕌', name:'مواقيت الصلاة'},
    {icon:'📿', name:'المسبحة'},
    {icon:'🧭', name:'القبلة'},
    {icon:'🤲', name:'الأذكار'},
    {icon:'📚', name:'المكتبة'},
    {icon:'📝', name:'المفكرة'},
    {icon:'✨', name:'Noor AI'}
  ];

  return (
    <main className="noor-app">
      <div className="floating-light" />
      <section className="hero">
        <div className="kaaba-icon">🕋</div>
        <h1>Noor</h1>
        <p>نورٌ يرافقك في طريق الإيمان</p>
        <div className="daily-card">
          <span>ورد اليوم</span>
          <strong>اقرأ حزبك من القرآن</strong>
        </div>
      </section>

      <section className="features">
        {features.map((item) => (
          <div className="feature-card" key={item.name}>
            <div className="feature-icon">{item.icon}</div>
            <div>{item.name}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
