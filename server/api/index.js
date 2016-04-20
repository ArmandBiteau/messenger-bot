
import { WIT_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse(sender, message, postback) {

        return new Promise((resolve, reject) => {

            var data = {
                sender: sender,
                content: '',
                postback: postback
            };

            if (message) {

                data.content = message;

            }

            console.log('Analyse done !');

            console.log(data);

            resolve(data);

        });

    }

}

export default Wit;
