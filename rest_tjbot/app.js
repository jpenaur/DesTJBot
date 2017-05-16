var express = require('express');
var request = require('request');

var app = express();

app.get('/api/bluemix/createservice', function (req, res) {
	console.log('He entrado')
	var params = {
	  "space_guid": "9e0cbe59-b1f1-4068-93ff-e6f72d776475",
	  "name": "speech_to_text_node",
	  "service_plan_guid": "6e98738d-b550-4987-b435-a3602d62c476"
	};
	
	request.post({
		headers: {'content-type' : 'application/json'},
		url:'https://tjbotdes.mybluemix.net/rest/createService', 
		body: params,
		json: true
	}, function(err, httpResponse, body){
		if(err){
			console.log(err);
		}
		console.log(body);
	});
});

app.get('/api/bluemix/instances', function (req, res) {
	console.log('He entrado')
	var params = {
	  "instances": 3,
	};
	
	request.put({
		headers: {'content-type' : 'application/json'},
		qs: { app_guid: '6c97cf74-22ba-4960-bd48-4d684bb124fb' },
		url:'https://tjbotdes.mybluemix.net/rest/updateApp', 
		body: params,
		json: true
	}, function(err, httpResponse, body){
		if(err){
			console.log(err);
		}
		console.log(body);
	});
});

app.get('/api/bluemix/getapp', function (req, res) {
	console.log('He entrado')
	request.get({
		qs: { q: 'name:demotjbot' },
		url:'https://tjbotdes.mybluemix.net/rest/updateApp', 
		json: true
	}, function(err, httpResponse, body){
		if(err){
			console.log(err);
		}
		console.log(body);
	});
});





module.exports = app;