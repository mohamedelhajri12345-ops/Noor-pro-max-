// Noor notification and Adhan service foundation
// This layer will handle prayer reminders, daily reminders and Adhan notifications.

export const createPrayerNotification = (prayerName, time) => ({
  title: `وقت صلاة ${prayerName}`,
  body: `حان الآن وقت صلاة ${prayerName}`,
  time,
});

export const createDailyReminder = () => ({
  title: 'وردك اليومي',
  body: 'اقرأ حزبك اليوم من القرآن الكريم',
});

export const adhanSettings = {
  enabled: true,
  selectedVoice: 'default',
  notificationsEnabled: true,
};
