var mongoose        = require('mongoose');
var User            = require('../models/user');
var Building        = require('../models/building');
var Appliance       = require('../models/appliance');



// Inicializamos la DB
// Connect to the db MongoDB
exports.initMongoDB = function () {
	mongoose.connect('mongodb://localhost:27017/base');
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
						var appliance1 = new Appliance ({
							name		: "Appliance 1",
							ip			: "192.168.1.123",
							type		: "type",
							online 		: true,
							chipIdkey	: 1234567891
						});

						var appliance2 = new Appliance ({
							name		: "Appliance 2",
							ip			: "192.168.1.124",
							type		: "type",
							online 		: true,
							chipIdkey	: 1234567892
						});

						var appliance3 = new Appliance ({
							name		: "Appliance 3",
							ip			: "192.168.1.125",
							type		: "type",
							online 		: true,
							chipIdkey	: 1234567893
						});

						var appliance4 = new Appliance ({
							name		: "Appliance 4",
							ip			: "192.168.1.126",
							type		: "type",
							online 		: true,
							chipIdkey	: 1234567894
						});

						// Save the appliances and check for errors
						appliance1.save(function(err) {
							if (err)
								console.log(err);
							else
								console.log({ message: 'appliance1 added to the db!', data: appliance1 });
						});
						appliance2.save(function(err) {
							if (err)
								console.log(err);
							else
								console.log({ message: 'appliance2 added to the db!', data: appliance2 });
						});
						appliance3.save(function(err) {
							if (err)
								console.log(err);
							else
								console.log({ message: 'appliance3 added to the db!', data: appliance3 });
						});
						appliance4.save(function(err) {
							if (err)
								console.log(err);
							else
								console.log({ message: 'appliance4 added to the db!', data: appliance4 });
						});

						var room1 ={
							name	: "Room1",
						};
						var room2 = {
							name	: "Room2",
						};


						var building = new Building({
							name     : "Building",
							address  : "Address",
							telephone: "Telephone",
							rooms 	 : [room1, room2], 
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