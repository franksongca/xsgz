/* jshint -W097 */ 'use strict';


angular.module('xsgzApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'pascalprecht.translate',
    'fundoo.services',
    'angularFileUpload',
    'monospaced.elastic',
    'slick'
  ])
.constant('_', window._)
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(false); // if set to true, refresh browser will get 404 error
    // Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    // Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // Add authentication interceptor
    //$httpProvider.interceptors.push('AuthInterceptor');
    //$httpProvider.interceptors.push('HttpGetNocacheInterceptor');
  }])
  .factory('uploader', ['FileUploader', function (FileUploader) {
    return new FileUploader();
  }])

  .run([
        '$rootScope',
        '$state',
        '$stateParams',
        '$templateCache',
        '$cookies',
        '$timeout',
        '$location',
        'Constants',
        'uploader',
    function (
        $rootScope,
        $state,
        $stateParams,
        $templateCache,
        $cookies,
        $timeout,
        $location,
        Constants,
        uploader) {

      $rootScope.firstRun = true;

      function gotoMain(){
          console.info('goto main -- app.js');
          $state.go('main');
      }

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
          //alert(fromState.name + ":" + toState.name);
          //event.preventDefault();
      });


        $rootScope.$on('$stateNotFound ', function (event, unfoundState, fromState, fromParams) {
            alert(unfoundState.to);
            //event.preventDefault();
        });
    }]);
