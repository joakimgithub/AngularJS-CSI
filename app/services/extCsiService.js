'use strict';
app.factory('extCsiService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var extCsiServiceFactory = {};

    var _GetCSI = function (id) {

        return $http.get(serviceBase + 'api/GetCSI/'+id).then(function (results) {
            return results;
        });
    };

    extCsiServiceFactory.GetCSI = _GetCSI;

    return extCsiServiceFactory;

}]);

'use strict';
app.factory('extCsiQCService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var extCsiQCServiceFactory = {};

    var _GetCSIQC = function (id) {
        return $http.get(serviceBase + 'api/GetQualityCriteriaListForCSI/'+id).then(function (results) {
            return results;
        });
    };

    var _SaveCsiQC = function (data) {
        return $http.post(serviceBase + 'api/GetQualityCriteriaListForCSI/'+id).then(function (results) {
            return results;
        });
    };

    extCsiQCServiceFactory.GetCSIQC = _GetCSIQC;
    extCsiQCServiceFactory.SaveCsiQC = _SaveCsiQC;

    return extCsiQCServiceFactory;

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
