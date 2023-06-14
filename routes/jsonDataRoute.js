const express = require('express');
const router = express.Router();
const fs = require('fs');
const Data = require('../models/data');

// Import JSON data and save to MongoDB
router.post('/import-json', async (req, res) => {
  try {
    // Read the JSON file
    fs.readFile('./json/jsondata.json', 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      // Insert data as a batch
      const savedData = await Data.insertMany(jsonData);
      res.json(savedData);
    });
  } catch (error) {
    console.error('Error importing JSON data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
