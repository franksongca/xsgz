/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('LoginCtrl', [
    '$rootScope',
    '$scope',
    '$controller',
    '$state',
    'TranslateFactory',
    'Constants',
    'action',
    function ($rootScope, $scope, $controller, $state, TranslateFactory, Constants, action) {
        $scope.action = action;
        $scope.phraseKeys = [
            'EMAIL_PLACEHOLDER',
            'PASSWORD_PLACEHOLDER'
        ];
        $scope.phrases = [];
        $controller('HomeBaseCtrl', {$scope: $scope});

        $scope.user = {
            email: ''
        };

        $scope.login = function () {
            $state.go('home', {action: 'features'});
        };

        $scope.onChanged = function () {

        };
    }
]);
