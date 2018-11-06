/* eslint-disable no-console */
const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DBU || 'root',
  password: process.env.DBP || config.dbp,
  database: 'BookSwap',
});

// database connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to DB.');
});

// check user's username in password
const checkUser = (obj, callback) => {
  // do connection.query to check users table for that username, return that password
  const queryStr = `select password from users where username = '${obj.username}'`;
  connection.query(queryStr, (err, result) => {
    if (err) {
      callback(false);
      return;
    } if (result.length) {
      // check that password to see if it matches
      if (result[0].password === obj.password) {
        // if so, return true
        callback(true);
        return;
      }
    }
    // else return false
    callback(false);
  });
};

// sign up user
const signupUser = (obj, callback) => {
  const queryStr = `insert into users (email, username, password) values ('${obj.email}', '${obj.username}', '${obj.password}')`;
  connection.query(queryStr, (err, result) => {
    console.log('db query insertion attempted');
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log(result);
      callback(result);
    }
  });
};


const findBook = (number, callback) => {
  // find entry matching isbn typed into input
  const getUserBookStr = `select * from userbooklist where isbn_books = ${number}`;
  // select necessary information from joined books, userbooklist, and users table to create
  // an object where user's email is connected to book information
  const getInfoStr = `select users.username, users.email, books.author, books.title, books.description, books.imageLink from users inner join userbooklist on userbooklist.username_users=users.username inner join books on userbooklist.isbn_books=books.isbn and userbooklist.isbn_books=${number};`;
  connection.query(getUserBookStr, (err) => {
    if (err) {
      callback(err);
    } else {
      connection.query(getInfoStr, (err2, result2) => {
        if (err) {
          console.log(err2);
        } else {
          callback(result2);
        }
      });
    }
  });
};

// add book to books table
const addBook = (bookObj, sessionUser, callback) => {
  // insert book information to books table
  const bookQueryStr = `insert into books (ISBN, title, description, author, imageLink) values (${bookObj.isbn}, '${bookObj.title}', '${bookObj.description}', '${bookObj.author}', '${bookObj.image}')`;
  // insert corresponding user and books info into userbookslist table
  const userBookQueryStr = `insert into userbooklist (isbn_books, username_users) values (${bookObj.isbn}, '${sessionUser}')`;
  // find books that match an isbn
  const findBookStr = `select * from books where ISBN = ${bookObj.isbn}`;
  connection.query(findBookStr, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length === 0) {
        connection.query(bookQueryStr, (err2, result2) => {
          if (err2) {
            callback(err2);
          } else {
            console.log(result2);
          }
        });
      }
      connection.query(userBookQueryStr, (err3, result3) => {
        if (err3) {
          console.log(err3);
        } else {
          callback(result3);
        }
      });
    }
  });
};

const myBooks = (username, callback) => {
  // get all of a user's books
  const getInfoStr = `select userbooklist.id, books.title from users inner join userbooklist on userbooklist.username_users=users.username and userbooklist.username_users='${username}' inner join books on books.isbn = userbooklist.isbn_books`;
  connection.query(getInfoStr, (err, books) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, books);
      // console.log(books, 'BOOKS');
    }
  });
};

// remove books based on an id property in the userbooklist tables
const remBooks = (bookObj, callback) => {
  // book object only has an id property here
  const remUserBookStr = `delete from userbooklist where id=${bookObj.id}`;
  connection.query(remUserBookStr, (err, response) => {
    if (err) {
      callback(err);
    } else {
      callback(response);
    }
  });
};

module.exports = {
  checkUser,
  signupUser,
  findBook,
  addBook,
  myBooks,
  remBooks,
};
