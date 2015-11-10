/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('DailyOrdersEditCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$modal',
        '$state',
        'SimpleModal',
        'Constants',
        'TranslateFactory',
        'AppManagerFactory',
        'OrdersDataFactory',
        'GiftPackagesDataFactory',
        function (
            $rootScope,
            $scope,
            $timeout,
            $modal,
            $state,
            SimpleModal,
            Constants,
            TranslateFactory,
            AppManagerFactory,
            OrdersDataFactory,
            GiftPackagesDataFactory) {

            // define the phrases used in this view
            var phraseKeys = [
                'WEEK',
                'APP_NAME'
            ];

            $scope.updateActionBar({
                datePicker: true,
                returnButton: true,
                printButton: false,
                uploadButton: false
            });

            $scope.$on(Constants.EVENTS.DATE_CHANGED, function (dateKey) {
                $scope.getOrders();
            });

            $scope.setFeatureStatus(-1);

            $scope.updateComments = function(orderId, comments, customerComments) {
                console.log('<<<<<<<<<<<<<<<<<< ', orderId, comments, customerComments);
                OrdersDataFactory.updateComments(orderId, comments, customerComments)
            };

            $scope.getOrders = function () {
                $rootScope.$broadcast(Constants.EVENTS.SPINNER_ON_EVENT, {type: 'main-spinner', useTransparentBackground: true});
                OrdersDataFactory.getOrdersData({dateKey: AppManagerFactory.getDateKey(AppManagerFactory.getDateKeyString())}).then(
                    function (data) {
                        $timeout(function () {
                            $scope.orders = data.data;
                            $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                        });
                    },
                    function () {
                        $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                        SimpleModal.openAlert('GENERIC');
                    }
                );
            };

            function getData() {
                TranslateFactory.translate({
                    keys: phraseKeys,
                    type: 'MESSAGES'
                }).then(function (data) {
                    $scope.appName = data['MESSAGES.APP_NAME'];
                });

                $scope.getOrders();
            }

            function getOrderGiftIndex(orderId) {
                for(var i=0; i < $scope.orders.length; i++) {
                    if ($scope.orders[i].orderInfo.giftPackage && $scope.orders[i].orderInfo.orderId === orderId) {
                        return GiftPackagesDataFactory.getGiftPackageIdIndex($scope.orders[i].orderInfo.giftId);
                    }
                }
            }

            $scope.selectGiftPackage = function (orderId, giftId) {
                SimpleModal.open({
                    size: 'lg',
                    animationEnabled: true,
                    templateUrl: HOME_PATH + '/templates/components/select.gift.package.modal.html',
                    controller: 'GiftPackagesModalCtrl',
                    resolve: {
                        options: function () {
                            return {
                                giftId: giftId,
                                orderId: orderId,
                                giftIndex: getOrderGiftIndex(orderId)
                            };
                        }
                    }
                });
            };

            $scope.$on('$viewContentLoaded', function () {
                var loginStatus = AppManagerFactory.getLoginStatus();
                if (loginStatus) {
                    getData();
                } else {
                    $state.go('home', {action: ''});
                }
            });

            $scope.$on(Constants.EVENTS.ORDERS_UPDATED, function () {
                $scope.getOrders();
            });
        }]
);
