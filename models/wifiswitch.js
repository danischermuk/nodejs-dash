var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var wifiswitchSchema = new Schema({  
  name:    		{ type: String },
  gpios:     	{ type: Number },
  ip:  			{ type: String },
});

module.exports = mongoose.model('WIFISwitch', wifiswitchSchema);  