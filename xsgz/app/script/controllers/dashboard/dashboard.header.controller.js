/* jshint -W097 */
'use strict';

angular.module('xsgzApp').controller('DashboardHeaderCtrl', [
    '$rootScope',
    '$scope',
    '$timeout',
    '$state',
    'SimpleModal',
    'UploadFileFactory',
    'Constants',
    'AppManagerFactory',
    'FeaturesHeaderMenuDataFactory',
    '_',
    'TranslateFactory',
    'action',
    function (
        $rootScope,
        $scope,
        $timeout,
        $state,
        SimpleModal,
        UploadFileFactory,
        Constants,
        AppManagerFactory,
        FeaturesHeaderMenuDataFactory,
        _,
        TranslateFactory,
        action) {

        var phraseKeys = [
                'UPLOADING_CSV',
                'WEEK',
                'APP_NAME',
            ],
            week,
            uploadingTxt;

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy年MM月dd日', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM-dd'];
        $scope.format = $scope.formats[1];

        function getData() {
            //console.log('action='+action)
            FeaturesHeaderMenuDataFactory.getMenuData().then(
                function (data) {
                    $scope.headerMenuItems = [];
                    _.forEach(Constants.FEATURES_HEADER_MENU_KEYS, function (key, value) {
                        $scope.headerMenuItems.push(data['MESSAGES.' + key]);
                    });
                }
            );

            TranslateFactory.translate({
                keys: phraseKeys,
                type: 'MESSAGES'
            }).then(function (data) {
                uploadingTxt = data['MESSAGES.UPLOADING_CSV'];
                week = data['MESSAGES.WEEK'];

            });
        }

        $scope.onFileSelect = function (evt) {
            var obj = evt.target;
            $rootScope.$broadcast(Constants.EVENTS.SPINNER_ON_EVENT, {type: 'main-spinner', useTransparentBackground: true});
            UploadFileFactory.upload(evt.target.files[0]).then(
                function (data, status) {
                    switch (data.data.returnCode) {
                        case 'FIELDS_CHANGED':
                            SimpleModal.open({
                                size: 'sm',
                                animationEnabled: true,
                                titleKey: 'ERROR',
                                messageType: 'ERROR_MESSAGES',
                                messageKey: 'SCV_FORMAT_CHANGED',
                                imageSrc: '/xsgz/assets/images/error_icon_small.png',
                                buttons: [{key: 'OK', action: 'OK'}]
                            });

                            break;
                        default:
                    }
                    angular.element('#input-csv').val('');
                    $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                },
                function (data, status) {
                    $rootScope.$broadcast(Constants.EVENTS.SPINNER_OFF_EVENT);
                    angular.element('#input-csv').val('');

                    SimpleModal.open({
                        size: 'sm',
                        animationEnabled: true,
                        titleKey: 'ERROR',
                        messageType: 'ERROR_MESSAGES',
                        messageKey: 'GENERIC',
                        imageSrc: '/xsgz/assets/images/error_icon_small.png',
                        buttons: [{key: 'OK', action: 'OK'}]
                    });
                }
            );
        };

        $scope.$on('$viewContentLoaded', function () {
            getData();
        });

        $scope.onActionItemClicked = function (index) {
            switch (index) {
                case 0:
                    SimpleModal.open({
                            size: 'sm',
                            animationEnabled: true,
                            titleKey: 'LOGOUT',
                            messageKey: 'LOGOUT_CONFIRM',
                            imageSrc: '/xsgz/assets/images/logout.png',
                            buttons: [{key: 'OK', action: 'OK'}, {key: 'CANCEL', action: 'CANCEL'}]
                    }).then(
                        function (evt) {
                            $state.go('home', {action: ''});    // logout
                        }
                    );
                    break;
                case 1:
                    $state.go('home', {action: Constants.FEATURES_HEADER_ACTIONS[1]});
                    break;
                case 2:
                    $state.go('home', {action: Constants.FEATURES_HEADER_ACTIONS[2]});
                    break;
            }
        };

        $scope.return = function () {
            $state.go('home', {action: Constants.DASHBOARD_ACTIONS[0]});
        };
        // date picker *****************************
        function observeDate() {
            $scope.$watch(
                'dt.value',
                function (newVal, oldVal) {
                    if (!newVal || !oldVal || oldVal.getTime() === newVal.getTime()) {
                        return;
                    }

                    $timeout(function () {
                        if (!newVal) {
                            newVal = new Date();
                        }
                        if (newVal.getFullYear) {
                            $scope.dtFormated = $scope.formats[1].replace('yyyy', newVal.getFullYear()).replace('MM', newVal.getMonth() + 1).replace('dd', newVal.getDate());// + ' ' + week + Constants.WEEK_DAYS[newVal.getDay()];
                            $scope.dt.value = new Date(newVal.getFullYear(), newVal.getMonth(), newVal.getDate()); //$scope.formats[4].replace('yyyy', newVal.getFullYear()).replace('MM', AppManagerFactory.getTwoDigitsString(newVal.getMonth() + 1)).replace('dd', AppManagerFactory.getTwoDigitsString(newVal.getDate()));

                            AppManagerFactory.setDate($scope.dt);

                            $rootScope.$broadcast(Constants.EVENTS.DATE_CHANGED);
                        }
                    });
                }
            );
        }

        $scope.today = function() {
            if (AppManagerFactory.getDate() !== '') {
                console.log('AppManagerFactory.getDate()='+AppManagerFactory.getDate());
                $scope.dt.value = AppManagerFactory.getDate();
            } else {
                $scope.dt.value = new Date();
            }
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = new Date(2015, 9, 1);//$scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
        $scope.maxDate = new Date(2020, 5, 22);

        $scope.open = function($event) {
            $scope.status.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.status = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i=0; i < $scope.events.length; i++){
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };

        observeDate();
    }
]);
