//Importamos lo modulos necesarios
const config = require('./config.js');
//*****recordar agregar otro config para la region de reino unido **********
const TJBot = require('tjbot');
//añadimos request para las peticiones http
var request = require('request');

//Inicializamos las preferencias y el hardware
var hardware = ['led', 'servo', 'microphone', 'speaker'];
var configuration = {
    robot: {
        gender: 'male'
    },
    listen: {
        language: 'es-ES'
    },
    speak: {
        language: 'es-ES'
    }
};
//Le proporcionamos las credenciales del servicio
var credentials = {
    speech_to_text: {
        username: config.STTUsername,
        password: config.STTPassword
    },
    text_to_speech: {
        username: config.TTSUsername,
        password: config.TTSPassword
    },
    conversation: {
        username: config.ConUsername,
        password: config.ConPassword
    }
}
var tj = new TJBot(hardware, configuration, credentials);
var colors = ['red', 'green', 'blue', 'orange', 'off'];

//Inicializamos Speech to text y Text to Speech para empezar a dialogar con tjbot
function init() {
	
    tj.speak(" ").then(
	function(){
		return tj.speak("¡Hola Antonio! Soy el ponente de esta presentacion. Me han dicho que vas a ayudarme con esta sesion ¡QUE MAJO!")
	}	
	).then(
	function(){
		return SpeechToText(); 
	}	
	).then(
	function(){
		//tj.shine(colors['blue']);
		//return SpeechToText(); 
		}	
	);
}

//Función que devuelve en formato texto lo que le decimos a jbot
function SpeechToText() {

    tj.listen(function(text) {
        console.log("Te estoy escuchando...Dime qué necesitas");
        console.log("Has dicho: " + text);

	action(text);
    });
}

//Función que permite cambiar el LED de color
function brillaLED(color) {
    tj.shine(color);
    console.log('he encendido la luz');
}

//Función que pone el led en un color y se ilumina de manera intermitente durante un período de tiempo

function intermitente(color, duration, delay) {
    tj.pulse(color, duration, delay);
}

//Función que convierte de texto a voz

function TextToSpeech(message) {
    tj.speak(message);
}

//Función que permite levantar el brazo de tjbot
function LevantaBrazo(){
  tj.raiseArm();
}

function BajarBrazo(){
  tj.lowerArm();
}

function mueveBrazo(){
  tj.wave();
}

//Esta funcion permie realizar peticiones por HTTP

function HTTPrequestPOST(url, params, contentType){

	console.log('entro en HTTP request'+ url + " "+params + " "+contentType);

	var headers = {
	
		'Content-Type': contentType
	
	}
	
	var options ={
	
		url: url,
		method: 'POST',
		headers: headers,
		body: params,
		json: true
	
	}
	
	request.post(options, function (error, response, body){
		
		if(error){
			console.log(error);
		}
		console.log(body);
	
	});

}


function createServiceSTT(){
	var params = {
	  "space_guid": "2087c0ac-9d29-4f13-9df1-ce962ed24a66",
	  "name": "speech_to_text_tjbot",
	  "service_plan_guid": "6e98738d-b550-4987-b435-a3602d62c476"
	};
	console.log('entro en create service');
	HTTPrequestPOST('https://tjbotdes.mybluemix.net/rest/createService',params, 'application/json');
}
function createServiceTTS(){
	var params = {
	  "space_guid": "2087c0ac-9d29-4f13-9df1-ce962ed24a66",
	  "name": "text_to_speech_tjbot",
	  "service_plan_guid": "6c03d6f3-64f2-4e60-adb3-7d1c2906bde4"

	};
	console.log('entro en create service');
	HTTPrequestPOST('https://tjbotdes.mybluemix.net/rest/createService',params, 'application/json');
}
function createServiceConversation(){
	var params = {
	  "space_guid": "2087c0ac-9d29-4f13-9df1-ce962ed24a66",
	  "name": "conversation_tjbot",
	  "service_plan_guid": "805f3109-79db-4b3b-ad5a-f17273ffc4fd"
	};
	console.log('entro en create service');
	HTTPrequestPOST('https://tjbotdes.mybluemix.net/rest/createService',params, 'application/json');
}
function createServiceTwitter(){
	var params = {
	  "space_guid": "2087c0ac-9d29-4f13-9df1-ce962ed24a66",
	  "name": "twitter_insights_tjbot",
	  "service_plan_guid": "68808ea68-d8cd-4348-a9b3-a653ef1c49fa"
	};
	console.log('entro en create service');
	HTTPrequestPOST('https://tjbotdes.mybluemix.net/rest/createService',params, 'application/json');
}
function createServiceToneAnalyzer(){
	var params = {
	  "space_guid": "2087c0ac-9d29-4f13-9df1-ce962ed24a66",
	  "name": "tone_analyzer_tjbot",
	  "service_plan_guid": "8840e558-8665-4e61-aa95-143c77df633f"
	};
	console.log('entro en create service');
	HTTPrequestPOST('https://tjbotdes.mybluemix.net/rest/createService',params, 'application/json');
}



function startapplication(){
	console.log('He entrado en startapplication')
	var params = {
	  "state": "STARTED"
	};
	
	request.put({
		headers: {'content-type' : 'application/json'},
		qs: { app_guid: '894201b7-f3a5-4491-ba6a-36fcbea3c0b0' },
		url:'https://tjbotdes.mybluemix.net/rest/updateApp', 
		body: params,
		json: true
	}, function(err, httpResponse, body){
		if(err){
			console.log(err);
		}
		console.log(body);
	});
}

//Toma acciones dependiendo del mensaje enviado por el usuario
function action(message){
	var containslevantaArm = message.indexOf("levanta") >= 0;

	var containsbajaArm = message.indexOf("baja") >= 0;
	
	var containsenciende = message.indexOf("enciende") >= 0;

	var containsayudar = message.indexOf("ayudar") >= 0;
	
	var containsconcurso = message.indexOf("concurso") >= 0;
	
	var containsverte = message.indexOf("verte") >= 0;
	
	
	// incluimos todas aquellas acciones que queramos llevar a cabo
	

	if(containslevantaArm){
		console.log("entro en levanta brazo");

		LevantaBrazo();
		

	}else if (containsbajaArm){
		console.log("entro en bajar brazo");

		BajarBrazo();
		

	}else if (containsenciende){
		console.log("entro en encenderLED");

		brillaLED("magenta");
		

	}else if (containsayudar){
		console.log("entro en ayudar");
		tj.stopListening();
		createServiceSTT();
		tj.speak("No me hace falta mucha ayuda. Soy tan inteligente que puedo incluso clonarme. Vamos a Blumix, y te lo enseño. Por favor ayudante refresca la pantalla");
		createServiceSTT();
		createServiceTTS();
		createServiceConversation();
		createServiceTwitter();
		createServiceToneAnalyzer();
		


	}else if (containsconcurso){
		console.log("entro en concurso");
		tj.stopListening();
		
		tj.speak("¡Buena idea Antonio! Venga dale a refrescar para que todos vean que la competición ha empezado");
		
		
		startapplication();
		
	}
	else if (containsverte){
		console.log("entro en verte");
		tj.stopListening();
		
		tj.speak("Diles que vengan luego al stand de IBM ¡Allí estaré! ¡Gracias ayudante! Ha sido un placer trabajar contigo");
		
		tj.stopListening();


	}


}



init();
