const KEY = 'noor_adhan_preferences';

const defaultPreferences = {
  enabled: true,
  reminders: true,
  selectedSound: 'default',
};

export function saveAdhanPreferences(preferences) {
  const data = { ...defaultPreferences, ...preferences };
  localStorage.setItem(KEY, JSON.stringify(data));
  return data;
}

export function getAdhanPreferences() {
  const saved = localStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : defaultPreferences;
}

export function resetAdhanPreferences() {
  localStorage.removeItem(KEY);
}
