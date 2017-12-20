var mongoose = require('mongoose');
var Task = require('../models/task.model');

exports.getAllTasks = function(callback) {
    Task.find({}, function(error, tasks){
        if(error) {
          callback({error: 'The tasks could not be returned!'});
        } else {
          callback(tasks);
        }
      });
};

exports.addNewTask = function(req, callback) {
    var task = new Task();

    task.title = req.body.task.title;
    task.description = req.body.task.description;
  
    task.save(function(err, res) {
        if(err) {
            callback({err: 'The task could not be added!'});
        } else {
            callback(res);
        }
    });
};

exports.updateTask = function(req, callback) {
    Task.findById(req.params.id, function(err, task) {
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
    });
};