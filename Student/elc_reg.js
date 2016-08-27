'use strict';

function elc_reg(req, res, next) {
  /*jshint validthis:true */
  var path = require('path');
  console.log('In elc_reg')
  this.tracker = 'elc_reg' + elc_reg.name;
  console.log(this.tracker, 'Inside');
  
  res.sendFile(path.resolve('./views/elc_reg.html'));
};
module.exports = elc_reg;
