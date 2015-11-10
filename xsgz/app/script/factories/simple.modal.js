/* jshint -W097 */
'use strict';

angular.module('xsgzApp').factory('SimpleModal',
    ['$q', '$modal', 'TranslateFactory', 'Constants', function ($q, $uibModal, TranslateFactory, Constants) {

        function open(option) {
            var unbindWatcher,
                controller = option.controller || function ($scope, $modalInstance) {
                        $scope.titleKey = option.titleKey;
                        $scope.messageKey = option.messageKey;
                        $scope.messageType = option.messageType || 'MESSAGES';
                        $scope.buttons = option.buttons;
                        $scope.imageSrc = option.imageSrc;
                        $scope.iconSrc = option.iconSrc;
                        $scope.close = function () {
                            console.log('CLOSE!!!!!!!!!!!!!!!!![modal returns NO]');
                            $modalInstance.dismiss('cancel');
                        };

                        $scope.confirm = function () {
                            console.log('CONFIRM!!!!!!!!!!!!!!!!![modal returns YES]');
                            $modalInstance.close();
                        };

                        $scope.onClick = function (action) {
                            switch (action) {
                                case 'CANCEL':
                                    $scope.close();
                                    break;

                                default:
                                    $scope.confirm({action: action});
                                    break;
                            }
                        };

                        //$modalInstance.opened.then(function () {
                        //    unbindWatcher = $scope.$watch(
                        //        function () {
                        //            return angular.element('.bottom-panel').length;
                        //        },
                        //        function (newValue) {
                        //            if (newValue) {
                        //                unbindWatcher();
                        //                angular.element('.bottom-panel').parent().addClass('force-to-panel');
                        //            }
                        //        }
                        //    );
                        //});
                    },
                deferred = $q.defer(),
                modalInstance;

            modalInstance = $uibModal.open({
                animation: option.animationEnabled,
                templateUrl: option.templateUrl || HOME_PATH + '/templates/components/default.modal.html',
                controller: option.controller || controller,
                size: option.size || 'sm',
                resolve: option.resolve
            });

            modalInstance.result.then(
                function (response) {
                    console.log('modal returns YES');
                    deferred.resolve(response);
                },
                function (response) {
                    console.log('modal returns NO');
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        return {
            open: open,
            openAlert: function (textKey) {
                return open({
                    size: 'sm',
                    animationEnabled: true,
                    titleKey: 'WARNING',
                    messageKey: textKey,
                    messageType: 'ERROR_MESSAGES',
                    iconSrc: '/xsgz/assets/images/warning_icon-xsmall.png',
                    buttons: [{key: 'ACTION_CONTINUE', action: 'OK'}]
                });
            }
        };
    }]
);
