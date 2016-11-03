'use strict';
app.controller('intCsiController', ['$scope',  'intCsiService', 'modalPopUpService', function ($scope, intCsiService, modalPopUpService) {

    $scope.csis = [];

    // ************************
    // Get all Csis
    // ************************
    intCsiService.getCsiList().then(function (results) {
        $scope.csis = results.data;
    }, function (error) {
        alert(error.data.message);
    });

    // ************************
    // Copy CSI
    // ************************
    $scope.copyCsi = function (csi) {
        intCsiService.copyCsi(csi).then(function (results) {
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
        intCsiService.addCsi(csi).then(function (results) {
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
        intCsiService.updateCsi(csi).then(function (results) {
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
        intCsiService.deleteCsi(csi).then(function (results) {
            $scope.csi = results.data;
            $scope.refresh();
        }, function (error) {
            if (error != "Cancel")
              alert(error.data.message);
        });
    };

    $scope.refresh = function(){
        intCustomerService.getCsiList().then(function (results) {
            $scope.csis = results.data;
        }, function (error) {
            alert(error.data.message);
        });
    }

}]);
