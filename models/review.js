var mongoose=require('mongoose');
var ReviewSchema=require('../schemas/review');
var Review=mongoose.model('Review',ReviewSchema);
module.exports=Review;