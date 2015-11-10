/* jshint -W097 */ 'use strict';
/**
 * The ng-spin directive
 * @author: yu.song
 * @version: 0.0.1, 2015-02-04
 */

angular.module('xsgzApp').directive('bottomPanel', [
    '$timeout',
    function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.parent().addClass('force-to-panel-inner');
            element.parent().parent().addClass('force-to-panel');
            element.parent().parent().parent().addClass('force-to-panel-outer');
        }
    };
}]);



