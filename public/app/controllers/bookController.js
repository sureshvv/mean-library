angular.module('bookController', ['bookService'])

.controller('BookController', function(Book) {
    var vm = this;
    
    Book.allBook()
        .success(function(data) {
            vm.books = data;
        });

    vm.createBook = function() {
        Book.create(vm.bookData)
            .success(function(data) {
                //clear the form data
                vm.bookData = '';

                vm.message = data.message;

                vm.books.push(data);
            });
            
    };

})