require('angular/angular');
require('angular-animate');
require('angular-route');
require('angular-cookies');
require('angular-base64');
var angular = window.angular;

var resumeApp = angular.module('resumeApp', ['ngAnimate', 'ngRoute', 'ngCookies', 'base64']);

//require in all services, controllers, directives, etc.
require('./services/services')(resumeApp);
require('./resumes/resumes')(resumeApp);
require('./users/users')(resumeApp);

resumeApp.config(['$routeProvider', '$locationProvider', function($route, $location) {
  $route
  .when('/', {
    templateUrl: 'templates/main_template.html',
    controller: 'ResumeController'
  })
  .when('/resumes', {
    templateUrl: 'templates/main_template.html',
    controller: 'ResumeController'
  })
  .when('/signup', {
    templateUrl: '/templates/auth_view.html',
    controller: 'SignupController'
  })
  .when('/signin', {
    templateUrl: '/templates/auth_view.html',
    controller: 'SigninController'
  })
  .otherwise({
    redirectTo: '/'
  });

  $location.html5Mode(true);
}]);
