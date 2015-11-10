/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('MainCtrl', [
    '$rootScope',
    '$scope',
    '$timeout',
    '$modal',
    '$cookies',
    '$cookieStore',
    '$state',
    'Constants',
    'TranslateFactory',
    'AppManagerFactory',
    function (
        $rootScope,
        $scope,
        $timeout,
        $modal,
        $cookies,
        $cookieStore,
        $state,
        Constants,
        TranslateFactory,
        AppManagerFactory) {
        var phraseKeys = [
            'APP_NAME'
        ];

        $scope.loaded = false;
        $scope.actionBarConfig = {
            datePicker: true,
            returnButton: false,
            printButton: false,
            uploadButton: true
        }

        $scope.dt = {value: ''};

        function getData() {
            if ($scope.loaded) {
                return;
            }
            $scope.loaded = true;
            TranslateFactory.translate({
                keys: phraseKeys,
                type: 'MESSAGES'
            }).then(function (data) {
                $scope.appName = data['MESSAGES.APP_NAME'];
                $timeout(function () {
                    $scope.spinnerOff();
                }, 1000);
            });
        }

        $scope.updateActionBar = function (options) {
            $scope.actionBarConfig = options;
        };

        $scope.print = function () {
            window.print();
        };

        $scope.spinnerOn = function (option) {
            option = option || {};
            option.type = 'main-spinner';
            $rootScope.$broadcast(Constants.EVENTS.SPINNER_ON_EVENT, option);
        };

        $scope.spinnerOff = function () {
            $timeout(function () {
                $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT, {type: 'main-spinner'});
            });
        };

        $scope.$on(Constants.EVENTS.LOGGED_OUT, function (option) {
            option = option || {};
            $scope.logout();

            if (option.goHome) {
                $state.go('home');
            }
        });

        $scope.$on('$viewContentLoaded', function () {
            $scope.loginStatus = AppManagerFactory.getLoginStatus();
            getData();
        });

        $scope.logout = function () {
            $scope.loginStatus = false;
            AppManagerFactory.setLoginStatus(false);
        };

        $scope.login = function () {
            $scope.loginStatus = true;
            AppManagerFactory.setLoginStatus(true);
        };

        $scope.setFeatureStatus = function (status) {
            $scope.featureStatus = status;
        };
    }]
);
