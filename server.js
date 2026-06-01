const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.static('.'));  // <-- this line serves index.html

app.get('/api/latest-tiktoks', async (req, res) => {
  // your tiktok code
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
app.get('/api/latest-tiktoks', async (req, res) => {
  try {
    const randomUrl = TIKTOK_DB[Math.floor(Math.random() * TIKTOK_DB.length)];
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(randomUrl)}`;

    const response = await fetch(oembedUrl);
    const data = await response.json();

    // TikTok's oembed doesn't return the video URL directly
    // So we send back the original URL and let frontend handle embed
    res.json({
      url: randomUrl,
      title: data.title,
      author_name: data.author_name,
      thumbnail_url: data.thumbnail_url
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch TikTok' });
  }
});
