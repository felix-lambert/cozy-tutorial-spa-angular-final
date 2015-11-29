angular.module('Bookmarks').factory('Bookmark', Bookmark);

Bookmark.$inject = ['$http'];

function Bookmark($http) {

  var Bookmark = function() {
    this._id;
    this._bookmark = {};
    this._bookList = [];
  };

  Bookmark.prototype = {
    constructor: Bookmark,
    setId: setId,
    setBookmark: setBookmark,
    deleteBookmark: deleteBookmark,
    addBookmark: addBookmark,
    getBookmarks: getBookmarks
  };

  return Bookmark;

  function setBookmark(bookmark) {
    this._bookmark = bookmark;
  }

  function setId(id) {
    this._id = id;
  }
  // Define your route depended to the name of your app
  function deleteBookmark() {
    var self = this;
    return $http.get('/api/delete/' + self._id).then(function(response) {
      return response;
    });
  }

  // Define your route depended to the name of your app
  function addBookmark() {
    var self = this;
    return $http.post('/api/bookmark', self._bookmark).then(function(response) {
      self._bookmark = response.data;
      return response;
    });
  }
  
  // Define your route depended to the name of your app
  function getBookmarks() {
    var self = this;
    return $http.get('/api/bookmarks').then(function(response) {
      self._bookList = response.data;
      return response;
    });
  }
}