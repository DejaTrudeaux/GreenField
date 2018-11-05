angular.module('app')
  .controller('SearchBarCtrl', function SearchBarCtrl($http, helperService) {
    this.view = 'search-bar';
    this.ctrlArr = [];
    helperService.getMyBooks(() => {

    });
    this.myBooks = [];
    this.searchbooks = (searchterm) => {
      $http({
        method: 'get',
        url: `/isbn/'${searchterm}'`,
      }).then((response) => {
        // if the response has any books in it
        // render that data
        if (response.data.length) {
          this.ctrlArr = response.data;
        }
      }).catch((err) => {
        console.log(err);
      });
    };
    this.addBooks = (book) => {
      $http({
        method: 'get',
        url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${book}`,
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
        .then(bookObj => $http({
          method: 'post',
          url: '/books',
          data: bookObj,
        })).catch((err) => {
          console.log(err);
        })
        .then(() => {
          helperService.getMyBooks((books) => {
            console.log(books, 'BOOKS');
            this.myBooks = books.data;
          });
        });
    };

    this.remBooks = (bookId) => {
      console.log(this.myBooks, 'THIS IS IT');

      console.log(bookId, 'BOOK ID');
      // index of element where id = bookId
      for (let i = 0; i < this.myBooks.length; i++) {
        if (this.myBooks[i].id === bookId) {
          this.myBooks.splice(i, 1);
          console.log('YOURBOOKWASREMOVED');
        }
      }
    };
  })
  .component('searchBar', {
    bindings: {
      books: '<',
    },
    controller: 'SearchBarCtrl',
    templateUrl: '/templates/search-bar.html',
  });
