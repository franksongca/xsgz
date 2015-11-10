/* jshint -W097 */
'use strict';

angular.module('xsgzApp').factory('MainMenuDataFactory',
    ['$q', 'TranslateFactory', 'Constants', function ($q, TranslateFactory, Constants) {
        return {
            getMenuData: function (lang) {
                var deferred = $q.defer();

                TranslateFactory.translate({keys: Constants.MAIN_MENU_KEYS, lang: lang, type: 'MESSAGES'}).then(
                    function (data) {
                        deferred.resolve(data);
                    }
                );

                return deferred.promise;
            },

            getActionIndex: function (action) {
                var ret = -1;
                for (var i=0; i < Constants.ACTIONS.length; i++) {
                    if (action === Constants.ACTIONS[i]) {
                        ret = i;
                        break;
                    }
                }
                return ret;
            }
        };
    }]
);
