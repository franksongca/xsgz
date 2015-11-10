/* jshint -W097 */
'use strict';

/* not used for now!*/
angular.module('xsgzApp').factory('RegisterFactory',
    ['$http', '$timeout', 'AppManagerFactory', 'Constants', function ($http, $timeout, AppManagerFactory, Constants) {

        function register(userInfo) {
            var fd = new FormData(),
                url = AppManagerFactory.getWebServiceURL() + Constants.WEBSERVICE_URLS.REGISTER;

            fd.append('name', userInfo.name);
            fd.append('email', userInfo.email);
            fd.append('password', userInfo.password);

            return $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                timeout: Constants.CONFIG.HTTP_TIMEOUT
            });
        }

        return {
            register: register
        };
    }]
);
