'use strict';
app.controller('intUpdateUserController', ['$scope', '$routeParams', '$location', '$timeout', 'authService', 'intCustomerService', function ($scope, $routeParams, $location, $timeout, authService, intCustomerService) {

    $scope.user2 = $routeParams.theUser;
    $scope.user = angular.fromJson($routeParams.theUser);
    $scope.savedSuccessfully = false;
    $scope.message = "";


    // *******************************************
    // Get all customers for a list of value
    // *******************************************
    intCustomerService.getCustomerList().then(function (results) {
        $scope.Customers = results.data;
    }, function (error) {
        alert(error.data.message);
    });

    $scope.addUser = function (user) {
        authService.updateUser($scope.user).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "User has been updated successfully";
            startTimer();

        },function (response) {
             var errors = [];
             for (var key in response.data.ModelState) {
                 for (var i = 0; i < response.data.ModelState[key].length; i++) {
                     errors.push(response.data.ModelState[key][i]);
                 }
             }
             $scope.message = "Failed to update user due to:" + errors.join(' ');
         });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/intUser');
        }, 2000);
    }

}]);
