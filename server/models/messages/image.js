import Message from './index.js';

class ImageMessage extends Message {

    constructor(sender, text) {

        super(sender);

        this.url = text.toLowerCase().replace('image', '').replace(/\s/g, '');

        this.data = {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "http://loremflickr.com/320/240/"+this.url
                }
            }
        };

    }

}

export default ImageMessage;
