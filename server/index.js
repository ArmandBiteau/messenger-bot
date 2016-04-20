
/*-------------------------------------------------------------------------------*/
// MODULES
/*-------------------------------------------------------------------------------*/

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import request from 'request';
import db from './db';

import TextMessage from './models/messages/text';
import ImageMessage from './models/messages/image';
import GenericMessage from './models/messages/generic';
import ButtonMessage from './models/messages/button';
import ReceiptMessage from './models/messages/receipt';

/*-------------------------------------------------------------------------------*/
// MESSAGE MANAGER AND WIT API
/*-------------------------------------------------------------------------------*/

import Parser from './lib/message-parser';
var MessageParser = new Parser();

import Api from './api';
var Wit = new Api();


/*-------------------------------------------------------------------------------*/
// ROUTES
/*-------------------------------------------------------------------------------*/

var app = express();
app.server = http.createServer(app);

app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : '100kb'
}));

app.get('/', function(req, res) {
	res.send('Messenger-bot');
});

// Facebook verification only
app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');
});


/*-------------------------------------------------------------------------------*/
// MAGIC HAPPENS HERE
/*-------------------------------------------------------------------------------*/

app.post('/webhook/', function(req, res) {

	console.log('----- POST -----');

	// for (var i = 0; i < req.body.entry[0].messaging.length; i++) {
	//
    //     var event = req.body.entry[0].messaging[i];
	// 	var sender = event.sender.id;
	// 	var postback = event.postback;
	//
	// 	var message;
	//
    //     if (event.message && event.message.text) {
	//
    //         message = event.message.text.toLowerCase();
	//
    //     }
	//
	// 	if (postback) {
	//
    //         message = event.postback.payload.toLowerCase();
	//
    //     }
	//
	// 	// analyse messages with Wit.ai
	// 	Wit.analyse(sender, message, postback).then((data) => {
	//
	// 		// Answer regarding to the analyse
	// 		MessageParser.dispatch(data);
	//
	// 	});
	//
    // }


	for (var i = 0; i < req.body.entry[0].messaging.length; i++) {

		var data = {};

        var event = req.body.entry[0].messaging[i];


		data.sender = event.sender.id;
		data.postback = event.postback;


        if (event.message && event.message.text) {

			data.content = event.message.text.toLowerCase();

        }

		if (event.postback) {

			data.content = event.postback.payload.toLowerCase();

        }

		MessageParser.dispatch(data);

    }

    res.sendStatus(200);

});


// connect to db
db( l => {

	app.server.listen(process.env.PORT || 8080);

	console.log(`Started on port ${app.server.address().port}`);

});

export default app;
