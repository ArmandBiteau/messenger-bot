
import TextMessage from '../models/messages/text';
import ImageMessage from '../models/messages/image';
import GenericMessage from '../models/messages/generic';
import ButtonMessage from '../models/messages/button';
import ReceiptMessage from '../models/messages/receipt';

class MessageParser {

    constructor() {

    }

    dispatch(data) {

        // data = {
        //     sender,
        //     content,
        //     postback
        // }

		if (data.postback) {

            this.sendPostback(data.sender, data.content);

        } else {

            this.sendMessage(data.sender, data.content);

        }

    }

    sendMessage(sender, text) {

        var message;

		switch(true) {
		    case text.includes('generic'):
		        message = new GenericMessage(sender, text);
		        break;
		    case text.includes('image'):
		        message = new ImageMessage(sender, text);
		        break;
			case text.includes('button'):
		        message = new ButtonMessage(sender, text);
		        break;
			case text.includes('receipt'):
				message = new ReceiptMessage(sender, text);
				break;

		    default:
		        message = new TextMessage(sender, "Echo " + text);
				break;
		}

		message.send();

    }

    sendPostback(sender, text) {

        if (text === "buy present") {

            let recMessage = new ReceiptMessage(sender, "Dog food");
            let thanksMessage = new TextMessage(sender, "Thanks man !");

            recMessage.send();
            thanksMessage.send();

        } else {

            let newMessage = new ImageMessage(sender, text);
            newMessage.send();

        }

    }

}

export default MessageParser;
