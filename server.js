const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.static('.'));

const TIKTOK_DB = [
  'https://www.tiktok.com/@zackdfilms92/video/7642701134880181517',
  'https://www.tiktok.com/@animelogic101/video/7638725919116414239',
  'https://www.tiktok.com/@king.of.the.jungle450/video/7631534693640391943'
];

app.get('/api/latest-tiktoks', async (req, res) => {
  try {
    const randomUrl = TIKTOK_DB[Math.floor(Math.random() * TIKTOK_DB.length)];
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(randomUrl)}`;

    const response = await fetch(oembedUrl);
    const data = await response.json();

    res.json({
      url: randomUrl,
      title: data.title,
      author_name: data.author_name,
      thumbnail_url: data.thumbnail_url
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch TikTok' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
