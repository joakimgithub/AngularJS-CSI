'use strict';
app.factory('extCSIListForCustomerService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var extCSIListForCustomerFactory = {};

    var _getCSIListForCustomer = function () {

        return $http.get(serviceBase + 'api/GetCSIListForCustomer/1').then(function (results) {
            return results;//api/GetCSIListForCustomer/{id}
        });
    };

    extCSIListForCustomerFactory.getCSIListForCustomer = _getCSIListForCustomer;

    return extCSIListForCustomerFactory;

}]);
