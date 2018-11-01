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
app.get('/login', (req, res) => {
  // if the user appears in the database
  // redirect them to search page
  if (req.session.username) {
    res.redirect('search');
  } else {
    res.render('login');
  }
  // else
  // redirect them to signup page
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
app.get('/search', (req, res) => {
  res.send('search page!');
  // sess = req.session;
  // if (sess.username) {
  //   res.write(`<h1>Hello ${sess.username }</h1>`);
  //   res.end('<a href="+">Logout</a>');
  // } else {
  //   res.write('<h1> Please login first.</h1>');
  //   res.end('<a href="/login">Login</a>');
  // }
});

// this is the logout page
app.get('/logout', (req, res) => {
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect('/');
  //   }
  // });
});

// assigning username to session's username
// username comes from html page
app.post('/login', (req, res) => {
  // if (!db.checkUser(req, res)) {
  // res.redirect('/login');
  // }
  // sess = req.session;
  // sess.username = req.body.username;
  // res.end('done');
  // post request has object in the body
  // console.log(req.body);
  db.checkUser(req.body, (response)=>{
    console.log(response, 'RESPONSE');
    res.send(response);
  });
  // post request will get the object out of the body of the post request
  // once we have this object, we can use our db.checkuser function
});

// signup
app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  new User({ username })
    .fetch()
    .then((user) => {
      if (!user) {
        // BASIC VERSION
        // bcrypt.hash(password, null, null, function(err, hash) {
        //   Users.create({
        //     username: username,
        //     password: hash
        //   }).then(function(user) {
        //       util.createSession(req, res, user);
        //   });
        // });
        // ADVANCED VERSION -- see user model
        const newUser = new User({
          username,
          email,
          password,
        });
        newUser.save()
          .then((newUser) => {
            util.createSession(req, res, newUser);
          });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
});

// server login handler
// on click of submit button on login page, send post request to sever at '/login' endpoint.
// server handler receives username and password through request body
