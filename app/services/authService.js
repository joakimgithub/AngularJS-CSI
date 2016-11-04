/*
This AngularJS service will be responsible for signing up new users, log-in/log-out registered users, and store the generated token in client local storage so this token can be sent with each request to access secure resources on the back-end API, the code for AuthService
*/

'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false,
        isAdmin:  false,
        customerId: null,
        role:   ""
    };


    var _saveRegistration = function (registration) {
        return $http.post(serviceBase + 'api/Account/AddUser', registration).then(function (response) {
            return response;
        });
    };


    var _updateUser = function (user) {
        return $http.post(serviceBase + 'api/Account/ModifyUser', user).then(function (response) {
            return response;
        });
    };


    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        if (loginData.useRefreshTokens) {
            data = data + "&client_id=" + ngAuthSettings.clientId;
        }

        var deferred = $q.defer();

        $http.post(serviceBase + 'Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false, isAdmin: response.isAdmin, customerId: response.customerId});

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.useRefreshTokens = loginData.useRefreshTokens;
            _authentication.customerId = response.customerId;
            _authentication.role = "";
            if(response.isAdmin === "True")
            {
                _authentication.isAdmin = true;
                _authentication.role = "(Admin)";
            }
            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = false;
        _authentication.isAdmin = false;
        _authentication.customerId = null;
        _authentication.role = "";
    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
            _authentication.isAdmin = authData.isAdmin;
            _authentication.customerId = authData.customerId;
            _authentication.role = "";
            if(authData.isAdmin) _authentication.role = "(Admin)";
        }

    };


    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;


    return authServiceFactory;
}]);
