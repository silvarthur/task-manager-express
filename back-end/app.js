var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var task = require('./routes/task.route');

mongoose.connect('mongodb://localhost/task_manager_db');
var db = mongoose.connection;

var app = express();

//body parser required middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', task);

module.exports = app;