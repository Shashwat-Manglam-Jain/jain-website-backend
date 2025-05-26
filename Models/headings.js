// Models/headings.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Recursive child schema
const childSchema = new Schema({
  title: { type: String, required: true },
  body: String,
  image: String,
  children: [] // placeholder for recursion
});

// Add recursion
childSchema.add({ children: [childSchema] });

const headingSchema = new Schema({
  title: { type: String, required: true },
  body: String,
  image: String,
  children: [childSchema],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Heading', headingSchema);

