const KEY = 'noor.prayers';

const DEFAULTS = {
  location: 'الموقع غير محدد',
  date: '',
  times: { Fajr: '05:00', Dhuhr: '13:15', Asr: '16:45', Maghrib: '20:30', Isha: '22:00' },
  source: 'fallback'
};

export function getStoredPrayerData() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { ...DEFAULTS, ...stored, times: { ...DEFAULTS.times, ...(stored.times || {}) } };
  } catch {
    return DEFAULTS;
  }
}

export function savePrayerData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getNextPrayer(data = getStoredPrayerData()) {
  const names = { Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  const list = Object.entries(data.times || {})
    .map(([key, time]) => {
      const [h, m] = String(time).split(':').map(Number);
      return { key, name: names[key] || key, time, minutes: h * 60 + m };
    })
    .filter(item => Number.isFinite(item.minutes));
  const next = list.find(x => x.minutes > current) || list[0];
  if (!next) return null;
  const delta = (next.minutes - current + 1440) % 1440;
  return { ...next, remaining: delta === 0 ? 'الآن' : `${Math.floor(delta / 60)} س ${delta % 60} د` };
}

export async function calculateFromCoordinates(lat, lon, method = 3) {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const url = `https://api.aladhan.com/v1/timings/${today}?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&method=${encodeURIComponent(method)}`;
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Prayer API ${response.status}`);
    const payload = await response.json();
    const timings = payload?.data?.timings;
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
      source: 'aladhan'
    };
    savePrayerData(data);
    return data;
  } catch {
    const cached = getStoredPrayerData();
    return { ...cached, source: cached.date ? 'cache' : 'fallback' };
  }
}
