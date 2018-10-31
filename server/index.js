const express = require('express');
const session = require('express-session');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
// use express sessions to authenticate user
app.use(session({
  key: 'user_id',
  secret: 'somerandomstuff',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
  },
}));

const port = 3000;
app.listen(port, () => console.log(`BookSwap listening on port ${port}`));

app.use(express.static(path.join(__dirname, '/../angular-client')));
app.use(express.static(path.join(__dirname, '/../node_modules')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// this is the main page with a login screen
let sess;
app.get('/', (req, res) => {
  console.log(req);
  // if () {
  //   res.redirect('/login');
  // }
  sess = req.session;
  if (sess.username) {
    res.redirect('/admin');
  } else {
    res.render('index.html');
  }
});

// app.get('/', (req, res) => {
//   console.log('you just hit the get handler at endpoint /');
//   res.send('HELLLLLLOOOOOOOO WOOORLLLLDDDDDD');
//   // check if user is signed in / has session
//   // if yes, re route to main page / search
//   // if not , reroute to login page
//   // check db for login credentials
//   // if true, re reoute to main page / search
//   // if false, state that user needs to sign up
// });

// this is the page the user gets to when they log in
app.get('/admin', (req, res) => {
  sess = req.session;
  if (sess.username) {
    res.write(`<h1>Hello ${sess.username }</h1>`);
    res.end('<a href="+">Logout</a>');
  } else {
    res.write('<h1> Please login first.</h1>');
    res.end('<a href="+">Login</a>');
  }
});

// this is the logout page
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// assigning username to session's username
// username comes from html page
app.post('/login', (req, res) => {
  if (!db.checkUser(req, res)) {
    res.redirect('/login');
  }
  sess = req.session;
  sess.username = req.body.username;
  res.end('done');
});

// server login handler
// on click of submit button on login page, send post request to sever at '/login' endpoint.
// server handler receives username and password through request body
