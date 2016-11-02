'use strict';
app.controller("extCsiController", ['$scope', 'extCsiService', 'routeParams', function ($scope, $routeParams, extCsiService) {

    var id = $routeParams.ID;

    csisService.GetCSI(id).then(function (results) {
        $scope.customers = results.data;
    }, function (error) {
        //alert(error.data.message);
    });


}]);
