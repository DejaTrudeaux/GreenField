angular.module('app')
  .controller('SearchBarCtrl', function SearchBarCtrl($http, helperService) {
    this.view = 'search-bar';
    // array of books logged in user has on their haves list
    this.myBooks = [];
    helperService.getMyBooks().then((books) => {
      this.myBooks = books;
    }).catch((err) => {
      console.log(err);
    });

    // array for search results by isbn
    this.ctrlArr = [];
    this.searchbooks = (searchterm) => {
      $http({
        method: 'get',
        url: `/isbn/'${searchterm}'`,
      }).then((response) => {
        // if the response has any books in it
        if (response.data.length) {
          // populate ctrlArr with those books
          this.ctrlArr = response.data;
        }
      }).catch((err) => {
        console.log(err);
      });
    };

    // first get information based on book from google books api
    this.addBooks = (book) => {
      $http({
        method: 'get',
        url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${book}`,
        // then get the properties we need and return that object
      }).then((response) => {
        const resObj = response.data.items[0];
        const bookObj = {
          isbn: book,
          title: resObj.volumeInfo.title,
          description: resObj.volumeInfo.description,
          author: resObj.volumeInfo.authors[0],
          image: resObj.volumeInfo.imageLinks.thumbnail,
        };
        return bookObj;
      })
      // post our simplified object into the database
        .then(bookObj => $http({
          method: 'post',
          url: '/books',
          data: bookObj,
        })).catch((err) => {
          console.log(err);
        })
        // re-render the books with new book added
        .then(() => {
          helperService.getMyBooks().then((books) => {
            this.myBooks = books;
            console.log(books);
          }).catch((err) => {
            console.log(err);
          });
        });
    };

    // remove books based on an id property on the userbooklist table
    this.remBooks = (bookId) => {
      helperService.removeBook(bookId).then(() => {
        // re-render books after removal
        helperService.getMyBooks().then((books) => {
          // set current books to this.mybooks
          this.myBooks = books;
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    };
  })
  .component('searchBar', {
    bindings: {
      books: '<',
    },
    controller: 'SearchBarCtrl',
    templateUrl: '/templates/search-bar.html',
  });
