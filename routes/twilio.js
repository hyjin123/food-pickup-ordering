const express = require('express');
const router  = express.Router();
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

    // client.messages
    // .create({
    //    body: textMessage,
    //    from: '+16137042914',
    //    to: '+14372180544'
    //  })
    //  .then(message => console.log(message.sid));

    });

  return router;
}
