export function scheduleBackgroundAdhan(prayerTime, voice) {
  return {
    prayerTime,
    voice,
    status: 'scheduled'
  };
}

export function stopBackgroundAdhan() {
  return true;
}
