// Noor permissions manager
// Handles location and notification permissions before using prayer features.

export async function requestLocationPermission() {
  if (!navigator.geolocation) {
    return { granted: false, reason: 'Location is not supported' };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ granted: true, position }),
      (error) => resolve({ granted: false, error })
    );
  });
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return { granted: false, reason: 'Notifications not supported' };
  }

  const permission = await Notification.requestPermission();
  return { granted: permission === 'granted', permission };
}

export async function requestNoorPermissions() {
  const location = await requestLocationPermission();
  const notifications = await requestNotificationPermission();

  return {
    location,
    notifications,
  };
}
