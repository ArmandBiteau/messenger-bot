
import { WIT_TOKEN } from '../lib/config';

class Wit {

    constructor() {

    }

    analyse(req) {

        return new Promise((resolve, reject) => {

            var data = {
                sender: req.body.entry[0].messaging[0].sender.id,
                content: 'test',
                postback: false
            };

            // for (var i = 0; i < req.body.entry[0].messaging.length; i++) {
            //
            //     var event = req.body.entry[0].messaging[i];
            //
            //     // get sender id
            //     data.sender = event.sender.id;
            //
            //     if (event.message && event.message.text) {
            //
            //         data.content = event.message.text.toLowerCase();
            //
            //     }
            //
        	// 	if (event.postback) {
            //
            //         data.content = event.postback.payload.toLowerCase();
            //         data.postback = true;
            //
            //     }
            //
            //     console.log('Analyse done !');
            //
            //     resolve(data);
            //
            // }

            console.log(data);

            resolve(data);

        });

    }

}

export default Wit;
