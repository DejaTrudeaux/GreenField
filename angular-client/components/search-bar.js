angular.module('app')
  .controller('SearchBarCtrl', function SearchBarCtrl($http) {
    this.view = 'search-bar';
    this.searchbooks = (searchterm) => {
      $http({
        method: 'get',
        url: `/isbn/'${searchterm}'`,
      }).then((response) => {
        console.log(response, 'THIS IS FOR SURE THE THING I AM LOOKING FOR');
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
    },
    controller: 'SearchBarCtrl',
    templateUrl: '/templates/search-bar.html', 
  });
