'use strict';
app.controller("extCsiController", ['$scope', '$routeParams', 'extCsiService','SharedDataService', function ($scope, $routeParams, extCsiService, SharedDataService) {

    $scope.ShareData = SharedDataService;
    var id = $routeParams.id;

    extCsiService.GetCSI(id).then(function (results) {
        $scope.csi = results.data;
        $scope.ShareData.Id_Csi = $scope.csi.Id;
    }, function (error) {
        alert(error.data.message);
    });


}]);

'use strict';
app.controller("extCsiQCController", ['$scope', '$routeParams', 'extCsiQCService', 'SharedDataService', '$filter', '$http', '$q', function ($scope, $routeParams, extCsiQCService, SharedDataService, $filter, $http, $q) {

     // filter csiQC to show
    $scope.filterCsiQC = function(csiQC) {
        return csiQC.isDeleted !== true;
    };

    // mark csiQC as deleted
    $scope.deleteCsiQC = function(id) {
        debugger
        var filtered = $filter('filter')($scope.csiQualityCriterias, {Id: id});
        if (filtered.length) {
            filtered[0].isDeleted = true;
        }
    };

    // add csiQC
    $scope.addCsiQC = function() {
        $scope.csiQualityCriterias.push({
            Id: $scope.csiQualityCriterias.length+1,
            Id_Csi: $scope.ShareData.Id_Csi,
            QualityCriteria: '',
            Importance: null,
            Value: null,
            isNew: true
        });
    };

    // cancel all changes
    $scope.cancel = function() {
        for (var i = $scope.csiQualityCriterias.length; i--;) {
            var csiQC = $scope.csiQualityCriterias[i];
            // undelete
            if (csiQC.isDeleted) {
                delete csiQC.isDeleted;
            }
            // remove new
            if (csiQC.isNew) {
                $scope.csiQualityCriterias.splice(i, 1);
            }
        };
    };

    // save edits
    $scope.saveTable = function() {
        var results = [];
        for (var i = $scope.csiQualityCriterias.length; i--;) {
            var csiQC = $scope.csiQualityCriterias[i];
            // actually delete csiQC
            if (csiQC.isDeleted) {
                $scope.csiQualityCriterias.splice(i, 1);
            }
            results.push(extCsiQCService.SaveCsiQC(csiQC));
        }

        $scope.ShareData.totalIV = 0;
        $scope.ShareData.totalV5 = 0;
        $scope.ShareData.total = 0;
        angular.forEach($scope.csiQualityCriterias, function(csiQualityCriteria){
            // Passar på att sätt isNew till false
            csiQualityCriteria.isNew = false;
            // Räknar ut Index för bedömningen
            $scope.ShareData.totalIV = $scope.ShareData.totalIV + (csiQualityCriteria.Importance * csiQualityCriteria.Value);
            $scope.ShareData.totalV5 = $scope.ShareData.totalV5 + (csiQualityCriteria.Value *5);
            $scope.ShareData.total =(Math.round((($scope.ShareData.totalIV/$scope.ShareData.totalV5) * 5) * 10) / 10);
        });

        return $q.all(results);
    };

    $scope.ShareData = SharedDataService;

    var id = 1;    //$routeParams.ID;

    extCsiQCService.GetCSIQC(id).then(function (results) {
        $scope.csiQualityCriterias = results.data;

        angular.forEach($scope.csiQualityCriterias, function(csiQualityCriteria){
            // Passar på att sätt isNew till false
            csiQualityCriteria.isNew = false;
            // Räknar ut Index för bedömningen
            $scope.ShareData.totalIV = $scope.ShareData.totalIV + (csiQualityCriteria.Importance * csiQualityCriteria.Value);
            $scope.ShareData.totalV5 = $scope.ShareData.totalV5 + (csiQualityCriteria.Value *5);
            $scope.ShareData.total =(Math.round((($scope.ShareData.totalIV/$scope.ShareData.totalV5) * 5) * 10) / 10);
        });
    }, function (error) {
        alert(error.data.message);
    });
}]);
