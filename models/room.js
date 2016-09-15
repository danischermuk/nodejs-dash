var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var roomSchema = new Schema({  
  name: 		{type: String, uniqe: true},
});

module.exports = mongoose.model('Room', roomSchema);  