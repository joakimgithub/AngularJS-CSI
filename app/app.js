
var app = angular.module('CsiApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ui.bootstrap']);


var serviceBase = 'http://A01C01101C/CsiServiceWT/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngCsiApp'
});


app.config(function ($routeProvider) {

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/intCustomer", {
        controller: "intCustomerController",
        templateUrl: "/app/views/intCustomer.html"
    });

    $routeProvider.when("/intCsi", {
        controller: "intCsiController",
        templateUrl: "/app/views/intCsi.html"
    });

    $routeProvider.when("/extCustomer", {
        controller: "extCustomerController",
        templateUrl: "/app/views/extCustomer.html"
    });

    $routeProvider.when("/extCsi/:id?", {
        controller: "extCsiController",
        templateUrl: "/app/views/extCsi.html"
    });

    $routeProvider.when("/extCSIListForCustomer", {
        controller: "extCSIListForCustomerController",
        templateUrl: "/app/views/extCSIListForCustomer.html"
    });

    $routeProvider.when("/users", {
        controller: "usersController",
        templateUrl: "/app/views/users.html"
    });

    $routeProvider.otherwise({ redirectTo: "/login" });

});


/*Configuration blocks - get executed during the provider registrations and configuration phase. Only providers and constants can be injected into configuration blocks. This is to prevent accidental instantiation of services before they have been fully configured.*/
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});


/*Run blocks - get executed after the injector is created and are used to kickstart the application. Only instances and constants can be injected into run blocks. This is to prevent further system configuration during application run time.
Run blocks are the closest thing in Angular to the main method. A run block is the code which needs to run to kickstart the application. It is executed after all of the service have been configured and the injector has been created.*/
app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


