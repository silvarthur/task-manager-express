var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Task = require('../models/task.model');
var controller = require('../controllers/task.controller');

//GET ALL TASKS
router.get('/', function(req, res) {
    controller.getAllTasks(function(response) {
        res.json(response);
    });
});

//ADD NEW TASKS
router.post('/add', function(req, res) {
    controller.addNewTask(req, function(response) {
        res.json(response);
    });
});

//EDIT TASK
router.put('/edit/:_id', function(req, res) {
    controller.updateTask(req, function(response) {
        res.json(response);
    });
});

//REMOVE TASK

module.exports = router;