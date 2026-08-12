import React from 'react';
import Quran from '../pages/Quran';
import Prayer from '../pages/Prayer';
import Tasbeeh from '../pages/Tasbeeh';
import Library from '../pages/Library';
import Qibla from '../pages/Qibla';
import Azkar from '../pages/Azkar';
import Planner from '../pages/Planner';
import NoorAI from '../pages/NoorAI';

export default function AppRouter({page}) {
  const pages = {
    Quran,
    Prayer,
    Tasbeeh,
    Library,
    Qibla,
    Azkar,
    Planner,
    NoorAI
  };

  const Page = pages[page] || Quran;
  return <Page />;
}
