// Noor Adhan Audio Service
// Connects user selected adhan sound with the adhan player

import { getAdhanPreferences } from './adhanPreferences';

const adhanSounds = {
  default: '/audio/adhan-default.mp3',
  makkah: '/audio/adhan-makkah.mp3',
  madinah: '/audio/adhan-madinah.mp3',
  calm: '/audio/adhan-calm.mp3',
};

export function getSelectedAdhanAudio() {
  const preferences = getAdhanPreferences();
  const selected = preferences?.adhanSound || 'default';
  return adhanSounds[selected] || adhanSounds.default;
}

export function playSelectedAdhan(audioElement) {
  const source = getSelectedAdhanAudio();
  if (!audioElement) return;

  audioElement.src = source;
  audioElement.load();
  audioElement.play();
}
