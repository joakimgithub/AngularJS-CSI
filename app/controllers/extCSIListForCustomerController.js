'use strict';
app.controller("extCSIListForCustomerController", ['$scope', '$routeParams', 'extCSIListForCustomerService', function ($scope, extCSIListForCustomerService) {

    $scope.pageTitle = 'Your Csis';
    var id = $routeParams.id;

    extCSIListForCustomerService.getCSIListForCustomer(id).then(function (results) {
        $scope.csis = results.data;
    }, function (error) {
        //alert(error.data.message);
    });


}]);
