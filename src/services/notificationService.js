import { LocalNotifications } from '@capacitor/local-notifications';

const SETTINGS_KEY = 'noor.notifications.settings';

const DEFAULT_SETTINGS = {
  prayer: true,
  quran: true,
  azkar: true,
  islamic: true
};

export const createPrayerNotification = (prayerName, time) => ({
  title: `وقت صلاة ${prayerName}`,
  body: `حان الآن وقت صلاة ${prayerName}`,
  time
});

export const createDailyReminder = () => ({
  title: 'وردك اليومي',
  body: 'اقرأ حزبك اليوم من القرآن الكريم'
});

export function getNotificationSettings() {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveNotificationSettings(settings) {
  const next = { ...DEFAULT_SETTINGS, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  return next;
}

export async function getNotificationPermission() {
  try {
    return (await LocalNotifications.checkPermissions()).display;
  } catch {
    return 'denied';
  }
}

export async function requestNotificationPermission() {
  try {
    const current = await LocalNotifications.checkPermissions();
    if (current.display === 'granted') return true;
    const result = await LocalNotifications.requestPermissions();
    return result.display === 'granted';
  } catch {
    return false;
  }
}

export async function scheduleNotification({ id, title, body, at, extra = {} }) {
  if (!at) return null;
  const granted = await requestNotificationPermission();
  if (!granted) return null;

  const notificationId = Number(id || Date.now() % 2147483647);
  await LocalNotifications.schedule({
    notifications: [{ id: notificationId, title, body, schedule: { at }, extra }]
  });
  return notificationId;
}

export async function cancelNotifications(ids = []) {
  if (!ids.length) return;
  try {
    await LocalNotifications.cancel({ notifications: ids.map((id) => ({ id: Number(id) })) });
  } catch {
    // Native notification cancellation is best-effort on unsupported web environments.
  }
}
