import Message from './index.js';

class ButtonMessage extends Message {

    constructor(sender, text) {

        super(sender);

        this.url = "http://lmgtfy.com/?q=" + text.toLowerCase().replace('button', '').replace(/\s/g, '');

        this.data = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "buttons": [{
                        "type": "web_url",
                        "url": this.url,
                        "title": "Let me google that for you"
                    }, {
                        "type": "postback",
                        "title": "Image postback",
                        "payload": "cat",
                    }]
                }
            }
        };

    }

}

export default ButtonMessage;
