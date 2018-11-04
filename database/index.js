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
  const queryStr = `select * from userbooklist where isbn_books = ${number}`;
  connection.query(queryStr, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
};

// const addBook = (bookObj, sessionUser, callback) => {
//   // add book to books table
//   const bookQueryStr = `insert into books (ISBN, title, description, author) values (${bookObj.isbn}, '${bookObj.title}', '${bookObj.description}', '${bookObj.author}')`;
//   const userBookQueryStr = `insert into userbooklist (isbn_books, username_users) values (${bookObj.isbn}, '${sessionUser}')`;
//   const findBookStr = `select * from books where ISBN = ${bookObj.isbn}`;
//   connection.query(findBookStr, (err, result) => {
//     if (err) {
//       callback(err);
//     } else {
//       if (!result.length) {
//         connection.query(bookQueryStr, (err, result) => {
//           if (err) {
//             callback(err);
//           } else {
//             callback(result);
//           }
//         });
//       }
//       connection.query(userBookQueryStr, (err, result) => {
//         if (err) {
//           callback(err);
//         } else {
//           callback(result);
//         }
//       });
//     }
//   });
// };


const addBook = (bookObj, sessionUser, callback) => {
  // add book to books table
  const bookQueryStr = `insert into books (isbn, title, description, author) values (${bookObj.isbn}, '${bookObj.title}', '${bookObj.description}', '${bookObj.author}')`;
  const userBookQueryStr = `insert into userbooklist (isbn_books, username_users) values (${bookObj.isbn}, '${sessionUser}')`;
  connection.query(bookQueryStr, (err, result) => {
    if (err) {
      console.log(err);
      console.log(bookObj.description);
      //  then add information to shared userbooklist table
      connection.query(userBookQueryStr, (err2, result2) => {
        if (err2) {
          console.log(err2);
        } else {
          console.log(result2, 'Successful userbooklist INSERT');
        }
      });
      callback(err);
    } else {
      callback(result);
      console.log(bookObj, sessionUser, 'Successful bookTable INSERT');

      // then add information to shared userbooklist table
      // connection.query(userBookQueryStr, (err2, result2) => {
      //   if (err) {
      //     console.log(err2);
      //   } else {
      //     console.log(result2);
      //   }
      // });
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

// module.exports.checkUser = checkUser;
// module.exports.signupUser = signupUser;
// module.exports.findBook = findBook;
// // module.exports.dbmockInsertion = dbmockInsertion;
// module.exports.addBook = addBook;

module.exports = {
  checkUser,
  signupUser,
  findBook,
  addBook,
  myBooks,
};
