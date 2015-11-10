/* jshint -W097 */
'use strict';

angular.module('xsgzApp').factory('OrdersDataFactory',
    ['$q', '$http', 'AppManagerFactory', 'Constants', function ($q, $http, AppManagerFactory, Constants) {
        var orders;

        function getOrdersData(options) {
            var deferred = $q.defer();

            return $http({
                method: 'GET',
                url: AppManagerFactory.getWebServiceURL() + Constants.WEBSERVICE_URLS.LOAD_ORDERS,
                params: options,
                headers: {
                    accept: 'application/json'
                },
                timeout: Constants.CONFIG.HTTP_TIMEOUT
            }).success(function (data, status) {
                if (status === 200) {
                    orders = data;
                    deferred.resolve(data);
                } else {
                    deferred.reject();
                }
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }

        function updateComments(orderId, comments, customerComments) {
            var fd = new FormData(),
                url = AppManagerFactory.getWebServiceURL() + Constants.WEBSERVICE_URLS.UPDATE_ORDER_WITH_COMMENTS;

            fd.append('orderId', orderId);
            fd.append('comments', comments);
            fd.append('customerComments', customerComments);

            return $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                timeout: Constants.CONFIG.HTTP_TIMEOUT
            });
        }

        return {
            getOrdersData: getOrdersData,
            updateComments: updateComments
        };
    }]
);