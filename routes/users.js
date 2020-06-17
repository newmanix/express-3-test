var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var title = "Our Users Page";
  var db = req.db;
  var collection = db.get('test_collection');
  collection.find({},{limit:20},function(e,docs){
      console.log(docs);
      res.render('users/index', {
          title:title,
          users:docs
      });
  });
});

router.get('/view/:id', function(req, res, next) {
  var title = "User Page";
  var db = req.db;
  var id = req.params.id;
  var collection = db.get('test_collection');
  collection.find({'_id':id},{limit:1},function(e,docs){
      res.render('users/view', {
          title:title,
          users:docs
      });
  });
});

/* add user form */
router.get('/add', function(req, res, next) {
  var title = "Add User";
      res.render('users/add', {
          title:title
      });
});

/* insert user */
router.post('/insert', function(req, res) {
    // retrieve form values - reliant on name attributes
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;

    var db = req.db;
    var collection = db.get('test_collection');
  
    /*
    
    did not work -
    collection.find({id:{gt:20}},{limit:1},function(e,docs){
      console.log(docs);
      res.send("check console");
  });
  */
  
  /*
    var lastOne = collection.findOne({$query:{},$orderby:{id:-1}})
    res.send("lastOne: " + lastOne);                                         
    console.log(lastOne);
    
    db.collection.find( { $query: {}, $orderby: { age : -1 } } )
    
    */
  /*
  collection.findOne({},{orderby:{id:-1}},function(e,docs){
      var title = "Find One Test";
     console.log(docs);
     res.send("check console"); 

  });
  */
 
  /*
    collection.insert({
        "first_name" : first_name,
        "last_name" : last_name,
        "email" : email
    }, function(err, doc){
        if(err){
            res.send("ERROR: User not added.");
        }else{
            // redirect to list
            res.redirect("/");
        }
    });
    */
  
  collection.insert({
    "first_name" : first_name,
     "last_name" : last_name,
     "email" : email
  })
  .then((docs) => {
    // docs contains the documents inserted with added **_id** fields
    //show new user/view page
    var title = "New User Added!";
    res.send("User Added!");
    console.log(docs);
    /*
    res.render('users/view', {
          title:title,
          users:docs
      });*/
    
  }).catch((err) => {
     res.send("ERROR: User not added.");
  }).then(() => db.close())
  

});

module.exports = router;

