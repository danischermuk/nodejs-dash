var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var applianceGroupSchema = new Schema({  
  name: 		String,
  appliances: 		[{type : mongoose.Schema.ObjectId, ref : 'Appliance'}]
});

module.exports = mongoose.model('ApplianceGroup', applianceGroupSchema); 