'use strict';
app.controller('intSignupController', ['$scope', '$location', '$timeout', 'authService', 'intCustomerService', function ($scope, $location, $timeout, authService, intCustomerService) {

    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        Email: "",
        Password: "",
        ConfirmPassword: "",
        FirstName: "",
        LastName: "",
        CustomerId: "",
        IsAdmin: false
    };

    // *******************************************
    // Get all customers for a list of value
    // *******************************************
    intCustomerService.getCustomerList().then(function (results) {
        $scope.lovCustomers = results.data;
    }, function (error) {
        //alert(error.data.message);
    });

    $scope.signUp = function () {
        authService.saveRegistration($scope.registration).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "User has been registered successfully";
            startTimer();

        },function (response) {
             var errors = [];
             for (var key in response.data.ModelState) {
                 for (var i = 0; i < response.data.ModelState[key].length; i++) {
                     errors.push(response.data.ModelState[key][i]);
                 }
             }
             $scope.message = "Failed to register user due to:" + errors.join(' ');
         });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/intUser');
        }, 2000);
    }

}]);
