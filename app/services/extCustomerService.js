'use strict';
app.factory('extCustomerService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var extCustomerFactory = {};

    var _getCustomerList = function () {

        return $http.get(serviceBase + 'api/GetCustomerList').then(function (results) {
            return results;
        });
    };

    extCustomerFactory.getCustomerList = _getCustomerList;

    return extCustomerFactory;

}]);
