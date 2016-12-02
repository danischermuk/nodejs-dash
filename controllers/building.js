// Modules
var mongoose  = require('mongoose');
// MongoDB models
var Building  = mongoose.model('Building');
var User      = mongoose.model('User');
var Appliance = mongoose.model('Appliance');


// Create endpoint /api/building/ for GET
exports.getBuildings = function(req, res) {
  // Find all Buildings
  console.log("GET /api/building/");
  Building.find()
  .populate('users')
  .populate({
    path: 'rooms.appliances',
    model: 'Appliance'
  })
  .exec(function(err, building) {
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
  .populate({
    path: 'rooms.appliances',
    model: 'Appliance'
  })
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
  .populate('users')
  .populate({
    path: 'rooms.appliances',
    model: 'Appliance'
  })
  .exec(function(err, buildings) {
    if (err)
      res.send(err);
    else
      res.json(buildings);
  });
};

// Create endpoint /api/building/:building_id for PUT
exports.updateBuilding = function(req, res) {
  // Use the Building model to find a specific beer
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

// Create endpoint /api/building/:building_id/room for get
exports.getBuildingRooms = function (req, res) {
  Building
  .findById(req.params.building_id)
  .populate({
    path: 'rooms.appliances',
    model: 'Appliance'
  })
  .exec(function (err, building) {
    if (err)
      res.send(err);
    else {
      res.json(building.rooms);
    }

  })
};

// Create endpoint /api/building/:building_id/room for POSTS
exports.postBuildingRoom = function(req, res) {
  var room = {
    name: req.body.name,
    appliances: req.body.appliances
  };
  
  Building.findByIdAndUpdate ( req.params.building_id ,
    {$push: {"rooms": room}},
    function (err) {
      res.send (err);
    });
};

// Create endpoint /api/building/:building_id/room/:room_id for get
exports.getBuildingRoom = function (req, res) {
  Building
  .findById(req.params.building_id)
  .populate({
    path: 'rooms.appliances',
    model: 'Appliance'
  })
  .exec(function (err, building) {
    if (err)
      res.send(err);
    else {
      var room = building.rooms.id(req.params.room_id);
      res.json(room);
    }
  })
};

// Create endpoint /api/building/:building_id/room/:room_id for PUT
exports.updateBuildingRoom = function (req, res) {
  Building.update (
    {_id : req.params.building_id, 'rooms._id' : req.params.room_id},
    {'$set': {
      'rooms.$.name': req.body.name,
      'rooms.$.appliances': req.body.appliances
    }},
    function (err) {
      if (err)
        console.log(err);
      else
        res.json("exito!");
    }
    );
};

// Create endpoint /api/building/:building_id/room/:room_id for DELETE
exports.deleteBuildingRoom = function (req, res) {
  Building.update (
    {},
    {'$pull': {'rooms': {'_id':req.params.room_id}} },
    function (err) {
      if (err)
        res.send(err);
      else
        res.json("exito!");
    }
    );
};


// Create endpoint /api/building/:building_id/room/:room_id/appliance for GET
exports.getBuildingRoomAppliance = function (req, res) {
  Building.findById(req.params.building_id , function (err, building) {
    if (err)
      res.send(err);
    else {
      var room = building.rooms.id(req.params.room_id);
      res.json(room.appliances);
    }
  })
};


// Create endpoint /api/building/:building_id/room/:room_id/appliance for POST
exports.postBuildingRoomAppliance = function(req, res) {
  Building.update (
    {_id : req.params.building_id, 'rooms._id' : req.params.room_id},
    {'$push': {
      'rooms.$.appliances':req.body.appliance_id
    }},
    function (err) {
      if (err)
        console.log(err);
      else
        res.json("exito!");
    }
    );
};

// Create endpoint /api/building/:building_id/room/:room_id/appliance for DELETE
exports.deleteBuildingRoomAppliance = function(req, res) {
  Building.update (
    {_id : req.params.building_id, 'rooms._id' : req.params.room_id},
    {'$pull': {'rooms.$.appliances': req.params.appliance_id} },
    function (err) {
      if (err)
        console.log(err);
      else
        res.json("exito!");
    }
    );
};