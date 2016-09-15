var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var roomSchema = require('mongoose').model('Room').schema

var buildingSchema = new Schema({  
  name: 		{type:String, unique:true, required:true},
  address: 		String,
  telephone: 	String,
  users:   		[{type : mongoose.Schema.ObjectId, ref : 'User', required:true}],
  rooms: 		[roomSchema]
});

module.exports = mongoose.model('Building', buildingSchema);  