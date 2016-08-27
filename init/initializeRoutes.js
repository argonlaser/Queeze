'use strict';

module.exports = function (app, dbParams) {
  var tracker = 'init|initializeRoutes.js';
  var url = require('url');
  
//  logger.debug(tracker, 'Inside');
  var studentRoute = require('../Student/routes.js')(dbParams);
//  var gameRoute = require('../Games/routes.js')(dbParams);
//  var microRoute = require('../Micro/routes.js')(dbParams);

  // Custom routes
  var routeHandlers = [
    {
      baseRoute : '/',
      handler : studentRoute.handler,
      childRoutes : studentRoute.routes
    },
//    {
//      baseRoute : '/games',
//      handler : gameRoute.handler,
//      childRoutes : gameRoute.routes
//    },
//    {
//      baseRoute : '/misc',
//      handler : microRoute.handler,
//      childRoutes : microRoute.routes
//    }
  ];
  var getQuesdata = require('./getQuesData.js');
  var data = null;
  getQuesdata(function(err, localData) {
    data = localData;
  });
  app.locals.data = data;
  console.log(app.locals.data)
  
  routeHandlers.forEach(function(r) {
    console.log(tracker, 'Initializing route', r.baseRoute);
    app.use(r.baseRoute, r.handler);
  });
  
//  //GET home page request
//app.get("/",function(req,res){
//  res.sendFile('./views/elc.html');
//});
  
//GET reg page request
//app.get("/elc_reg", function(req,res) {
//  res.sendFile('./views/elc_reg.html');
//});

//POST details request
app.post("/submitDetails",function(req,res) {
    
  var rollno = req.body.rollno;
  var name = req.body.name ;
  var year = req.body.year ;
  var events = req.body.events ;
  var eventsStr = "";
  var mark = '0';
  var data = app.locals.data;
  for(var x in events) {
    eventsStr += req.body.events[x] + "," ;
  }

  dbParams.dbConnection.query( "INSERT INTO `elc`.`student` (`rollno`, `name`,`year`,`events`,`mark`) VALUES ('"+ rollno +"','"+ name +"','"+year+"','"+eventsStr+"','"+mark+"');" , function(err, rows, fields) {
    if (err) {
      res.send('error occured' + err );
    } else {
      console.log("added " + req.body.rollno );
      var page="<html><head> <title>Questions-ELC</title> <link type=\"text\/css\" rel=\"stylesheet\" href=\"\/questions.css\"> <script type=\"text\/javascript\"> window.nameVal =  '"+ name  + "' ; window.rollnoVal = '" + rollno  +"'  ; function onloadME(timerIn) {window.setInterval(timerfunc,1000); } var mybool = localStorage.getItem('loadForFirstTime"+rollno+"'); if (mybool=== \"false\") { window.location = \"http://localhost:1337\" ;}  </script>  </head> <body bgcolor=\"orange\" onload=\"onloadME(timerIn);\"> <center><h1>Questions - ELC </h1></center> <hr /> <div id=\"timerOut\"> Welcome , <b>"+ name + "( " + rollno + " ) </b> !   <div id=\"timerIn\"> <center>Timer</center></div> </div>";

      var mytemp = "";
      mytemp = "<form  id=\"myform\" name=\"myform\" method=\"post\" action=\"http://localhost:1337/submitAnswers/?rollno="+rollno+"\">"; 

      for(var i = 0 ; i < 3 ; i++) {
        mytemp += data.questions[i].ques.toString() + "<br />";
        mytemp += "<input type=\"radio\" name=\"q" + i.toString() + "\" value=\"ans1\" /> " + data.questions[i].ans1  + "<br /> " ;
        mytemp += "<input type=\"radio\" name=\"q" + i.toString() + "\" value=\"ans2\" /> " + data.questions[i].ans2  + "<br /> " ;
        mytemp += "<input type=\"radio\" name=\"q" + i.toString() + "\" value=\"ans3\" /> " + data.questions[i].ans3  + "<br /> " ;
        mytemp += "<input type=\"radio\" name=\"q" + i.toString() + "\" value=\"ans4\" /> " + data.questions[i].ans4  + "<br /> <hr /> " ;
      }
    
      mytemp +=  "<script type=\"text\/javascript\">function noBack(){ window.loadForFirstTime = false ;   localStorage.setItem('loadForFirstTime"+rollno+ "',false);location.replace(\"http://localhost:1337/\"); window.location = \"http://localhost:1337/\" ;  }</script><center><input type=\"submit\" id=\"mysubmit\"  name=\"submit\" onclick=\"noBack();\" /> </center><br /> <br /> <br /> <br /> <br /> <br /> </form> <script type=\"text\/javascript\" src=\"\/questions.js\"> </script> </body></html>";

      page += mytemp ;
      //console.log(page);

      res.send(page);
    }
  });
});

app.post("/submitAnswers" , function(req , res ) {
  var getQuesdata = require('./getQuesData.js');
  
  var queryData = url.parse(req.url, true).query;
  var rollno = queryData.rollno;
  var temp = "" ;
  var count = 0 ;
  var data = null;
  getQuesdata(function(err, localData) {
    data = localData;
  });
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
  dbParams.dbConnection.query( "UPDATE `elc`.`student` SET `mark`='"+count+"' WHERE `rollno`='"+rollno+"';" ,function(err,rows,fields) {
    if(err) {
      res.send(err);
    } else {
      //res.send(rollno + 'has scored ' + count );
      var path =  require ('path');
      res.sendFile(path.resolve('./views/elc_end.html'));
    }
  });
  console.log(rollno + " scored " + count);
});




 
  
  
  console.log('Initialized all routes.');

  // error handlers
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.code);
      res.statusMessage = err.message;
      res.json({ error : err.error });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    if(err) {
      res.status(err.code);
     // console.log(err.error);
      res.json({ error : err.error });
    }
  });
};
