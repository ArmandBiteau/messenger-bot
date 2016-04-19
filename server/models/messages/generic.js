import Message from './index.js';

class GenericMessage extends Message {

    constructor(sender, text) {

        super(sender);

        this.dog = text.toLowerCase().replace('generic', '').replace(/\s/g, '');
        this.url = "http://lmgtfy.com/?q=" + this.dog;

        this.data = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Generic "+this.dog,
                        "subtitle": this.dog,
                        "image_url": "http://loremflickr.com/320/240/"+this.dog,
                        "buttons": [{
                            "type": "web_url",
                            "url": this.url,
                            "title": "Web link"
                        }, {
                            "type": "postback",
                            "title": "Image postback",
                            "payload": "image "+this.dog,
                        }]
                    },{
                        "title": "Second generic "+this.dog,
                        "subtitle": this.dog,
                        "image_url": "http://loremflickr.com/320/240/"+this.dog,
                        "buttons": [{
                            "type": "web_url",
                            "url": this.url,
                            "title": "Web link"
                        }, {
                            "type": "postback",
                            "title": "Image postback",
                            "payload": "image "+this.dog,
                        }]
                    }]
                }
            }
        };

    }

}

export default GenericMessage;
