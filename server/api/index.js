
import { WIT_TOKEN, WIT_SERV_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse(data) {

        return new Promise((resolve, reject) => {

            var answer = {
                sender: data.sender,
                request: data.request,
                type: ''
            };

            this.process(data);

            console.log('Analyse done !');

            resolve(answer);

        });

    }

    process(req) {

        console.log('processing..');

        var options = {
            url: 'https://api.wit.ai/message?q='+req.request,
            headers: {
                Authorization: 'Bearer ' + WIT_SERV_TOKEN
            }
        };

        request(options).on('response', function(response) {

            console.log(response);

        }).on('error', function(err) {

            console.log(err);

        });

    }

}

export default Wit;
