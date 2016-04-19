import Message from './index.js';

class GenericMessage extends Message {

    constructor(sender, text) {

        super(sender);

        this.text = text.toLowerCase().replace('generic', '').replace(/\s/g, '');
        this.url = "http://lmgtfy.com/?q=" + this.text;

        this.data = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Generic "+this.text,
                        "subtitle": this.text,
                        "image_url": "http://loremflickr.com/320/240/"+this.text,
                        "buttons": [{
                            "type": "web_url",
                            "url": this.url,
                            "title": "Web link"
                        }, {
                            "type": "postback",
                            "title": "Send me a picture",
                            "payload": "image "+this.text,
                        }]
                    },{
                        "title": "Second generic "+this.text,
                        "subtitle": this.text,
                        "image_url": "http://loremflickr.com/320/240/"+this.text,
                        "buttons": [{
                            "type": "web_url",
                            "url": this.url,
                            "title": "Web link"
                        }, {
                            "type": "postback",
                            "title": "Send me a picture",
                            "payload": "image "+this.text,
                        }]
                    }]
                }
            }
        };

    }

}

export default GenericMessage;
