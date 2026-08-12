import React, {useState} from 'react';
import './styles.css';
import SplashScreen from './components/SplashScreen';
import PermissionIntro from './components/PermissionIntro';
import NoorBannerAd from './components/ads/NoorBannerAd';
import NoorNativeAd from './components/ads/NoorNativeAd';
import { requestNoorPermissions } from './services/permissionService';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showPermissionIntro, setShowPermissionIntro] = useState(false);
  const [active, setActive] = useState('الرئيسية');

  React.useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false);
      setShowPermissionIntro(true);
    },2500);
    return ()=>clearTimeout(timer);
  },[]);

  const allowPermissions = async () => {
    setShowPermissionIntro(false);
    await requestNoorPermissions();
  };

  if(loading) return <SplashScreen />;
  if(showPermissionIntro) return <PermissionIntro onAccept={allowPermissions}/>;

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
  const allowAds = !['القرآن الكريم','الصلاة'].includes(active);

  return (
    <main className="noor-app">
      <section className="hero">
        <div className="kaaba-icon">🕋</div>
        <h1>Noor</h1>
        <p>{pages[active]}</p>
      </section>

      {allowAds && <NoorBannerAd />}

      <section className="page-view"><h2>{active}</h2></section>

      {allowAds && active === 'المكتبة' && <NoorNativeAd />}

      <section className="features">
        {features.map((item)=>(
          <button className="feature-card" key={item} onClick={()=>setActive(item)}>{item}</button>
        ))}
      </section>
    </main>
  );
}
