angular.module('mainController', [])

.controller('MainController', function($rootScope, $location, Auth){

    var vm = this;

    vm.loggedIn = Auth.isLoggedIn();

    $rootScope.$on('$routeChangeStart', function(){
        vm.loggedIn = Auth.isLoggedIn();

        Auth.getUser()
            .then(function(data) {
                vm.user = data.data;
            });
    });
    //Login Function
    vm.doLogin = function() {
        //While perfroming login request wait on processing
        vm.processing = true;
        //Initialize the error message
        vm.error = '';
        //Call the login method from Auth
        Auth.login(vm.loginData.username, vm.loginData.password)
            .success(function(data) {
                //On Success signal call is complete.
                vm.processing = false;
                //Then get the decoded user data from Auth
                Auth.getUser()
                    .then(function(data) {
                        vm.user = data.data;
                    });
                //On success redirect to home path otherwise return error message    
                if(data.success) {
                    $location.path('/');
                } else {
                    vm.error = data.message;
                }
            });
    }
    //Logout function
    vm.doLogout = function() {
        Auth.logout();
        //On successfult logout redirect to logout page.
        $location.path('/logout');
    }
});