
import { WIT_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse(data) {

        return new Promise((resolve, reject) => {

            // transforms

            console.log('Analyse done !');

            console.log(data.sender, data.content);

            resolve(data);

        });

    }

}

export default Wit;
