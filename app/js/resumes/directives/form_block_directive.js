module.exports = function(app) {
  app.directive('formBlockDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/form_block_template.html',
      scope: {
        headerText: '@',
        formClass: '@',
        expandClass: '@', //.hidden or .justify-center-flex
        formType: '@' //Institution, Job, or Project
      }
    };
  });
};
