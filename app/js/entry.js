require('angular/angular');
var angular = window.angular;

var resumeApp = angular.module('resumeApp', []);

//require in all services, controllers, directives, etc.
require('./resumes/resumes')(resumeApp);
