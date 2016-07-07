var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var applianceSchema = new Schema({  
  name: 		String,
  ip: 			String,
  type:  		String,
  online:  		Boolean,
  chipIdkey:    Number,
  room:   {type : mongoose.Schema.ObjectId, ref : 'Room', required: true}
  //TODO: incluir la configuracion de alguna forma
});

module.exports = mongoose.model('Appliance', applianceSchema);  