angular.module('app')
  .controller('SearchBarCtrl', function SearchBarCtrl($http, helperService) {
    this.view = 'search-bar';
    this.ctrlArr = [];
    this.myBooks = [];
    helperService.getMyBooks().then((books) => {
      this.myBooks = books;
    }).catch((err) => {
      console.log(err);
    });
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
          helperService.getMyBooks().then((books) => {
            this.myBooks = books;
            console.log(books);
          }).catch((err) => {
            console.log(err);
          });
        });
    };

    this.remBooks = (bookId) => {
      helperService.removeBook(bookId).then(() => {
        helperService.getMyBooks().then((books) => {
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
