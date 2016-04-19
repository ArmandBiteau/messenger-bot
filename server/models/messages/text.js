import { PAGE_TOKEN } from '../../lib/config';

import Message from 'index.js';

import request from 'request';

class TextMessage extends Message{

    constructor(sender, text) {

        super(sender);

        this.data = {
            text:text
        };

    }

}

export default TextMessage;
