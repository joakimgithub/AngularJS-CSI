'use strict';
app.factory('extCSIListForCustomerService', ['$http', 'ngAuthSettings','localStorageService', function ($http, ngAuthSettings, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authData = localStorageService.get('authorizationData');
    var id = authData.customerId;
    var extCSIListForCustomerFactory = {};

    var _getCSIListForCustomer = function () {

        return $http.get(serviceBase + 'api/GetCSIListForCustomer/id').then(function (results) {
            return results;//api/GetCSIListForCustomer/{id}
        });
    };

    extCSIListForCustomerFactory.getCSIListForCustomer = _getCSIListForCustomer;

    return extCSIListForCustomerFactory;

}]);
