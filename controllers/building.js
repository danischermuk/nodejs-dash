// Modules
var mongoose  = require('mongoose');
// MongoDB models
var Building      = mongoose.model('Building');

// Create endpoint /api/building/ for GET
exports.getBuildings = function(req, res) {
  // Find all Buildings
  console.log("GET /api/building/");
  Building.find(function(err, building) {
    if (err)
      res.send(err);

    res.json(building);
  });
};

// Create endpoint /api/building for POSTS
exports.postBuilding = function(req, res) {
  var building = new Building({
  name     : req.body.name,
  address  : req.body.address,
  telephone: req.body.telephone,
  users    : req.body.users
  });
  
  // Save the building and check for errors
  building.save(function(err) {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
      res.json({ message: 'building added to the db!', data: building });
  });
};


// Create endpoint /api/building/:building_id for GET
exports.getBuilding = function(req, res) {
  Building
  .findById(req.params.building_id)
  .populate('users')
  .exec(function(err, building) {
    if (err)
      res.send(err);
    else
      res.json(building);
  });
};

// Create endpoint /api/building/user/:user_id for GET
exports.getBuildingsByUser = function(req, res) {
  Building
  .find({users : req.params.user_id})
  .exec(function(err, buildings) {
    if (err)
      res.send(err);
    else
      res.json(buildings);
  });
};

exports.updateBuilding = function(req, res) {
  // Use the Beer model to find a specific beer
  Building.findById(req.params.building_id, function(err, building) {
    if (err)
      res.send(err);
    // Aplicar los cambios
    building.name     = req.body.name;
    building.address  = req.body.address;
    building.telephone= req.body.telephone;
    building.mode     = req.body.mode;
    // Save the beer and check for errors
    building.save(function(err) {
      if (err)
        res.send(err);
      else
          res.json(building);
    });
  });
};

// Create endpoint /api/building/:building_id for DELETE
exports.deleteBuilding = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Building.findByIdAndRemove(req.params.building_id, function(err) {
    if (err)
      res.send(err);
    else
      res.json({ message: 'Building removed from the db!' });
  });
};