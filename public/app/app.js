angular.module('BookApp', ['appRoutes', 'mainController', 'authService', 'userController', 'userService', 'bookService', 'bookController'])

.config(function($httpProvider) {
    //Keep pusing the tokenf for a logged in user
    $httpProvider.interceptors.push('AuthInterceptor');
});