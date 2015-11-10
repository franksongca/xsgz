/* jshint -W097 */
'use strict';

angular.module('xsgzApp').factory('GiftPackagesDataFactory',
    ['$q', '$http', 'AppManagerFactory', 'Constants', function ($q, $http, AppManagerFactory, Constants) {
        var packageAndUitPrice = {giftPackages: [], unitPrices: [], unitNames: []};

        //packageAndUitPrice = {
        //    giftPackages:[
        //        {id: 1, name:'默认大礼包A', quantities:["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"]},
        //        {id: 2, name:'默认大礼包B', quantities:["0","2","1","3","0","1","1","0","1","1","1","3","1","1","1","2","0","0"]},
        //        {id: 3, name:'默认大礼包C', quantities:["2","0","2","0","0","3","1","1","0","0","0","2","1","1","0","0","2","0"]}
        //    ],
        //    unitPrices:["3.2500","3.2500","3.2500","3.2500","3.2500","3.6250","3.6250","3.6250","3.1250","3.1250","2.7500","2.7500","5.8000","5.8000","4.5000","4.5000","7.0000","4.1666"],
        //    unitNames: ["牛肉块麻辣","牛肉块甜辣","牛肉块孜然","牛肉块五香","牛肉丝甜辣","鸡脆骨麻辣","鸡脆骨甜辣","鸡脆骨孜然","鸡胗麻辣","鸡胗孜然","鸡心麻辣","鸡心孜然","鸡爪麻辣","鸡爪微辣","鸭舌香辣","鸭舌甜辣","猪耳朵香辣","肉酱香辣"]
        //};

        function addNewGiftPackageLocally(newPackage) {
            packageAndUitPrice.giftPackages.push(newPackage);
        }

        function updateGiftPackageLocally(index, name, updatedPackage) {
            packageAndUitPrice.giftPackages[index].name = name;
            angular.copy(updatedPackage, packageAndUitPrice.giftPackages[index].quantities);
        }

        function saveSelectedPackageToOrders(options) {
            var fd = new FormData(),
                url = AppManagerFactory.getWebServiceURL() + Constants.WEBSERVICE_URLS.UPDATE_ORDERS_WITH_GIFT_PACKAGE;

            fd.append('orderId', options.orderId);
            fd.append('giftId', options.giftId);

            return $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                timeout: Constants.CONFIG.HTTP_TIMEOUT
            });
        }

        function existsGiftPackage(newPackage) {
            var i;
            angular.forEach (packageAndUitPrice.giftPackages, function (giftPackage) {
                if (!angular.equals(giftPackage, newPackage)) {
                    return false;
                }
            });

            return true;
        }

        function getGiftPackagesData() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: AppManagerFactory.getWebServiceURL() + Constants.WEBSERVICE_URLS.DOWNLOAD_GIFT_PACKAGES,
                headers: {
                    accept: 'application/json'
                },
                timeout: Constants.CONFIG.HTTP_TIMEOUT
            }).success(function (data, status) {
                if (status === 200) {
                    angular.forEach(data.gp, function (pkg) {
                        packageAndUitPrice.giftPackages.push({
                            id: pkg.packageId,
                            name: pkg.name,
                            quantities: pkg.quantitiesStr.split(',')
                        });
                    });

                    packageAndUitPrice.unitPrices = data.up.split(',');
                    packageAndUitPrice.unitNames = data.nm.split(',');

                    deferred.resolve(packageAndUitPrice);
                }
                var dt = data;
            }).error(function (data, status) {
                deferred.reject();
            });

            return deferred.promise;
        }

        function updatePackage(packageId, name, changedPackage) {
            var fd = new FormData(),
                url = AppManagerFactory.getWebServiceURL() + Constants.WEBSERVICE_URLS.UPDATE_PACKAGE;

            fd.append('packageQuantities', changedPackage);
            fd.append('packageName', name);
            fd.append('packageId', packageId);

            return $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                timeout: Constants.CONFIG.HTTP_TIMEOUT
            });
        }

        function getGiftPackageIdIndex(packageId) {
            for(var i=0; i < packageAndUitPrice.giftPackages.length; i++) {
                if (packageAndUitPrice.giftPackages[i].id === packageId) {
                    return i;
                }
            }

            return 0;
        }

        return {
            getGiftPackagesData: getGiftPackagesData,

            saveNewPackage: function (name, newPackage) {
                return updatePackage(-1, name, newPackage);
            },

            updatePackage: updatePackage,

            saveSelectedPackageToOrders: saveSelectedPackageToOrders,

            getGiftPackageIdIndex: getGiftPackageIdIndex,

            addNewGiftPackageLocally: addNewGiftPackageLocally,
            updateGiftPackageLocally: updateGiftPackageLocally
        };
    }]
);
