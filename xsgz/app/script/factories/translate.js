/* jshint -W097 */
'use strict';

angular.module('xsgzApp').factory('TranslateFactory', ['$translate', '$q', '_', function ($translate, $q, _) {
    function translate(options) {
        var keys = options.keys;

        $translate.use('zh');

        if (options.type) {
            if (angular.isArray(keys)) {
                keys = _.map(keys, function (key) {
                    return options.type + '.' + key;
                });
            } else {
                keys = options.type + '.' + keys;
            }
        }

        var deferred = $q.defer();

        $translate(keys).then(function (paragraph) {
            console.log('> '+JSON.stringify(paragraph));
            deferred.resolve(paragraph);
        });

        return deferred.promise;
    }

    return {
        /**
         * @params {Object} / {keys, [lang], [type]}
         *
         * @return {Object} - if a single word, return string, otherwise return array
         **/
        translate: translate,

        setLanguage: function (lang) {
            $translate.use(lang);
        }
    };
}]);
