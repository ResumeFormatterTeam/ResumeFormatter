require('angular/angular');
var angular = window.angular;

var resumeApp = angular.module('resumeApp', []);

//require in all services, controllers, directives, etc.
require('./services/services')(resumeApp);
require('./resumes/resumes')(resumeApp);
