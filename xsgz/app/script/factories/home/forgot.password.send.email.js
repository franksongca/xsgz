/* jshint -W097 */
'use strict';

/* not used for now!*/
angular.module('xsgzApp').factory('SendEmailFactory',
    ['$http', '$timeout', 'AppManagerFactory', 'Constants', function ($http, $timeout, AppManagerFactory, Constants) {

        function sendEmail(email) {
            var fd = new FormData(),
                url = AppManagerFactory.getWebServiceURL() + Constants.WEBSERVICE_URLS.FORGOT_PASSWORD;

            fd.append('email', email);

            return $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                timeout: Constants.CONFIG.HTTP_TIMEOUT
            });
        }

        return {
            sendEmail: sendEmail
        };
    }]
);
