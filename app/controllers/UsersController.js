'use strict';
app.controller("usersController", ['$scope', 'usersService', 'intCustomerService',
                                   function ($scope, usersService, intCustomerService) {

    $scope.pageTitle = 'Users';

    usersService.getUserList().then(function (results) {
        $scope.users = results.data;
    }, function (error) {
        //alert(error.data.message);
    });

    // *******************************************
    // Get all customers for a list of value
    // *******************************************
    intCustomerService.getCustomerList().then(function (results) {
        $scope.lovCustomers = results.data;
    }, function (error) {
        //alert(error.data.message);
    });

}]);

