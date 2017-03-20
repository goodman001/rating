var express = require('express');
var router = express.Router();
var User = require("../models/user")
var Store = require("../models/store")
var Review = require("../models/review")
/*
*curl --data "rating=3" http://127.0.0.1:3000/review
*curl --data "userID=16894948845&storeID=1490011940573&rating=10" http://127.0.0.1:3000/review
*curl --data "userID=1489654893559&storeID=150000000&rating=10" http://127.0.0.1:3000/review
*curl --data "userID=1489654893559&storeID=1490011940573&rating=11" http://127.0.0.1:3000/review
*curl --data "userID=1489654893559&storeID=1490011940573&rating=10" http://127.0.0.1:3000/review
*/
router.post('/', function(req, res, next) {
	var userID = req.body.userID;
	var storeID = req.body.storeID;
	var rating = req.body.rating;
	var comment = req.body.comment;
	var timestamp=new Date().getTime();
	if(userID == "" ||  storeID == "" || rating == '' || rating<0 || rating >10 || userID == undefined ||  storeID == undefined || rating == undefined ){
		res.status(403)      // HTTP status 404: NotFound
			.send('post value Error');
		return ;
	}
	if(comment = undefined)
	{
		comment = "";
	}
	/*find user*/
	var reviewinfo=
	{
	 _id: timestamp,
	 userID: userID,
	 storeID:storeID,
	 rating:rating,
	 comment:comment
	};
	var review =  new Review(reviewinfo);
	User.count({'_id':userID},function(err,re){
	if (err) {
		console.log(err);
		return;
	 }else
	 {  
		var usercount = re;
		if(usercount >0)
		{
		   /*FIND USRE END*/
			Store.count({'_id':storeID},function(err,re){
			if (err) {
				console.log(err);
				return;
			 }else
			 {  
				var storecount = re;
				if(storecount >0)
				{
					/*find store*/
					Review.count({'userID':userID,'storeID':storeID},function(err,re){
					if (err) {
						console.log(err);
						return;
					 }else
					 {  
						var reviewcount = re;
						if(reviewcount >0)
						{
							/*find review*/
							res.status(403)      // HTTP status 404: NotFound
								.send('store revew Error');
							return ; 
						}else
						{
							review.save(function(err,review){
								if (err) {
								  console.log(err);

								}else
								{
									Review.findOne({'_id':timestamp},function(err,re){
										if(err){
											res.status(404)      // HTTP status 404: NotFound
												.send('review ID Error');
											return;
										}else
										{
											res.json(re)
												.status(200);
											return;

										}
									});
								}
								return;
							  });
						}
					  }

					});
					
					
					
				}else
				{
					res.status(403)      // HTTP status 404: NotFound
						.send('store Error');
					return ; 
				}
			  }

			});
		}else
		{
			res.status(403)      // HTTP status 404: NotFound
				.send('Username Error');
		  	return ; 
		}
		//res.cookie('name', _name, {expire : new Date() + 600000});        
		//res.render('rate', { title: 'Rate' });
		  //res.redirect('/rate');
	  }

  	});
	
});
/*
GET
curl http://127.0.0.1:3000/review?id=
*/
router.get('/', function(req, res, next) {
  var id = req.query.id;
  var userID = req.query.userID;
  var storeID = req.query.storeID;
  if(id == undefined && userID == undefined && storeID == undefined ){
    res.status(404)      // HTTP status 404: NotFound
    	.send('ID Error');
    return;
  }
  if(id !=undefined)
  {
    Review.findOne({'_id':id},function(err,re){
      if(err){
        res.status(404)      // HTTP status 404: NotFound
            .send('ID Error');
        return;
      }else
      {
        if(re != null){
          res.json(re)
			.status(200);
			return;
        }else
        {
          res.status(404)      // HTTP status 404: NotFound
            .send('ID Error');
        }
        return;

      }
    });
  }
  else if(userID != undefined){
	 Review.findOne({'userID':userID},function(err,re){
      if(err){
        res.status(404)      // HTTP status 404: NotFound
            .send(' reivew ID Error');
        return;
      }else
      {
        if(re != null){
          res.json(re)
			.status(200);
			return;
        }else
        {
          res.status(404)      // HTTP status 404: NotFound
            .send('ID Error');
        }
        return;

      }
    });
  }
  else if(storeID != undefined){
	 Review.findOne({'storeID':storeID},function(err,re){
      if(err){
        res.status(404)      // HTTP status 404: NotFound
            .send(' reivew ID Error');
        return;
      }else
      {
        if(re != null){
          res.json(re)
			.status(200);
			return;
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
  var id = req.query.id;
  var userID = req.query.userID;
  var storeID = req.query.storeID;
  if(id == undefined && userID == undefined && storeID == undefined ){
    res.status(404)      // HTTP status 404: NotFound
    	.send('ID Error');
    return;
  }
  if(id !=undefined){
	  Review.findOne({'_id':id},function(err,re){
		if(err){
		  res.status(404)
			.send('Delete Error');;    // HTTP status 404: NotFound
		  return;
		}else
		{
		  if(re == null){
			  res.status(404)
			  .send('Delete review Error');    // HTTP status 404: NotFound
			  return;
		  }else{
			Review.remove({
			_id: id
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
  }
  else if(userID !=undefined){
	  Review.findOne({'userID':userID},function(err,re){
		if(err){
		  res.status(404)
			.send('Delete Error');;    // HTTP status 404: NotFound
		  return;
		}else
		{
		  if(re == null){
			  res.status(404)
			  .send('Delete review Error');    // HTTP status 404: NotFound
			  return;
		  }else{
			Review.remove({
			userID: userID
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
  }
  else if(storeID !=undefined){
	  Review.findOne({'storeID':storeID},function(err,re){
		if(err){
		  res.status(404)
			.send('Delete Error');;    // HTTP status 404: NotFound
		  return;
		}else
		{
		  if(re == null){
			  res.status(404)
			  .send('Delete review Error');    // HTTP status 404: NotFound
			  return;
		  }else{
			Review.remove({
			storeID: storeID
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
  }
  
  
});
/*
*curl -X PUT -d 'storename=test&category=testpart' 'http://127.0.0.1:3000/store?id=1489834713531'
*/
router.put('/', function(req, res, next){
  var ids = req.query.id;
  var condition = {};
  var rating = parseInt(req.body.rating);
  var comment = req.body.comment;
  console.log(rating);
  if(rating!=undefined)
  {
	  if(rating<0 || rating>10){
		  res.status(403)      // HTTP status 404: NotFound
          .send('rating range error');
      	return;
	  }else
	  {
		  condition['rating'] = rating;
	  }
	  
  }
  if(comment!=undefined){condition['comment'] = comment;}
  Review.findOne({'_id':ids},function(err,re){
    if(err){
      res.status(404)      // HTTP status 404: NotFound
          .send('review  find Error');
      return;
    }else
    {
      if(re == null){
          res.status(404)      // HTTP status 404: NotFound
          .send('ID find Error');
		  return;
      }else{
		 //console.log(condition);
         Review.update({'_id':ids},{$set: condition}, function(err,re) {
            if(err){
              res.status(404)      // HTTP status 404: NotFound
                  .send('ID find Error');
              return;
            }else{
				Review.findOne({'_id':ids},function(err,re){
				  res.json(re);
				  return;
				});
			}
            
         });
      }

    }
  });
  
});
module.exports = router;