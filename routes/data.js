const Data = require("../models/data");
const express = require('express');
const router = express.Router();

// Get all data entries
router.get('/all-data', async (req, res) => {
  try {
    const dataEntries = await Data.find(req.query);
    console.log(dataEntries);
    res.send(dataEntries);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
