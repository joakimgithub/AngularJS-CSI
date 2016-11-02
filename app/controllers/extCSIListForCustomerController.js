'use strict';
app.controller("extCSIListForCustomerController", ['$scope', 'extCSIListForCustomerService', function ($scope, extCSIListForCustomerService) {

    $scope.pageTitle = 'Your Csis';

    extCSIListForCustomerService.getCSIListForCustomer().then(function (results) {
        $scope.csis = results.data;
    }, function (error) {
        //alert(error.data.message);
    });


}]);
