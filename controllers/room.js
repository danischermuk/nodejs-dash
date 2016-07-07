// Modules
var mongoose  = require('mongoose');
// MongoDB models
var Room      = mongoose.model('Room');

// Create endpoint /api/room/ for GET
exports.getRooms = function(req, res) {
  // Find all Rooms
  Room.find(function(err, room) {
    if (err)
      res.send(err);

    res.json(room);
  });
};

// Create endpoint /api/room for POSTS
exports.postRoom = function(req, res) {
  var room = new Room();
  // Set the room properties that came from the POST data
  room.name       = req.body.name;
  room.building   = req.body.building;

  // Save the room and check for errors
  room.save(function(err) {
    if (err)
      res.send(err);
    else
      res.json({ message: 'room added to the db!', data: room });
  });
};


// Create endpoint /api/room/:room_id for GET
exports.getRoom = function(req, res) {
  Room.findById(req.params.room_id, function(err, room) {
    if (err)
      res.send(err);
    else
      res.json(room);
  });
};

exports.updateRoom = function(req, res) {
  // Use the Beer model to find a specific beer
  Room.findById(req.params.room_id, function(err, room) {
    if (err)
      res.send(err);
    // Aplicar los cambios
    room.name       = req.body.name;
    room.building   = req.body.building;
    // Save the beer and check for errors
    room.save(function(err) {
      if (err)
        res.send(err);
      else
          res.json(room);
    });
  });
};

// Create endpoint /api/room/:room_id for DELETE
exports.deleteRoom = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Room.findByIdAndRemove(req.params.room_id, function(err) {
    if (err)
      res.send(err);
    else
      res.json({ message: 'Room removed from the db!' });
  });
};