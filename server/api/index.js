
import { WIT_TOKEN, WIT_SERV_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse(data) {

        var _this = this;

        return new Promise.all([_this.getDatas, _this.process]);

    }

    getDatas(data) {

        return new Promise((resolve, reject) => {

            console.log('get datas');

            resolve(data);

        });

    }

    process(data) {

        return new Promise((resolve, reject) => {

            console.log('parse data');

            resolve(data);

        });

    }

}

export default Wit;
