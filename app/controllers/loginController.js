'use strict';
app.controller('loginController', ['$scope', '$location', 'authService', 'ngAuthSettings', 'localStorageService',
                                   function ($scope, $location, authService, ngAuthSettings, localStorageService) {

    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: false,
        isAdmin:  false,
        customerId: 0
    };

    $scope.message = "";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {

            var authData = localStorageService.get('authorizationData');
            if(authData.isAdmin)
                $location.path('/intCustomer');
            else
                $location.path('/extCSIListForCustomer');

        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

/*    $scope.authExternalProvider = function (provider) {

        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

    $scope.authCompletedCB = function (fragment) {

        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                authService.logOut();

                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to csis
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                authService.obtainAccessToken(externalData).then(function (response) {

                    $location.path('/extCsi');

                },
             function (err) {
                 $scope.message = err.error_description;
             });
            }

        });
    }*/
}]);
