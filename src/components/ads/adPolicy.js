export const adPolicy = {
  blockedRoutes: [
    'Quran',
    'QuranPlayer',
    'Adhan',
    'PrayerAudio'
  ],

  canShowAds(routeName) {
    return !this.blockedRoutes.includes(routeName);
  }
};
