// Noor - Real prayer times from device location

export async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Location is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      reject,
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

export async function getPrayerTimesByLocation() {
  const { latitude, longitude } = await getUserLocation();

  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000);

  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=5`
  );

  const data = await response.json();

  return {
    location: { latitude, longitude },
    timings: data.data.timings,
    date: data.data.date,
  };
}
