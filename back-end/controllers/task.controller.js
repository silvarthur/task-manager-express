var mongoose = require('mongoose');
var Task = require('../models/task.model');

exports.getAllTasks = function(callback) {
    Task.find({}, function(error, tasks){
        if(error) {
          callback({error: 'The tasks can not be returned!'});
        } else {
          callback(tasks);
        }
      });
};

exports.addNewTask = function(callback) {
    var task = new Task();
    task.title = req.body.title;
    task.description = req.body.description;
  
    task.save(function(err, result) {
        if(err) {
            callback(err);
        } else {
            callback(200); //HTTP STATUS 200 OK
        }
    });
};

exports.updateTask = function(req, callback) {
    Task.findOne({_id: req.params._id, function(err, task) {
        if(err) {
            res.json({err: 'Task could not be found!'});
        } else {
            if(req.body.title) task.title = req.body.title;
            if(req.body.description) task.description = req.body.description;

            task.save(function(error, task) {
                if(error) {
                    callback({error: 'The could not be saved!'});
                } else {
                    callback(task);
                }
            });
        }
    }});
};