
import { WIT_TOKEN, WIT_SERV_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse(data) {

        var _this = this;

        console.log('analyse datas');

        return _this.getDatas(data).then(_this.process(data));

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
