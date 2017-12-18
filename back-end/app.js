var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var task = require('./routes/task.route');

var cors = require('cors')({credentials: true, origin: true});

var permissions = function(req, res, next) {  
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Acess-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept');
    res.header('Acess-Control-Allow-Credentials', 'true');

    next();
}

mongoose.connect('mongodb://localhost/task_manager_db');
var db = mongoose.connection;

var app = express();

app.use(cors);

//body parser required middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', task);

module.exports = app;