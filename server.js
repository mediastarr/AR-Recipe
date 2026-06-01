const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('.'));

// Put your 3 REAL TikTok URLs here
const TIKTOK_DB = [
  'https://www.tiktok.com/@king.of.the.jungle450/video/7631534693640391943',
  'https://www.tiktok.com/@animelogic101/video/7638725919116414239',
  'https://www.tiktok.com/@animelogic101/video/7638725919116414239'
];

app.get('/api/latest-tiktoks', async (req, res) => {
  console.log('API hit - fetching TikTok'); // This will show in terminal

  try {
    const randomUrl = TIKTOK_DB[Math.floor(Math.random() * TIKTOK_DB.length)];
    console.log('Picked URL:', randomUrl);

    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(randomUrl)}`;
    const response = await fetch(oembedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    console.log('TikTok status:', response.status);

    if (!response.ok) {
      throw new Error(`TikTok returned ${response.status}`);
    }

    const data = await response.json();

    res.json({
      url: randomUrl,
      title: data.title,
      author_name: data.author_name,
      thumbnail_url: data.thumbnail_url,
      html: data.html
    });
  } catch (error) {
    console.log('TikTok API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch TikTok', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
