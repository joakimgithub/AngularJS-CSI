'use strict';
app.controller("extCsiController", ['$scope', '$routeParams', 'extCsiService','SharedDataService', function ($scope, $routeParams, extCsiService, SharedDataService) {

    $scope.ShareData = SharedDataService;

    var id = $routeParams.id;

    extCsiService.GetCSI(id).then(function (results) {
        $scope.csi = results.data;
    }, function (error) {
        //alert(error.data.message);
    });


}]);

'use strict';
app.controller("extCsiQCController", ['$scope', '$routeParams', 'extCsiQCService', 'SharedDataService', function ($scope, $routeParams, extCsiQCService, SharedDataService) {

    $scope.ShareData = SharedDataService;

    var id = $routeParams.id;

    extCsiQCService.GetCSIQC(id).then(function (results) {

        $scope.csiQualityCriterias = results.data;

        angular.forEach($scope.csiQualityCriterias, function(csiQualityCriterias){
                    $scope.ShareData.totalIV = $scope.ShareData.totalIV + (csiQualityCriterias.Importance * csiQualityCriterias.Value);
                    $scope.ShareData.totalV5 = $scope.ShareData.totalV5 + (csiQualityCriterias.Value *5);
                    $scope.ShareData.total =(Math.round((($scope.ShareData.totalIV/$scope.ShareData.totalV5) * 5) * 10) / 10);
             });


    }, function (error) {
        //alert(error.data.message);
    });


}]);
