'use strict';

function submitAnswers(req, res, next) {
  /*jshint validthis:true */
  var path = require('path');
  var app = require('../app.js');
  console.log('In submitAnswers')
  this.tracker = 'submitAnswers' + submitAnswers.name;
  console.log(this.tracker, 'Inside');
  var routeStore = this;
  var req = routeStore.req.body;
  var dbConnection = routeStore.dbConnection;
   console.log('222')
  var data = null;
  
  var queryData = url.parse(req.url, true).query;
  var rollno = queryData.rollno;
  var temp = "" ;
  var count = 0 ;
  var data = app.locals.data;
  console.log('DATA : '+ data)
  
  for( var ele in req.body) {
    if(ele.substring(0,1) === 'q') {
      var numStr = ele.toString().replace(/q/,'');
      var num = parseInt(numStr) ;
      //console.log(num);
      var dbans = data.questions[num].correct ;

      if(dbans === req.body[ele.toString()]) {
        count++;
      }
    }
  }

  //update mark on mysql
  dbConnection.query( "UPDATE `elc`.`student` SET `mark`='"+count+"' WHERE `rollno`='"+rollno+"';" ,function(err,rows,fields) {
    if(err) {
      res.send(err);
    } else {
      //res.send(rollno + 'has scored ' + count );
      
      res.status(200);
      res.sendFile(path.resolve('./views/elc_end.html'));
    }
  });
  console.log(rollno + " scored " + count);
};

module.exports = submitAnswers;











