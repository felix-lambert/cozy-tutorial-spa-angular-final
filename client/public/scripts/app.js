angular.module('Books', [
  'ngResource',
  'ngRoute'
]).config(appConfig);

var routeObject = {
  '/': {
    templateUrl: 'partials/home.html',
    controller: 'HomeAngCtrl',
    controllerAs: 'home'
  }
};

appConfig.$inject = ['$httpProvider', '$routeProvider'];

function appConfig($httpProvider, $routeProvider) {
  for (var path in routeObject) {
    $routeProvider.when(path, routeObject[path]);
  }
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}
;angular.module('Books').factory('Book', Book);

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
;angular.module('Books').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$scope', '$injector'];

function HomeAngCtrl($scope, $injector) {
	var Book      = $injector.get('Book'); 
	
	var book      = new Book;
	var vm        = this;
	vm.add        = add;
	vm.removeBook = removeBook;

	activate();

	function activate() {
		book.getBooks().then(function() {
			vm.books = book._bookList;
		});
	}

	function add(bookItem) {
		var defaultForm = {
          title : "",
          link : ""
      	};
		book.setBook(bookItem);
		book.addBook().then(function() {
			console.log(book._book);
			vm.books.push(book._book);
			vm.book = defaultForm;
      		$scope.form.$setPristine();	
		});
  	}

  	function removeBook(index, bookId) {
  		console.log(bookId);
  		book.setId(bookId);
  		book.deleteBook().then(function() {
  			vm.books.splice(index, 1);
  		});
  	}
}
;
//# sourceMappingURL=app.js.map