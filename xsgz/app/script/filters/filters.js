/* jshint -W097 */ 'use strict';

angular.module('xsgzApp').filter('truncate', function () {
  return function (value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;

    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace !== -1) {
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || ' …');
  };
}).filter('newline', ['CommonFactory', function (CommonFactory) {
    return function (str) {
        return CommonFactory.convertNewlineToTagBR(str);
    };
}]).filter('mediaWording', ['CommonFactory', function (CommonFactory) {
    return function (option) {
        return CommonFactory.mediaWording(option);
    };
}]);
