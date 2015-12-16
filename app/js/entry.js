require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
var angular = window.angular;

var resumeApp = angular.module('resumeApp', ['ngRoute', 'ngCookies', 'base64']);
require('./resumes/resumes')(resumeApp);
require('./users/users')(resumeApp);

resumeApp.config(['$routeProvider', function($route) {
  $route
  .when('/resumes', {
    templateUrl: 'templates/personal_info_form_template.html', //but also need to load in all of the other resume templates
    controller: 'ResumesController'
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
    redirectTo: '/signup'
  })
}]);
