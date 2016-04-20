
import request from 'request';

import { WIT_TOKEN, WIT_SERV_TOKEN } from '../lib/config';

class Wit {

    constructor() {

        this.req = request.defaults({
            baseUrl: process.env.WIT_URL || 'https://api.wit.ai',
            strictSSL: false,
            json: true,
            headers: {
                'Authorization': 'Bearer ' + WIT_TOKEN
            }
        });

    }

    analyse(data) {

        var _this = this;

        console.log('analysing datas..');

        return  _this.getDatas(data)
                .then(_this.process(data));

    }

    getDatas(data) {

        console.log('get datas');

        return new Promise((resolve, reject) => {

            var options = {
                uri: '/message',
                method: 'GET',
                qs: { q: message }
            };

            this.req(options, makeWitResponseHandler('message', function() {

                resolve(data);

            }));

        });

    }

    process(data) {

        console.log(data);

        return new Promise((resolve, reject) => {

            console.log('parse data');

            data.request += ' after process';

            resolve(data);

        });

    }

}

export default Wit;
