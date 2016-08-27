//'use strict';
//var _ = require('underscore');
//var async = require('async');
//var mysql = require('mysql');
//
//var HttpError = require('standard-http-error');
//
//function post(req, res, next) {
//  /*jshint validthis:true */
//  this.tracker = 'Games|' + post.name;
//  e.log(this.tracker, 'Inside');
//  //console.log(req);
//  
//  var routeStore = this;
//  routeStore.req = req;
//  routeStore.res = res;
//
//  async.series([
// //   _validateRequest.bind(this),
//    _postGame.bind(this)
//  ],
//  function (err) {
//    if (err) {
//      console.log('ERROR');
//      return next(err);
//    }
//    else {
//      console.log('PASSED');
//      return res.json(routeStore.resBody);
//    }
//  });
//}
//
//function _validateRequest(next) {
//  /*jshint validthis:true */
//  var tracker = this.tracker + '|' + _validateRequest.name;
//  logger.debug(tracker, 'Inside');
//
//  var routeStore = this;
//  var req = routeStore.req;
//  
//  req.checkBody('state', 'state is empty').nonEmpty();
//  req.checkBody('state', 'state should be string').isString();
//  req.checkBody('waitTime', 'Invalid waitTime').isFinite();
//  req.checkBody(['players', 'userId'],'Missing userId').nonEmpty().isString();
//  req.checkBody(['players', 'state'],'Missing state').nonEmpty().isString();
//  
//  var errors = req.validationErrors();
//  if (errors)
//    return next(new HttpError('BAD_REQUEST', { error : errors }));
//
//  return next();
//}
//
//function _postGame(next) {
//  /*jshint validthis:true */
//  var getQuesdata = require('../init/getQuesData.js');
//  var tracker = this.tracker + '|' + _postGame.name;
//  console.log(tracker, 'Inside');
//
//  var routeStore = this;
//  var req = routeStore.req.body;
//  var dbConnection = routeStore.dbConnection;
//   console.log('222')
//  var data = null;
//  getQuesdata(function(err, localData) {
//    console.log("DATA :" +data)
//    data = localData;
//  });
//  console.log('111111111111')
//  var rollno = req.body.rollno;
//  var name = req.body.name ;
//  var year = req.body.year ;
//  var events = req.body.events ;
//  var eventsStr = "";
//  var mark = '0';
//
//  for(var x in events) {
//    eventsStr += req.body.events[x] + "," ;
//  }
//  console.log('999999999999')
//  dbConnection.query( "INSERT INTO `elc`.`student` (`rollno`, `name`,`year`,`events`,`mark`) VALUES ('"+ rollno +"','"+ name +"','"+year+"','"+eventsStr+"','"+mark+"');" , function(err, rows, fields) {
//    if (err) {
//      res.send('error occured' + err );
//    } else {
//      console.log("added " + req.body.rollno );
//      var page="<html><head> <title>Questions-ELC</title> <link type=\"text\/css\" rel=\"stylesheet\" href=\"\/questions.css\"> <script type=\"text\/javascript\"> window.nameVal =  '"+ name  + "' ; window.rollnoVal = '" + rollno  +"'  ; function onloadME(timerIn) {window.setInterval(timerfunc,1000); } var mybool = localStorage.getItem('loadForFirstTime"+rollno+"'); if (mybool=== \"false\") { window.location = \"http://localhost:1337\" ;}  </script>  </head> <body bgcolor=\"orange\" onload=\"onloadME(timerIn);\"> <center><h1>Questions - ELC </h1></center> <hr /> <div id=\"timerOut\"> Welcome , <b>"+ name + "( " + rollno + " ) </b> !   <div id=\"timerIn\"> <center>Timer</center></div> </div>";
//
//      var mytemp = "";
//      mytemp = "<form  id=\"myform\" name=\"myform\" method=\"post\" action=\"http://localhost:1337/submitAnswers/?rollno="+rollno+"\">"; 
//
//      for(var i = 0 ; i < 3 ; i++) {
//        mytemp += data.questions[i].ques.toString() + "<br />";
//        mytemp += "<input type=\"radio\" name=\"q" + i.toString() + "\" value=\"ans1\" /> " + data.questions[i].ans1  + "<br /> " ;
//        mytemp += "<input type=\"radio\" name=\"q" + i.toString() + "\" value=\"ans2\" /> " + data.questions[i].ans2  + "<br /> " ;
//        mytemp += "<input type=\"radio\" name=\"q" + i.toString() + "\" value=\"ans3\" /> " + data.questions[i].ans3  + "<br /> " ;
//        mytemp += "<input type=\"radio\" name=\"q" + i.toString() + "\" value=\"ans4\" /> " + data.questions[i].ans4  + "<br /> <hr /> " ;
//      }
//    
//      mytemp +=  "<script type=\"text\/javascript\">function noBack(){ window.loadForFirstTime = false ;   localStorage.setItem('loadForFirstTime"+rollno+ "',false);location.replace(\"http://localhost:1337/\"); window.location = \"http://localhost:1337/\" ;  }</script><center><input type=\"submit\" id=\"mysubmit\"  name=\"submit\" onclick=\"noBack();\" /> </center><br /> <br /> <br /> <br /> <br /> <br /> </form> <script type=\"text\/javascript\" src=\"\/questions.js\"> </script> </body></html>";
//
//      page += mytemp ;
//     // e.log(page);
//
//      res.send(page);
//       }
//  });
//  
//}
//
//module.exports = post;
