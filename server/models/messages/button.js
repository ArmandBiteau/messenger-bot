import Message from './index.js';

class ButtonMessage extends Message {

    constructor(sender, text) {

        super(sender);

        this.dog = text.toLowerCase().replace('button', '').replace(/\s/g, '');
        this.url = "http://lmgtfy.com/?q=" + this.dog;

        this.data = {
            "attachment": {
                "type": "template",
                "text": this.dog,
                "payload": {
                    "template_type": "button",
                    "buttons": [{
                        "type": "web_url",
                        "url": this.url,
                        "title": "Let me google that for you"
                    }, {
                        "type": "postback",
                        "title": "Image postback",
                        "payload": "image cat",
                    }]
                }
            }
        };

    }

}

export default ButtonMessage;
