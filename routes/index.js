var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Store = require("../models/store")
var Review = require("../models/review")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* GET userlist page. */
router.get('/userlist', function(req, res, next) {
  res.render('userlist');
});
/* GET storelist page. */
router.get('/storelist', function(req, res, next) {
  res.render('storelist');
});
/* Get review list*/
router.get('/reviewlist', function(req, res, next) {
  res.render('reviews');
});

/* GET users listing.
curl http://127.0.0.1:3000/users?firstname=Tom&sex=M
*/
router.get('/users', function(req, res, next) {
  var condition = {};
  var firstname = req.query.firstname;
  var lastname = req.query.lastname;
  var age = req.query.age;
  var sex = req.query.sex;
  if(firstname!=undefined){condition['firstname'] = firstname;}
  if(lastname!=undefined){condition['lastname'] = lastname;}
  if(age!=undefined){condition['age'] = age;}  
  if(sex!=undefined){condition['sex'] = sex;} 
  User.find(condition,function(err,re){
	var data={};
	data['users'] = re;
    res.json(data).status(200).end();
    //res.status(200).render('userlist', {'lists':re});
  });
});
/* Get userlist*/
/* GET users listing.
curl -sS 'http://127.0.0.1:3000/stores?category=department&storename=One%20Square'
*/
router.get('/stores', function(req, res, next) {
  var condition = {};
  var storename = req.query.storename;
  var category = req.query.category;
  if(storename!=undefined){condition['storename'] = storename;}
  if(category!=undefined){condition['category'] = category;}
  Store.find(condition,function(err,re){
    res.json({"stores":re})
        .status(200).end();
  });
});
router.get('/reviews', function(req, res, next) {
  var condition = {};
  Review.find(condition,function(err,re){
    console.log(re);
    res.json({"reviews":re})
        .status(200).end();
  });
});
module.exports = router;
