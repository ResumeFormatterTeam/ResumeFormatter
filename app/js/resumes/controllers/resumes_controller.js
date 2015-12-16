module.exports = function(app) {
  app.controller('ResumesController', ['$scope', '$http', 'crudResource', function($scope, $http, crudResource){
    $scope.resumes = [];
    $scope.errors = [];
    // $scope.savedResume = {};
    //need to set default fields?
    var defaults = {};
    $scope.newResume = angular.copy($scope.defaults);
    var resumeResource = crudResource('resumes');

    // displays all resumes in database
    $scope.getAll = function() {
      resumeResource.getAll(function (err, data) {
        if (err) return err;

        $scope.resumes = data;
      })
    };

    //adds new resume to database
    $scope.create = function(resumes) {
      resumeResource.create(resumes, function (err, data) {
        if (err) return err;

        $scope.resumes.push(data);
        $scope.newResume = angular.copy(defaults);
      });
    };

    //updates existing resume in database
    $scope.update = function(resumes) {
      resumes.editing = false;
      resumeResource.update(resumes, function (err, data) {
        if (err) return err;
      });
    };

    //removes existing resume from database
    $scope.remove = function(resumes) {
      $scope.resumes.splice($scope.resumes.indexOf(resumes), 1);
      resumeResource.remove(resumes, function (err, data) {
        if (err) return err;

        console.log('resumes has been removed');
      });
    };







  }]);
};
