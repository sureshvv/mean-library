angular.module('appRoutes', ['ngRoute'])
//Add in the route provider
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/pages/home.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
        .when('/login', {
            templateUrl: 'app/views/pages/login.html'
        })
        .when('/signup', {
            templateUrl: 'app/views/pages/signup.html'
        })
        .when('/logout', {
            templateUrl: 'app/views/pages/logout.html'
        })
        .when('/allBooks', {
            templateUrl: 'app/views/pages/allBooks.html',
            controller: 'AllBooksController',
            controllerAs: 'book',
            resolve: {
                books: function(Book) {
                    return Book.allBooks();
                }
            }
        })
    $locationProvider.html5Mode(true);
});