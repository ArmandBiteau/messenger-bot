// curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=EAAH5YDy9ozYBALgpeRXcGExCGZCYHnLG9gBdOlpBNCxqpl2jn8pkiCZAkm1qsB1jZA6AHkfywx7u4LLqddigfbCcf5hBHrf6lq6VEIiXL8mV1ka1nPxRsbAPHfXLBZCZCFpPSIdDc4xHFKZAf3FaIrhlqNRr1MPyOg5Jma309fRwZDZD"

var PAGE_TOKEN = 'EAAH5YDy9ozYBALgpeRXcGExCGZCYHnLG9gBdOlpBNCxqpl2jn8pkiCZAkm1qsB1jZA6AHkfywx7u4LLqddigfbCcf5hBHrf6lq6VEIiXL8mV1ka1nPxRsbAPHfXLBZCZCFpPSIdDc4xHFKZAf3FaIrhlqNRr1MPyOg5Jma309fRwZDZD';

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




function sendTextMessage(sender, text) {
    messageData = {
        text:text
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: PAGE_TOKEN},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}


// index
app.get('/', function (req, res) {

	res.send('hello world i am a secret bot');

});

// for Facebook verification
app.get('/webhook/', function (req, res) {

	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {

        res.send(req.query['hub.challenge']);

    } else {

		messaging_events = req.body.entry[0].messaging;

		for (i = 0; i < messaging_events.length; i++) {

			let event = req.body.entry[0].messaging[i];

			sender = event.sender.id;

	        if (event.message && event.message.text) {

	            text = event.message.text;
	            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200));

	        }

	    }

	    res.sendStatus(200);

	}

    res.send('Error, wrong token');

});


// connect to db
db( l => {

	app.server.listen(process.env.PORT || 8080);

	console.log(`Started on port ${app.server.address().port}`);

});

export default app;
