'use strict';
app.factory('intCsiService', ['$http', '$uibModal', 'ngAuthSettings', 'modalPopUpService', function ($http, $uibModal, ngAuthSettings, modalPopUpService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var intCsiServiceFactory = {};

    // ************************
    // Get Csis
    // ************************
    var _getCsiList = function () {
        return $http.get(serviceBase + 'api/GetCsiList').then(function (results) {
            return results;
        });
    };

    // ************************
    // Modal for CSI copy
    // ************************
    var _copyCsi = function (csi) {
        var newCsi = {
                Id_Customer: csi.Id_Customer,
                Id_Status: csi.Id_Status,
                ClientName: csi.ClientName,
                ClientEmail: csi.ClientEmail,
                InitiatedByClient: csi.InitiatedByClient,
                AccountManagerName: csi.AccountManagerName,
                AccountManagerEmail: csi.AccountManagerEmail,
                Engagement: csi.Engagement,
                ProjectNumber: csi.ProjectNumber,
                DeliveryUnit: csi.DeliveryUnit,
                InitiationDate: csi.InitiationDate,
                Consultants: csi.Consultants,
                PlannedDateForFollowUp: csi.PlannedDateForFollowUp,
                FollowedUpDate: csi.FollowedUpDate,
                FollowedUpByClient: csi.FollowedUpByClient,
                SimpleCSI: csi.SimpleCSI};

        var CsiToIns = csi.Id + ' ' + csi.Engagement,

        // ************************
        // Modal for CSI copy
        // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/app/views/modalViews/intCsiCopyModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Copy CSI',
                headerText: 'Make a copy of CSI: ' + CsiToIns + '?',
                bodyText: 'Are you sure you want to Copy this CSI?',
                csi: newCsi
            };

        modalPopUpService.showModal(modalDefaults, modalOptions).then(function (result) {
            return $http.post(serviceBase + 'api/AddCSI', csi).then(function (results) {
                return results;
            });
        });
    };

    // ************************
    // Add CSI
    // ************************
    var _addCsi = function (csi) {
        var csi = $scope.newEmptyCsi(),
        // ************************
        // Modal for Add CSI
        // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/app/views/modalViews/intCsiInsertModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Insert CSI',
                headerText: 'Insert',
                bodyText: 'Are you sure you want to insert this CSI?',
                csi: csi
            };

        modalPopUpService.showModal(modalDefaults, modalOptions).then(function (result) {
            return $http.post(serviceBase + 'api/AddCsi', csi).then(function (results) {
                return results;
            });
        });;
    };

    // ************************
    // update CSI
    // ************************
    var _updateCsi = function (csi) {
       var updateCsi = {
                Id: csi.Id,
                Id_Customer: csi.Id_Customer,
                Id_Status: csi.Id_Status,
                ClientName: csi.ClientName,
                ClientEmail: csi.ClientEmail,
                InitiatedByClient: csi.InitiatedByClient,
                AccountManagerName: csi.AccountManagerName,
                AccountManagerEmail: csi.AccountManagerEmail,
                Engagement: csi.Engagement,
                ProjectNumber: csi.ProjectNumber,
                DeliveryUnit: csi.DeliveryUnit,
                InitiationDate: csi.InitiationDate,
                Consultants: csi.Consultants,
                PlannedDateForFollowUp: csi.PlannedDateForFollowUp,
                FollowedUpDate: csi.FollowedUpDate,
                FollowedUpByClient: csi.FollowedUpByClient,
                SimpleCSI: csi.SimpleCSI};

        var csiToUpd = csi.Id + ' ' + csi.Engagement,

            // ************************
            // Modal for CSI update
            // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/app/views/modalViews/intCsiUpdateModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Update CSI',
                headerText: 'Update ' + csiToUpd + '?',
                bodyText: 'Are you sure you want to update this CSI?',
                csi: updateCsi
            };

        modalPopUpService.showModal(modalDefaults, modalOptions).then(function (result) {
            return $http.put(serviceBase + 'api/ModifyCSI/' + updateCsi.Id, updateCsi).then(function (results) {
                return results;
            });
        });
    };

    // ************************
    // delete CSI
    // ************************
    var _deleteCsi = function (csi) {
        var csiToDel = csi.Id + ' ' + csi.Engagement,

        // ************************
        // Modal for CSI delete
        // ************************
            modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/app/views/modalViews/intCsiDeleteModal.html'
            },
            modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete CSI',
                headerText: 'Delete ' + csiToDel + '?',
                bodyText: 'Are you sure you want to delete this CSI?',
                csi: csi
            };

        modalPopUpService.showModal(modalDefaults, modalOptions).then(function (result) {
            return $http.delete(serviceBase + 'api/DeleteCSI/' + csi.Id).then(function (results) {
                return results;
            });
        });
    };


    var newEmptyCsi = function() {
            var csi = {
                Id: null,
                Id_Customer: null,
                Id_Status: null,
                ClientName: null,
                ClientEmail: null,
                InitiatedByClient: null,
                AccountManagerName: null,
                AccountManagerEmail: null,
                Engagement: null,
                ProjectNumber: null,
                DeliveryUnit: null,
                InitiationDate: null,
                Consultants: null,
                PlannedDateForFollowUp: null,
                FollowedUpDate: null,
                FollowedUpByClient: null,
                SimpleCSI: null,
                Created: null,
                CreatedBy: null,
                Updated: null,
                UpdatedBy: null
            };
            return csi;
        };

    intCsiServiceFactory.getCsiList = _getCsiList;
    intCsiServiceFactory.copyCsi = _copyCsi;
    intCsiServiceFactory.addCsi = _addCsi;
    intCsiServiceFactory.updateCsi = _updateCsi;
    intCsiServiceFactory.deleteCsi = _deleteCsi;

    return intCsiServiceFactory;
}]);

