import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import db from './db';

var app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : '100kb'
}));


// index
app.get('/', function (req, res) {

	res.send('hello world i am a secret bot');

});

// for Facebook verification
app.get('/webhook/', function (req, res) {

	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {

        res.send(req.query['hub.challenge']);

    }

    res.send('Error, wrong token');

});


// connect to db
db( l => {

	app.server.listen(process.env.PORT || 8080);

	console.log(`Started on port ${app.server.address().port}`);

});

export default app;
