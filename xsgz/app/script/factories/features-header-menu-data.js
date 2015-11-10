/* jshint -W097 */
'use strict';

angular.module('xsgzApp').factory('FeaturesHeaderMenuDataFactory',
    ['$q', 'TranslateFactory', 'Constants', function ($q, TranslateFactory, Constants) {
        return {
            getMenuData: function (lang) {
                var deferred = $q.defer();

                TranslateFactory.translate({keys: Constants.FEATURES_HEADER_MENU_KEYS, lang: lang, type: 'MESSAGES'}).then(
                    function (data) {
                        deferred.resolve(data);
                    }
                );

                return deferred.promise;
            },

            getActionIndex: function (action) {
                var ret = -1;
                for (var i=0; i < Constants.FEATURES_HEADER_ACTIONS.length; i++) {
                    if (action === Constants.FEATURES_HEADER_ACTIONS[i]) {
                        ret = i;
                        break;
                    }
                }
                return ret;
            }
        };
    }]
);
