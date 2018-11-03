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


const dbmockInsertion = (mockData, callback) => {
  mockData.forEach((book) => {
    const isbn = book.items[0].volumeInfo.industryIdentifiers[0].identifier;
    const title = book.items[0].volumeInfo.title;
    const authors = book.items[0].volumeInfo.authors[0];
    const description = book.items[0].volumeInfo.description;
    const genres = book.items[0].volumeInfo.categories[0];
    const imageLinks = book.items[0].volumeInfo.imageLinks.smallThumbnail;
    // genre is misspelled in the db, need to change schema!!!
    const queryStr = `insert into books (isbn, title, author, description, imageLink) values (${isbn}, ${title}, ${authors}, ${description}, ${imageLinks})`;
    connection.query(queryStr, (err, success) => {
      if (err) {
        callback(err);
      } else {
        callback(success);
      }
    });
  });
};

module.exports.checkUser = checkUser;
module.exports.signupUser = signupUser;
module.exports.findBook = findBook;
module.exports.dbmockInsertion = dbmockInsertion;
