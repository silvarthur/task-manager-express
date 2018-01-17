var mongoose = require('mongoose');
var Task = require('../models/task.model');

exports.getAllTasks = function(req, res) {
    Task.find({}, function(error, tasks){
        if(error) {
          res.status(500).json({error: 'The tasks could not be returned!'});
        } else {
          if(tasks) {
            res.json(tasks);
          } else {
            res.status(200).json('OK');
          }
        }
      });
};

exports.addNewTask = function(req, res) {
    var task = new Task();

    task.title = req.body.task.title;
    task.description = req.body.task.description;
  
    task.save(function(err, response) {
        if(err) {
            res.status(500).json({err: 'The task could not be added!'});
        } else {
            res.json(response);
        }
    });
};

exports.markTaskAsDone = function(req, res) {
    Task.findById(req.params.id, function(err, task) {
        if(err) {
            res.sendStatus(500);
        } else {
            if(task) {
                task.status = true;
                
                task.save(function(error, task) {
                    if(error) {
                        res.json({error: 'The could not be updated!'});
                    } else {
                        res.json(task);
                    }
                });
            } else {
                res.sendStatus(404).json({err: 'Task could not be found!'});
            }
        }
    });
};

exports.updateTask = function(req, res) {
    Task.findById(req.params.id, function(err, task) {
        if(err) {
            res.sendStatus(500);
        } else {
            if(task) {
                if(req.body.title) task.title = req.body.title;
                if(req.body.description) task.description = req.body.description;
    
                task.save(function(error, task) {
                    if(error) {
                        res.json({error: 'The could not be updated!'});
                    } else {
                        res.json(task);
                    }
                });
            } else {
                res.status(404).json({err: 'Task could not be found!'});
            }
        }
    });
};

exports.removeTask = function(req, res) {
    Task.findById(req.params.id, function(err, task) {
        if(err) {
            res.sendStatus(500);
        } else {
            if(task) {
                task.remove(function (error) {
                    if(error) {
                        res.json({error:'Task could not be removed'});
                    } else {
                        res.json({task});
                    }
                });
            } else {
                res.status(404).json({err: 'Task could not be found!'});
            }
        }
    });
};