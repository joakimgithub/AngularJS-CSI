'use strict';
app.factory('intCustomerService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {

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
                templateUrl: '/app/intCustomerView/intCustomerCopyModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Copy Customer',
                headerText: 'Make a copy of Customer: ' + customerToIns + '?',
                bodyText: 'Are you sure you want to Copy this Customer?',
                customer: newCustomer
            };

        modalService.showModal(modalInsertDefaults, modalOptions).then(function (result) {

            return $http.post$http.post(url, customer); (serviceBase + 'api/AddCustomer', customer).then(function (results) {
                return results;
            });
        });
    };

    intCustomerServiceFactory.getCustomerList = _getCustomerList;
    intCustomerServiceFactory.getCustomer = _copyCustomer;

    return intCustomerServiceFactory;
}]);

