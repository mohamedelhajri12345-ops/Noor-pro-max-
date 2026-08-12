const BLOCKED_PAGES = new Set(['Quran', 'AdhanSettings', 'Prayer', 'Tasbeeh']);

export const START_IO_APP_ID = '207270163';

export function canShowAds(page, { quranPlaying = false, adhanPlaying = false } = {}) {
  if (BLOCKED_PAGES.has(page)) return false;
  if (quranPlaying || adhanPlaying) return false;
  return true;
}

export function getAdPlacement(page) {
  if (!canShowAds(page)) return null;
  if (page === 'Home') return 'home-banner';
  if (page === 'Library') return 'library-native';
  if (page === 'Planner') return 'planner-native';
  return 'general-banner';
}
