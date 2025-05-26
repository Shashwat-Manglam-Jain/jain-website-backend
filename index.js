const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db/db');
const Heading = require('./Models/headings');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// 🚀 Increase payload limit here
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Route to save heading
app.post('/api/headings', async (req, res) => {
  try {
    const heading = new Heading(req.body);
    const saved = await heading.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 

app.get('/', async (req, res) => {
  try {
    const headings = await Heading.find();
    console.log(headings);
    res.json(headings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server after DB connects
db()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
