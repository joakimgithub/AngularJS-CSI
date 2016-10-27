'use strict';
app.controller("extCsiController", ['$scope', 'extCsiService', function ($scope, extCsiService) {

    csisService.GetCSI().then(function (results) {
        $scope.customers = results.data;
    }, function (error) {
        //alert(error.data.message);
    });


}]);
