var express = require('express');
var request = require('request');

var app = express();

app.get('/api/bluemix/createservice', function (req, res) {
	console.log('He entrado')
	var params = {
	  "space_guid": "2087c0ac-9d29-4f13-9df1-ce962ed24a66",
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
	  "instances": 2
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

app.get('/api/bluemix/start', function (req, res) {
	console.log('He entrado')
	var params = {
	  "state": "STARTED"
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

app.get('/api/bluemix/stop', function (req, res) {
	console.log('He entrado')
	var params = {
	  "state": "STOPPED"
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
		qs: { q: 'name: AppFromTJBot' },
		url:'https://tjbotdes.mybluemix.net/rest/listApps', 
		json: true
	}, function(err, httpResponse, body){
		if(err){
			console.log(err);
		}
		console.log(body);
	});
});


app.get('/api/bluemix/createapp', function (req, res) {
	console.log('He entrado')
	var params = {
	   "name": "AppFromTJBot",
	   "space_guid": "2087c0ac-9d29-4f13-9df1-ce962ed24a66",
	   "memory": 512,
	   "buildpack": "liberty-for-java"
	};
	
	request.post({
		headers: {'content-type' : 'application/json'},
		url:'https://tjbotdes.mybluemix.net/rest/createApp', 
		body: params,
		json: true
	}, function(err, httpResponse, body){
		if(err){
			console.log(err);
		}
		console.log(body);
		
	});
});

module.exports = app;