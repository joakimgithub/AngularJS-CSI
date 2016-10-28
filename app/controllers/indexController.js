'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    $scope.authentication = authService.authentication;
    if($scope.authentication.isAdmin)
        $scope.role = "Admin";
    else
        $scope.role = "User";

}]);
