const KEY = 'noor.prayers';
const DEFAULTS = { location: 'الموقع غير محدد', date: '', times: { Fajr:'05:00', Dhuhr:'13:15', Asr:'16:45', Maghrib:'20:30', Isha:'22:00' } };
export function getStoredPrayerData() { try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return DEFAULTS; } }
export function savePrayerData(data) { localStorage.setItem(KEY, JSON.stringify(data)); }
export function getNextPrayer(data = getStoredPrayerData()) {
  const names = { Fajr:'الفجر', Dhuhr:'الظهر', Asr:'العصر', Maghrib:'المغرب', Isha:'العشاء' };
  const now = new Date(); const current = now.getHours() * 60 + now.getMinutes();
  const list = Object.entries(data.times || {}).map(([key,time]) => { const [h,m] = time.split(':').map(Number); return { key, name:names[key] || key, time, minutes:h*60+m }; });
  const next = list.find(x => x.minutes > current) || list[0];
  if (!next) return null;
  const delta = (next.minutes - current + 1440) % 1440;
  return { ...next, remaining: delta === 0 ? 'الآن' : `${Math.floor(delta/60)} س ${delta%60} د` };
}
export async function calculateFromCoordinates(lat, lon) {
  // Deterministic local fallback. A production prayer engine can replace this without changing the UI contract.
  const data = { ...DEFAULTS, location: `${lat.toFixed(2)}, ${lon.toFixed(2)}`, date: new Date().toISOString().slice(0,10) };
  savePrayerData(data); return data;
}
