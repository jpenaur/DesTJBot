/************************************************************************
*
* Author: Supriya Bhat
*
* Description:
* A robot which responds to weather related questions.
* This module uses Watson Speech to Text, Watson Weather Insights, and Watson Text to Speech.
*
* To run: node weather.js
*
*/


var TJBot = require('tjbot');
var config = require('./config');
var watson = require('watson-developer-cloud'); //to connect to Watson developer cloud
var exec = require('child_process').exec;
var fs = require('fs');
var inputdata = require('./inputdata.js'); // contains all the mapping objects
var weatherResponse = require('./weather_response.js'); // contains all the mapping objects
var https = require('https')

// obtain our credentials from config.js
var credentials = config.credentials;

// these are the hardware capabilities that our TJ needs for this recipe
var hardware = ['led', 'microphone'];

// set up TJBot's configuration
var tjConfig = {
    log: {
        level: 'verbose'
    }
};

// instantiate our TJBot!
var tj = new TJBot(hardware, tjConfig, credentials);

tj.listen(function(msg) {
	var foundIntent = false;
	var increase = false;
	var decrease = false;
    var containsWeather = msg.indexOf("weather") >= 0;
    var conatinsYes = msg.indexOf("yes") >= 0;
    var containsNo = msg.indexOf("no") >= 0;

    if (containsWeather && !foundIntent) {
       
		foundIntent = true;
		console.log("Calling createWeatherResponse for weather");
		
		weatherResponse.createWeatherResponse("weather", res, function(err, response){

			if(err)
			{
				//console.log("Encountered an error while retriveing weather data");
				console.log(response);
				watsonResponse = response;
			} else {

				if (response != undefined ){
					// Create a personal response from watson

					watsonResponse = "The " + response.intent + " in " + response.city + " " + response.state + " is " + response.skyCondition + " with a temperature of " + response.temp + " degrees fahrenheit. The wind speed is " + response.windspeed;
					watsonResponse += "miles per hour. Also, the UV index is " + response.uv + ".";
					if(watson.skyCondition.toLowerCase()("sun") > -1){
						watsonResponse += "Do you want me to increase instances of your app?";
						increase = true;
					}
					else{
						watsonResponse += "Do you want me to decrease instances of your app?";
						decrease = true;
					}


				}
			}
			
			speakResponse(watsonResponse);
			// return;	

		}); // end createWeatherResponse



        }
    } else if (foundIntent && containsYes) {
    	if(increase){
    		updateInstances(10)
    		response="Your app is being updated with 10 instances";
    		speakResponse(response);
			increase=false;
    	}
    	if(decrease){
    		updateInstances(2)
    		response="Your app is being updated with 2 instances";
    		speakResponse(response);			
    		decrease=false;
    	}

    	console.log("yes");
		foundIntent = false;

    }

    } else if (foundIntent && containsNo) {

    	response="Ok then. As you want.";
		speakResponse(response);			
    	console.log("no");
		foundIntent = false;

    }
	else {
		console.log("Waiting to hear anything");
});


speakResponse = function(watsonResponse) {
	tj.speak(watsonResponse);
}


function updateInstances(number){

	var options = {
	  "host": "tjbotdes.mybluemix.net",
	  "path": "/rest/updateApp/?app_guid=bbbe8b57-063e-4521-bc44-4fb27a6ffa6e",
	  "method": "PUT",
	  "headers": { 
	    "Authorization" : "bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4ZjFlMjUzYy0zZGViLTQ0ZWItYWRkYS1hOWRmYjA5YzBlYjEiLCJzdWIiOiI5MzM0NjhiNy02NjIwLTQyNjAtYTljNC0yYzAzOGY4OWYyYTMiLCJzY29wZSI6WyJjbG91ZF9jb250cm9sbGVyLnJlYWQiLCJwYXNzd29yZC53cml0ZSIsImNsb3VkX2NvbnRyb2xsZXIud3JpdGUiLCJvcGVuaWQiLCJ1YWEudXNlciJdLCJjbGllbnRfaWQiOiJjZiIsImNpZCI6ImNmIiwiYXpwIjoiY2YiLCJncmFudF90eXBlIjoicGFzc3dvcmQiLCJ1c2VyX2lkIjoiOTMzNDY4YjctNjYyMC00MjYwLWE5YzQtMmMwMzhmODlmMmEzIiwib3JpZ2luIjoidWFhIiwidXNlcl9uYW1lIjoiSlBlbmFfVXJAZXMuaWJtLmNvbSIsImVtYWlsIjoiSlBlbmFfVXJAZXMuaWJtLmNvbSIsInJldl9zaWciOiI5MGZjMzIyMSIsImlhdCI6MTQ5NDMzNDUwNCwiZXhwIjoxNDk1NTQ0MTA0LCJpc3MiOiJodHRwczovL3VhYS5uZy5ibHVlbWl4Lm5ldC9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJjbG91ZF9jb250cm9sbGVyIiwicGFzc3dvcmQiLCJjZiIsInVhYSIsIm9wZW5pZCJdfQ.irIHWSFeXmFb9h9yb2rPcg4KTfvTL6gwVtqQqHeIyjEa",
	    "Content-Type" : "application/json",
	  }
	}

	callback = function(response) {
	  var str = ''
	  response.on('data', function(chunk){
	    str += chunk
	  })

	  response.on('end', function(){
	    console.log(str)
	  })
	}

	var body = JSON.stringify({
	  instances: number
	});

	https.request(options, callback).end(body);

}