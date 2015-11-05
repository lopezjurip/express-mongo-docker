'use strict';

// Imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Webapp
const app = express();

// Logs
app.use(morgan('dev'));

// Database connection
mongoose.connect('mongodb://mongo:27017/napoleon', err => {
  // Try localhost if not running on container
  if (err) { mongoose.connect('mongodb://localhost:27017/napoleon'); }
});

// Define model
const Entry = mongoose.model('Entry', new mongoose.Schema({
  name  :  { type: String },
  date  :  { type: Date, default: Date.now },
}));

// Create a default entry
Entry.create({name: 'Hello world!'}, err => {
  if (err) { console.log('Error', err); }
});

// Routes
app.get('/', (req, res) => {
  Entry.find({}).then(entries => res.send(entries));
});

// Start
const server = app.listen(process.env.PORT || 3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
