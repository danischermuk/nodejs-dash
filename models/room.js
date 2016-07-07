var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var roomSchema = new Schema({  
  name: 		{type: String, uniqe: true},
  building:   {type : mongoose.Schema.ObjectId, ref : 'Building', required: true}
});

module.exports = mongoose.model('Room', roomSchema);  