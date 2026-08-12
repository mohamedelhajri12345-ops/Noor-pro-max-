import { LocalNotifications } from '@capacitor/local-notifications';
import { Geolocation } from '@capacitor/geolocation';

export async function requestNoorPermissions() {
  const result = { location: 'unknown', notifications: 'unknown' };
  try {
    const location = await Geolocation.requestPermissions();
    result.location = location.location;
  } catch {
    result.location = 'denied';
  }
  try {
    const notifications = await LocalNotifications.requestPermissions();
    result.notifications = notifications.display;
  } catch {
    result.notifications = 'denied';
  }
  return result;
}

export async function getNoorLocation() {
  try {
    const permission = await Geolocation.checkPermissions();
    if (permission.location !== 'granted') return null;
    return await Geolocation.getCurrentPosition({ enableHighAccuracy: false, timeout: 10000, maximumAge: 15 * 60 * 1000 });
  } catch {
    return null;
  }
}
