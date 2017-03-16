var express = require('express');
var router = express.Router();
var User = require("../models/user")
/* GET users listing.
curl http://127.0.0.1:3000/users?firstname=Tom&sex=M
*/
router.get('/', function(req, res, next) {
  console.log(lalal);
});
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
    res.json(re);
  });
});
/*
*curl --data "username=gump1994&firstname=Tom&lastname=Hanks&sex=M&age=60" http://127.0.0.1:3000/user
*curl --data "username=h0rcux&firstname=Tom&lastname=Riddle&sex=M&age=71" http://127.0.0.1:3000/user
*/
router.post('/user', function(req, res, next) {
  var username = req.body.username;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var age = req.body.age;
  var sex = req.body.sex;
  console.log(username);
  var timestamp=new Date().getTime();
  if(username == undefined)
  {
    res.status(403)      // HTTP status 404: NotFound
      .send('Username Error');
    return ;
  }
  var userinfo=
  {
     _id: timestamp,
     username: username,
     firstname:firstname,
     lastname:lastname,
     age:age,
     sex:sex
  };
  var user =  new User(userinfo);
  User.count({'username':username},function(err,re){
    if (err) {
        console.log(err);
        return;
     }else
     {  
        var usercount = re;
        if(usercount >0)
        {
          res.status(403)      // HTTP status 404: NotFound
            .send('Username Error');
          return ;          
        }else
        {
          user.save(function(err,user){
            if (err) {
              console.log(err);
 
            }else
            {
              res.status(200)      // HTTP status 404: NotFound
                .send('add user success');
            }
            return;
          });
        }
        //res.cookie('name', _name, {expire : new Date() + 600000});        
        //res.render('rate', { title: 'Rate' });
	      //res.redirect('/rate');
      }
    
  });
});
/*
* curl http://127.0.0.1:3000/user?id=
* curl http://127.0.0.1:3000/user?id=
* curl http://127.0.0.1:3000/user
*/
router.get('/user/', function(req, res, next) {
  var id = req.query.id;
  var username = req.query.username;
  if(id == undefined && username == undefined){
    res.status(404)      // HTTP status 404: NotFound
    .send('ID or username Error');
    return;
  }
  if(id !=undefined)
  {
    User.findOne({'_id':id},function(err,re){
      if(err){
        res.status(404)      // HTTP status 404: NotFound
            .send('ID Error');
        return;
      }else
      {
        if(re != null){
          res.json(re);
        }else
        {
          res.status(404)      // HTTP status 404: NotFound
            .send('ID Error');
        }
        return;

      }
    });
  }else if(username !=undefined)
  {
    User.findOne({'username':username},function(err,re){
      if(err){
        res.status(404)      // HTTP status 404: NotFound
            .send('Username Error');
        return;
      }else
      {
        if(re != null){
          res.json(re);
        }else
        {
          res.status(404)      // HTTP status 404: NotFound
            .send('Username Error');
        }
        return;

      }
    });
  }
  
  
  
});
module.exports = router;