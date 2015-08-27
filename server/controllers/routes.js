var bookmarks = require('./bookmarks');

module.exports = {
  'books': {
    get: bookmarks.list
  },
  'add': {
    post: bookmarks.add
  },
  'delete/:id': {
    get: bookmarks.delete
  }
};