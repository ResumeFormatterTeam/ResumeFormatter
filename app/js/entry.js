require('angular/angular');
require('angular-animate');
var angular = window.angular;

var resumeApp = angular.module('resumeApp', ['ngAnimate']);

//require in all services, controllers, directives, etc.
require('./services/services')(resumeApp);
require('./resumes/resumes')(resumeApp);
