const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'NEWPASSWORD',
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
  const queryStr = `select * from books where isbn = ${number}`;
  connection.query(queryStr, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
};

const addBook = (bookObj, sessionUser, callback) => {
  // add book to books table
  const bookQueryStr = `insert into books (isbn, title, description, author) values (${bookObj.isbn}, '${bookObj.title}', '${bookObj.description}', '${bookObj.author}')`;
  const userBookQueryStr = `insert into userbooklist (isbn_books, username_users) values (${bookObj.isbn}, '${sessionUser}')`;
  const findBookStr = `select * from books where ISBN = ${bookObj.isbn}`;
  connection.query(findBookStr, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (!result.length) {
        console.log(result, 'HAY HAY HAY HAY HAY');
        connection.query(bookQueryStr, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        });
      }
      connection.query(userBookQueryStr, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    }
  });
  // connection.query(bookQueryStr, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     callback(result);
  //     // then add information to shared userbooklist table
  //     connection.query(userBookQueryStr, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(result);
  //       }
  //     });
  //   }
  //   console.log(bookObj, sessionUser, 'ADD BOOK IN DATABASE!!!!!!!!!!!!!!!!!!');
  // });
};

module.exports.checkUser = checkUser;
module.exports.signupUser = signupUser;
module.exports.findBook = findBook;
// module.exports.dbmockInsertion = dbmockInsertion;
module.exports.addBook = addBook;
