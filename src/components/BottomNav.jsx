import React from 'react';

export default function BottomNav({active, setActive}) {
 const items=[
  ['Home','الرئيسية'],
  ['Quran','القرآن'],
  ['Prayer','الصلاة'],
  ['Tasbeeh','المسبحة'],
  ['NoorAI','Noor AI']
 ];
 return <nav className="bottom-nav">
  {items.map(([id,label])=>(
   <button key={id} className={active===id?'active':''} onClick={()=>setActive(id)}>{label}</button>
  ))}
 </nav>;
}
