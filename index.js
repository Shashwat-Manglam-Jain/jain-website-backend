// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db');
const Heading = require('./Models/headings');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
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
    res.json(headings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connect to DB and export the app
db().then(() => {
  console.log('✅ Database connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

module.exports = app; // Export for Vercel
