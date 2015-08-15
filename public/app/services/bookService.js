angular.module('bookService', [])

.factory('Book', function($http) {
    var bookFactory = {};

    bookFactory.create = function(bookData) {
        return $http.post('/api', bookData);
    }

    bookFactory.allBook = function() {
        return $http.get('/api');
    }
    return bookFactory;
})
