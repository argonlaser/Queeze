	function onloadME (timerIn)
	 {
    alert(window.xVal);
	 	window.setInterval(timerfunc,1000); 
	 }
	  sec = 60 ;
	  min = 29 ;
    var timerfunc = function () 
    {
    	sec--; 
    	timerIn.innerHTML = "<center>" + min + " : " + sec + "</center>" ; 
    	if (sec == 0 )
    	{
    	 	if(min != 0 )
    	 	{
    	 		min--;
    	 		sec = 60 ;
    	 		timerIn.innerHTML = "<center>" + min + " : " + sec + "</center>" ;
    	 	}
    	 	else
    	 	{
  	  	 	window.location.href = "http://localhost:1337/" ;
  	  	 	alert('Time up !');
  	  	 	} 
  	    }
  	}
  