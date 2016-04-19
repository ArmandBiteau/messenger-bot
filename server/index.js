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
import GenericMessage from './models/messages/generic';
import ButtonMessage from './models/messages/button';
import ReceiptMessage from './models/messages/receipt';

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

    for (var i = 0; i < req.body.entry[0].messaging.length; i++) {

        var event = req.body.entry[0].messaging[i];
		var sender = event.sender.id;

        if (event.message && event.message.text) {

            var text = event.message.text.toLowerCase();
			var message;

			switch(true) {
			    case text.includes('generic'):
			        message = new GenericMessage(sender, text);
			        break;
			    case text.includes('image'):
			        message = new ImageMessage(sender, text);
			        break;
				case text.includes('button'):
			        message = new ButtonMessage(sender, text);
			        break;
				case text.includes('receipt'):
					message = new receiptMessage(sender, text);
					break;

			    default:
			        message = new TextMessage(sender, "Echo " + text);
					break;
			}

			message.send();

        }

		if (event.postback) {

            let text = event.postback.payload;

			let newMessage = new ImageMessage(sender, text);

			newMessage.send();

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
