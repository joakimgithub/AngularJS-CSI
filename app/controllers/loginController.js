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
                        if (authService.authentication.isAdmin === true)
                            $location.path('/intCustomer');
                        else
                            $location.path('/extCSIListForCustomer');
                    },
                    function(err) {
                        if(err == null || err.error_description == null)
                            $scope.message = "Error in loginController WebCsi";
                        else
                            $scope.message = err.error_description;
                    }
                );
        };


    }
]);
