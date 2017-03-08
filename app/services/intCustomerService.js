'use strict';
app.factory('intCustomerService', ['$http', '$uibModal', 'ngAuthSettings', 'modalPopUpService', function ($http, $uibModal, ngAuthSettings, modalPopUpService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var intCustomerServiceFactory = {};

    // ************************
    // Get Customers
    // ************************
    var _getCustomerList = function () {
        return $http.get(serviceBase + 'api/GetCustomerList').then(function (results) {
            return results;
        });
    };

    // ************************
    // Modal for Customer copy
    // ************************
    var _copyCustomer = function (customer) {
        var newCustomer = {CustomerCode: customer.CustomerCode, CustomerName: customer.CustomerName, CustomerEmail: customer.CustomerEmail, Active: customer.Active};
        var customerToIns = customer.Id + ' ' + customer.CustomerCode,

        // ************************
        // Modal for Company copy
        // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'app/views/modalViews/intCustomerCopyModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Copy Company',
                headerText: 'Make a copy of Customer: ' + customerToIns + '?',
                bodyText: 'Are you sure you want to Copy this Customer?',
                customer: newCustomer
            };

        return modalPopUpService.showModal(modalDefaults, modalOptions).then(function (result) {
            return $http.post(serviceBase + 'api/AddCustomer', newCustomer).then(function (results) {
                return results;
            });
        });
    };

    // ************************
    // Add Company
    // ************************
    var _addCustomer = function () {
        var newCustomer = newEmptyCustomer(),
        // ************************
        // Modal for Add Company
        // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'app/views/modalViews/intCustomerInsertModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Create Company',
                headerText: 'Insert',
                bodyText: 'Are you sure you want to insert this Customer?',
                customer: newCustomer
            };

        return modalPopUpService.showModal(modalDefaults, modalOptions).then(function (result) {
            return $http.post(serviceBase + 'api/AddCustomer', newCustomer).then(function (results) {
                return results;
            });
        });
    };

    // ************************
    // update Company
    // ************************
    var _updateCustomer = function (customer) {
        var updateCustomer = {Id: customer.Id, CustomerCode: customer.CustomerCode, CustomerName: customer.CustomerName, CustomerEmail: customer.CustomerEmail, Active: customer.Active};

        var customerToUpd = customer.Id + ' ' + customer.CustomerCode,
            // ************************
            // Modal for Company update
            // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'app/views/modalViews/intCustomerUpdateModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Update Company',
                headerText: 'Update ' + customerToUpd + '?',
                bodyText: 'Are you sure you want to update this Company?',
                customer: updateCustomer
            };

            return modalPopUpService.showModal(modalDefaults, modalOptions).then(function (result) {
                return $http.put(serviceBase + 'api/ModifyCustomer/' + updateCustomer.Id, updateCustomer).then(function (results) {
                    return results;
                });
            });
        };

    // ************************
    // delete Customer
    // ************************
    var _deleteCustomer = function (customer) {
        var customerToDel = customer.CustomerName,

        // ************************
        // Modal for Company delete
        // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'app/views/modalViews/intCustomerDeleteModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Company',
                headerText: customerToDel + ' will be deleted',
                bodyText: 'Are you sure ?',
                customer: customer
            };

        return modalPopUpService.showModal(modalDefaults, modalOptions).then(function (result) {
            return $http.delete(serviceBase + 'api/DeleteCustomer/' + customer.Id).then(function (results) {
                return results;
            });
        });
    };


    var newEmptyCustomer = function () {
        var customer = {
            CustomerCode: null,
            CustomerName: null,
            CustomerEmail: null,
            Active: null,
            Created: null,
            CreatedBy: null,
            Updated: null,
            UpdatedBy: null
        };
        return customer;
    };

    intCustomerServiceFactory.getCustomerList = _getCustomerList;
    intCustomerServiceFactory.copyCustomer = _copyCustomer;
    intCustomerServiceFactory.addCustomer = _addCustomer;
    intCustomerServiceFactory.updateCustomer = _updateCustomer;
    intCustomerServiceFactory.deleteCustomer = _deleteCustomer;

    return intCustomerServiceFactory;
}]);

