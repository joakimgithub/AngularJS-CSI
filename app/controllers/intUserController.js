'use strict';
app.controller("intUserController", ['$scope', '$location', 'intUserService', 'intCustomerService',
                                   function ($scope, $location, intUserService, intCustomerService) {

    $scope.pageTitle = 'Users';

    intUserService.getUserList().then(function (results) {
        $scope.users = results.data;
    }, function (error) {
        //alert(error.data.message);
    });


    // ************************
    // Add user
    // ************************
    $scope.addUser = function () {
        intUserService.addUser().then(function (results) {
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
        $location.path('/intUpdateUser');
    };

    // ************************
    // Delete user
    // ************************
    $scope.deleteUser = function (user) {
        intUserService.deleteUser(user).then(function (results) {
            $scope.user = results.data;
            $scope.refresh();
        }, function (error) {
            if (error != "Cancel")
              alert(error.data.message);
        });
    };

    $scope.refresh = function(){
        intUserService.getUserList().then(function (results) {
            $scope.users = results.data;
        }, function (error) {
            alert(error.data.message);
        });
    }

}]);

