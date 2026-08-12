// Noor Adhan Background Player Service
// Prepared for Android background audio integration.

const adhanSettings = {
  enabled: true,
  selectedAdhan: 'default-adhan.mp3',
};

export function setAdhanSound(soundFile) {
  adhanSettings.selectedAdhan = soundFile;
}

export function enableAdhan(enabled) {
  adhanSettings.enabled = enabled;
}

export function playAdhanAtPrayerTime(prayerName) {
  if (!adhanSettings.enabled) return;

  // Native Android background audio service will trigger this function
  // when a scheduled prayer notification fires.
  return {
    prayer: prayerName,
    audio: adhanSettings.selectedAdhan,
    background: true,
  };
}

export default adhanSettings;
