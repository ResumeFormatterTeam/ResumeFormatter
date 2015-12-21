module.exports = function(app) {
  app.controller('ResumeController', ['$scope', '$http', 'crudResource', 'currentResume', function($scope, $http, crudResource, currentResume){
    $scope.resumes = [];
    $scope.errors = [];
    $scope.resume = currentResume();
    var defaults = {};
    $scope.newResume = angular.copy($scope.defaults);
    var resumeResource = crudResource('resumes');

    $scope.adjustLayoutWidth = function() {
    if ($scope.formAndResume) {
      $scope.layoutWidth = 'form-and-resume-layout';
    } else {
      $scope.layoutWidth = 'full-width-centered-layout';
      }
    }

    // displays all resumes in database
    $scope.getAll = function() {
      resumeResource.getAll(function (err, data) {
        if (err) return err;

        $scope.resumes = data;
        $scope.resume = data[0];
        if ($scope.resume.projects.length === 0){
          $scope.addAnotherProject();
        }
        if ($scope.resume.experience.length === 0){
          $scope.addAnotherJob();
        }
        if ($scope.resume.education.length === 0){
          $scope.addAnotherInstitution();
        }

       $scope.flexOrder = {
        skills: {number: $scope.resume.skillOrder},
        projects: {number: $scope.resume.projectsOrder},
        experience: {number: $scope.resume.experienceOrder},
        education: {number: $scope.resume.educationOrder}
      }
      for (block in $scope.flexOrder) {
        if ($scope.flexOrder[block].number === 0) {
          $scope.flexOrder[block].class = 'flex-order-first';
        }
        if ($scope.flexOrder[block].number === 1) {
          $scope.flexOrder[block].class = 'flex-order-second';
        }
        if ($scope.flexOrder[block].number === 2) {
           $scope.flexOrder[block].class = 'flex-order-third';
        }
        if ($scope.flexOrder[block].number === 3) {
          $scope.flexOrder[block].class = 'flex-order-fourth';
        }
      }
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

    $scope.addAnotherInstitution = function() {
      $scope.resume.education.push({});
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


    $scope.printResume = function(divId) {
      var printContent = document.getElementById(divId).innerHTML;
      var popup = window.open('', '_myResume', 'top=100,left=100,width=960,height=400');
      popup.document.open()
      popup.document.write('<html><head><link rel="stylesheet" type="text/css" href="application.css" /></head><body onload="window.print()">' + printContent + '<script src="bundle.js"></script></html>');
      popup.document.close();
    }
    $scope.getAll();

    $scope.updateFlexOrder = function() {
        $scope.resume.skillOrder = $scope.flexOrder.skills.number;
        $scope.resume.projectsOrder = $scope.flexOrder.projects.number;
        $scope.resume.experienceOrder = $scope.flexOrder.experience.number;
        $scope.resume.educationOrder = $scope.flexOrder.education.number;

    }

    $scope.moveSectionDown = function(formBlock) {
      var currentBlockObject = $scope.flexOrder[formBlock];
      for(block in $scope.flexOrder){
        if ($scope.flexOrder[block].number === currentBlockObject.number + 1){
          $scope.flexOrder[formBlock] = $scope.flexOrder[block];
          $scope.flexOrder[block] = currentBlockObject;
          $scope.updateFlexOrder();
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
          $scope.updateFlexOrder();
          return
        }
      }
    }

  }]);
};
