
import TextMessage from '../models/messages/text';
import ImageMessage from '../models/messages/image';
import GenericMessage from '../models/messages/generic';
import ButtonMessage from '../models/messages/button';
import ReceiptMessage from '../models/messages/receipt';

class MessageParser {

    constructor() {

    }

    dispatch(data) {

        var message;

		switch(true) {
		    case data.content.includes('generic'):
		        message = new GenericMessage(data.sender, data.content);
		        break;
		    case data.content.includes('image'):
		        message = new ImageMessage(data.sender, data.content);
		        break;
			case data.content.includes('button'):
		        message = new ButtonMessage(data.sender, data.content);
		        break;
			case data.content.includes('receipt'):
				message = new ReceiptMessage(data.sender, data.content);
				break;

		    default:
		        message = new TextMessage(data.sender, "Echo " + data.content);
				break;
		}

		message.send();

    }

    postback(data) {

        if (data.content === "buy present") {

            let recMessage = new ReceiptMessage(data.sender, "Dog food");
            let thanksMessage = new TextMessage(data.sender, "Thanks man !");

            recMessage.send();
            thanksMessage.send();

        } else {

            let newMessage = new ImageMessage(data.sender, data.content);
            newMessage.send();

        }

    }

}

export default MessageParser;
