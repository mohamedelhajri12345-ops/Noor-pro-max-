import React, { useEffect, useMemo, useRef, useState } from 'react';
import { fetchSurahs, getSurah, getRecitation, getCachedSurah } from '../services/quranService';

export default function Quran() {
  const [surahs, setSurahs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const [verses, setVerses] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    let alive = true;
    fetchSurahs().then(list => { if (alive) setSurahs(list); }).finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return surahs;
    return surahs.filter(s => String(s.name || '').includes(q) || String(s.englishName || '').toLowerCase().includes(q.toLowerCase()));
  }, [surahs, query]);

  async function openSurah(surah) {
    setSelected(surah);
    setError('');
    setPlaying(false);
    const cached = getCachedSurah(surah.number);
    if (cached?.data?.ayahs) setVerses(cached.data.ayahs);
    else setVerses([]);
    try {
      const payload = await getSurah(surah.number);
      setVerses(payload?.data?.ayahs || []);
      const recitation = await getRecitation(surah.number);
      setAudioUrl(recitation?.data?.audio || '');
    } catch (e) {
      setError(e?.message || 'تعذر تحميل محتوى السورة. يمكنك قراءة النسخة المخزنة محليًا.');
    }
  }

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;
    if (playing) { audio.pause(); setPlaying(false); } else { audio.play().then(() => setPlaying(true)).catch(() => setError('تعذر تشغيل التلاوة.')); }
  }

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  if (!selected) return (
    <section className="page fade-in">
      <div className="page-title"><span>القرآن الكريم</span><small>قراءة هادئة بلا إعلانات · حفظ محلي بعد أول تحميل</small></div>
      <div className="search-box">⌕ <input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث عن سورة" aria-label="البحث عن سورة" /></div>
      {loading && <div className="notice">جاري تحميل قائمة السور…</div>}
      {!loading && !filtered.length && <div className="notice">لا توجد نتائج. عند انقطاع الإنترنت ستظهر فقط البيانات التي سبق تخزينها.</div>}
      <div className="surah-list">{filtered.map(s => (
        <button className="list-row" key={s.number} onClick={() => openSurah(s)}>
          <span className="ayah-number">{s.number}</span>
          <div><strong>{s.name}</strong><small>{s.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} · {s.numberOfAyahs} آية</small></div>
          <span>›</span>
        </button>
      ))}</div>
    </section>
  );

  return (
    <section className="page fade-in">
      <button className="back" onClick={() => { audioRef.current?.pause(); setPlaying(false); setSelected(null); }}>→ السور</button>
      <div className="quran-reader">
        <p className="eyebrow">سورة</p><h1>{selected.name}</h1>
        <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        {error && <div className="notice">{error}</div>}
        <div className="ayah-text">
          {verses.length ? verses.map(v => <span key={v.numberInSurah}>{v.text} ۝ </span>) : <span className="muted">جارٍ تحميل الآيات…</span>}
        </div>
      </div>
      <div className="player">
        <span style={{ flex: 1 }}>تلاوة السورة</span>
        <button className="play" disabled={!audioUrl} onClick={toggleAudio} aria-label={playing ? 'إيقاف التلاوة' : 'تشغيل التلاوة'}>{playing ? '❚❚' : '▶'}</button>
        <audio ref={audioRef} src={audioUrl} preload="none" onEnded={() => setPlaying(false)} />
      </div>
    </section>
  );
}
