var express = require('express');
var router = express.Router();

var Task = require('../models/task');

//ADD NEW TASK
router.post('/add', function(req, res) {
    req.checkBody('title', 'Title is required!').notEmpty();
    req.checkBody('description', 'Description is required!').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        res.render('index', {
            title: 'Express JS Task Manager', 
            errors: errors
        });
    } else {
        var task = new Task();
        task.title = req.body.title;
        task.description = req.body.description;
      
        task.save(function(err, result) {
          if(err) {
            res.status(400).json(err);
          } else {
            res.redirect('/');
            //res.json(result);
          }
        });
    }

});
  
//LOAD EDIT FORM
router.get('/edit/:_id', function(req, res) {
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
router.post('/edit/:_id', function(req, res) {
    var task = {};
    task.title = req.body.title;
    task.description = req.body.description;

    var query = {_id: req.params._id};

    Task.update(query, task, function(err) {
        if(err) {
            console.log(err);
            return;
        } else {
            console.log('Task successfully edited!');
            res.redirect('/');
        }
    });
});

module.exports = router;