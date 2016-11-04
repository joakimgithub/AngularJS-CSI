'use strict';
app.controller("intCSIListForCustomerController", ['$scope', '$routeParams', 'intCSIListForCustomerService', function ($scope, $routeParams, intCSIListForCustomerService) {

    $scope.pageTitle = 'Csis';
    var id = $routeParams.id;
    $scope.csis = [];

    intCSIListForCustomerService.getCSIListForCustomer(id).then(function (results) {
        $scope.csis = results.data;
    }, function (error) {
        //alert(error.data.message);
    });

    // ************************
    // Copy CSI
    // ************************
    $scope.copyCsi = function (csi) {
        intCSIListForCustomerService.copyCsi(csi).then(function (results) {
            $scope.csi = results.data;
            $scope.refresh();
        }, function (error) {
            if (error != "Cancel")
              alert(error.data.message);
        });
    };

    // ************************
    // Add CSI
    // ************************
    $scope.addCsi = function (csi) {
        intCSIListForCustomerService.addCsi(csi).then(function (results) {
            $scope.csi = results.data;
            $scope.refresh();
        }, function (error) {
            if (error != "Cancel")
              alert(error.data.message);
        });
    };

    // ************************
    // Update CSI
    // ************************
    $scope.updateCsi = function (csi) {
        intCSIListForCustomerService.updateCsi(csi).then(function (results) {
            $scope.csi = results.data;
            $scope.refresh();
        }, function (error) {
            if (error != "Cancel")
              alert(error.data.message);
        });
    };

    // ************************
    // Delete CSI
    // ************************
    $scope.deleteCsi = function (csi) {
        intCSIListForCustomerService.deleteCsi(csi).then(function (results) {
            $scope.csi = results.data;
            $scope.refresh();
        }, function (error) {
            if (error != "Cancel")
              alert(error.data.message);
        });
    };

    $scope.refresh = function(){
        intCSIListForCustomerService.getCSIListForCustomer(id).then(function (results) {
            $scope.csis = results.data;
        }, function (error) {
            alert(error.data.message);
        });
    }

}]);
