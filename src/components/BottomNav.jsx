import React from 'react';

const items = [
  ['Home', 'الرئيسية', '⌂'],
  ['Quran', 'القرآن', '۞'],
  ['Prayer', 'الصلاة', '◷'],
  ['Tasbeeh', 'المسبحة', '●'],
  ['More', 'المزيد', '☰']
];

const morePages = new Set(['More', 'Library', 'Qibla', 'Azkar', 'Planner', 'NoorAI', 'Settings', 'About', 'AdhanSettings']);

export default function BottomNav({ page, setPage }) {
  return (
    <nav className="bottom-nav" aria-label="التنقل الرئيسي">
      {items.map(([id, label, icon]) => {
        const active = page === id || (id === 'More' && morePages.has(page));
        return (
          <button className={active ? 'active' : ''} key={id} aria-label={label} aria-current={active ? 'page' : undefined} onClick={() => setPage(id)}>
            <span>{icon}</span>
            <small>{label}</small>
          </button>
        );
      })}
    </nav>
  );
}
