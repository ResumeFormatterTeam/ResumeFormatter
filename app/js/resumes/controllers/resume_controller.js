module.exports = function(app) {
  app.controller('ResumeController', ['$scope', '$http', 'crudResource', 'currentResume', function($scope, $http, crudResource, currentResume){
    $scope.resumes = [];
    $scope.errors = [];
    $scope.resume = currentResume();
    // $scope.savedResume = {};
    //need to set default fields?
    $scope.adjustLayoutWidth = function() {
    if ($scope.formAndResume){
      $scope.layoutWidth = 'form-and-resume-layout';
    } else {
      $scope.layoutWidth = 'full-width-centered-layout';
    }
  }
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

        console.log(resumes);
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

    //issue: also adds another when save button is clicked.
    //not an issue when save button is commented out.
    $scope.addAnotherProject = function() {
      var another = $scope.resume.projects;
      $scope.resume.projects.push({another});
    };

    //issue: also adds another when save button is clicked.
    //not an issue when save button is commented out.
    $scope.addAnotherJob = function() {
      var another = $scope.resume.experience;
      $scope.resume.experience.push({another});
    };

    //issue: also adds another when save button is clicked.
    //not an issue when save button is commented out.
    $scope.addAnotherInstitution = function() {
      var another = $scope.resume.education;
      $scope.resume.education.push({another});
    };

  }]);
};
