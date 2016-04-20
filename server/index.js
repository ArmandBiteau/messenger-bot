
/*-------------------------------------------------------------------------------*/
/* MODULES
/*-------------------------------------------------------------------------------*/

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import request from 'request';
import db from './db';


/*-------------------------------------------------------------------------------*/
/* MESSAGE MANAGER AND WIT API
/*-------------------------------------------------------------------------------*/

import Parser from './lib/message-parser';
var MessageParser = new Parser();

import Api from './api';
var Wit = new Api();

/*-------------------------------------------------------------------------------*/
/* APPLICATION
/*-------------------------------------------------------------------------------*/

var app = express();
app.server = http.createServer(app);

app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : '100kb'
}));

app.get('/', function (req, res) {
	res.send('Messenger-bot');
});

// Facebook verification only
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');
});

app.post('/webhook/', function (req, res) {

	Wit.analyse().then( () => {
		console.log('then Wit worked too !');
	});

    MessageParser.dispatch(req, res);

});


// connect to db
db( l => {

	app.server.listen(process.env.PORT || 8080);

	console.log(`Started on port ${app.server.address().port}`);

});

export default app;
