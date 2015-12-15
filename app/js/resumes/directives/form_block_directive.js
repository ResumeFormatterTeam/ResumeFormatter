module.exports = function(app) {
  app.directive('formBlockDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/form_block_template.html',
      scope: {
        headerText: '@',
        formClass: '@'
      }
    }
  })
}
