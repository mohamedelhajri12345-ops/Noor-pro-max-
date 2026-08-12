const SURAH_CACHE_PREFIX = 'noor.quran.surah.';
const RECITER = 'ar.alafasy';
const API = 'https://api.alquran.cloud/v1';

export const getSurahs = () => {
  try {
    return JSON.parse(localStorage.getItem('noor.quran.surahs') || '[]');
  } catch {
    return [];
  }
};

export async function fetchSurahs() {
  const cached = getSurahs();
  try {
    const response = await fetch(`${API}/surah`, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Quran API ${response.status}`);
    const payload = await response.json();
    const list = payload?.data || [];
    localStorage.setItem('noor.quran.surahs', JSON.stringify(list));
    return list;
  } catch {
    return cached;
  }
}

export async function getSurah(number) {
  const key = `${SURAH_CACHE_PREFIX}${number}`;
  try {
    const cached = JSON.parse(localStorage.getItem(key) || 'null');
    if (cached?.data) return cached;
  } catch {}

  const response = await fetch(`${API}/surah/${number}`, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('تعذر تحميل السورة');
  const payload = await response.json();
  localStorage.setItem(key, JSON.stringify(payload));
  return payload;
}

export async function getRecitation(number) {
  const response = await fetch(`${API}/surah/${number}/${RECITER}`, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('تعذر تحميل التلاوة');
  return response.json();
}

export function getCachedSurah(number) {
  try {
    return JSON.parse(localStorage.getItem(`${SURAH_CACHE_PREFIX}${number}`) || 'null');
  } catch {
    return null;
  }
}
