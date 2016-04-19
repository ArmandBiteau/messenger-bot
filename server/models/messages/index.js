import { PAGE_TOKEN } from '../lib/config';

import request from 'request';

class Message {

    constructor(sender, text) {

        this.sender = sender;

        this.data = {
            text:text
        };

    }

    send() {

        request({

            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {access_token: PAGE_TOKEN},
            method: 'POST',
            json: {
                recipient: {id: this.sender},
                message: this.data,
            }

        }, function(error, response, body) {

            if (error) {
                console.log('Error sending messages: ', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }

        });

    }

}

export default Message;
