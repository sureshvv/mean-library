angular.module('bookController', ['bookService'])

.controller('BookController', function(Book, socketio, toastr) {
    var vm = this;
    
    Book.allBook()
        .success(function(data) {
            vm.books = data;
        });

    vm.clearForm = function() {
        vm.bookData = '';
    };

    vm.createBook = function() {
        Book.create(vm.bookData)
            .success(function(data) {
                //clear the form data
                vm.bookData = '';

                vm.message = data.message;
                toastr.success(data.message);
            });
    };

    socketio.on('book', function(data) {
        vm.books.push(data);
    });

})

.controller('AllBooksController', function(books, socketio) {
    var vm = this;

    vm.books = books.data;

    socketio.on('book', function(data) {
        vm.books.push(data);
    });

})