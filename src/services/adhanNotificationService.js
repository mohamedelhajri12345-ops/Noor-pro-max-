// Noor Adhan Notification Service
// Connects prayer times with notification scheduling.

import { scheduleNotification } from './notificationService';

export function schedulePrayerNotifications(prayerTimes, settings = {}) {
  if (!prayerTimes || settings.enabled === false) return [];

  return Object.entries(prayerTimes).map(([prayer, time]) => {
    return scheduleNotification({
      title: `حان وقت صلاة ${prayer}`,
      body: 'حي على الصلاة، حي على الفلاح',
      time,
      sound: settings.adhanSound || 'default-adhan'
    });
  });
}

export function scheduleDailyQuranReminder(time = '09:00') {
  return scheduleNotification({
    title: 'وردك اليومي من القرآن',
    body: 'اقرأ حزبك اليوم وداوم على الذكر',
    time
  });
}
