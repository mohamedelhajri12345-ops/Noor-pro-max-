import React,{useEffect,useState} from 'react';
const samples=['سبحان الله وبحمده','لا إله إلا الله وحده لا شريك له','اللهم صل وسلم على نبينا محمد','أستغفر الله وأتوب إليه'];
export default function Azkar(){const [i,setI]=useState(0);return <section className="page fade-in"><div className="page-title"><span>الأذكار</span><small>أذكار مختارة للاستخدام اليومي</small></div><div className="dhikr-card"><span>الذكر {i+1} / {samples.length}</span><p>{samples[i]}</p><button className="primary" onClick={()=>setI((i+1)%samples.length)}>التالي</button></div></section>}
