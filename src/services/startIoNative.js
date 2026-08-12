import { registerPlugin } from '@capacitor/core';
import { getAdPlacement, START_IO_APP_ID } from '../components/ads/adPolicy';

const StartIoAds = registerPlugin('StartIoAds');

export const START_IO_NATIVE_APP_ID = START_IO_APP_ID;

export async function showStartIoBanner(page) {
  if (!getAdPlacement(page)?.banner) return { visible: false, reason: 'policy' };
  if (!window?.Capacitor?.isNativePlatform?.()) return { visible: false, reason: 'web' };
  return StartIoAds.showBanner();
}

export async function hideStartIoBanner() {
  if (!window?.Capacitor?.isNativePlatform?.()) return { visible: false, reason: 'web' };
  return StartIoAds.hideBanner();
}
