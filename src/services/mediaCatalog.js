export const MEDIA_SOURCES = {
  quran: {
    provider: 'Al Quran Cloud',
    base: 'https://cdn.islamic.network/quran/audio',
    note: 'Quran audio is streamed from Al Quran Cloud and cached after playback where supported.'
  },
  nasheeds: {
    provider: 'Licensed/public-domain sources only',
    items: []
  }
};

export function getQuranAyahAudioUrl(edition = 'ar.alafasy', ayahNumber, bitrate = 64) {
  if (!Number.isInteger(ayahNumber) || ayahNumber < 1 || ayahNumber > 6236) return null;
  return `${MEDIA_SOURCES.quran.base}/${bitrate}/${edition}/${ayahNumber}.mp3`;
}
