/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('DailyOrdersSummaryCtrl', [
        '$q',
        '$rootScope',
        '$scope',
        '$timeout',
        '$modal',
        '$state',
        'Constants',
        'SummaryDataFactory',
        'TranslateFactory',
        'AppManagerFactory',
        'SimpleModal',
        function (
            $q,
            $rootScope,
            $scope,
            $timeout,
            $modal,
            $state,
            Constants,
            SummaryDataFactory,
            TranslateFactory,
            AppManagerFactory,
            SimpleModal) {

            // define the phrases used in this view
            var phraseKeys = [
                'APP_NAME',
                'WAITING'
            ];

            $scope.updateActionBar({
                datePicker: true,
                returnButton: true,
                printButton: true,
                uploadButton: false
            });

            $scope.setFeatureStatus(-1);

            function getData() {
                $rootScope.$broadcast(Constants.EVENTS.SPINNER_ON_EVENT, {type: 'main-spinner', useTransparentBackground: true});
                $q.all([
                    TranslateFactory.translate({
                        keys: phraseKeys,
                        type: 'MESSAGES'
                    }),
                    SummaryDataFactory.getSummaryData(0, {dateKey: AppManagerFactory.getDateKeyString()})
                ]).then(
                    function (data) {
                        $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                        $scope.appName = data[0]['MESSAGES.APP_NAME'];
                        $scope.productsData = data[1].productsData;
                        $scope.ordersSummaryData = data[1].ordersSummaryData;
                    },
                    function () {
                        $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                        SimpleModal.openAlert('GENERIC');
                    }
                );
            }

            $scope.$on('$viewContentLoaded', function () {
                var loginStatus = AppManagerFactory.getLoginStatus();
                if (loginStatus) {
                    getData();
                } else {
                    $state.go('home');
                }
            });
        }]
);
