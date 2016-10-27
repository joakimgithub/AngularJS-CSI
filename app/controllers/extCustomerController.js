'use strict';
app.controller("extCustomerController", ['$scope', 'extCustomerService', function ($scope, extCustomerService) {

    $scope.pageTitle = 'Customers';

    extCustomerService.getCustomerList().then(function (results) {
        $scope.customers = results.data;
    }, function (error) {
        //alert(error.data.message);
    });

}]);

