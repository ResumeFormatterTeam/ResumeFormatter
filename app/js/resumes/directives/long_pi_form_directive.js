module.exports = function(app) {
  app.directive('longPiFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/long_pi_form_template.html',
      scope: {
        headerText: '@',
        formClass: '@',
        expandClass: '@', //.hidden or .justify-center-flex
        formType: '@', //Institution, Job, or Project
        formName: '@',
        resume: '=',
        save: '&'
      }
    };
  });
};
