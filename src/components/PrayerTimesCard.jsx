import React, { useEffect, useState } from 'react';
import { getPrayerTimesByLocation } from '../services/locationPrayerService';

export default function PrayerTimesCard() {
  const [times, setTimes] = useState(null);

  useEffect(() => {
    getPrayerTimesByLocation()
      .then(setTimes)
      .catch(() => setTimes(null));
  }, []);

  if (!times) return <div>جاري تحديد مواقيت الصلاة...</div>;

  const prayers = [
    ['الفجر', times.timings.Fajr],
    ['الظهر', times.timings.Dhuhr],
    ['العصر', times.timings.Asr],
    ['المغرب', times.timings.Maghrib],
    ['العشاء', times.timings.Isha],
  ];

  return (
    <div className="prayer-card">
      <h2>🕌 مواقيت الصلاة</h2>
      {prayers.map(([name, time]) => (
        <div key={name}>
          <span>{name}</span> - <span>{time}</span>
        </div>
      ))}
    </div>
  );
}
