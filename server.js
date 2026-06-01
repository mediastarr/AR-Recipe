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
