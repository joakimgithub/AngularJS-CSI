'use strict';
app.controller('intCustomerController', ['$scope',  'intCustomerService', 'modalPopUpService', function ($scope, intCustomerService, modalPopUpService) {

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
        intCustomerService.copyCustomer(customer).then(function (results) {
            //$scope.customers = results.data;
        }, function (error) {
            //alert(error.data.message);
        });
    };

    // ************************
    // Add customers
    // ************************
    $scope.addCustomer = function (customer) {
        intCustomerService.addCustomer(customer).then(function (results) {
            //$scope.customers = results.data;
        }, function (error) {
            //alert(error.data.message);
        });
    };

    // ************************
    // Update customers
    // ************************
    $scope.updateCustomer = function (customer) {
        intCustomerService.updateCustomer(customer).then(function (results) {
            //$scope.customers = results.data;
        }, function (error) {
            //alert(error.data.message);
        });
    };

    // ************************
    // Delete customers
    // ************************
    $scope.deleteCustomer = function (customer) {
        intCustomerService.deleteCustomer(customer).then(function (results) {
            //$scope.customers = results.data;
        }, function (error) {
            //alert(error.data.message);
        });
    };


}]);
