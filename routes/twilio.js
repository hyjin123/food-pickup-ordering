const express = require('express');
const router  = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { urlencoded } = require('body-parser');
router.use(urlencoded({ extended: false }));

// require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


module.exports = (db) => {

  // POST Route for when the customer clicks on the "Order Now" button
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

    // POST Route for when the restaurant owner specifies how long the order will take
    router.post("/prep-time-alert", (req, res) => {
      const phoneNumber = req.body.customerPhone;
      const prepTime = req.body.minutes;
      const textMessage = `Thank you for your order! you can pick up your food in ${prepTime} minutes!`;

      client.messages
      .create({
        body: textMessage,
        from: '+16137042914',
        to: phoneNumber
      })
      .then(message => {
        //send the prep time data back so that we can use it to update the EJS
        res.send(prepTime);
      });

    });

    // POST Route for when the restaurant owner clicks on the Finished button and customer gets the final text
    router.post("/pick-up-alert", (req, res) => {

    const textMessage = `Food is ready!!`;

    client.messages
    .create({
       body: textMessage,
       from: '+16137042914',
       to: '+14372180544'
     })
     .then(message => {
        console.log(message);
      });

    });


    // router.post('/sms', (req, res) => {
    //   const twiml = new MessagingResponse();
    //   // access the message body and the number it was sent from
    //   console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);
    //   const estimatedTimeMessage = req.body.Body;

    //   // this will send a message to the client once the owner responds with time
    //   const clientMessage = `Your order will be ready in ${estimatedTimeMessage} minutes!`;
    //   client.messages
    //   .create({
    //     body: clientMessage,
    //     from: '+16137042914',
    //     to: '+14372180544'
    //    })
    //    .then(message => console.log(message.sid));

    //   // this will reply to the owner saying thank you!
    //   const message = `
    //   Thank you! We will let the customer know that it will take ${estimatedTimeMessage} minutes for the food to get ready.
    //   `;

    //   twiml.message(message);
    //   res.writeHead(200, {'Content-Type': 'text/xml'});
    //   res.end(twiml.toString());
    // });

  return router;
}

// twilio phone-numbers:update "+16137042914" --sms-url="http://localhost:1337/sms"
// twilio phone-numbers:update "+16137042914" --sms-url="http://localhost:8080/api/twilio/sms"
// https://04d5-135-12-178-128.ngrok.io/api/twilio/sms
