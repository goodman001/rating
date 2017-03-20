var mongoose=require('mongoose');
var ReviewSchema=new mongoose.Schema({
	"_id": {type:String},
	"userID": {type: String, required:true},
	"storeID":  {type: String, required:true},
	"rating": {type:Number, required:true},
	"comment":{type:String}
	}
)
module.exports=ReviewSchema;