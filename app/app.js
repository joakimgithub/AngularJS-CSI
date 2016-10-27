
var app = angular.module('CsiApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: "/app/views/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "/app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "/app/views/associate.html"
    });

    $routeProvider.when("/csis", {
        controller: "csisController",
        templateUrl: "/app/views/csis.html"
    });

    $routeProvider.when("/intCustomer", {
        controller: "intCustomerController",
        templateUrl: "/app/views/intCustomer.html"
    });

    $routeProvider.when("/extCustomer", {
        controller: "extCustomerController",
        templateUrl: "/app/views/extCustomer.html"
    });

    $routeProvider.when("/extCsi", {
        controller: "extCsiController",
        templateUrl: "/app/views/extCsi.html"
    });

    $routeProvider.when("/extCSIListForCustomer", {
        controller: "extCSIListForCustomerController",
        templateUrl: "/app/views/extCSIListForCustomer.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

});

//var serviceBase = 'http://localhost:26264/';
//var serviceBase = 'http://ngauthenticationapi.azurewebsites.net/';
var serviceBase = 'http://A01C01101C/CsiServiceWT/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngCsiApp'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


