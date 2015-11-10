/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('Feature6Ctrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$modal',
        '$state',
        'Constants',
        'TranslateFactory',
        'AppManagerFactory',
        function (
            $rootScope,
            $scope,
            $timeout,
            $modal,
            $state,
            Constants,
            TranslateFactory,
            AppManagerFactory) {

            // define the phrases used in this view
            var phraseKeys = [
                'APP_NAME'
            ];

            $scope.updateActionBar({
                datePicker: true,
                returnButton: true,
                printButton: false,
                uploadButton: false
            });

            $scope.setFeatureStatus(-1);

            function getData() {
                TranslateFactory.translate({
                    keys: phraseKeys,
                    type: 'MESSAGES'
                }).then(function (data) {
                    $scope.appName = data['MESSAGES.APP_NAME'];
                });
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
