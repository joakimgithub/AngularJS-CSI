'use strict';
app.controller("intUserController", ['$scope', '$location','authService', 'intUserService', 'intCustomerService', function ($scope, $location, authService, intUserService, intCustomerService) {

    $scope.pageTitle = 'Users';

    intUserService.getUserList().then(function (results) {
        $scope.users = results.data;
    }, function (error) {
        //alert(error.data.message);
    });


    // ************************
    // Add user old
    // ************************
/*    $scope.addUser = function () {
        intUserService.addUser().then(function (results) {
            $scope.user = results.data;
            $scope.refresh();
        }, function (error) {
            if (error != "Cancel")
              alert(error.data.message);
        });
    };*/

    // ************************
    // Update user
    // ************************
//    $scope.updateUser = function (theUser) {
//        //$location.path('/intUpdateUser/?' + theUser);
//            authService.updateUser(theUser).then(function (results) {
//            $scope.user = results.data;
//            $scope.refresh();
//        }, function (error) {
//            if (error != "Cancel")
//              alert(error.data.message);
//        });
//    };

    // ************************
    // Update user
    // ************************
    $scope.updateUser = function (theUser) {
        authService.updateUser(theUser).then(function (response) {
            $scope.savedSuccessfully = true;
            $scope.message = "User has been updated successfully";
            $scope.refresh();
        },function (response) {
             var errors = [];
//             for (var key in response.data.ModelState) {
//                 for (var i = 0; i < response.data.ModelState[key].length; i++) {
//                     errors.push(response.data.ModelState[key][i]);
//                 }
//             }
             $scope.message = "Failed to update user due to:" + errors.join(' ');
         });
    };


    // ************************
    // Delete user
    // ************************
    $scope.deleteUser = function (user) {
        intUserService.deleteUser(user).then(function (results) {
            $scope.user = results.data;
            $scope.refresh();
        }, function (error) {
            if (error != "Cancel")
              alert(error.data.message);
        });
    };

    // *******************************************
    // Get all customers for a list of value
    // *******************************************
    intCustomerService.getCustomerList().then(function (results) {
        $scope.Customers = results.data;
    }, function (error) {
        alert(error.data.message);
    });

    $scope.refresh = function(){
        intUserService.getUserList().then(function (results) {
            $scope.users = results.data;
        }, function (error) {
            alert(error.data.message);
        });
    }

}]);

