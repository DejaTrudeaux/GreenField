const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
const port = 3000;
app.listen(port, () => console.log(`BookSwap listening on port ${port}`));
app.use(express.static(path.join(__dirname, '/../angular-client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('HELLLLLLOOOOOOOO WOOORLLLLDDDDDD');
});

app.get('/login', (req, res) => {
  res.send('this is the login page');
});

app.post('/login', (req, res) => {
  res.send('you just posted to the login page');
});

// server login handler
// on click of submit button on login page, send post request to sever at '/login' endpoint.
// server handler receives username and password through request body
