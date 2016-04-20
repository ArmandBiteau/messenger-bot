
import { WIT_TOKEN, WIT_SERV_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse(data) {

        var _this = this;

        return new Promise((resolve, reject) => {

            var answer = {
                sender: data.sender,
                request: data.request,
                type: ''
            };

            _this.process(data);

            console.log('Analyse done !');

            resolve(answer);

        });

    }

    process(data) {

        request({

            url: 'https://api.wit.ai/message',
            qs: {
                q: data.request,
                access_token: WIT_TOKEN
            },
            method: 'GET'
        }, function(error, response, body) {

            if (error) {
                console.log('Error sending messages: ', error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }

        }).on('response', function(response) {

            console.log(response);

        });

    }

}

export default Wit;
