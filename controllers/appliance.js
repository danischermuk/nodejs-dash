// Modules
var mongoose  = require('mongoose');
// MongoDB models
var Building  = mongoose.model('Building');
var User      = mongoose.model('User');
var Appliance = mongoose.model('Appliance');

// Create endpoint /api/appliance/ for GET
exports.getAppliances = function(req, res) {
  // Find all appliances
  Appliance.find()
  .exec(function(err, building) {
    if (err)
      res.send(err);

    res.json(building);
  });
};

// Create endpoint /api/appliance for POSTS
exports.postAppliance = function(req, res) {
  var appliance = new Appliance({
    name      : req.body.name,
    ip        : req.body.ip,
    type      : req.body.type,
    online    : req.body.online,
    chipIdkey : req.body.chipIdkey
  });
  
  // Save the appliance and check for errors
  appliance.save(function(err) {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
      res.json({ message: 'appliance added to the db!', data: appliance });
  });
};


// Create endpoint /api/appliance/:appliance_id for GET
exports.getAppliance = function(req, res) {
  Appliance
  .findById(req.params.appliance_id)
  .exec(function(err, appliance) {
    if (err)
      res.send(err);
    else
      res.json(appliance);
  });
};


// Create endpoint /api/appliance/:appliance_id for PUT
exports.updateAppliance = function(req, res) {
  // Use the Beer model to find a specific beer
  Appliance.findById(req.params.appliance_id, function(err, appliance) {
    if (err)
      res.send(err);
    // Aplicar los cambios
    appliance.name     = req.body.name;
    appliance.ip       = req.body.ip;
    appliance.type     = req.body.type;
    // Save the beer and check for errors
    console.log(req.body.name);
    console.log(req.body.ip);
    console.log(req.body.type);
    appliance.save(function(err) {
      if (err)
        res.send(err);
      else
        res.json(appliance);
    });
  });
};

// Create endpoint /api/appliance/:appliance_id for DELETE
exports.deleteAppliance = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Appliance.findByIdAndRemove(req.params.appliance_id, function(err) {
    if (err)
      res.send(err);
    else
      res.json({ message: 'Appliance removed from the db!' });
  });
};




exports.heartBeatCheck = function(hb) {
  Appliance
  .findOne({chipIdkey: hb.id})
  .exec(function(err, appliance) {
    if (err)
      console.log(err);
    else {
      if(appliance == null) {
        console.log("New Appliance found! - " + hb.id);
        var newAppliance = new Appliance({
          name      : hb.name,
          ip        : hb.ip,
          type      : hb.type,
          online    : true,
          chipIdkey : hb.id,
          borad     : hb.board
          });
  
          // Save the building and check for errors
          newAppliance.save(function(err) {
            if (err) {
              console.log(err);
            }
            else
              console.log({ message: 'appliance added to the db!', data: newAppliance });
          });
      }
      else {
        console.log(appliance.name + " HeartBeat OK");
      }

    }
  });
};