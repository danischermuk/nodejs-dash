var express = require('express');
var router = express.Router();
var WIFISwitch = require('../models/wifiswitch');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', framework: 'AngularJS'});
});
 
router.get('/login', function(req, res) {
  res.redirect('/#/login');
});
 
router.post('/login', function(req, res) 
{
	res.send(req.body);
})

// Create a new route with the prefix /wifiSwitch
var wiRoute = router.route('/wi');

// Create endpoint /api/wifiSwitch for POSTS
wiRoute.post(function(req, res) {
  // Create a new instance of the wifiSwitch model
  var wifiSwitch = new WIFISwitch();

  // Set the wifiSwitch properties that came from the POST data
  wifiSwitch.name 		= req.body.name;
  wifiSwitch.gpios 		= req.body.gpios;
  wifiSwitch.ip		 = req.body.ip;

  // Save the wifiSwitch and check for errors
  wifiSwitch.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'wifiSwitch added to the locker!', data: wifiSwitch });
  });
});

// Create endpoint /api/beers for GET
wiRoute.get(function(req, res) {
  // Use the Beer model to find all beer
  WIFISwitch.find(function(err, wifiSwitch) {
    if (err)
      res.send(err);

    res.json(wifiSwitch);
  });
});

// Create a new route with the /beers/:beer_id prefix
var wifiRoute = router.route('/wi/:wi_id');

// Create endpoint /api/beers/:beer_id for GET
wifiRoute.get(function(req, res) {
  // Use the Beer model to find a specific beer
  WIFISwitch.findById(req.params.wi_id, function(err, wifiRoute) {
    if (err)
      res.send(err);

    res.json(wifiRoute);
  });
});

wifiRoute.delete(function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  WIFISwitch.findByIdAndRemove(req.params.wi_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'wifiSwitch removed from the locker!' });
  });
});

module.exports = router;