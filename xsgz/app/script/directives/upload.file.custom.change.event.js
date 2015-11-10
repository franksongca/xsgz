angular.module('xsgzApp').directive('customOnChange', function() {
    return {
        restrict: 'A',
        controller: function ($scope) {
            $scope.reset = function () {

            }
        },
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);

            scope.reset = function () {
                element.val('');
            }
        }
    };
});