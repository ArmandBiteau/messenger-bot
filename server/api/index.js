
import request from 'request';

import { WIT_TOKEN, WIT_SERV_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse(data) {

        var _this = this;

        return  _this.getDatas(data)
                .then(_this.process);

    }

    getDatas(data) {

        return new Promise((resolve, reject) => {

            request({
                url: 'https://api.wit.ai/message',
                qs: {
                    q: data.request
                },
                method: 'GET',
                json: true,
                headers: {
                    'Authorization': 'Bearer ' + WIT_SERV_TOKEN
                }

            }, function(error, response, body) {

                if (response.body.error) {
                    console.log('Error: ', response.body.error);
                }

                data.wit = body;

                resolve(data);

            });

        });

    }

    process(newdata) {

        return new Promise((resolve, reject) => {

            console.log( JSON.stringify(newdata.wit.outcomes) );

            if (newdata.wit.outcomes[0].intent !== "UNKNOWN" && newdata.wit.outcomes[0].confidence >= 0.5) {

                newdata.intent = newdata.wit.outcomes[0].entities.intent[0].value;

                if (newdata.wit.outcomes[0].entities.location) {

                    newdata.location = newdata.wit.outcomes[0].entities.location[0].value;

                }

            }

            resolve(newdata);

        });

    }

}

export default Wit;
