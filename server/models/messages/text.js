import Message from './index.js';

class TextMessage extends Message {

    constructor(sender, text) {

        super(sender);

        this.data = {
            text:text
        };

    }

}

export default TextMessage;
