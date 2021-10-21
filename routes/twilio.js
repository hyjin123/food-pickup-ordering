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
    let textMessageToOwner = "A customer has placed an order for ";
    let textMessageToCustomer = "Thank you! You have placed an order for ";

    for (const item of order) {
      textMessageToOwner += `${item.quantity} ${item.name}! `
      textMessageToCustomer += `${item.quantity} ${item.name}! `
    };
    // send message to the owner when order is placed
    client.messages
    .create({
       body: textMessageToOwner,
       from: '+16137042914',
       to: '+14372180544'
     })
     .then(message => console.log(message.sid));

    // send message to the customer when order is placed
    const user = req.session.userId;
    let query = `
      SELECT phone_number
      FROM customers
      WHERE customers.id = $1
    `;
    db.query(query, [user])
    .then(data => {
      const customerPhoneNumber = data.rows[0].phone_number;
      client.messages
      .create({
         body: textMessageToCustomer,
         from: '+16137042914',
         to: customerPhoneNumber
       })
       .then(message => console.log(message.sid));
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
     });
  });

  // POST Route for when the restaurant owner specifies how long the order will take
  router.post("/prep-time-alert", (req, res) => {
    const phoneNumber = req.body.value[0].value;
    const prepTime = req.body.value[1].value;
    const orderId = req.body.orderId;
    const textMessage = `Thank you for your order! you can pick up your food in ${prepTime} minutes!`;

    client.messages
    .create({
      body: textMessage,
      from: '+16137042914',
      to: phoneNumber
    })
    .then(message => {
      let query = `
        UPDATE orders
        SET prep_time = $1
        WHERE orders.id = $2
      `;
      db.query(query, [prepTime, orderId])
      .then(data => {
        console.log("hello");
      })
      .catch(err => {
        res
         .status(500)
          .json({ error: err.message });
        });
      });
    });

    // POST Route for when the restaurant owner clicks on the Finished button and customer gets the final text
    router.post("/pick-up-alert", (req, res) => {

    const textMessage = `Food is ready!!`;

    // send message to the customer when order is ready
    const user = req.session.userId;
    let query = `
      SELECT phone_number
      FROM customers
      WHERE customers.id = $1
    `;
    db.query(query, [user])
    .then(data => {
      const customerPhoneNumber = data.rows[0].phone_number;
      client.messages
      .create({
         body: textMessage,
         from: '+16137042914',
         to: customerPhoneNumber
       })
       .then(message => console.log(message.sid));
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
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
