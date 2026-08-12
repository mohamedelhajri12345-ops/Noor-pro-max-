import { scheduleNotification } from './notificationService';

const PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function prayerDate(time, now = new Date()) {
  const match = String(time || '').match(/^(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const date = new Date(now);
  date.setHours(Number(match[1]), Number(match[2]), 0, 0);
  if (date <= now) date.setDate(date.getDate() + 1);
  return date;
}

export async function schedulePrayerNotifications(prayerTimes, settings = {}) {
  if (!prayerTimes || settings.enabled === false) return [];
  const enabled = settings.prayers || {};
  const names = { Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };
  const scheduled = [];

  for (const prayer of PRAYER_ORDER) {
    if (enabled[prayer] === false) continue;
    const at = prayerDate(prayerTimes[prayer]);
    if (!at) continue;
    const id = 1000 + PRAYER_ORDER.indexOf(prayer);
    const result = await scheduleNotification({
      id,
      title: `حان وقت صلاة ${names[prayer]}`,
      body: 'حي على الصلاة، حي على الفلاح',
      at,
      extra: { type: 'prayer', prayer }
    });
    if (result) scheduled.push(result);
  }
  return scheduled;
}

export function scheduleDailyQuranReminder(time = '09:00') {
  const at = prayerDate(time);
  if (!at) return Promise.resolve(null);
  return scheduleNotification({
    id: 2001,
    title: 'وردك اليومي من القرآن',
    body: 'اقرأ حزبك اليوم وداوم على الذكر',
    at,
    extra: { type: 'quran' }
  });
}
