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
}