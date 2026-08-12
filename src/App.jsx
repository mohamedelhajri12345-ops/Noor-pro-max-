import React from 'react';
import './styles.css';

export default function App() {
  const features = [
    'القرآن الكريم',
    'مواقيت الصلاة',
    'المسبحة الإلكترونية',
    'القبلة',
    'الأذكار',
    'المكتبة الإسلامية',
    'المفكرة الإسلامية',
    'Noor AI'
  ];

  return (
    <main className="noor-app">
      <section className="hero">
        <h1>Noor</h1>
        <p>رفيقك الروحي في كل وقت</p>
      </section>
      <section className="features">
        {features.map((item) => (
          <div className="feature-card" key={item}>{item}</div>
        ))}
      </section>
    </main>
  );
}
