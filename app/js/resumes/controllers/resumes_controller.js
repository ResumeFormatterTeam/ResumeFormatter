module.exports = function(app) {
  app.controller('ResumesController', ['$scope', function($scope){
    $scope.resumes = [];
  }]);
}
