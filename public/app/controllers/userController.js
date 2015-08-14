angular.module('userController', ['userService'])

.controller('UserController', function(User) {
    var vm = this;
    User.all()
        .success(function(data) {
            vm.users = data;
        })
})
.controller('UserCreateController', function(User, $location, $window) {
    vm = this;
    vm.signupUser = function() {
        vm.message = '';
        User.create(vm.userData)
            .then(function(response) {
                vm.userData = {};
                vm.message = response.data.message;
                //Need set the token since this is separate from Auth
                $window.localStorage.setItem('token', response.data.token);
                $location.path('/');
            })
    }
});