const KEY = 'noor.lastLocation';

export function getCachedLocation() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
}

export function saveLocation(location) {
  localStorage.setItem(KEY, JSON.stringify(location));
}

export async function detectUserLocation() {
  const cached = getCachedLocation();
  if (!navigator.geolocation) return cached;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          updatedAt: Date.now()
        };
        saveLocation(location);
        resolve(location);
      },
      () => resolve(cached),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 }
    );
  });
}
