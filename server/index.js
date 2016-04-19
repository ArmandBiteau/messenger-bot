// curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=EAAH5YDy9ozYBALgpeRXcGExCGZCYHnLG9gBdOlpBNCxqpl2jn8pkiCZAkm1qsB1jZA6AHkfywx7u4LLqddigfbCcf5hBHrf6lq6VEIiXL8mV1ka1nPxRsbAPHfXLBZCZCFpPSIdDc4xHFKZAf3FaIrhlqNRr1MPyOg5Jma309fRwZDZD"

import { PAGE_TOKEN } from './lib/config';

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import request from 'request';
import db from './db';

import TextMessage from './models/messages/text';
import ImageMessage from './models/messages/image';

var app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : '100kb'
}));


function sendGenericMessage(sender) {

	var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:PAGE_TOKEN},
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
	res.send('Messenger-bot');
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');
});

app.post('/webhook/', function (req, res) {

    for (var i = 0; i < req.body.entry[0].messaging.length; i++) {

        var event = req.body.entry[0].messaging[i];

        if (event.message && event.message.text) {

			var sender = event.sender.id;
            var text = event.message.text;
			var message;

            if (text === 'Generic') {

                sendGenericMessage(sender);

            } else if (text.includes('image')) {

				message = new ImageMessage(sender, text);

			} else {

				message = new TextMessage(sender, "Echo " + text);

			}

			message.send();

        }

    }

    res.sendStatus(200);

});


// connect to db
db( l => {

	app.server.listen(process.env.PORT || 8080);

	console.log(`Started on port ${app.server.address().port}`);

});

export default app;
