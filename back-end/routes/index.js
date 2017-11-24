var express = require('express');
var router = express.Router();

var Task = require('../models/task');

/* GET home page. */
router.get('/', function(req, res, next) {
  Task.find({}, function(err, tasks){
    if(err) {
      console.log(err);
    } else {
      res.render('index', { 
        title: 'Angular Task Manager',
        tasks: tasks 
      });
    }
  });

});

module.exports = router;
