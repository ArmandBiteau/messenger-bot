
import request from 'request';

import { WIT_TOKEN, WIT_SERV_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse(data) {

        var _this = this;

        return  _this.getDatas(data)
                .then(_this.process(data));

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

                console.log('GET DATAS : ', data);

                resolve(data);

            });

        });

    }

    process(data) {

        return new Promise((resolve, reject) => {

            console.log('PROCESS DATAS : ', data);

            resolve(data);

        });

    }

}

export default Wit;
