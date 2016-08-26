'use strict';

module.exports = function (callback) {
  var mysql = require('mysql');
  var util = require('util');
  
  //mysql connection
  var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
  });
  console.log(util.format('Connecting to %s:%s',
    process.env.DB_HOST, process.env.DB_PORT));
try {
  connection.connect();
}
  catch(err){
    console.log('Not connected To DB');
    callback(err, connection);
  }
  callback(null, connection);
  console.log('Connected To DB');
};
