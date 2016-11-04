'use strict';
app.controller('intUserChangePasswordController', ['$scope', '$routeParams', '$location', '$timeout', 'authService', function ($scope, $routeParams, $location, $timeout, authService) {

    $scope.theUserInt = $routeParams.theUser;
    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.userPassword = {
        OldPassword: "",
        NewPassword: "",
        ConfirmPassword: ""
    }

/*    POST /api/Account/ChangePassword
      {
      "OldPassword": "string",
      "NewPassword": "string",
      "ConfirmPassword": "string"
      }
*/

    $scope.changePassword = function () {
        authService.changeUserPassword($scope.userPassword).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "Password has been updated successfully";
            startTimer();

        },function (response) {
             var errors = [];
             for (var key in response.data.ModelState) {
                 for (var i = 0; i < response.data.ModelState[key].length; i++) {
                     errors.push(response.data.ModelState[key][i]);
                 }
             }
             $scope.message = "Failed to update password due to:" + errors.join(' ');
         });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/intUser');
        }, 4000);
    }

}]);
