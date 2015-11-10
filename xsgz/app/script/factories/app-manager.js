/* jshint -W097 */
'use strict';

var HOME_PATH = '/xsgz';

angular.module('xsgzApp').factory('AppManagerFactory',
    ['$q', '$location', 'Constants', function ($q, Constants) {
        var tdt = {value: ''};

        function getDate() {
            var dt = sessionStorage.getItem('currentdate');
            if (!dt) {
                return new Date();;
            } else {
                dt = new Date(dt);

                return dt;
            }
        }

        function getTwoDigitsString(n) {
            if (n < 10) {
                return '0' + n;
            } else {
                return n
            }
        }

        function getDateKey(dt) {
            if (dt.getFullYear) {
                return dt.getFullYear() + '-' + getTwoDigitsString((dt.getMonth() + 1)) + '-' + getTwoDigitsString(dt.getDate());
            } else {
                return dt;
            }
        }

        return {
            getLoginStatus: function () {
                return sessionStorage.LoginStatus ? true : false;
            },

            setLoginStatus: function (status) {
                if (status) {
                    sessionStorage.LoginStatus = '1';
                } else {
                    sessionStorage.removeItem('LoginStatus');
                }
            },

            setUserType: function (type) {
                sessionStorage.UserType = type;
            },

            getUserType: function () {
                return sessionStorage.UserType;
            },

            getToken: function () {
                return sessionStorage.token;
            },

            setToken: function (token) {
                if (token) {
                    sessionStorage.token = token;
                } else {
                    sessionStorage.removeItem('token');
                }
            },

            getDomainURL: function () {
                return $location.protocol() + ':' + $location.port() + '//' + $location.host() + '/';
            },

            getWebServiceURL: function () {
                return 'http://localhost:58186/Content/WebServices/XSGZ_WebService.asmx/';
                //return 'http://sz-abc.com/WebServices/XSGZ_WebService.asmx/';
            },

            setDate: function (dt) {
                sessionStorage.setItem('currentdate', dt.value);
            },

            getDate: getDate,

            getDateKeyString: function () {
                var dt = getDate();
                if (dt === '') {
                    dt = new Date();
                }
                return getDateKey(dt);
            },

            getDateKey: getDateKey,

            getTwoDigitsString: getTwoDigitsString
        };
    }]
);
