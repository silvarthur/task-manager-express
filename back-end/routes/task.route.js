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
    console.log(req.body);
    controller.addNewTask(req, function(response) {
        res.json(response);
    });
});

router.put('/task/:id', function(req, res) {
    console.log('***');
    controller.updateTask(req, function(response) {
        res.json(response);
    });
});

module.exports = router;