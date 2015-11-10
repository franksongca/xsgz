/* jshint -W097 */
'use strict';

angular.module('xsgzApp').factory('HomeFooterMenuDataFactory',
    ['$q', 'TranslateFactory', 'Constants', function ($q, TranslateFactory, Constants) {
        return {
            getMenuData: function (lang) {
                var deferred = $q.defer();

                TranslateFactory.translate({keys: Constants.FOOTER_MENU_KEYS, lang: lang, type: 'MESSAGES'}).then(
                    function (data) {
                        deferred.resolve(data);
                    }
                );

                return deferred.promise;
            }
        };
    }]
);
