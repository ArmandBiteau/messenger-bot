
import { WIT_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse() {

        return new Promise((resolve, reject) => {

            console.log('Wit analyse works !');

            resolve();

        });

    }

}

export default Wit;
