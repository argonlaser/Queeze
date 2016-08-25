	// function onloadME(timerIn)
	//  {
 //    //alert( window.nameVal + " : " +  window.rollnoVal )    ;
	//  	window.setInterval(timerfunc,1000); 
	//  }
	  sec = 60 ;
	  min = 29 ;
    var timerfunc = function() 
    {
    	sec--; 
    	timerIn.innerHTML = "<center>" + "Remaining Time (MM:SS) : " +  min + " : " + sec + "</center>" ; 
    	if (sec == 0 )
    	{
    	 	if(min > 0 )
    	 	{
    	 		min--;
    	 		sec = 60 ;
    	 		timerIn.innerHTML = "<center>" + "Remaining Time (MM:SS) : " +  min + " : " + sec + "</center>" ; 
    	 	}
    	 	else
    	 	{
          timerIn.innerHTML = "<center>Time up! Click Submit to see your scores. </center>" ;
          alert('Time up !' + document.myform);

          for (var i = 0; i < 45; i++) {
            for(var j = 0 ; j< 4 ; j++ )
            {
            document.getElementsByName("q" + i )[j].disabled = true;            
            }

         };         
  	  	 	
  	  	 	} 
  	    }
        else if ( sec < 0 ) 
        {

          timerIn.innerHTML = "<center>Time up ! Click Submit to see your scores. </center>" ;
        }
  	}

    function myalert(message) {
      alert(message);

      // body...
    }
  