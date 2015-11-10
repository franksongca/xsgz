/* jshint -W097 */
'use strict';

angular.module('xsgzApp').factory('UploadFileFactory',
    ['$http', 'AppManagerFactory', 'Constants', function ($http, AppManagerFactory, Constants) {
        return {
            upload: function (file) {
                var fd = new FormData(),
                    url = AppManagerFactory.getWebServiceURL() + Constants.WEBSERVICE_URLS.UPLOAD;

                fd.append('file', file);
                fd.append('token', AppManagerFactory.getToken());
                fd.append('dateKey', file.name.substring(3, 13));
                //angular.element('#input-csv').val('');

                return $http.post(url, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined},
                    timeout: Constants.CONFIG.HTTP_TIMEOUT
                });
            }
        };
    }]
);
