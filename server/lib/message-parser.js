
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
		    case data.request.includes('generic'):
		        message = new GenericMessage(data.sender, data.request);
		        break;
		    case data.request.includes('image'):
		        message = new ImageMessage(data.sender, data.request);
		        break;
			case data.request.includes('button'):
		        message = new ButtonMessage(data.sender, data.request);
		        break;
			case data.request.includes('receipt'):
				message = new ReceiptMessage(data.sender, data.request);
				break;

		    default:
		        message = new TextMessage(data.sender, "Echo " + data.request);
				break;
		}

		message.send();

    }

    postback(data) {

        if (data.request === "buy present") {

            let recMessage = new ReceiptMessage(data.sender, "Dog food");
            let thanksMessage = new TextMessage(data.sender, "Thanks man !");

            recMessage.send();
            thanksMessage.send();

        } else {

            let newMessage = new ImageMessage(data.sender, data.request);
            newMessage.send();

        }

    }

}

export default MessageParser;
