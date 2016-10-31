'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    $scope.authentication = authService.authentication;
    if($scope.authentication.isAuth) {
        if($scope.authentication.isAdmin == true)
            $scope.role = "Admin";
        else
            $scope.role = "User";
    }
    else
        $scope.role = "";

}]);
