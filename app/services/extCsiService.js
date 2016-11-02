'use strict';
app.factory('extCsisService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var extCsisServiceFactory = {};

    var _getCsis = function (id) {

        return $http.get(serviceBase + 'api/GetCSIList').then(function (results) {
            return results;
        });
    };

    extCsisServiceFactory.getCsis = _getCsis;

    return csisServiceFactory;

}]);
