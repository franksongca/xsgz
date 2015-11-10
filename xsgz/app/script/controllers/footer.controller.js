/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('FooterCtrl', [
    '$rootScope',
    '$scope',
    '$timeout',
    'SimpleModal',
    '_',
    'Constants',
    'HomeFooterMenuDataFactory',
    function ($rootScope, $scope, $timeout, SimpleModal, _, Constants, HomeFooterMenuDataFactory) {
        function getData() {
            HomeFooterMenuDataFactory.getMenuData().then(
                function (data) {
                    $scope.pageMessage = [];
                    _.forEach(Constants.FOOTER_MENU_KEYS, function (key) {
                        $scope.pageMessage.push(data['MESSAGES.' + key]);
                    });
                }
            );
        }

        $scope.$on('$viewContentLoaded', function () {
            getData();
        });

        $scope.onBtnClicked = function (action) {
            var option = {};

            switch (action) {
                case 0:
                    option = {
                        type: action,
                        size: 'lg',
                        animationEnabled: true,
                        titleKey: 'ABOUT',
                        messageKey: 'ABOUT_ME',
                        imageSrc: '/xsgz/assets/images/about-me.png',
                        buttons: [{key: 'OK', action: 'OK'}, {key: 'CANCEL', action: 'CANCEL'}]
                    };
                    break;
                case 1:
                    option = {
                        type: action,
                        backdrop: 'static',
                        size: 'lg',
                        animationEnabled: false,
                        titleKey: 'HELP',
                        messageKey: 'ABOUT_ME',
                        imageSrc: '/xsgz/assets/images/help.png',
                        templateUrl: HOME_PATH + '/templates/components/default.panel.html'
                        //buttons: [{key: 'OK', action: 'OK'}, {key: 'CANCEL', action: 'CANCEL'}]
                    };
                    break;
                case 2:
                    option = {
                        type: action,
                        size: 'lg',
                        animationEnabled: true,
                        titleKey: 'CONTACT',
                        messageKey: 'CONTACT',
                        imageSrc: '/xsgz/assets/images/contact-me.png',
                        buttons: [{key: 'CLOSE', action: 'OK'}]
                    };
                    break;
            }

            SimpleModal.open(option).then(
                function (evt) {
                    var t = evt;
                },
                function () {
                }
            );
        };
    }
]);
