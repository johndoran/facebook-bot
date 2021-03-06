var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.get('/', function (req, res) {
    res.send('FB Bot!');
});

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/webhook/', function (req, res) {
    console.log(req.query)
    if (req.query['hub.verify_token'] === 'FB_MESSENGER_ECHO_TOKEN') {
        return res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
})

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
        console.log("Sender: " + sender)
        console.log("Event: " + event)
        if (event.message && event.message.text) {
            text = event.message.text;
            console.log("Text: " + text)
            if (text === 'Generic') {
                sendGenericMessage(sender);
                continue;
            }
            if (event.postback) {
                text = JSON.stringify(event.postback);
                sendTextMessage(sender, "Postback received: " + text.substring(0, 200), token);
                continue;
            }
            if (text === 'Paddy') {
                sendTextMessage(sender, "Yeah he really is a dick");
                continue;
            }
            if (text === 'Image') {
                sendImage(sender)
                continue;
            }
            if (text === 'Button') {
                sendButton(sender)
                continue;
            }

            if (text === 'Receipt') {
                sendRec(sender)
                continue;
            }
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200));
        }
    }
    res.sendStatus(200);
});


var token = "CAAMflYosOuoBAJ6sI3BZCG0R2ZCWmFA1hYcJvhuzYrkueiVX5VZAJe0WQQVOOZAtZC2LHj0xB9kLP4F5ZCF4eHmeMdQgyZB0l8lvIggc3A7qTlRktGpFUDztH0zEtdZCLuBIFBS3ZBebyE1qPjoi0byzaNrlZABicvBWvqWsOzTZA6v2OYkVQFPUblryzsQb5eZC5i7MttiaMYMLeAZDZD";

function sendTextMessage(sender, text) {
    messageData = {
        text: text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

function sendGenericMessage(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Haircut and beard trim",
                        "image_url": "http://i0.wp.com/therighthairstyles.com/wp-content/uploads/2014/12/17-tapered-haircut-and-neat-side.jpg?w=500",
                        "subtitle": "Hair cut and beard trim",
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://petersapparel.parseapp.com/view_item?item_id=100",
                                "title": "View Item"
                            },
                            {
                                "type": "web_url",
                                "url": "https://petersapparel.parseapp.com/buy_item?item_id=100",
                                "title": "Buy Item"
                            },
                            {
                                "type": "postback",
                                "title": "Bookmark Item",
                                "payload": "USER_DEFINED_PAYLOAD_FOR_ITEM100"
                            }
                        ]
                    },
                    {
                        "title": "Shave",
                        "image_url": "http://hauteliving.com/wp-content/uploads/2010/10/Qua-mens-shave.jpg",
                        "subtitle": "Hot towel shave",
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://petersapparel.parseapp.com/view_item?item_id=101",
                                "title": "View Item"
                            },
                            {
                                "type": "web_url",
                                "url": "https://petersapparel.parseapp.com/buy_item?item_id=101",
                                "title": "Buy Item"
                            },
                            {
                                "type": "postback",
                                "title": "Bookmark Item",
                                "payload": "USER_DEFINED_PAYLOAD_FOR_ITEM101"
                            }
                        ]
                    }
                ]
            }
        }
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

function sendImage(sender) {
    messageData = {
        "attachment":{
            "type":"image",
            "payload":{
                "url":"http://az616578.vo.msecnd.net/files/2016/02/28/6359221946775014221897708441_beauty-products-mg-main.jpg"
            }
        }
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

function sendRec(sender) {
    messageData = {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"receipt",
                "recipient_name":"John Doran",
                "order_number":"12323245678902",
                "currency":"USD",
                "payment_method":"Visa 2345",
                "order_url":"http://petersapparel.parseapp.com/order?order_id=123456",
                "timestamp":"1428444852",
                "elements":[
                    {
                        "title":"Mens haircut",
                        "subtitle":"Beard and hair trim",
                        "quantity":1,
                        "price":50,
                        "currency":"USD",
                        "image_url":"http://i0.wp.com/therighthairstyles.com/wp-content/uploads/2014/12/17-tapered-haircut-and-neat-side.jpg?w=500"
                    }
                ],
                "address":{
                    "street_1":"1 Hacker Way",
                    "street_2":"",
                    "city":"Menlo Park",
                    "postal_code":"94025",
                    "state":"CA",
                    "country":"US"
                },
                "summary":{
                    "subtotal":75.00,
                    "shipping_cost":4.95,
                    "total_tax":6.19,
                    "total_cost":56.14
                },
                "adjustments":[
                    {
                        "name":"New Customer Discount",
                        "amount":20
                    },
                    {
                        "name":"$10 Off Coupon",
                        "amount":10
                    }
                ]
            }
        }
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

function sendButton(sender) {
    messageData = {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"What do you want to do next?",
                "buttons":[
                    {
                        "type":"web_url",
                        "url":"https://petersapparel.parseapp.com",
                        "title":"Show Website"
                    },
                    {
                        "type":"postback",
                        "title":"Start Chatting",
                        "payload": "USER_DEFINED_PAYLOAD"
                    }
                ]
            }}};
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}
module.exports = app;
