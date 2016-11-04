'use strict';
app.controller("usersController", ['$scope', 'usersService', 'intCustomerService',
                                   function ($scope, usersService, intCustomerService) {

    $scope.pageTitle = 'Users';

    usersService.getUserList().then(function (results) {
        $scope.users = results.data;
    }, function (error) {
        //alert(error.data.message);
    });


    // ************************
    // Add user
    // ************************
    $scope.addUser = function () {
        usersService.addUser().then(function (results) {
            $scope.user = results.data;
            $scope.refresh();
        }, function (error) {
            if (error != "Cancel")
              alert(error.data.message);
        });
    };

    // ************************
    // Update user
    // ************************
    $scope.updateUser = function (user) {
        usersService.updateUser(user).then(function (results) {
            $scope.user = results.data;
            $scope.refresh();
        }, function (error) {
            if (error != "Cancel")
              alert(error.data.message);
        });
    };

    // ************************
    // Delete user
    // ************************
    $scope.deleteUser = function (user) {
        usersService.deleteUser(user).then(function (results) {
            $scope.user = results.data;
            $scope.refresh();
        }, function (error) {
            if (error != "Cancel")
              alert(error.data.message);
        });
    };

    $scope.refresh = function(){
        usersService.getUserList().then(function (results) {
            $scope.users = results.data;
        }, function (error) {
            alert(error.data.message);
        });
    }

}]);

