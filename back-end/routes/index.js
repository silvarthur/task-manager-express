var express = require('express');
var router = express.Router();

var Task = require('../models/task');

//GET HOME PAGE
router.get('/', function(req, res, next) {
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

//ADD NEW TASK
router.post('/', function(req, res) {
  var task = new Task();
  task.title = req.body.title;
  task.description = req.body.description;

  task.save(function(err, result) {
    if(err) {
      res.status(400).json(err);
    } else {
      res.json(result);
    }
  });
});

//LOAD EDIT FORM
router.get('/:_id', function(req, res) {
  Task.findById(req.params._id, function(err, task) {
    if(err) {
      console.log(err);
    } else {
      res.render('task', {
        title: 'Task Details',
        task_id: req.params._id,
        task_title: task.title,
        task_description: task.description
      });
    }
  });
});

//EDIT TASK
router.post('/:_id', function(req, res) {
  var task = {};
  task.title = req.body.title;
  task.description = req.body.description;

  var query = {_id: req.params._id};

  Task.update(query, task, function(err) {
    if(err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
