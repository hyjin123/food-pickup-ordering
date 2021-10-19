// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure


// GOOD FOR RUNNING ONLY THIS FILE. FOR COMPLETE PROJECT, UNCOMMENT THE TWO LINES AND DELETE THE HARDCODED CREDENTIALS.

const accountSid=`ACa8cce95817a47af74d7ac8aecfa86a11`
const authToken=`1358e70aac8ec923080c6dec694903be`

const Ana='+16139815391'
const Sean = '+14372180544'

//const accountSid = process.env.TWILIO_ACCOUNT_SID;
//const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+16137042914',
     to: Ana
   })
  .then(message => console.log(message.sid));