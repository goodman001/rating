var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Store = require("../models/store")
var Review = require("../models/review")
/*
*curl --data "storename=One Square&category=department&address=831 Young Street" http://127.0.0.1:3000/store
*curl --data "storename=One Square Budson's Hay&category=clothing&address=831 Young Street" http://127.0.0.1:3000/store
curl --data "storename=Hay&category=clothing&address=831 Young Street" http://127.0.0.1:3000/store
curl --data "storename=HayHay&category=clothing&address=831 Young Street" http://127.0.0.1:3000/store
*/
router.post('/', function(req, res, next) {
	var timestamp = req.body.id;
	var storename = req.body.storename;
	var category = req.body.category;
	var address = req.body.address;
	if(timestamp == undefined || timestamp == ''){
		timestamp=new Date().getTime();
	}
	if(storename == undefined)
	{
	res.status(403).end();     // HTTP status 404: NotFound
	return ;
	}
	var storeinfo=
	{
	 _id: timestamp,
	 storename: storename,
	 category:category,
	 address:address
	};
	var store =  new Store(storeinfo);
	store.save(function(err,re){
	if (err) {
	  res.status(403).end(); 
	}else
	{
	  res.json(storeinfo)
		 .status(200).end();     // HTTP status 404: NotFound
	}
	return;
	});
});
/*
GET
curl http://127.0.0.1:3000/store?id=
*/
router.get('/', function(req, res, next) {
  var id = req.query.id;
  if(id == undefined ){
    res.status(404).end();      // HTTP status 404: NotFound
    return;
  }
  if(id !=undefined)
  {
    Store.findOne({'_id':id},function(err,re){
      if(err){
        res.status(404).end();      // HTTP status 404: NotFound
        return;
      }else
      {
        if(re != null){
          res.json(re)
			.status(200).end();
        }else
        {
          res.status(404).end();
        }
        return;

      }
    });
  }
});
/*
*curl -X DELETE 'http://127.0.0.1:3000/store?id=1489833159532'
*
*/
router.delete('/', function(req, res, next){
  var ids = req.query.id;
  Store.findOne({'_id':ids},function(err,re){
    if(err){
      res.status(404).end();
      return;
    }else
    {
      if(re == null){
          res.status(404).end();
		  return;
      }else{
		Review.remove({
        storeID: ids
        }, function(err, re) {
          if (err)
          {
            res.status(404).end();
            return;
          }
          else
          {
            Store.remove({
			_id: ids
			}, function(err, re) {
				if (err)
				{
					res.status(404).end();
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
*curl -X PUT -d 'storename=test&category=testpart' 'http://127.0.0.1:3000/store?id=1489834713531'
*/
router.put('/', function(req, res, next){
  var ids = req.query.id;
  var condition = {};
  var storename = req.body.storename;
  var category = req.body.category;
  if(storename!=undefined){condition['storename'] = storename;}
  if(category!=undefined){condition['category'] = category;}
  Store.findOne({'_id':ids},function(err,re){
    if(err){
      res.status(404).end();     // HTTP status 404: NotFound
      return;
    }else
    {
      if(re == null){
          res.status(404).end();     // HTTP status 404: NotFound
		  return;
      }else{
		 //console.log(condition);
         Store.update({'_id':ids},{$set: condition}, function(err,re) {
            if(err){
              res.status(404).end();      // HTTP status 404: NotFound
              return;
            }else{
				Store.findOne({'_id':ids},function(err,re){
				  res.json(re).status(200).end();
				  return;
				});
			}
            
         });
      }

    }
  });
  
});
module.exports = router;