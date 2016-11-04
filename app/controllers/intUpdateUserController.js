'use strict';
app.controller('intUpdateUserController', ['$scope', '$routeParams', '$location', '$timeout', 'authService', 'intCustomerService', function ($scope, $routeParams, $location, $timeout, authService, intCustomerService) {

    $scope.theUserInt = $routeParams.theUser;
    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.user = {
        Id: $scope.theUserInt.Id,
        FirstName: [$scope.theUserInt].FirstName,
        //LastName: $scope.theUser.LastName,
        //Email: $scope.theUser.Email,
        //CustomerId: $scope.theUser.CustomerId,
        //CustomerName: $scope.theUser.CustomerName,
        //IsAdmin: $scope.theUser.IsAdmin
    };


       $scope.fake = "";

/* POST /api/Account/ModifyUser {
  "Id": "string",
  "UserName": "string",
  "FirstName": "string",
  "LastName": "string",
  "Email": "string",
  "CustomerId": 0,
  "CustomerName": "string",
  "IsAdmin": true
}
  */
    // *******************************************
    // Get all customers for a list of value
    // *******************************************
    intCustomerService.getCustomerList().then(function (results) {
        $scope.lovCustomers = results.data;
    }, function (error) {
        //alert(error.data.message);
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
