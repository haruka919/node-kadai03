const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

router.get('/', (req,res) =>{
  fetch('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(response => response.json())
    .then(result => {
      res.json({
        result: result.results
      });
    })
});

module.exports = router;