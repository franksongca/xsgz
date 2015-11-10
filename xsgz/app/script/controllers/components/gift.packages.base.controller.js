/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('GiftPackagesBaseCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'Constants',
    'SimpleModal',
    'GiftPackagesDataFactory',
    'TranslateFactory',
    function (
        $scope,
        $rootScope,
        $state,
        Constants,
        SimpleModal,
        GiftPackagesDataFactory,
        TranslateFactory
    ) {
        $scope.packageInfo.currentPackage = 0;
        $scope.buttons = [];

        $scope.getData = function () {
            TranslateFactory.translate({
                keys: 'WAITING',
                type: 'MESSAGES'
            }).then(function (data) {
                $scope.waitingTxt = data['MESSAGES.WAITING'];

                $scope.loadPackages();
            });

        }

        $scope.loadPackages = function () {
            $rootScope.$broadcast(Constants.EVENTS.SPINNER_ON_EVENT, {type: 'main-spinner', useTransparentBackground: true});
            GiftPackagesDataFactory.getGiftPackagesData().then(function (data) {
                $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                init(data);
            }, function () {
                $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                SimpleModal.openAlert('GENERIC').then(function () {
                    $state.go('home', {action: Constants.FEATURES_HEADER_ACTIONS[1]});
                });
            });
        }

        $scope.getWaitingText = function () {
            return $scope.waitingTxt;
        };

        function init(data) {
            $scope.packagesAndProducts = data;
            $scope.totalGiftPackages = $scope.packagesAndProducts.giftPackages.length;

            if ($scope.mode === 'model') {
                $scope.packageInfo.currentPackage = GiftPackagesDataFactory.getGiftPackageIdIndex($scope.packageId);
            }
            changeToGiftPackage($scope.packageInfo.currentPackage);
        }

        function changeToGiftPackage(n) {
            var i, total = 0;

            $scope.total = 0;
            $scope.packageInfo.currentPackage = n;
            $scope.products = [];
            $scope.packageInfo.packageName = $scope.packagesAndProducts.giftPackages[n].name;
            for(i = 0; i < $scope.packagesAndProducts.unitPrices.length; i++) {
                $scope.products.push({
                    quantity: +$scope.packagesAndProducts.giftPackages[n].quantities[i],
                    unitPrice: (+$scope.packagesAndProducts.unitPrices[i]).toFixed(2),
                    unitName: $scope.packagesAndProducts.unitNames[i],
                    unitValue: (+$scope.packagesAndProducts.giftPackages[n].quantities[i] * (+$scope.packagesAndProducts.unitPrices[i])).toFixed(2)
                });

                total += +$scope.packagesAndProducts.giftPackages[n].quantities[i] * (+$scope.packagesAndProducts.unitPrices[i]);
            }
            $scope.total = total.toFixed(2);
        }

        $scope.goNextPackage = function () {
            if ($scope.packageInfo.currentPackage < $scope.packagesAndProducts.giftPackages.length - 1) {
                $scope.packageInfo.currentPackage++;
                changeToGiftPackage($scope.packageInfo.currentPackage)
            }
        };

        $scope.goPrevPackage = function () {
            if ($scope.packageInfo.currentPackage > 0) {
                $scope.packageInfo.currentPackage--;
                changeToGiftPackage($scope.packageInfo.currentPackage)
            }
        };

        $scope.quantityChanged = function (index) {
            $scope.total = 0;
            for(var i = 0; i < $scope.products.length; i++) {
                $scope.total += $scope.products[i].unitPrice * $scope.products[i].quantity;
            }

            $scope.total = $scope.total.toFixed(2);
        };

        $scope.getUpdatedQuantities = function () {
            var quantities = [];
            for(var i = 0; i < $scope.products.length; i++) {
                quantities.push($scope.products[i].quantity);
            }
            return quantities.join(',');
        }
    }]
);
