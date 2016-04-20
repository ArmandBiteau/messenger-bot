
import { WIT_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse(req) {

        return new Promise((resolve, reject) => {

            var data = {
                sender: '',
                content: '',
                postback: false
            };

            var event = req.body.entry[0].messaging[0];

            // get sender id
            data.sender = event.sender.id;

            if (event.message && event.message.text) {

                data.content = event.message.text.toLowerCase();

            }

    		if (event.postback) {

                data.content = event.postback.payload.toLowerCase();
                data.postback = true;

            }

            console.log('Analyse done !');

            resolve(data);

        });

    }

}

export default Wit;
