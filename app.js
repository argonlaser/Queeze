var fs = require('fs');
var mysql = require('mysql');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var initializeDbConnection = require('./init/initializeDbConnection.js');
var initializeRoutes = require('./init/initializeRoutes.js');
var cors = require('cors');

//express js body parser to get JSON from HTML Form in POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

var dbParams = {};
initializeDbConnection(function (err, dbConnection) {
    if (err) {
      process.exitCode = 1;
    }
    dbParams.dbConnection = dbConnection;
    if(dbConnection) {
      console.log('DB connected');
    }
    initializeRoutes(app, dbParams);
});

module.exports = app;