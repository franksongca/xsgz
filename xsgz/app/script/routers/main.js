/* jshint -W097 */
'use strict';

angular.module('xsgzApp')
    .config(['$stateProvider', 'Constants', function ($stateProvider, Constants) {
        $stateProvider
            .state('home', {
                url: '/:action',
                cache: false,
                resolve:{
                    action: ['$stateParams', function($stateParams){
                        return $stateParams.action;
                    }]
                },
                params: {action: ''},
                views: {
                    '': {
                        templateUrl: HOME_PATH + '/templates/menu.html'
                    },
                    'header@home': {
                        templateUrl: function ($stateParams) {
                            var url;
                            switch ($stateParams.action) {
                                case Constants.DASHBOARD_ACTIONS[0]:
                                case Constants.DASHBOARD_ACTIONS[1]:    // print daily orders
                                case Constants.DASHBOARD_ACTIONS[2]:    // forgot password
                                case Constants.DASHBOARD_ACTIONS[3]:
                                case Constants.DASHBOARD_ACTIONS[4]:
                                case Constants.DASHBOARD_ACTIONS[5]:
                                case Constants.DASHBOARD_ACTIONS[6]:
                                case Constants.DASHBOARD_ACTIONS[7]:
                                case Constants.FEATURES_HEADER_ACTIONS[1]:
                                case Constants.FEATURES_HEADER_ACTIONS[2]:
                                    url = HOME_PATH + '/templates/dashboard/dashboard.header.html';
                                    break;
                                default:
                                    url = HOME_PATH + '/templates/header.html';
                                    break;
                            }

                            return url;
                        },

                        controllerProvider: function($stateParams) {
                            var ctrlName;
                            switch ($stateParams.action) {
                                case Constants.DASHBOARD_ACTIONS[0]:
                                case Constants.DASHBOARD_ACTIONS[1]:
                                case Constants.DASHBOARD_ACTIONS[2]:
                                case Constants.DASHBOARD_ACTIONS[3]:
                                case Constants.DASHBOARD_ACTIONS[4]:
                                case Constants.DASHBOARD_ACTIONS[5]:
                                case Constants.DASHBOARD_ACTIONS[6]:
                                case Constants.DASHBOARD_ACTIONS[7]:
                                case Constants.FEATURES_HEADER_ACTIONS[1]:
                                case Constants.FEATURES_HEADER_ACTIONS[2]:
                                    ctrlName = 'DashboardHeaderCtrl';
                                    break;
                                default:
                                    ctrlName = 'HeaderCtrl';
                                    break;
                            }

                            return ctrlName;
                        }
                    },
                    'content@home': {
                        templateUrl: function ($stateParams) {
                            var url;
                            switch ($stateParams.action) {
                                case Constants.ACTIONS[1]:
                                    url = HOME_PATH + '/templates/login.html';
                                    break;
                                case Constants.ACTIONS[2]:
                                    url = HOME_PATH + '/templates/forgot.password.html';
                                    break;
                                case Constants.ACTIONS[3]:
                                    url = HOME_PATH + '/templates/registration.html';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[0]:
                                    url = HOME_PATH + '/templates/dashboard/features.html';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[1]:
                                    url = HOME_PATH + '/templates/dashboard/daily.orders.edit.html';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[2]:
                                    url = HOME_PATH + '/templates/dashboard/print.daily.orders.html';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[3]:
                                    url = HOME_PATH + '/templates/dashboard/daily.orders.summary.html';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[4]:
                                    url = HOME_PATH + '/templates/dashboard/daily.gift.orders.summary.html';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[5]:
                                    url = HOME_PATH + '/templates/dashboard/daily.small.bags.summary.html';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[6]:
                                    url =HOME_PATH +  '/templates/dashboard/select.gift.package.page.html';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[7]:
                                    url = HOME_PATH + '/templates/dashboard/feature6.html';
                                    break;
                                case Constants.FEATURES_HEADER_ACTIONS[1]:
                                    url = HOME_PATH + '/templates/dashboard/features.html';
                                    break;
                                case Constants.FEATURES_HEADER_ACTIONS[2]:
                                    url = HOME_PATH + '/templates/dashboard/reset.password.html';
                                    break;
                                default:
                                    url = HOME_PATH + '/templates/main.html';
                                    break;
                            }

                            return url;
                        },
                        controllerProvider: function($stateParams) {
                            var ctrlName;
                            switch ($stateParams.action) {
                                case Constants.ACTIONS[1]:
                                    ctrlName = 'LoginCtrl';
                                    break;
                                case Constants.ACTIONS[2]:
                                    ctrlName = 'ForgotPasswordCtrl';
                                    break;
                                case Constants.ACTIONS[3]:
                                    ctrlName = 'RegistrationCtrl';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[0]:
                                    ctrlName = 'FeaturesCtrl';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[1]:
                                    ctrlName = 'DailyOrdersEditCtrl';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[2]:
                                    ctrlName = 'PrintDailyOrdersCtrl';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[3]:
                                    ctrlName = 'DailyOrdersSummaryCtrl';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[4]:
                                    ctrlName = 'DailyGiftOrdersSummaryCtrl';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[5]:
                                    ctrlName = 'DailySmallBagsSummaryCtrl';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[6]:
                                    ctrlName = 'GiftPackagesPageCtrl';
                                    break;
                                case Constants.DASHBOARD_ACTIONS[7]:
                                    ctrlName = 'Feature6Ctrl';
                                    break;
                                case Constants.FEATURES_HEADER_ACTIONS[1]:
                                    ctrlName = 'FeaturesCtrl';
                                    break;
                                case Constants.FEATURES_HEADER_ACTIONS[2]:
                                    ctrlName = 'ResetPasswordCtrl';
                                    break;
                                default:
                                    ctrlName = 'HomeMainCtrl';
                                    break;
                            }

                            return ctrlName;
                        }
                    },
                    'footer@home': {
                        templateUrl: HOME_PATH + '/templates/footer.html',
                        controller: 'FooterCtrl'
                    }
                }
            });
    }]);

