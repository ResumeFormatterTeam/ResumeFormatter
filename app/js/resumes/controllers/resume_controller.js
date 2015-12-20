module.exports = function(app) {
  app.controller('ResumeController', ['$scope', '$http', 'crudResource', 'currentResume', function($scope, $http, crudResource, currentResume){
    $scope.resumes = [];
    $scope.errors = [];
    $scope.resume = currentResume();
    // $scope.savedResume = {};

    //need to set default fields?

    $scope.adjustLayoutWidth = function() {
    if ($scope.formAndResume) {
      $scope.layoutWidth = 'form-and-resume-layout';
    } else {
      $scope.layoutWidth = 'full-width-centered-layout';
      }
    }

    $scope.flexOrder = {
      skills: {number: 0, class: 'flex-order-first'},
      projects: {number: 1, class: 'flex-order-second'},
      experience: {number: 2, class: 'flex-order-third'},
      education: {number: 3, class: 'flex-order-fourth'}
    }

    $scope.moveSectionDown = function(formBlock) {
      var currentBlockObject = $scope.flexOrder[formBlock];
      for(block in $scope.flexOrder){
        if ($scope.flexOrder[block].number === currentBlockObject.number + 1){
          $scope.flexOrder[formBlock] = $scope.flexOrder[block];
          $scope.flexOrder[block] = currentBlockObject;
          return
        }
      }
    }
    $scope.moveSectionUp = function(formBlock) {
      var currentBlockObject = $scope.flexOrder[formBlock];
      for(block in $scope.flexOrder){
        if ($scope.flexOrder[block].number === currentBlockObject.number - 1){
          $scope.flexOrder[formBlock] = $scope.flexOrder[block];
          $scope.flexOrder[block] = currentBlockObject;
          return
        }
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

    //adds another Project, Job or Institution block to form
    $scope.addAnotherProject = function() {
      $scope.resume.projects.push({
          projectName: '',
          projectUrl: '',
          projectCity: '',
          projectDate:'',
          projectBulletPoint: ['']
      });
    };
        $scope.addAnotherJob = function() {
      $scope.resume.experience.push({
          companyName: '',
          jobTitle: '',
          companyUrl: '',
          companyCity: '',
          startDate: '',
          endDate: '',
          jobBulletPoint: ['']
      });
    };
    $scope.addProjectBullet = function(project) {
      project.projectBulletPoint.push("");
    }
    $scope.addJobBullet = function(job) {
      job.jobBulletPoint.push("");
    }
    $scope.removeBullet = function(bulletPointList, bullet) {
      bulletPointList.splice(bulletPointList.indexOf(bullet), 1);
    }

    $scope.addAnotherInstitution = function() {
      $scope.resume.education.push({});
    };

    $scope.printResume = function(divId) {
      var printContent = document.getElementById(divId).innerHTML;
      var popup = window.open('', '_myResume', 'top=100,left=100,width=960,height=400');
      popup.document.open()
      popup.document.write('<html><head><link rel="stylesheet" type="text/css" href="application.css" /></head><body onload="window.print()">' + printContent + '<script src="bundle.js"></script></html>');
      popup.document.close();
    }

  }]);
};
