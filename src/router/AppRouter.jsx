import React from 'react';
import Home from '../pages/Home';
import Quran from '../pages/Quran';
import Prayer from '../pages/Prayer';
import Tasbeeh from '../pages/Tasbeeh';
import Library from '../pages/Library';
import Qibla from '../pages/Qibla';
import Azkar from '../pages/Azkar';
import Planner from '../pages/Planner';
import NoorAI from '../pages/NoorAI';
import AdhanSettings from '../pages/AdhanSettings';
import Settings from '../pages/Settings';
import About from '../pages/About';

export default function AppRouter({ page, setPage }) {
  const pages = { Home, Quran, Prayer, Tasbeeh, Library, Qibla, Azkar, Planner, NoorAI, AdhanSettings, Settings, About };
  const Page = pages[page] || Home;
  return <Page setPage={setPage} />;
}
