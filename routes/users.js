var express = require('express');
var router = express.Router();
//var data = require('../data/test.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var title = "Our Users Page";
  var db = req.db;
  var collection = db.get('test_collection');
  collection.find({},{},function(e,docs){
      console.log(docs);
      res.render('users/index', {
          title:title,
          users:docs
      });
  });
  /*
  res.render('users/index',{
    title:title,
    users:data
  });
  */
});

module.exports = router;

