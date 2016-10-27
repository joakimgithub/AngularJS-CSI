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
            modalInsertDefaults = {
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

        modalPopUpService.showModal(modalInsertDefaults, modalOptions).then(function (result) {
            return $http.post$http.post(url, customer); (serviceBase + 'api/AddCustomer', customer).then(function (results) {
                return results;
            });
        });
    };

    intCustomerServiceFactory.getCustomerList = _getCustomerList;
    intCustomerServiceFactory.copyCustomer = _copyCustomer;

    return intCustomerServiceFactory;
}]);

