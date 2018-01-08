var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Task = require('../models/task.model');
var controller = require('../controllers/task.controller');

router.get('/task', function(req, res) {
    controller.getAllTasks(function(response) {
        res.json(response);
    });
});

router.post('/task', function(req, res) {
    controller.addNewTask(req, function(response) {
        res.json(response);
    });
});

router.put('/task/edit/:id', function(req, res) {
    controller.updateTask(req, function(response) {
        res.json(response);
    });
});

router.put('/task/markAsDone/:id', function(req, res) {
    controller.markTaskAsDone(req, function(response) {
        res.json(response);
    });
});

module.exports = router;