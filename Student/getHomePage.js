'use strict';

function getHomePage(req, res, next) {
  /*jshint validthis:true */
  var path = require('path');
  console.log('In getHomePage')
  this.tracker = 'Games' + getHomePage.name;
  console.log(this.tracker, 'Inside');
  
  res.sendFile(path.resolve('./views/elc.html'));
};
module.exports = getHomePage;
