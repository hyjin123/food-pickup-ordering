const express = require('express');
const router  = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
// require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


module.exports = (db) => {

  router.post("/", (req, res) => {
    const order = req.body.items;
    let textMessage = "A customer has placed an order for ";
    for (const item of order) {
      textMessage += `${item.quantity} ${item.name}! `
    }
    console.log(textMessage);

    client.messages
    .create({
       body: textMessage,
       from: '+16137042914',
       to: '+14372180544'
     })
     .then(message => console.log(message.sid));

    });

    router.post('/sms', (req, res) => {
      const twiml = new MessagingResponse();

      twiml.message('Thank you for the estimated time!');

      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });

  return router;
}

// twilio phone-numbers:update "+16137042914" --sms-url="http://localhost:1337/sms"
// twilio phone-numbers:update "+16137042914" --sms-url="http://localhost:8080/api/twilio/sms"
// https://04d5-135-12-178-128.ngrok.io/api/twilio/sms
