const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'BookSwap',
});

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

const signupUser = (obj, callback) => {
  const queryStr = `insert into users (email, username, password) values ('${obj.email}', '${obj.username}', '${obj.password}')`;
  connection.query(queryStr, (err, result) => {
    console.log('db query insertion attempted');
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
};

const findBook = (number, callback) => {
  const getUserBookStr = `select * from userbooklist where isbn_books = ${number}`;
  const getInfoStr = `select users.username, users.email, books.author, books.title, books.description, books.imageLink from users inner join userbooklist on userbooklist.username_users=users.username inner join books on userbooklist.isbn_books=books.isbn and userbooklist.isbn_books=${number};`;
  connection.query(getUserBookStr, (err, result) => {
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
      // callback(result);
    }
  });
};

const addBook = (bookObj, sessionUser, callback) => {
  // add book to books table
  const bookQueryStr = `insert into books (ISBN, title, description, author, imageLink) values (${bookObj.isbn}, '${bookObj.title}', '${bookObj.description}', '${bookObj.author}', '${bookObj.image}')`;
  const userBookQueryStr = `insert into userbooklist (isbn_books, username_users) values (${bookObj.isbn}, '${sessionUser}')`;
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
            callback(result2);
          }
        });
      }
      connection.query(userBookQueryStr, (err3, result3) => {
        if (err3) {
          console.log(err3);
        } else {
          console.log(result3);
        }
      });
    }
  });
};

const myBooks = (username, callback) => {
  const innerStr = `select books.title from books inner join userbooklist on userbooklist.username_users = '${username}' and books.isbn=userbooklist.isbn_books`;
  const queryStr = `select * from userbooklist where username_users = '${username}'`;
  connection.query(innerStr, (err, books) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, books);
      // console.log(books, 'BOOKS');
    }
  });
};

module.exports = {
  checkUser,
  signupUser,
  findBook,
  addBook,
  myBooks,
};
