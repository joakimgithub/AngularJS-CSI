'use strict';
app.factory('intCsiService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var intCsiServiceFactory = {};

    var _GetCSI = function (id) {

        return $http.get(serviceBase + 'api/GetCSI/'+id).then(function (results) {
            return results;
        });
    };

    intCsiServiceFactory.GetCSI = _GetCSI;

    return intCsiServiceFactory;

}]);

'use strict';
app.factory('intCsiQCService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var intCsiQCServiceFactory = {};

    var _GetCSIQC = function (id) {
        return $http.get(serviceBase + 'api/GetQualityCriteriaListForCSI/'+id).then(function (results) {
            return results;
        });
    };

    var _SaveCsiQC = function (csiQC) {
        // Tagits bort
        if (csiQC.isDeleted)
        {
            return $http.delete(serviceBase + '/api/DeleteQualityCriteria/'+ csiQC.Id).then(function (results) {
                return results;
            });
        }
        // Lagts till
        else if (csiQC.isNew) {
            // If its new let the db set id
            return $http.post(serviceBase + 'api/AddQualityCriteria', csiQC).then(function (results) {
                return results;
            });
        }
        // Uppdaterats
        else
        {
            return $http.put(serviceBase + 'api/ModifyQualityCriteria/' + csiQC.Id, csiQC).then(function (results) {
                return results;
            });
        }
    };

    intCsiQCServiceFactory.GetCSIQC = _GetCSIQC;
    intCsiQCServiceFactory.SaveCsiQC = _SaveCsiQC;

    return intCsiQCServiceFactory;

}]);

// *** Services ***
// Service SharedDataService
app.service('SharedDataService', function () {
        'use strict';
        var ShareData = {
            Id_Csi: null,
            totalIV: 0,
            totalV5: 0,
            total: 0};
        return ShareData;
    })  // End SharedDataService
