
var app = angular.module('CsiApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ui.bootstrap','xeditable']);


var serviceBase = 'http://A01C01263C/CsiServiceWithToken/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngCsiApp'
});


app.config(function ($routeProvider) {

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/views/login.html"
    });

    $routeProvider.when("/intCustomer", {
        controller: "intCustomerController",
        templateUrl: "app/views/intCustomer.html"
    });

    $routeProvider.when("/intCsi/:id?", {
        controller: "intCsiController",
        templateUrl: "app/views/intCsi.html"
    });

    $routeProvider.when("/intUser", {
        controller: "intUserController",
        templateUrl: "app/views/intUser.html"
    });

    $routeProvider.when("/intSignup", {
        controller: "intSignupController",
        templateUrl: "app/views/intSignup.html"
    });

    $routeProvider.when("/intUpdateUser/:theUser?", {
        controller: "intUpdateUserController",
        templateUrl: "app/views/intUpdateUser.html"
    });

    $routeProvider.when("/intCSIListForCustomer/:id?", {
        controller: "intCSIListForCustomerController",
        templateUrl: "app/views/intCSIListForCustomer.html"
    });

    $routeProvider.when("/intUserChangePassword/:id?", {
        controller: "intUserChangePasswordController",
        templateUrl: "app/views/intUserChangePassword.html"
    });

    $routeProvider.when("/extCsi/:id?", {
        controller: "extCsiController",
        templateUrl: "app/views/extCsi.html"
    });

    $routeProvider.when("/extCSIListForCustomer/", {
        controller: "extCSIListForCustomerController",
        templateUrl: "app/views/extCSIListForCustomer.html"
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


