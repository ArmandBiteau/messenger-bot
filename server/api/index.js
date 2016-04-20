
import request from 'request';

import { WIT_TOKEN, WIT_SERV_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse(data) {

        var _this = this;

        console.log('analysing datas..');

        return  _this.getDatas(data)
                .then(_this.process(data));

    }

    getDatas(data) {

        console.log('get datas : ' + data.request);

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

            }).on('success', function(response) {

                console.log(response);

                resolve(data);

            });

        });

    }

    process(data) {

        return new Promise((resolve, reject) => {

            console.log('parse data');

            data.request += ' after process';

            resolve(data);

        });

    }

}

export default Wit;
