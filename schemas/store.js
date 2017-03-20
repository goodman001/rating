var mongoose=require('mongoose');
var StoreSchema=new mongoose.Schema({
	"_id": {type:String,unique:true}, 
	"storename": {type: String, required:true},
	"category":  {type: String, default:""},
	"address": {type: String, default:""}
	}
)
module.exports=StoreSchema;