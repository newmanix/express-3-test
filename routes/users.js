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

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

router.get('/add', function(req, res, next) {
  var title = "Add User";
      res.render('users/add', {
          title:title
      });
});

module.exports = router;

