//this directive (and corresponding template) is not being used
module.exports = function(app) {
  app.directive('bulletPointFormDirective', function(){
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/bullet_point_form_template.html',
      scope: {
        bulletPointType: '@'
      }
    };
  });
};
