/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('HeaderCtrl', [
    '$rootScope',
    '$scope',
    '$timeout',
    '$state',
    '_',
    'Constants',
    'MainMenuDataFactory',
    'TranslateFactory',
    'AppManagerFactory',
    'action',
    function ($rootScope, $scope, $timeout, $state, _, Constants, MainMenuDataFactory, TranslateFactory, AppManagerFactory, action) {
        function getData() {
            MainMenuDataFactory.getMenuData().then(
                function (data) {
                    $scope.headerMenuItems = [];
                    _.forEach(Constants.MAIN_MENU_KEYS, function (key, value) {
                        $scope.headerMenuItems.push(data['MESSAGES.' + key]);
                    });
                }
            );
        }

        $scope.$on('$viewContentLoaded', function () {
            getData();
        });

        $scope.$on(Constants.EVENTS.HEADER_ACTION_UPDATED, function (event, action) {
            $scope.action = action;

            $scope.actionIndex = MainMenuDataFactory.getActionIndex(action);
        });

        $scope.onActionItemClicked = function (index) {
            switch (index) {
                case 0:
                    $state.go('home', {action: ''});
                    break;
                case Constants.ACTIONS.length:
                    //$scope.spinnerOn();
                    AppManagerFactory.setLoginStatus(true);
                    $state.go('home', {action: 'features'});
                    break;
                default:
                    $state.go('home', {action: Constants.ACTIONS[index]});
                    break;
            }
        };
    }
]);
