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

router.post('/', function(req, res) {
  var task = new Task();
  task.title = req.body.title;
  task.description = req.body.description;

  task.save(function(err) {
    if(err) {
      console.log(err);
      return;
    } else {
      console.log('Task successfully saved!')
      res.redirect('/');
    }
  });
});

module.exports = router;
