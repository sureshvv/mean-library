angular.module('appRoutes', ['ngRoute'])
//Add in the route provider
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/pages/home.html'
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
    $locationProvider.html5Mode(true);
});