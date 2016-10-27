'use strict';
app.factory('csisService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var csisServiceFactory = {};

    var _getCsis = function () {

        return $http.get(serviceBase + 'api/GetCSIList').then(function (results) {
            return results;
        });
    };

    csisServiceFactory.getCsis = _getCsis;

    return csisServiceFactory;

}]);
