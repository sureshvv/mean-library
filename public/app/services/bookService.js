angular.module('bookService', [])

.factory('Book', function($http) {
    var bookFactory = {};

    bookFactory.allBooks = function(bookData) {
        return $http.get('/api/all_books');
    }

    bookFactory.create = function(bookData) {
        return $http.post('/api', bookData);
    }

    bookFactory.allBook = function() {
        return $http.get('/api');
    }
    return bookFactory;
})

.factory('socketio', function($rootScope){
    var socket = io.connect();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.apply(function() {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});