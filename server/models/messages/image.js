import { PAGE_TOKEN } from '../../lib/config';

import Message from './index.js';

import request from 'request';

class ImageMessage extends Message {

    constructor(sender, text) {

        super(sender);

        this.url = text.replace('image', '').replace(/\s/g, '');

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
