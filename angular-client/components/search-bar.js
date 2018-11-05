angular.module('app')
  .controller('SearchBarCtrl', function SearchBarCtrl($http, helperService) {
    this.view = 'search-bar';
    this.ctrlArr = [];
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
        .then((bookObj) => {
          $http({
            method: 'post',
            url: '/books',
            data: bookObj,
          })
            .then((res) => {
              console.log(res, 'RESPONSE IN CLIENT');
            })
            .then(helperService.getMyBooks((err, books) => {
              if (err) {
                console.log(err);
              } else {
                console.log(books, 'BOOKS');
                this.myBooks = books;
              }
            }));
        });
    };

    this.remBooks = (bookId) => {
      console.log(bookId);
      // index of element where id = bookId
      for (let i = 0; i < this.myBooks.data.length; i++) {
        if (this.myBooks.data[i].id === bookId) {
          this.myBooks.data.splice(i, 1);
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
