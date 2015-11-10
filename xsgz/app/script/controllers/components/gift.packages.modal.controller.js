/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('GiftPackagesModalCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    '$controller',
    'SimpleModal',
    'Constants',
    'GiftPackagesDataFactory',
    'TranslateFactory',
    'AppManagerFactory',
    '$modalInstance',
    'options',
    function (
        $scope,
        $rootScope,
        $state,
        $controller,
        SimpleModal,
        Constants,
        GiftPackagesDataFactory,
        TranslateFactory,
        AppManagerFactory,
        $modalInstance,
        options
    ) {
        $scope.packageInfo = {packageName: '',currentPackage: 0 };
        $scope.mode = 'model';
        $scope.packageId = options.giftId;
        $controller('GiftPackagesBaseCtrl', {$scope: $scope});

        $scope.buttons = [{key: 'ACTION_SELECT', action: 'SELECT'}, {key: 'CANCEL', action: 'CANCEL'}];
        $scope.close = function () {
            console.log('CLOSE!!!!!!!!!!!!!!!!![modal returns NO]');
            $modalInstance.dismiss('cancel');
        };

        $scope.confirm = function () {
            console.log('CONFIRM!!!!!!!!!!!!!!!!![modal returns YES]');
            $modalInstance.close();
        };

        $modalInstance.opened.then(function() {
            $scope.getData();
        });

        $scope.onClick = function (action) {
            switch (action) {
                case 'CANCEL':
                    $scope.close();
                    break;

                case 'SELECT':
                    SimpleModal.open({
                        size: 'sm',
                        animationEnabled: true,
                        titleKey: 'ALERTING',
                        messageKey: 'ALERT_SELECT_GIFT_PACKAGE',
                        imageSrc: '/xsgz/assets/images/question-icon.png',
                        buttons: [{key: 'ACTION_YES', action: 'OK'}, {key: 'CANCEL', action: 'CANCEL'}]
                    }).then(
                        function (evt) {
                            saveSelectedPackageToOrders();
                        }
                    );
                    break;
            }
        };

        function saveSelectedPackageToOrders() {
            $rootScope.$broadcast(Constants.EVENTS.SPINNER_ON_EVENT, {type: 'main-spinner', msg: $scope.waitingTxt});
            GiftPackagesDataFactory.saveSelectedPackageToOrders({
                orderId: options.orderId,
                giftId: $scope.packagesAndProducts.giftPackages[$scope.packageInfo.currentPackage].id
            }).then(
                function () {
                    $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT, {type: 'main-spinner', onComplete: function () {
                        $rootScope.$broadcast(Constants.EVENTS.ORDERS_UPDATED);
                    }});
                },
                function () {
                    $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT, {type: 'main-spinner', onComplete: function () {
                        SimpleModal.openAlert('FAILED_UPDATE_GIFT_PACKAGE');
                    }});
                }
            );
        }
    }]
);
