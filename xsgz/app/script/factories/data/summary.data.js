/* jshint -W097 */
'use strict';

angular.module('xsgzApp').factory('SummaryDataFactory',
    ['$q', 'OrdersDataFactory', 'AppManagerFactory', 'ProductsDataFactory',
        function ($q, OrdersDataFactory, AppManagerFactory, ProductsDataFactory) {
            var orderList = [], customersOrderSummary;

            //customersOrderSummary = [
            //    {
            //        name: '李梦超',
            //        province: '北京市',
            //        city: '北京市辖',
            //        orders: [2,0,2,0,0,0,0,3,3,0,1,0,2,0,1,1,0,0]
            //    },
            //    {
            //        name: '李娜',
            //        city: '上海市辖',
            //        orders: [0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0]
            //    },
            //    {
            //        name: '逸翔',
            //        city: '乌鲁木齐',
            //        orders: [1,0,0,1,2,1,0,1,0,1,0,0,3,0,1,0,0,0]
            //    },
            //    {
            //        name: '李林霞',
            //        city: '长春市',
            //        orders: [0,0,2,1,2,1,0,1,0,1,0,0,2,0,1,0,3,0]
            //    }
            //];

            function createNewEmptyArray(count) {
                var array = [], i;
                for (i = 0; i < count; i++) {
                    array[i] = 0;
                }
                return array;
            }

            function parseDailySmallBagsSummary(response) {
                var productData = response.products,
                    summary = createNewEmptyArray(productData.length),
                    orderListArray = [],
                    orderSummaryArray,
                    orderObject;

                angular.forEach(response.orders, function (order) {
                    orderObject = {};
                    orderObject.name = order.orderInfo.receiverName;
                    orderObject.city = order.orderInfo.addressCity;

                    orderSummaryArray = createNewEmptyArray(productData.length);
                    angular.forEach(order.orderList, function (orderitem) {
                        if (order.orderInfo.giftPackage) {
                            orderSummaryArray[orderitem.productIndex] = orderitem.quantity;
                            summary[orderitem.productIndex] += orderitem.quantity;
                        } else {
                            orderSummaryArray[orderitem.productIndex] = orderitem.totalSmallBags;
                            summary[orderitem.productIndex] += orderitem.totalSmallBags;
                        }
                    });
                    orderObject.orders = orderSummaryArray;

                    orderListArray.push(orderObject);
                });

                orderListArray.push({
                    name: '合 计',
                    city: '',
                    orders: summary
                });

                return {productsData: productData, ordersSummaryData: orderListArray};
            }

            function parseDailyGiftPackageSummary(response) {
                var productData = response.products,
                    summary = createNewEmptyArray(productData.length),
                    orderListArray = [],
                    orderSummaryArray,
                    orderObject;

                angular.forEach(response.orders, function (order) {
                    if (order.orderInfo.giftPackage) {
                        orderObject = {};
                        orderObject.name = order.orderInfo.receiverName;
                        orderObject.city = order.orderInfo.addressCity;

                        orderSummaryArray = createNewEmptyArray(productData.length);
                        angular.forEach(order.orderList, function (orderitem) {
                            orderSummaryArray[orderitem.productIndex] = orderitem.quantity;
                            summary[orderitem.productIndex] += orderitem.quantity;
                        });
                        orderObject.orders = orderSummaryArray;

                        orderListArray.push(orderObject);
                    }
                });

                orderListArray.push({
                    name: '合 计',
                    city: '',
                    orders: summary
                });

                return {productsData: productData, ordersSummaryData: orderListArray};
            }

            function parseDailyOrdersSummary(response) {
                var productData = response.products,
                    summary = createNewEmptyArray(productData.length),
                    orderListArray = [],
                    orderSummaryArray,
                    orderObject;

                angular.forEach(response.orders, function (order) {
                    if (!order.orderInfo.giftPackage) {
                        orderObject = {};
                        orderObject.name = order.orderInfo.receiverName;
                        orderObject.city = order.orderInfo.addressCity;

                        orderSummaryArray = createNewEmptyArray(productData.length);
                        angular.forEach(order.orderList, function (orderitem) {
                            orderSummaryArray[orderitem.productIndex] = orderitem.quantity;
                            summary[orderitem.productIndex] += orderitem.quantity;
                        });
                        orderObject.orders = orderSummaryArray;

                        orderListArray.push(orderObject);
                    }
                });

                orderListArray.push({
                    name: '合 计',
                    city: '',
                    orders: summary
                });

                return {productsData: productData, ordersSummaryData: orderListArray};
            }

            function getOrdersAndProductsData(options) {
                var deferred = $q.defer();

                $q.all([
                    ProductsDataFactory.getProductsData(),
                    OrdersDataFactory.getOrdersData(options)
                ]).then(
                    function (data) {
                        deferred.resolve({products: data[0].data, orders: data[1].data});
                    },
                    function () {
                        deferred.reject();
                    }
                );

                return deferred.promise;
            }

            function getSummaryData(type, options) {
                var deferred = $q.defer();

                getOrdersAndProductsData(options).then(
                    function (response) {
                        switch (type) {
                            case 0:
                                deferred.resolve(parseDailyOrdersSummary(response));
                                break;
                            case 1:
                                deferred.resolve(parseDailyGiftPackageSummary(response));
                                break;
                            case 2:
                                deferred.resolve(parseDailySmallBagsSummary(response));
                                break;
                        }
                    },
                    function () {
                        deferred.reject();
                    }
                );

                return deferred.promise;
            }

            return {
                getSummaryData: getSummaryData
            };
        }]
);
