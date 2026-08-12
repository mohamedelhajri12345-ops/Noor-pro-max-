const KEY = 'noor.prayers';
const METHOD_KEY = 'noor.prayerMethod';

const DEFAULTS = {
  location: 'الموقع غير محدد',
  date: '',
  source: 'none',
  method: 3,
  times: { Fajr: '', Dhuhr: '', Asr: '', Maghrib: '', Isha: '' }
};

const localDateKey = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export function getPrayerMethod() {
  const value = Number(localStorage.getItem(METHOD_KEY) || DEFAULTS.method);
  return Number.isFinite(value) ? value : DEFAULTS.method;
}

export function setPrayerMethod(method) {
  const value = Number(method);
  if (!Number.isFinite(value)) return;
  localStorage.setItem(METHOD_KEY, String(value));
}

export function getStoredPrayerData() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || '{}');
    return {
      ...DEFAULTS,
      ...stored,
      times: { ...DEFAULTS.times, ...(stored.times || {}) }
    };
  } catch {
    return { ...DEFAULTS, times: { ...DEFAULTS.times } };
  }
}

export function savePrayerData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getNextPrayer(data = getStoredPrayerData(), now = new Date()) {
  const names = { Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };
  const current = now.getHours() * 60 + now.getMinutes();
  const list = Object.entries(data.times || [])
    .map(([key, time]) => {
      const match = String(time || '').match(/^(\d{1,2}):(\d{2})/);
      if (!match) return null;
      const hours = Number(match[1]);
      const minutes = Number(match[2]);
      if (hours > 23 || minutes > 59) return null;
      return { key, name: names[key] || key, time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`, minutes: hours * 60 + minutes };
    })
    .filter(Boolean)
    .sort((a, b) => a.minutes - b.minutes);

  if (!list.length) return null;
  const next = list.find((item) => item.minutes > current) || list[0];
  const delta = (next.minutes - current + 1440) % 1440;
  return { ...next, remaining: delta === 0 ? 'الآن' : `${Math.floor(delta / 60)} س ${delta % 60} د` };
}

export async function calculateFromCoordinates(lat, lon, method = getPrayerMethod()) {
  const today = localDateKey();
  try {
    const url = `https://api.aladhan.com/v1/timings/${today}?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&method=${encodeURIComponent(method)}`;
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Prayer API ${response.status}`);
    const timings = (await response.json())?.data?.timings;
    if (!timings) throw new Error('Invalid prayer response');

    const data = {
      location: `${Number(lat).toFixed(2)}, ${Number(lon).toFixed(2)}`,
      date: today,
      times: {
        Fajr: timings.Fajr?.slice(0, 5),
        Dhuhr: timings.Dhuhr?.slice(0, 5),
        Asr: timings.Asr?.slice(0, 5),
        Maghrib: timings.Maghrib?.slice(0, 5),
        Isha: timings.Isha?.slice(0, 5)
      },
      source: 'aladhan',
      method
    };
    savePrayerData(data);
    return data;
  } catch {
    const cached = getStoredPrayerData();
    return { ...cached, source: cached.date ? 'cache' : 'none' };
  }
}
