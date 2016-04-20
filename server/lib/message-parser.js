
import TextMessage from '../models/messages/text';
import ImageMessage from '../models/messages/image';
import GenericMessage from '../models/messages/generic';
import ButtonMessage from '../models/messages/button';
import ReceiptMessage from '../models/messages/receipt';
import WelcomeMessage from '../models/messages/welcome';

class MessageParser {

    constructor() {

    }

    dispatch(data) {

        var message;

        if (data.intent) {

            switch(data.intent) {
    		    case 'hello':
    		        message = new WelcomeMessage(data.sender, "Hi ! I'm doug the dog bot !");
    		        break;
                case 'weather':
    		        message = new TextMessage(data.sender, "Look through the window !");
    		        break;

    		    default:
    		        message = new TextMessage(data.sender, "Give me more details..");
    				break;
    		}

        } else {

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
    		        message = new TextMessage(data.sender, "Be specific about " + data.request);
    				break;
    		}

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
