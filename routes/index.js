var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Store = require("../models/store")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* GET home page. */
router.get('/regpage', function(req, res, next) {
  res.status(200).render('register');
});
/* Get userlist*/
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
    //res.json(re).status(200)
    res.status(200).render('userlist', {'lists':re});
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
    res.json(re)
        .status(200);
  });
});
module.exports = router;
