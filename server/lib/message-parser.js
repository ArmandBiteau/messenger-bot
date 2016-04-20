
import TextMessage from '../models/messages/text';
import ImageMessage from '../models/messages/image';
import GenericMessage from '../models/messages/generic';
import ButtonMessage from '../models/messages/button';
import ReceiptMessage from '../models/messages/receipt';

class MessageParser {

    constructor() {

    }

    dispatch(req, res) {

        for (var i = 0; i < req.body.entry[0].messaging.length; i++) {

            var event = req.body.entry[0].messaging[i];
    		var sender = event.sender.id;

            if (event.message && event.message.text) {

                var text = event.message.text.toLowerCase();
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

    		if (event.postback) {

                let text = event.postback.payload;

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

        res.sendStatus(200);

    }

}

export default MessageParser;
