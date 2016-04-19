import Message from './index.js';

class GenericMessage extends Message {

    constructor(sender, text) {

        super(sender);

        this.data = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": text.toUpperCase(),
                        "subtitle": text.toLowerCase(),
                        "image_url": "http://loremflickr.com/320/240/dog",
                        "buttons": [{
                            "type": "web_url",
                            "url": "https://www.messenger.com",
                            "title": "web url"
                        }, {
                            "type": "postback",
                            "title": "Postback",
                            "payload": "Payload for first element in a generic bubble",
                        }],
                    }]
                }
            }
        };

    }

}

export default GenericMessage;
