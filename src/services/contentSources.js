export const CONTENT_SOURCES = [
  {
    id: 'quran-cloud',
    name: 'Al Quran Cloud',
    url: 'https://alquran.cloud/',
    type: 'Quran + recitation',
    licenseNote: 'Use according to the provider terms; recitations may be streamed/embedded/downloaded with stated conditions.'
  },
  {
    id: 'aladhan',
    name: 'AlAdhan',
    url: 'https://aladhan.com/',
    type: 'Prayer times + Qibla',
    licenseNote: 'API-based content; respect service limits and terms.'
  }
];

export const NASHEED_POLICY = {
  rule: 'Only add audio with a verified public-domain or explicit redistribution license.',
  fallback: 'If no licensed source is available, show a useful empty state with legal source guidance instead of copyrighted files.'
};
