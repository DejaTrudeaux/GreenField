
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.listen(port, () => console.log(`BookSwap listening on port ${port}`));


app.get('/', (req, res) => {
  res.send('HELLLLLLOOOOOOOO WOOORLLLLDDDDDD');
});


// server login handler
// on click of submit button on login page, send post request to sever at '/login' endpoint.
// server handler receives username and password through request body
