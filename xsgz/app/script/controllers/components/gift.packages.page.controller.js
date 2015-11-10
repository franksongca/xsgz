/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('GiftPackagesPageCtrl', [
    '$rootScope',
    '$scope',
    '$controller',
    '$state',
    'SimpleModal',
    'Constants',
    'GiftPackagesDataFactory',
    'TranslateFactory',
    'AppManagerFactory',
    function (
        $rootScope,
        $scope,
        $controller,
        $state,
        SimpleModal,
        Constants,
        GiftPackagesDataFactory,
        TranslateFactory,
        AppManagerFactory
    ) {
        $scope.packageInfo = {packageName: '',currentPackage: 0 };
        $controller('GiftPackagesBaseCtrl', {$scope: $scope});

        $scope.setFeatureStatus(-1);

        $scope.updateActionBar({
            datePicker: false,
            returnButton: true,
            printButton: false,
            uploadButton: false
        });

        $scope.buttons = [{key: 'ACTION_CREATE_NEW', action: 'NEW'}, {key: 'ACTION_UPDATE_OLD', action: 'UPDATE'}, {key: 'CANCEL', action: 'CANCEL'}];

        $scope.$on('$viewContentLoaded', function () {
            var loginStatus = AppManagerFactory.getLoginStatus();
            if (loginStatus) {
                $scope.getData();
            } else {
                $state.go('home');
            }
        });

        $scope.onClick = function (action) {
            switch (action) {
                case 'CANCEL':
                    $scope.close();
                    break;

                case 'NEW':
                    $scope.spinnerOn({useTransparentBackground: true, msg: $scope.getWaitingText()});
                    GiftPackagesDataFactory.saveNewPackage(
                        $scope.packageInfo.packageName,
                        $scope.getUpdatedQuantities()
                    ).then(
                        function () {
                            $scope.loadPackages();
                            //GiftPackagesDataFactory.addNewGiftPackageLocally({
                            //    id: newPackageId,
                            //    name: $scope.packageInfo.packageName,
                            //    quantities: $scope.getUpdatedQuantities().split(',')
                            //});
                            $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                        },
                        function () {
                            $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                            SimpleModal.openAlert('FAILED_CREATE_GIFT_PACKAGE');
                        }
                    );
                    break;

                case 'UPDATE':
                    $rootScope.$broadcast(Constants.EVENTS.SPINNER_ON_EVENT, {type: 'main-spinner', useTransparentBackground: true});
                    GiftPackagesDataFactory.updatePackage(
                        $scope.packagesAndProducts.giftPackages[$scope.packageInfo.currentPackage].id,
                        $scope.packageInfo.packageName,
                        $scope.getUpdatedQuantities().split(',')
                    ).then(
                        function () {
                            GiftPackagesDataFactory.updateGiftPackageLocally(
                                $scope.packageInfo.currentPackage,
                                $scope.packageInfo.packageName,
                                $scope.getUpdatedQuantities()
                            );
                            $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                        },
                        function () {
                            $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                            SimpleModal.openAlert('GENERIC');
                        }
                    );
                    break;
            }
        };

        function checkCurrentPackageChanged() {
            var changed = false;
            if ($scope.packageInfo.packageName !== $scope.packagesAndProducts.giftPackages[$scope.packageInfo.currentPackage].name) {
                changed = true;
            }
            if (!changed) {
                var quantities = createPackageQuantitiesArray();

                if (!angular.equals($scope.packagesAndProducts.giftPackages[$scope.packageInfo.currentPackage].quantities, quantities)) {
                    changed = true;
                }
            }

            return changed;
        }

        function createPackageQuantitiesArray() {
            var quantities = [];
            for(var i = 0; i < $scope.packagesAndProducts.length; i++) {
                quantities.push($scope.packagesAndProducts[i].quantities.join(','));
            }
            return quantities;
        }

    }]
);
