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

    $scope.addAnotherProject = function() {
      $scope.resume.projects.push({});
    };

    $scope.addAnotherJob = function() {
      $scope.resume.experience.push({});
    };

    $scope.addAnotherInstitution = function() {
      $scope.resume.education.push({});
    };

    // the following 4 functions don't work
    $scope.addProjectBP = function() {
      $scope.resume.projects.project.projectBulletPoint.push({
        projectBulletPoint: ""
      });
    }
    $scope.removeProjectBP = function() {
      $scope.resume.projects.project.projectBulletPoint.push({
        projectBulletPoint: ""
      });
    }

    $scope.addJobBP = function() {
      $scope.resume.experience.job.jobBulletPoint.push({
        jobBulletPoint: ""
      });
    }
    $scope.removeJobBP = function() {
      $scope.resume.experience.job.jobBulletPoint.push({
        jobBulletPoint: ""
      });
    }

  }]);
};
