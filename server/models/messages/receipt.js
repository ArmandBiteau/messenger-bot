import Message from './index.js';

class ReceiptMessage extends Message {

    constructor(sender, text) {

        super(sender);

        this.text = text.toLowerCase().replace('receipt', '').replace(/\s/g, '');
        this.url = "http://lmgtfy.com/?q=" + this.text;

        this.data = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "receipt",
                    "recipient_name": "Receipt "+this.text,
                    "order_number": "1234",
                    "currency": "GBP",
                    "payment_method": "Bank account - Visa 1234",
                    "timestamp": "1461032760",
                    "order_url": "https://www.amazon.co.uk/Dogs-Food-Toys-Health/b?ie=UTF8&node=451110031",
                    "elements": [{
                        "title": "First receipt",
                        "subtitle": this.text,
                        "quantity": 2,
                        "price": 110,
                        "currency": "GBP",
                        "image_url": "https://images-eu.ssl-images-amazon.com/images/G/02//uk-pets/2016/homepage/desktop/41828_pets_lifelong_sns2_993x510._V275802687_.jpg"
                    }],
                    "address": {
                        "street_1": "22 Dog Street",
                        "street_2": "",
                        "city": "London",
                        "postal_code": "NW1",
                        "state": "UK",
                        "country": "UK"
                    },
                    "summary": {
                        "subtotal": 220,
                        "shipping_cost": 220,
                        "total_tax": 0.20,
                        "total_cost": 220*1.20
                    }
                }
            }
        };

    }

}

export default ReceiptMessage;
