import { getAdPlacement, START_IO_APP_ID } from '../components/ads/adPolicy';

export const startIoConfig = {
  appId: START_IO_APP_ID,
  sdk: 'android-native',
  testMode: false,
};

export function getAdConfig(page, state = {}) {
  const placement = getAdPlacement(page);
  return placement ? { ...startIoConfig, placement, ...state } : null;
}

// The web layer deliberately does not fake Start.io rendering. Native Android
// rendering belongs to the Start.io SDK; this service only controls placement.
export function isNativeAdEnvironment() {
  return Boolean(window?.Capacitor?.isNativePlatform?.());
}
