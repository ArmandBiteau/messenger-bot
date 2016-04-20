
/*-------------------------------------------------------------------------------*/
// MODULES
/*-------------------------------------------------------------------------------*/

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import request from 'request';
import db from './db';


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

	res.sendStatus(200);

	// analyse messages with Wit.ai
	Wit.analyse(req).then((data) => {

		// Answer regarding to the analyse
		MessageParser.dispatch(data);


	});

});


// connect to db
db( l => {

	app.server.listen(process.env.PORT || 8080);

	console.log(`Started on port ${app.server.address().port}`);

});

export default app;
