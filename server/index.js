const express = require('express');
const session = require('express-session');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const mock = require('../mocData.js');

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
app.get('/', (req, res) => {
  // for each item in
  // db.dbmockInsertion(mock.data, (err, success) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(success);
  //   }
  // });
  // console.log('hello');
  // // if the user has a session
  // if (req.session.user) {
  //   // redirect them to search page
  //   res.sendFile('angular-client/templates/search-bar.html');
  //   // else
  // } else {
  //   // redirect them to signup page
  //   res.sendFile('angular-client/templates/login.html');
  // }
});

// this is the page the user gets to when they log in
app.get('/search', (req, res) => {
  // res.sendFile('/Users/deja_video/Documents/Immersion/greenfield/angular-client/templates/search-bar.html');
});


app.post('/login', (req, res) => {
  // use check user function from database
  db.checkUser(req.body, (response) => {
    // if response from database is true
    if (response) {
      // create a session on request
      req.session.regenerate(() => {
        // assigning req.body's username to session's user property
        req.session.user = req.body.username;
        // res.send(true) so that our login's response is true
        res.send({ bool: true, req: req.session });
      });
    } else {
      // send false so that our login's response is false
      res.send(false);
    }
  });
});

// signup
app.post('/signup', (req, res) => {
  db.signupUser(req.body, (response) => {
    // create a session when somebody signs up
    if (response) {
      req.session.regenerate(() => {
        req.session.user = req.body.username;
      });
    }
    res.send(response);
  });
  // new User({ username })
  //   .fetch()
  //   .then((user) => {
  //     if (!user) {
  //     // BASIC VERSION
  //     // bcrypt.hash(password, null, null, function(err, hash) {
  //       //   Users.create({
  //       //     username: username,
  //       //     password: hash
  //       //   }).then(function(user) {
  //       //       util.createSession(req, res, user);
  //       //   });
  //       // });
  //       // ADVANCED VERSION -- see user model
  //       const newUser = new User({
  //         username,
  //         email,
  //         password,
  //       });
  //       newUser.save()
  //         .then((newUser) => {
  //           util.createSession(req, res, newUser);
  //         });
  //     } else {
  //       console.log('Account already exists');
  //       res.redirect('/signup');
  //     }
  //   });
});

// get info about a book from googlebooks api
app.get('/isbn/:number', (req, res) => {
  const isbn = req.url.slice(6);
  db.findBook(isbn, (response) => {
    console.log('FOUND BOOK IN SERVER');
    res.send(response);
  });
});

// add a book to mybooks
app.post('/books', (req, res) => {
  db.addBook(req.body, req.session.user, (response) => {
    res.send(response);
  });
});


app.get('/books', (req, res) => {
  db.myBooks(req.session.user, (err, books) => {
    if (err) {
      console.log(err);
    } else {
      res.send(books);
    }
  });
});

// delete book from mybooks request handler
app.post('/rembooks', (req, res) => {
  console.log(req.body, 'REQUEST BODY');
  db.remBooks(req.body, (response) => {
    console.log(response);
    db.myBooks(req.session.user, (err, books) => {
      if (err) {
        console.log(err);
      } else {
        res.send(books);
      }
    });
  });
});

// this is the logout (incomplete)
app.get('/logout', (req, res) => {
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect('/');
  //   }
  // });
});
