import React, { useEffect, useState } from 'react';
import './styles.css';
import SplashScreen from './components/SplashScreen';
import PermissionIntro from './components/PermissionIntro';
import BottomNav from './components/BottomNav';
import AppRouter from './router/AppRouter';
import NoorBannerAd from './components/ads/NoorBannerAd';
import { canShowAds } from './components/ads/adPolicy';
import { requestNoorPermissions } from './services/permissionService';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showPermissionIntro, setShowPermissionIntro] = useState(false);
  const [page, setPage] = useState('Home');

  useEffect(() => {
    const done = setTimeout(() => {
      setLoading(false);
      if (localStorage.getItem('noor.permissionIntroSeen') !== '1') setShowPermissionIntro(true);
    }, 900);
    return () => clearTimeout(done);
  }, []);

  const allowPermissions = async () => {
    localStorage.setItem('noor.permissionIntroSeen', '1');
    setShowPermissionIntro(false);
    await requestNoorPermissions();
  };

  if (loading) return <SplashScreen />;
  if (showPermissionIntro) return <PermissionIntro onAccept={allowPermissions} onSkip={() => { localStorage.setItem('noor.permissionIntroSeen', '1'); setShowPermissionIntro(false); }} />;

  return (
    <main className="noor-app" dir="rtl">
      <header className="topbar">
        <div><span className="brand-mark">☾</span><strong>Noor</strong></div>
        <span className="brand-subtitle">نورٌ يرافقك</span>
      </header>
      <div className="page-shell">
        <AppRouter page={page} setPage={setPage} />
      </div>
      {canShowAds(page) && <NoorBannerAd />}
      <BottomNav page={page} setPage={setPage} />
    </main>
  );
}
