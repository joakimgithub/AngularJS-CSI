'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    $scope.authentication = authService.authentication;
    var auth = authService.authentication;
    $scope.isLoggedInAndAdmin = false;
    $scope.isLoggedInAndUser = false;
    if (auth.isAdmin && auth.isAuth) $scope.isLoggedInAndAdmin = true;
    var isLoggedInAndUser = false;
    if (auth.isAdmin && auth.isAuth) $scope.isLoggedInAndUser = true;
}]);
