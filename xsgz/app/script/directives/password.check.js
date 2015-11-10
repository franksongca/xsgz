/* jshint -W097 */ 'use strict';

angular.module('xsgzApp')
    .directive('pwdCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwdCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        // console.info(elem.val() === $(firstPassword).val());
                        // TODO replace jQuery code with Angular's selector counterpart
                        ctrl.$setValidity('pwdMatch', elem.val() === $(firstPassword).val());
                    });
                });
            }
        };
    }]);