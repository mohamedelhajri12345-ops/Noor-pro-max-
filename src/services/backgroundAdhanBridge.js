// Noor Android background Adhan bridge
// Connects prayer schedule events with the native Android background service.

import { getSavedAdhanAudio } from './adhanAudioService';

export async function scheduleBackgroundAdhan(prayerTimes) {
  const audio = await getSavedAdhanAudio();

  if (window.AndroidAdhanService) {
    window.AndroidAdhanService.schedule({
      prayers: prayerTimes,
      audio
    });
  }
}

export function stopBackgroundAdhan() {
  if (window.AndroidAdhanService) {
    window.AndroidAdhanService.stop();
  }
}
