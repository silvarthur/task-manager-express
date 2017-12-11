var express = require('express');
var router = express.Router();

var Task = require('../models/task');

//GET HOME PAGE
router.get('/', function(req, res, next) {
  console.log('home');
  Task.find({}, function(err, tasks){
    if(err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Express JS Task Manager',
        tasks: tasks 
      });
      //res.json(tasks);
    }
  });
});

module.exports = router;