'use strict';
app.controller("usersController", ['$scope', 'usersService', function ($scope, usersService) {

    $scope.pageTitle = 'Users';

    usersService.getUserList().then(function (results) {
        $scope.users = results.data;
    }, function (error) {
        //alert(error.data.message);
    });

}]);

