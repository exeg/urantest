// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var contentSchema = new Schema({
     
     langfile :
     {
        type: Number,
        required: true
     },

     en:
     {
        type: Array
     },

     ru:
     {
       type:Array 
     }
        
});

// the schema is useless so far
// we need to create a model using it
var Content = mongoose.model('Content', contentSchema);

// make this available to our Node applications
module.exports = Content;