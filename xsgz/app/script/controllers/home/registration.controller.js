/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('RegistrationCtrl', [
    '$rootScope',
    '$scope',
    '$controller',
    '$state',
    'Constants',
    'SimpleModal',
    'AppManagerFactory',
    'RegisterFactory',
    'action',
    function ($rootScope, $scope, $controller, $state, Constants, SimpleModal, AppManagerFactory, RegisterFactory, action) {
        $scope.action = action;
        $scope.phraseKeys = [
            'NAME_PLACEHOLDER',
            'EMAIL_PLACEHOLDER',
            'PASSWORD_PLACEHOLDER',
            'PASSWORD_CONFIRM_PLACEHOLDER'
        ];
        $scope.errMsgKeys = [
            'NAME_PLACEHOLDER',
            'EMAIL_PLACEHOLDER',
            'PASSWORD_PLACEHOLDER',
            'PASSWORD_CONFIRM_PLACEHOLDER'
        ];
        $scope.phrases = [];
        $scope.errors = [];
        $controller('HomeBaseCtrl', {$scope: $scope});

        $scope.user = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        $scope.register = function () {
            $rootScope.$broadcast(Constants.EVENTS.SPINNER_ON_EVENT, {type: 'main-spinner', useTransparentBackground: true});
            RegisterFactory.register($scope.user).then(function (response) {
                $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                if (response.data.returnCode !== 'OK') {
                    SimpleModal.openAlert('EMAIL_EXISTS');
                } else {
                    AppManagerFactory.setLoginStatus(true);
                    AppManagerFactory.setUserType(0);
                    SimpleModal.open({
                        size: 'sm',
                        animationEnabled: true,
                        titleKey: 'REGISTRATION_UPPER',
                        messageType: 'MESSAGES',
                        messageKey: 'REGISTER_SUCCESS',
                        imageSrc: '/xsgz/assets/images/success-icon_small.png',
                        buttons: [{key: 'OK', action: 'OK'}]
                    }).then(
                        function () {
                            $state.go('home', {action: 'features'});
                        },
                        function () {
                            $state.go('home', {action: 'features'});
                        }
                    );
                }
            }, function () {
                $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                SimpleModal.openAlert('GENERIC');
            });
        };

        $scope.onChanged = function () {

        };
    }
]);
