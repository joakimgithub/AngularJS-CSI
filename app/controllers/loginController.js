'use strict';
app.controller('loginController', ['$scope', '$location', 'authService', 'ngAuthSettings', 'localStorageService',
    function($scope, $location, authService, ngAuthSettings, localStorageService) {

        $scope.loginData = {
            userName: "",
            password: "",
            useRefreshTokens: false,
            isAdmin: false,
            customerId: 0
        };

        $scope.message = "";

        $scope.login = function() {
            authService.login($scope.loginData)
                .then(function(response) {
                        if (authService.authentication.isAdmin === "True")
                            $location.path('/intCustomer');
                        else
                            $location.path('/extCSIListForCustomer');
                    },
                    function(err) {
                        $scope.message = err.error_description;
                    }
                );
        };


    }
]);
