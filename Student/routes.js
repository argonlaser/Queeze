'use strict';

module.exports = function(params) {
  var tracker = 'Student|routes.js';
  console.log(tracker, 'Inside');

  var express = require('express');
  var studentRouteHandler = express.Router();
  
   var routeGlobals = {
    dbConnection : params.dbConnection
  };
  
  var routes = [
    {
      method : 'get',
      path : '/',
      handlers : [require('./getHomePage.js').bind(routeGlobals)]
    },
    {
      method : 'get',
      path : '/elc_reg',
      handlers : [require('./elc_reg.js').bind(routeGlobals)]
    },
//    {
//      method : 'post',
//      path : '/submitDetails',
//      handlers : [require('./submitDetails.js').bind(routeGlobals)]
//    },
//    {
//      method : 'post',
//      path : '/submitAnswers',
//      handlers : [require('./submitAnswers.js').bind(routeGlobals)]
//    }
  ];

  routes.forEach(function(r) {
    console.log( 'Initializing route '+ r.method.toUpperCase() +
      ' ' + r.path);
    studentRouteHandler[r.method].apply(studentRouteHandler, [r.path].concat(r.handlers));
  });
  console.log('Initialized all routes in student.');
  return {
    handler : studentRouteHandler,
    routes : routes
  };
}