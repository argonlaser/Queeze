var fs = require('fs');
var mysql = require('mysql');
var path = require('path');
var url = require('url');
var express = require('express');
var app = express();


app.use(express.static(path.join(__dirname, 'public')));


//read json
var file = __dirname + '/ques.json';
var str = fs.readFileSync(file).toString();
//console.log(str);
data = JSON.parse(str);


//mysql connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
});
connection.connect();



//express js body parser to get JSON from HTML Form in POST request
app.use(express.bodyParser());

//GET home page request
app.get("/",function(req,res){

	res.sendfile(__dirname + '/elc.html');

});


//GET reg page request
app.get("/elc_reg", function(req,res)
{
	res.sendfile(__dirname + '/elc_reg.html');
});

//POST details request
app.post("/submitDetails",function(req,res)
{
	var rollno = req.body.rollno;
	var name = req.body.name ;
	var year = req.body.year ;
	var events = req.body.events ;
	var eventsStr = "";
	var mark = '0';

	for(var x in events)
	{
		eventsStr += req.body.events[x] + "," ;		
	}



	//console.log(req.body);
	//console.log(eventsStr);


	connection.query( "INSERT INTO `elc`.`student` (`rollno`, `name`,`year`,`events`,`mark`) VALUES ('"+ rollno +"','"+ name +"','"+year+"','"+eventsStr+"','"+mark+"');" , function(err, rows, fields)
	{
		if (err)
		{
			res.send('error occured' + err );


		}
		else
		{
		console.log("added " + req.body.rollno );
		var page="<html><head> <title>Questions-ELC</title> <link type=\"text\/css\" rel=\"stylesheet\" href=\"\/questions.css\"> <script type=\"text\/javascript\"> window.nameVal =  '"+ name  + "' ; window.rollnoVal = '" + rollno  +"'  ; function onloadME(timerIn) {window.setInterval(timerfunc,1000); } var mybool = localStorage.getItem('loadForFirstTime"+rollno+"'); if (mybool=== \"false\") { window.location = \"http://localhost:1337\" ;}  </script>  </head> <body bgcolor=\"orange\" onload=\"onloadME(timerIn);\"> <center><h1>Questions - ELC </h1></center> <hr /> <div id=\"timerOut\"> Welcome , <b>"+ name + "( " + rollno + " ) </b> !   <div id=\"timerIn\"> <center>Timer</center></div> </div>";



	    mytemp = "";
		    mytemp = "<form  id=\"myform\" name=\"myform\" method=\"post\" action=\"http://localhost:1337/submitAnswers/?rollno="+rollno+"\">"; 


	    
	    shuffle(data.questions);


		for(var i = 0 ; i < 3 ; i++)
		{						
			mytemp += data.questions[i].ques.toString() + "<br />" ;			
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





app.post("/submitAnswers" , function(req , res )
{
	 var queryData = url.parse(req.url, true).query;					  
	 var rollno = queryData.rollno ;

	var temp = "" ;
	var count = 0 ;	
	
	//console.log("req.body \n \n ")
	//console.log(req.body);
	//console.log(req.body['q0']);

	for( var ele in req.body )
	{
		if(ele.substring(0,1) === 'q')
		{		
			
			var numStr = ele.toString().replace(/q/,'');
			
			var num = parseInt(numStr) ;
			//console.log(num);
			var dbans = data.questions[num].correct ;			
			
			if(dbans === req.body[ele.toString()])
			{
				count++;				
			}			

			
			
		}

		
	}

	//update mark on mysql
	connection.query( "UPDATE `elc`.`student` SET `mark`='"+count+"' WHERE `rollno`='"+rollno+"';" ,function(err,rows,fields)
	{
		if(err)
		{
			res.send(err);

		}
		else
		{
			//res.send(rollno + 'has scored ' + count );
			res.sendfile(__dirname + '/elc_end.html');
		}

	} );


	console.log(rollno + " scored " + count);


	
});


app.listen(1337,function()
{
	console.log('server started');

});

shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};
