import React from 'react';

const items = [
  ['Library', 'المكتبة الإسلامية', 'كتب وأذكار ومحتوى مختار', '▤'],
  ['Azkar', 'الأذكار', 'صباح، مساء وأذكار مختارة', '☼'],
  ['Qibla', 'القبلة', 'اتجاه مكة بدقة', '◉'],
  ['Planner', 'المفكرة الإسلامية', 'عباداتك وأهدافك وملاحظاتك', '✎'],
  ['NoorAI', 'Noor AI', 'مساعد معرفي متصل بالإنترنت', '✦'],
  ['AdhanSettings', 'الأذان والتنبيهات', 'أصوات وتنبيهات الصلاة', '◷'],
  ['Settings', 'الإعدادات', 'اللغة والمظهر والخصوصية', '⚙'],
  ['About', 'عن Noor', 'رؤية التطبيق ومصادره', '☾']
];

export default function More({ setPage }) {
  return (
    <section className="page fade-in">
      <div className="page-title">
        <span>المزيد</span>
        <small>كل أدوات Noor في مساحة منظمة</small>
      </div>
      <div className="more-hero">
        <span className="more-orb">✦</span>
        <div>
          <strong>منصة Noor الإسلامية</strong>
          <p>قرآن، صلاة، ذكر، معرفة وأدوات يومية في تجربة واحدة.</p>
        </div>
      </div>
      <div className="more-grid">
        {items.map(([id, title, text, icon]) => (
          <button className="more-card" key={id} onClick={() => setPage(id)}>
            <span className="more-icon">{icon}</span>
            <span><strong>{title}</strong><small>{text}</small></span>
            <b>‹</b>
          </button>
        ))}
      </div>
    </section>
  );
}
