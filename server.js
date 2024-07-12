const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/medium/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://medium.com/feed/@${username}`);
    res.set('Content-Type', 'application/xml');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching Medium feed');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
