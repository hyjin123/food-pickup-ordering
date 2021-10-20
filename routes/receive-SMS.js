const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});


// twilio phone-numbers:update "+16137042914" --sms-url="http://localhost:1337/sms"
// twilio phone-numbers:update "+16137042914" --sms-url="http://localhost:8080/api/twilio/sms"
// https://04d5-135-12-178-128.ngrok.io/api/twilio/sms
