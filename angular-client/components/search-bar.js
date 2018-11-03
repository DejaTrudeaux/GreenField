angular.module('app')
  .controller('SearchBarCtrl', function SearchBarCtrl($http) {
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
        headers: {
          key: 'API KEY',
        },
      }).then((response) => {
        const resObj = response.data.items[0];
        const bookObj = {
          isbn: book,
          title: resObj.volumeInfo.title,
          description: resObj.volumeInfo.description,
          author: resObj.volumeInfo.authors[0],
        };
        return bookObj;
      })
        .then((bookObj) => {
          $http({
            method: 'post',
            url: '/books',
            data: bookObj,
          });
        })
        .then((res)=>{
          console.log(res, 'RESPONSE IN CLIENT');
        });
    };
    this.remBooks = (book) => {};
  })
  .component('searchBar', {
    bindings: {
      books: '<',
    },
    controller: 'SearchBarCtrl',
    templateUrl: '/templates/search-bar.html', 
  });
