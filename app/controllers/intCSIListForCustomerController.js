'use strict';
app.controller("intCSIListForCustomerController", ['$scope', '$routeParams', 'intCSIListForCustomerService', function ($scope, $routeParams, intCSIListForCustomerService) {

    $scope.pageTitle = 'Csis';
    var id = $routeParams.id;

    intCSIListForCustomerService.getCSIListForCustomer(id).then(function (results) {
        $scope.csis = results.data;
    }, function (error) {
        //alert(error.data.message);
    });


}]);
