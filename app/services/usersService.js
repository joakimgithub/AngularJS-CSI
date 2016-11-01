'use strict';
app.factory('usersService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var usersServiceFactory = {};

    var _getUserList = function () {

        return $http.get(serviceBase + 'api/Account/UsersList').then(function (results) {
            return results;
        });
    };

    usersServiceFactory.getUserList = _getUserList;

    return usersServiceFactory;

}]);
