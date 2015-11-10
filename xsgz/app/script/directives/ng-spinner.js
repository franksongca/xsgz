/* jshint -W097 */ 'use strict';
/**
 * The ng-spin directive
 * @author: yu.song
 * @version: 0.0.1, 2015-02-04
 */

angular.module('xsgzApp').directive('ngSpinner', [
    '$timeout',
    'Constants',
    function ($timeout, Constants) {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {

            var spinnerHtml = '<div style="position: relative;margin-top:{marginTop};" class="sk-spinner-container sk-spinner-container-small"><div></div><div style="width:{size}px !important;height:{size}px !important; left:calc(50% - {halfSize}px) !important;" class="sk-spinner sk-spinner-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="message font-ht">{message}</div></div></div>',//'<img src="assets/images/spinner.gif" style="margin-top:{marginTop}px;" width={size} height={size}>',
                height,
                feedId = attr.feedId,
                aniSize = 60,
                halfSize,
                marginTop,
                spinner = attr.spinner,
                msg;

            if (attr.size) {
                aniSize = parseInt(attr.size);
            }

            halfSize = aniSize / 2;

            function show(option){
                option = option || {};

                $timeout(function () {
                    if (option.useTransparentBackground) {
                        if (element.hasClass('home-spinner-bg')) {
                            element.removeClass('home-spinner-bg');
                        }
                        if (!element.hasClass('spinner-bg-transparent')) {
                            element.addClass('spinner-bg-transparent');
                        }
                    } else {
                        if (element.hasClass('spinner-bg-transparent')) {
                            element.removeClass('spinner-bg-transparent');
                        }
                        if (!element.hasClass('home-spinner-bg')) {
                            element.addClass('home-spinner-bg');
                        }
                    }

                    msg = option.msg || '';

                    height = element.parent().height();

                    if (attr.$attr.center) {
                        attr.margintop = 'calc(50% - ' + halfSize + 'px)';
                    }

                    if (attr.margintop !== undefined) {
                        marginTop = attr.margintop;
                    } else {
                        marginTop = (height - aniSize)/2;
                    }

                    element.append(spinnerHtml.replace('{marginTop}', marginTop).replace(/{size}/g, aniSize).replace(/{halfSize}/g, halfSize).replace(/{message}/g, msg));

                    element.fadeIn(function () {
                        element.show();
                    });
                });
            }

            scope.$on(Constants.EVENTS.SPINNER_ON_EVENT, function (evt, option) {
                option = option || {};
                if (!option.type) {
                    option.type = 'main-spinner';
                }

                if (option.type && option.type === attr.type) {
                    show(option);
                }
            });

            scope.$on(Constants.EVENTS.SPINNER_OFF_EVENT, function (evt, option) {
                option = option || {};
                if (!option.type) {
                    option.type = 'main-spinner';
                }

                if ((option.type && option.type === attr.type) || option.type === 'force-to-off') {
                  element.fadeOut(function () {
                      if (option.onComplete) {
                          option.onComplete.call();
                      }
                      element.empty();
                  });
                }
            });

            if (attr.hide === 'no') {
                show();
            } else {
                element.hide();
            }
        }
    };
}]);



