import Message from './index.js';

class ButtonMessage extends Message {

    constructor(sender, text) {

        super(sender);

        this.text = text.toLowerCase().replace('button', '').replace(/\s/g, '');
        this.url = "http://lmgtfy.com/?q=" + this.text;

        this.data = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": this.text,
                    "buttons": [{
                        "type": "web_url",
                        "url": this.url,
                        "title": "Let me google that for you"
                    }, {
                        "type": "postback",
                        "title": "Send me a picture",
                        "payload": "image "+this.text,
                    }]
                }
            }
        };

    }

}

export default ButtonMessage;
