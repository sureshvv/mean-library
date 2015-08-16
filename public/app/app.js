angular.module('BookApp', ['ngAnimate', 'toastr', 'appRoutes', 'mainController', 'authService', 'userController', 'userService', 'bookService', 'bookController', 'reverseDirective'])

.config(function($httpProvider) {
    //Keep pusing the tokenf for a logged in user
    $httpProvider.interceptors.push('AuthInterceptor');
});