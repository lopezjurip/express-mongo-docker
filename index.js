'use strict';

// Imports
const express = require('express');
const mongoose = require('mongoose');

// Webapp
const app = express();

// Database connection
mongoose.connect('mongodb://mongo:27017/napoleon');

// Define model
const Entry = mongoose.model('Entry', new mongoose.Schema({
  name  :  { type: String },
  date  :  { type: Date, default: Date.now },
}));

// Create a default entry
const entry = new Entry({name: 'Hello world!'})
entry.save(err => {
  console.log('Error', err);
})

// Routes
app.get('/', (req, res) => {
  res.send([entry]);
});


// Start
const server = app.listen(process.env.PORT || 3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
