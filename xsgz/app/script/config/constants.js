/* jshint -W097 */
'use strict';

angular.module('xsgzApp').constant('Constants', {
    WEBSERVICE_URLS: {
        BASE_URL: 'XSGZ_WebService.asmx/',
        UPLOAD: 'UploadCSV',
        DOWNLOAD_GIFT_PACKAGES: 'DownloadGiftPackages',
        UPDATE_ORDERS_WITH_GIFT_PACKAGE: 'UpdateGiftPackageToOrders',
        UPDATE_ORDER_WITH_COMMENTS: 'UpdateOrderWithComments',
        LOAD_ORDERS: 'LoadOrders',
        LOAD_ORDERS_SUMMARY: 'LoadOrdersSummary',
        SAVE_PACKAGE: 'SavePackage',
        UPDATE_PACKAGE: 'UpdateGiftPackage',
        LOGIN: 'Login',
        REGISTER: 'Register',
        LOGOUT: 'Logout',
        FORGOT_PASSWORD: 'ForgotPassword',
        LOAD_SALES_INFO: 'LoadSalesInfo',
        LOAD_DAILY_INFO: 'LoadDailyInfo',
        LOAD_PRODUCT_LIST: 'LoadProductsList'
    },

    CONFIG: {
        HTTP_TIMEOUT: 5000
    },

    TRANSLATION_TYPES: {
        MESSAGES: 'MESSAGES',
        ERRORS: 'ERRORS'
    },

    EVENTS: {
        LOGGED_OUT: 'logged-out-event',
        HEADER_ACTION_UPDATED: 'header-action-updated-event',
        CUSTOM_DIRECTIVES_COMPLETED: 'custom-ditective-completed-event',
        SPINNER_ON_EVENT: 'spinner-on-event',
        SPINNER_OFF_EVENT: 'spinner-off-event',
        SPINNER_CHANGE: 'spinner-change-event',
        ORDERS_UPDATED: 'orders-changed',
        DATE_CHANGED: 'date-changed'
    },

    MAIN_MENU_KEYS: ['HOME', 'LOGIN', 'FORGOT_PASSWORD', 'REGISTRATION', 'TRAIL'],

    ACTIONS: ['', 'login', 'forgot', 'registration'],

    FOOTER_MENU_KEYS: ['ABOUT', 'HELP', 'CONTACT'],

    DASHBOARD_ACTIONS: ['features', 'editorders', 'printorders', 'dailyorderssummary', 'dailygiftorderssummary', 'dailysmallbagssummary', 'editgiftpackage', 'feature6'],

    DASHBOARD_MENU_KEYS: ['EDIT_ORDERS', 'PRINT_ORDERS', 'DAILY_ORDERS_SUMMARY', 'DAILY_GIFT_ORDERS_SUMMARY', 'DAILY_SMALL_BAGS_SUMMARY', 'EDIT_CREATE_GIFT_PACKAGE', 'FEATURE6'],

    FEATURES_HEADER_MENU_KEYS: [ 'LOGOUT', 'FEATURES', 'RESET_PASSWORD'],

    FEATURES_HEADER_ACTIONS: ['logout', 'features', 'resetpassword'],

    WEEK_DAYS: ['日','一','二','三','四','五','六']
});
