/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('ForgotPasswordCtrl', [
    '$rootScope',
    '$scope',
    '$controller',
    'Constants',
    'action',
    function ($rootScope, $scope, $controller, Constants, action) {
        $scope.action = action;
        $scope.phraseKeys = [
            'EMAIL_PLACEHOLDER'
        ];
        $scope.phrases = [];
        $controller('HomeBaseCtrl', {$scope: $scope});

        $scope.user = {
            email: ''
        };

        $scope.login = function () {

        };

        $scope.onChanged = function () {

        };
    }
]);
