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
        title: 'Angular Task Manager',
        tasks: tasks 
      });
    }
  });
});

//EDIT TASK
router.get('/:_id', function(req, res) {
  Task.findById(req.params._id, function(err, task) {
    console.log("***");
    console.log(req.params._id);
    console.log("***");

    if(err) {
      console.log(err);
    } else {
      res.render('task', {
        title: 'Task Details',
        task_title: task.title,
        task_description: task.description
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
