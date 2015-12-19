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

      // skills: 'flex-order-first',
      // projects: 'flex-order-second',
      // experience: 'flex-order-third',
      // education: 'flex-order-fourth'

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

  }]);
};
