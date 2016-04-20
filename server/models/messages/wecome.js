import Message from './index.js';

class WelcomeMessage extends Message {

    constructor(sender, text) {

        super(sender);

        this.data = {
            "attachment":{
                "type":"template",
                "payload": {
                    "template_type":"generic",
                    "elements": [{
                        "title": text,
                        "item_url":"https://www.facebook.com/Messenger-bot-1703387699878233/",
                        "image_url":"https://static.pexels.com/photos/7720/night-animal-dog-pet.jpg",
                        "subtitle":"Guess what, I am a smart dog.",
                        "buttons":[{
                            "type":"web_url",
                            "title":"View my website",
                            "url":"https://www.facebook.com/Messenger-bot-1703387699878233/"
                        },{
                            "type":"postback",
                            "title":"Give me some food",
                            "payload":"buy present"
                        }]
                    }]
                }
            }
        };

    }

}

export default WelcomeMessage;
