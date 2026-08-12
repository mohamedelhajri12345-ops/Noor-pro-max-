const KEY = 'noor.adhan.settings';
const defaults = { enabled: true, selectedAdhan: null, volume: 0.85 };

function read() {
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
  catch { return { ...defaults }; }
}

const adhanSettings = read();
function persist() { localStorage.setItem(KEY, JSON.stringify(adhanSettings)); }

export function setAdhanSound(soundFile) {
  adhanSettings.selectedAdhan = soundFile || null;
  persist();
}

export function setAdhanVolume(volume) {
  adhanSettings.volume = Math.min(1, Math.max(0, Number(volume) || 0));
  persist();
}

export function enableAdhan(enabled) {
  adhanSettings.enabled = Boolean(enabled);
  persist();
}

export function playAdhanAtPrayerTime(prayerName) {
  if (!adhanSettings.enabled || !adhanSettings.selectedAdhan) return null;
  return { prayer: prayerName, audio: adhanSettings.selectedAdhan, volume: adhanSettings.volume, background: true };
}

export default adhanSettings;
