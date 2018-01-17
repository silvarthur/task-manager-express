var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Task = require('../models/task.model');
var controller = require('../controllers/task.controller');

router.get('/task', controller.getAllTasks);

router.post('/task', controller.addNewTask);

router.put('/task/edit/:id', controller.updateTask);

router.put('/task/markAsDone/:id', controller.markTaskAsDone);

router.delete('/task/:id', controller.removeTask);

module.exports = router;