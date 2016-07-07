var mongoose        = require('mongoose');
var User            = require('../models/user');
var Building        = require('../models/building');

// Inicializamos la DB
// Connect to the db MongoDB
exports.initMongoDB = function () {
	mongoose.connect('mongodb://localhost:27017/wihome');
};


// Inicializamos algún usuario con privilegios administrativos
exports.initUsers = function () {
	User
	.find({admin: true})
	.exec(function(err, users) {
		if (err)
			console.log(err);
		else
		{
			if (users.length == 0) 
			{
				var user = new User();
  				// Set the default user properties
  				user.name     = "rootuser";
  				user.username = "root";
  				user.password = "root";
  				user.email    = "root@root.com";
  				user.admin    = true;

  				// Save the user and check for errors
  				user.save(function(err) {
  					if (err)
  						console.log(err);
  					else
  						console.log({ message: 'Root user created', data: user });
  				});
  			}
  		}
  	});
}; 

// Inicializamos el Building
exports.initBuilding = function () {
	Building
	.find()
	.exec(function(err, buildings) {
		if (err)
			console.log(err);
		else
		{
			if (buildings.length == 0) 
			{
				User.find()
				.exec(function(err, users) {
					if (err)
						console.log("Couldn't find any users, cannot create Building", err);
					else
					{
						var building = new Building({
							name     : "Building",
							address  : "Address",
							telephone: "Telephone",
							users    : users
						});

						// Save the building and check for errors
						building.save(function(err) {
							if (err)
								console.log(err);
							else
								console.log({ message: 'building added to the db!', data: building });
						});
					}
				});
			}
		}
	});
}; 