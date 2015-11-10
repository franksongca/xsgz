/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('StockOutSheetsCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$modal',
        '$state',
        'SimpleModal',
        'Constants',
        'TranslateFactory',
        'AppManagerFactory',
        'StockOutSheetDataFactory',
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
            OrdersDataFactory) {

            OrdersDataFactory.getOrdersData({dateKey: $scope.dt.value}).then(
                function (data) {
                    $scope.sheets = data;
                }
            );
        }]
);
