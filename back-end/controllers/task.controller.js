var mongoose = require('mongoose');
var Task = require('../models/task.model');

exports.getAllTasks = function(callback) {
    Task.find({}, function(error, tasks){
        if(error) {
          res.sendStatus(500).res({error: 'The tasks could not be returned!'});
        } else {
          if(tasks) {
            callback(tasks);
          } else {
            res.sendStatus(200).res('OK');
          }
        }
      });
};

exports.addNewTask = function(req, callback) {
    var task = new Task();

    task.title = req.body.task.title;
    task.description = req.body.task.description;
  
    task.save(function(err, res) {
        if(err) {
            res.sendStatus(500).res({err: 'The task could not be added!'});
        } else {
            callback(res);
        }
    });
};

exports.markTaskAsDone = function(req, callback) {
    Task.findById(req.params.id, function(err, task) {
        if(err) {
            res.sendStatus(500);
        } else {
            if(task) {
                task.status = true;
                
                task.save(function(error, task) {
                    if(error) {
                        callback({error: 'The could not be updated!'});
                    } else {
                        callback(task);
                    }
                });
            } else {
                res.sendStatus(404).json({err: 'Task could not be found!'});
            }
        }
    });
};

exports.updateTask = function(req, callback) {
    Task.findById(req.params.id, function(err, task) {
        if(err) {
            res.sendStatus(500);
        } else {
            if(task) {
                if(req.body.title) task.title = req.body.title;
                if(req.body.description) task.description = req.body.description;
    
                task.save(function(error, task) {
                    if(error) {
                        callback({error: 'The could not be updated!'});
                    } else {
                        callback(task);
                    }
                });
            } else {
                res.sendStatus(404).json({err: 'Task could not be found!'});
            }
        }
    });
};

exports.removeTask = function(req, callback) {
    Task.findById(req.params.id, function(err, task) {
        if(err) {
            res.sendStatus(500);
        } else {
            if(task) {
                task.remove(function (error) {
                    if(error) {
                        callback({error:'Task could not be removed'});
                    } else {
                        callback({task});
                    }
                });
            } else {
                res.sendStatus(404).json({err: 'Task could not be found!'});
            }
        }
    });
};