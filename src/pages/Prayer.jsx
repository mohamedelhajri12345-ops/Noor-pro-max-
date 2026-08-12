import React, {useState} from 'react';
import AdhanSettings from './AdhanSettings';

export default function Prayer(){
 const [showSettings,setShowSettings]=useState(false);
 return (
  <section className="page prayer-page">
   <h2>🕌 مواقيت الصلاة</h2>
   <p>عرض المواقيت المحلية والتنبيهات.</p>
   <div className="prayer-card">
    <h3>🔔 إعدادات الأذان</h3>
    <p>تحكم في صوت الأذان والتذكيرات.</p>
    <button onClick={()=>setShowSettings(!showSettings)}>
      {showSettings ? 'إخفاء الإعدادات' : 'فتح إعدادات الأذان'}
    </button>
   </div>
   {showSettings && <AdhanSettings />}
  </section>
 );
}
