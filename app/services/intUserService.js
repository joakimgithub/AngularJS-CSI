/*global app*/
app.factory('intUserService', ['$http', 'ngAuthSettings', 'modalPopUpService', '$uibModal', function ($http, ngAuthSettings, modalPopUpService, $uibModal) {
    'use strict';
    var serviceBase = ngAuthSettings.apiServiceBaseUri,
        intUserServiceFactory = {};

    var newEmptyUser = function () {
        var User = {
            Id: null,
            UserName: null,
            FirstName: null,
            LastName: null,
            Email: null,
            CustomerId: null,
            CustomerName: null,
            IsAdmin: null
        };
    };

    // ************************
    // Get Users
    // ************************
    var _getUserList = function () {
        return $http.get(serviceBase + 'api/Account/UsersList').then(function (results) {
            return results;
        });
    };


    // ************************
    // Add User
    // ************************
    var _addUser = function () {
        var newUser = newEmptyUser(),
        // ************************
        // Modal for Add User
        // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'app/views/ModalViews/intUserInsertModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Add User',
                headerText: 'Add',
                bodyText: 'Are you sure you want to Add this User?',
                User: newUser
            };

        return modalPopUpService.showModal(modalDefaults, modalOptions).then(function (result) {
            return $http.post(serviceBase + '/api/Account/AddUser', newUser).then(function (results) {
                return results;
            });
        });
    };

    // ************************
    // update User
    // ************************
    var _updateUser = function (User) {
        var updateUser =
            {
                Id: User.Id,
                UserName: User.UserName,
                FirstName: User.FirstName,
                LastName: User.LastName,
                Email: User.Email,
                CustomerId: User.CustomerId,
                CustomerName: User.CustomerName,
                IsAdmin: User.IsAdmin,
                Active: User.Active
            };
        var UserToUpd = User.Id + ' ' + User.UserCode,

            // ************************
            // Modal for User update
            // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'app/views/ModalViews/intUserUpdateModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Update User',
                headerText: 'Update ' + UserToUpd + '?',
                bodyText: 'Are you sure you want to update this User?',
                user: updateUser
            };

        return modalPopUpService.showModal(modalDefaults, modalOptions).then(function (result) {
            return $http.put(serviceBase + 'api/Account/ModifyUser/' + updateUser.Id, updateUser).then(function (results) {
                return results;
            });
        });
    };

    // ************************
    // delete User
    // ************************
    var _deleteUser = function (user) {
        var

        // ************************
        // Modal for User delete
        // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'app/views/ModalViews/intUserDeleteModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete User',
                headerText: user.UserName + ' will be deleted',
                bodyText: 'Are you sure ?',
                User: user
            };

        return modalPopUpService.showModal(modalDefaults, modalOptions).then(function (result) {
            return $http.post(serviceBase + 'api/Account/DeleteUser', user).then(function (results) {
                return results;
            });
        });
    };

    intUserServiceFactory.getUserList = _getUserList;
    intUserServiceFactory.addUser = _addUser;
    intUserServiceFactory.updateUser = _updateUser;
    intUserServiceFactory.deleteUser = _deleteUser;

    return intUserServiceFactory;

}]);
