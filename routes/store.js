var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Store = require("../models/store")
/*
*curl --data "storename=One Square&category=department&address=831 Young Street" http://127.0.0.1:3000/store
*curl --data "storename=One Square Budson's Hay&category=clothing&address=831 Young Street" http://127.0.0.1:3000/store
curl --data "storename=Hay&category=clothing&address=831 Young Street" http://127.0.0.1:3000/store
curl --data "storename=HayHay&category=clothing&address=831 Young Street" http://127.0.0.1:3000/store
*/
router.post('/', function(req, res, next) {
	var storename = req.body.storename;
	var category = req.body.category;
	var address = req.body.address;
	var timestamp=new Date().getTime();
	if(storename == undefined)
	{
	res.status(403)      // HTTP status 404: NotFound
	  .send('storename Error');
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
	  console.log(err);

	}else
	{
	  res.json(storeinfo)
		 .status(200);     // HTTP status 404: NotFound
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
    res.status(404)      // HTTP status 404: NotFound
    .send('ID Error');
    return;
  }
  if(id !=undefined)
  {
    Store.findOne({'_id':id},function(err,re){
      if(err){
        res.status(404)      // HTTP status 404: NotFound
            .send('ID Error');
        return;
      }else
      {
        if(re != null){
          res.json(re)
			.status(200);
        }else
        {
          res.status(404)      // HTTP status 404: NotFound
            .send('ID Error');
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
      res.status(404)
	  	.send('Delete Error');;    // HTTP status 404: NotFound
      return;
    }else
    {
      if(re == null){
          res.status(404)
		  .send('Delete Error');    // HTTP status 404: NotFound
		  return;
      }else{
        Store.remove({
        _id: ids
        }, function(err, re) {
            if (err)
            {
				res.status(404)
					.send('Delete Error');      // HTTP status 404: NotFound
				return;
            }
            else
            {
				res.status(200)
				.send('Delete success');  
				return;
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
      res.status(404)      // HTTP status 404: NotFound
          .send('ID find Error');
      return;
    }else
    {
      if(re == null){
          res.status(404)      // HTTP status 404: NotFound
          .send('ID find Error');
      }else{
		 //console.log(condition);
         Store.update({'_id':ids},{$set: condition}, function(err,re) {
            if(err){
              res.status(404)      // HTTP status 404: NotFound
                  .send('ID find Error');
              return;
            }else{
				Store.findOne({'_id':ids},function(err,re){
				  res.json(re)
					.status(200);
				  return;
				});
			}
            
         });
      }

    }
  });
  
});
module.exports = router;