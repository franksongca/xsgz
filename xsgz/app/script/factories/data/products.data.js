/* jshint -W097 */
'use strict';

/* not used for now!*/
angular.module('xsgzApp').factory('ProductsDataFactory',
    ['$http', '$timeout', 'AppManagerFactory', 'Constants', function ($http, $timeout, AppManagerFactory, Constants) {
        //var products = [
        //    {product_id: 1, name: '牛肉块麻辣', unit_price: 3.63},
        //    {product_id: 2, name: '牛肉块微辣', unit_price: 3.63},
        //    {product_id: 3, name: '牛肉块孜然', unit_price: 3.63},
        //    {product_id: 4, name: '牛肉块麻辣', unit_price: 3.63},
        //    {product_id: 5, name: '牛肉块微辣', unit_price: 3.63},
        //    {product_id: 6, name: '牛肉块孜然', unit_price: 3.63},
        //    {product_id: 7, name: '牛肉块麻辣', unit_price: 3.63},
        //    {product_id: 8, name: '牛肉块微辣', unit_price: 3.63},
        //    {product_id: 9, name: '牛肉块孜然', unit_price: 3.63},
        //    {product_id: 10, name: '牛肉块麻辣', unit_price: 3.63},
        //    {product_id: 11, name: '牛肉块微辣', unit_price: 3.63},
        //    {product_id: 12, name: '牛肉块孜然', unit_price: 3.63},
        //    {product_id: 13, name: '牛肉块麻辣', unit_price: 3.63},
        //    {product_id: 14, name: '牛肉块微辣', unit_price: 3.63},
        //    {product_id: 15, name: '牛肉块孜然', unit_price: 3.63},
        //    {product_id: 16, name: '牛肉块麻辣', unit_price: 3.63},
        //    {product_id: 17, name: '牛肉块微辣', unit_price: 3.63},
        //    {product_id: 18, name: '牛肉块孜然', unit_price: 3.63}
        //];

        function getProductsData() {
            return $http({
                method: 'GET',
                url: AppManagerFactory.getWebServiceURL() + Constants.WEBSERVICE_URLS.LOAD_PRODUCT_LIST,
                headers: {
                    accept: 'application/json'
                },
                timeout: Constants.CONFIG.HTTP_TIMEOUT
            });
        }

        return {
            getProductsData: getProductsData
        };
    }]
);
