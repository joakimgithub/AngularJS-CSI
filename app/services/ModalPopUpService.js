'use strict';
app.factory('modalPopUpService', ['$uibModal', function ($uibModal) {
    
    var modalPopUpServiceFactory = {};
    
    var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/app/views/ModalPopUp.html'
        },
        modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

    var _showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) {
            customModalDefaults = {};
        }
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    var _show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {},
            tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $uibModalInstance) {
                $scope.modalOptions = tempModalOptions;

                $scope.modalOptions.ok = function (result) {
                    $uibModalInstance.close(result);
                };

                $scope.modalOptions.close = function (result) {
                    $uibModalInstance.dismiss('cancel');
                };
            };
        }
        return $uibModal.open(tempModalDefaults).result;
    };
    
    modalPopUpServiceFactory.showModal = _showModal;
    modalPopUpServiceFactory.show = _show;

    return modalPopUpServiceFactory;    
}])
