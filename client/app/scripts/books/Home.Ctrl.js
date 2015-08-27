angular.module('Books').controller('HomeAngCtrl', HomeAngCtrl);

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