var express = require('express');
var router = express.Router();

// Definimos el GET de /api/agenda
router.get('/', function(req, res) {
  res.send('Agenda home page');
});

module.exports = router;