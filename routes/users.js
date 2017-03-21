var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Review = require("../models/review")
/*
*curl --data "username=gump1994&firstname=Tom&lastname=Hanks&sex=M&age=60" http://127.0.0.1:3000/user
*curl --data "username=h0rcux&firstname=Tom&lastname=Riddle&sex=M&age=71" http://127.0.0.1:3000/user
*/
router.post('/', function(req, res, next) {
  var timestamp = req.body.id;
  var username = req.body.username;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var age = req.body.age;
  var sex = req.body.sex;
  //console.log(username);
  if(timestamp == undefined || timestamp == ''){
    timestamp=new Date().getTime();
  }
  if(username == undefined)
  {
    res.status(403).end();
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
          res.status(403).end();      // HTTP status 404: NotFound
          return ;          
        }else
        {
          user.save(function(err,user){
            if (err) {
              res.status(403).end();      // HTTP status 404: NotFound
 
            }else
            {
              res.json(userinfo).status(200).end();     // HTTP status 404: NotFound
				      
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
* curl http://127.0.0.1:3000
*/
router.get('/', function(req, res, next) {
  var id = req.query.id;
  var username = req.query.username;
  if(id == undefined && username == undefined){
    res.status(404).end();
    return;
  }
  if(id !=undefined)
  {
    User.findOne({'_id':id},function(err,re){
      if(err){
        res.status(404).end();      // HTTP status 404: NotFound
        return;
      }else
      {
        if(re != null){
          res.json(re).status(200).end();
        }else
        {
          res.status(404).end();      // HTTP status 404: NotFound
        }
        return;

      }
    });
  }else if(username !=undefined)
  {
    User.findOne({'username':username},function(err,re){
      if(err){
        res.status(404).end();     // HTTP status 404: NotFound
        return;
      }else
      {
        if(re != null){
          res.json(re).status(200).end();
        }else
        {
          res.status(404).end();     // HTTP status 404: NotFound
        }
        return;

      }
    });
  } 
});
/*
*curl -X DELETE 'http://127.0.0.1:3000/user?id=1489826734863'
*
*/
router.delete('/', function(req, res, next){
  var ids = req.query.id;
  User.findOne({'_id':ids},function(err,re){
    if(err){
      res.status(404).end();      // HTTP status 404: NotFound
      return;
    }else
    {
      if(re == null){
          res.status(404).end();      // HTTP status 404: NotFound
          return;
      }else{
        Review.remove({
        userID: ids
        }, function(err, re) {
          if (err)
          {
            res.status(404).end();
            return;
          }
          else
          {
            User.remove({
            _id: ids
            }, function(err, re) {
                if (err)
                {
                  res.status(404).end();      // HTTP status 404: NotFound
                  return;
                }
                else
                {
                  res.json('').status(200).end();
                  return;
                }      
            });
          }      
        });
        
      }

    }
  });
  
});

/*
*curl -X PUT -d 'username=gump1994&firstname=Tomm&lastname=Hankstest&sex=M&age=30' 'http://127.0.0.1:3000/user?id=1489829782845'
*/
router.put('/', function(req, res, next){
  var ids = req.query.id;
  var condition = {};
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var age = req.body.age;
  var sex = req.body.sex;
  if(firstname!=undefined){condition['firstname'] = firstname;}
  if(lastname!=undefined){condition['lastname'] = lastname;}
  if(age!=undefined){condition['age'] = age;}  
  if(sex!=undefined){condition['sex'] = sex;} 
  User.findOne({'_id':ids},function(err,re){
    if(err){
      res.status(404).end();      // HTTP status 404: NotFound
      return;
    }else
    {
      if(re == null){
          res.status(404).end();      // HTTP status 404: NotFound
      }else{
         User.update({'_id':ids},{$set: condition}, function(err,re) {
            if(err){
              res.status(404).end();      // HTTP status 404: NotFound
              return;
            }
            User.findOne({'_id':ids},function(err,re){
              res.json(re).status(200).end();
              return;
            });
            
         });
      }

    }
  });
  
});

module.exports = router;
