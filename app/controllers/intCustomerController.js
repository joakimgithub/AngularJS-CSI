'use strict';
app.controller('intCustomerController', ['$scope',  'intCustomerService', function ($scope, intCustomerService) {

    $scope.customers = [];

    // ************************
    // Get all customers
    // ************************
    intCustomerService.getCustomerList().then(function (results) {
        $scope.customers = results.data;
    }, function (error) {
        //alert(error.data.message);
    });

    // ************************
    // Copy customers
    // ************************
    $scope.copyCustomer = function (customer) {
        var newCustomer = customer;
        intCustomerService.copyCustomer(newCustomer).then(function (results) {
            //$scope.customers = results.data;
        }, function (error) {
            //alert(error.data.message);
        });
    };

}]);
