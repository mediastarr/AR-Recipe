const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.static('public'));

const TIKTOK_DB = [
  'https://www.tiktok.com/@khaby.lame/video/7311505232058936609',
  'https://www.tiktok.com/@bellapoarch/video/6862153058223197445',
  'https://www.tiktok.com/@zachking/video/7106686404548381994',
  'https://www.tiktok.com/@addisonre/video/6872224913398033670',
  'https://www.tiktok.com/@charlidamelio/video/6814073604441992454',
  'https://www.tiktok.com/@spencerx/video/6827428183619706117',
  'https://www.tiktok.com/@lorengray/video/6828267321794112774',
  'https://www.tiktok.com/@riaz/video/6828964981027581189',
  'https://www.tiktok.com/@babyariel/video/6830922523467992326',
  'https://www.tiktok.com/@gilmhercroes/video/6833032293457931526',
  'https://www.tiktok.com/@jasonderulo/video/6835141163511536390',
  'https://www.tiktok.com/@therock/video/6837350033568116486'
];

async function getTikTokMeta(url) {
  const oembed = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
  try {
    const res = await fetch(oembed);
    if (!res.ok) throw new Error('oEmbed failed');
    const data = await res.json();
    return {
      t: url,
      h: data.author_name? `@${data.author_name}` : '@unknown',
      d: data.title || '',
      s: 'TikTok',
      m: 'Original Sound',
      l: '—', c: '—', r: '—'
    };
  } catch {
    return { t: url, h: '@unknown', d: '', s: '', m: 'Original Sound', l: '—', c: '—', r: '—' };
  }
}

app.get('/api/latest-tiktoks', async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = 5;
  const slice = TIKTOK_DB.slice(offset, offset + limit);
  if (!slice.length) return res.json([]);
  const results = await Promise.all(slice.map(getTikTokMeta));
  res.json(results);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
