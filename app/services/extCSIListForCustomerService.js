'use strict';
app.factory('extCSIListForCustomerService', ['$http', 'ngAuthSettings','localStorageService', function ($http, ngAuthSettings, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authData = localStorageService.get('authorizationData');
    var id = authData.customerId;
    var extCSIListForCustomerFactory = {};

    var _getCSIListForCustomer = function () {

        var ref = serviceBase + 'api/GetCSIListForCustomer/'+id;
        return $http.get(ref).then(function (results) {
            return results;//api/GetCSIListForCustomer/{id}
        });
    };

    extCSIListForCustomerFactory.getCSIListForCustomer = _getCSIListForCustomer;

    return extCSIListForCustomerFactory;

}]);
