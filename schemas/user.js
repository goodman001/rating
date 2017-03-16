var mongoose=require('mongoose');
var UserSchema=new mongoose.Schema({
    "_id": {type:String}, //Will be different depending on your implementation, could be Number
    "username": {type: String, required:true, unique:true},
    "firstname":  {type: String, default:""},
    "lastname": {type: String, default:""},
    "sex":  {type: String, default:""},
    "age": {type: Number, default: 0},
    })
  module.exports=UserSchema;
