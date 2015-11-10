/* jshint -W097 */
'use strict';

/* not used for now!*/
angular.module('xsgzApp').factory('LoginFactory',
    ['$http', '$timeout', 'AppManagerFactory', 'Constants', function ($http, $timeout, AppManagerFactory, Constants) {

        function login(userInfo) {
            var fd = new FormData(),
                url = AppManagerFactory.getWebServiceURL() + Constants.WEBSERVICE_URLS.LOGIN;

            fd.append('email', userInfo.email);
            fd.append('password', userInfo.password);

            return $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                timeout: Constants.CONFIG.HTTP_TIMEOUT
            });
        }

        return {
            login: login
        };
    }]
);
