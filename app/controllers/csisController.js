'use strict';
app.controller('csisController', ['$scope', 'csisService', function ($scope, csisService) {

    $scope.csis = [];

    csisService.getCsis().then(function (results) {
        $scope.csis = results.data;
    }, function (error) {
        //alert(error.data.message);
    });

}]);
