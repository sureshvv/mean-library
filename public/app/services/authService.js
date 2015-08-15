angular.module('authService', [])
//Auth Factory
.factory('Auth', function($http, $q, AuthToken) {
    var authFactory = {};
    //Login function
    authFactory.login = function(username, password) {
        return $http.post('/api/login', {
            username: username,
            password: password
        })
        .success(function(data) {
            AuthToken.setToken(data.token);
            return data;
        })
    }
    //Log out the user
    authFactory.logout = function() {
        AuthToken.setToken();
    }
    //Check if user has token
    authFactory.isLoggedIn = function() {
        if(AuthToken.getToken()) {
            return true;
        } else {
            return false;
        }
    }
    //Get the user infromation
    authFactory.getUser = function() {
        if(AuthToken.getToken()) {
            return $http.get('/api/me');
        } else {
            return $q.reject({ message: "User has no token" });
        }
    }
    //Return the factory
    return authFactory;
})
//Our Token Factory
.factory('AuthToken', function($window) {
    var authTokenFactory = {};

    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    }

    authTokenFactory.setToken = function(token) {
        if(token) {
            $window.localStorage.setItem('token', token);
        } else {
            $window.localStorage.removeItem('token');
        }
    }
    //Return authTokenFactory
    return authTokenFactory;
})
//Check for Authentication and make sure it is in the headers
.factory('AuthInterceptor', function($q, $location, AuthToken) {
    var interceptorFactory = {};
    //intercept token requests
    interceptorFactory.request = function(config) {
        var token = AuthToken.getToken();
        //If the token exists add it to headers
        if(token) {
            config.headers['x-access-token'] = token;
        }
        //Return the config
        return config;
    }
    //Error checking in case the token is not present
    interceptorFactory.responseError = function(response) {
        //If the user is not logged in the user will be redirected to the login page.
        if(response.status === 403) {
            $location.path('/');
        }

        return $q.reject(response);
    }

    return interceptorFactory;
});