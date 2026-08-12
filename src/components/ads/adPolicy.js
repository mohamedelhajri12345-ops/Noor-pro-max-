const BLOCKED_PAGES = new Set(['Quran', 'AdhanSettings', 'Prayer', 'Tasbeeh']);

export const START_IO_APP_ID = '207270163';

export function canShowAds(page, { quranPlaying = false, adhanPlaying = false } = {}) {
  if (BLOCKED_PAGES.has(page)) return false;
  if (quranPlaying || adhanPlaying) return false;
  return true;
}

export function getAdPlacement(page) {
  if (!canShowAds(page)) return null;
  if (page === 'Home') return { id: 'home-banner', banner: true, native: false };
  if (page === 'Library') return { id: 'library-native', banner: false, native: true };
  if (page === 'Planner') return { id: 'planner-native', banner: false, native: true };
  return { id: 'general-banner', banner: true, native: false };
}
