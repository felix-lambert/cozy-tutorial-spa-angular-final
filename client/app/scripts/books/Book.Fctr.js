angular.module('Books').factory('Book', Book);

Book.$inject = ['$http'];

function Book($http) {

  var Book = function() {
    this._id;
    this._book = {};
    this._bookList = [];
  };

  Book.prototype = {
    constructor: Book,
    setId: setId,
    setBook: setBook,
    deleteBook: deleteBook,
    addBook: addBook,
    getBooks: getBooks
  };

  return Book;

  function setBook(book) {
    this._book = book;
  }

  function setId(id) {
    this._id = id;
  }
  // Define your route depended to the name of your app
  function deleteBook() {
    var self = this;
    return $http.get('/apps/tutorial-angularjs/delete/' + self._id).then(function(response) {
      return response;
    });
  }
  // Define your route depended to the name of your app
  function addBook() {
    var self = this;
    return $http.post('/apps/tutorial-angularjs/add', self._book).then(function(response) {
      self._book = response.data;
      return response;
    });
  }
  // Define your route depended to the name of your app
  function getBooks() {
    var self = this;
    return $http.get('/apps/tutorial-angularjs/books').then(function(response) {
      self._bookList = response.data;
      return response;
    });
  }
}