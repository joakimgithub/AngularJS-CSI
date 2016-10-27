'use strict';
app.controller("extCSIListForCustomerController", ['$scope', 'extCSIListForCustomerService', function ($scope, extCSIListForCustomerService) {


    extCSIListForCustomerService.getCSIListForCustomer().then(function (results) {
        $scope.csis = results.data;
    }, function (error) {
        //alert(error.data.message);
    });


}]);
