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
        // Modal for Customer copy
        // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/app/views/intCustomerCopyModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Copy Customer',
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
    // Add Customer
    // ************************
    var _addCustomer = function () {
        var newCustomer = newEmptyCustomer(),
        // ************************
        // Modal for Add Customer
        // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/app/views/intCustomerInsertModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Insert Customer',
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
    // update Customer
    // ************************
    var _updateCustomer = function (customer) {
        var updateCustomer = {Id: customer.Id, CustomerCode: customer.CustomerCode, CustomerName: customer.CustomerName, CustomerEmail: customer.CustomerEmail, Active: customer.Active};
        var customerToUpd = customer.Id + ' ' + customer.CustomerCode,

            // ************************
            // Modal for Customer update
            // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/app/views/intCustomerUpdateModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Update Customer',
                headerText: 'Update ' + customerToUpd + '?',
                bodyText: 'Are you sure you want to update this Customer?',
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
        var customerToDel = customer.Id + ' ' + customer.CustomerCode,

        // ************************
        // Modal for Customer delete
        // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/app/views/intCustomerDeleteModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Customer',
                headerText: 'Delete ' + customerToDel + '?',
                bodyText: 'Are you sure you want to delete this Customer?',
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

