var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var applianceSchema = new Schema({  
  name: 		{type:String, unique:true},
  ip: 			String, 
  type:  		String,
  board: 		String, 
  online:  		Boolean,
  chipIdkey:    {type:String, unique:true, required:true}
  //TODO: incluir la configuracion de alguna forma
});

module.exports = mongoose.model('Appliance', applianceSchema);  