module.exports = function(app) {
  app.controller('ResumeController', ['$scope', '$http', 'crudResource', 'currentResume', function($scope, $http, crudResource, currentResume ){

    $scope.resumes = [];
    $scope.errors = [];
    $scope.resume = currentResume();

    var defaults = {};
    $scope.newResume = angular.copy($scope.defaults);
    var resumeResource = crudResource('resumes');


    $scope.getAll = function() {
      $http.get('/api/users')
        .then(function(res) {
          console.log('token = ' + $scope.token);
          console.log('data id = ' + res.data.username);

          var userName = res.data.username;

          $http.get('/api/resumes/' + userName)
            .then(function(res) {
              console.log(res.data)
              $scope.resumes = res.data;

            }, function(err) {
              console.log(err);
            });

        }, function(err) {
          console.log(err);
        });
    };

  // $http.get('/api/users/me')
  //   .then(function(result) {
  //   $scope.userId = result.data._id;
  //   // Do whatever you need to do with the userId here.

  // });

    //to get all resumes by user ID
    // $scope.getAllId = function() {
    // };

    // // displays all resumes in database
    // $scope.getAll = function(resumes) {
    //   resumeResource.getAll(resumes, function (err, data) {
    //     if (err) return err;

    //     console.log(resumes);
    //     console.log(data);
    //     $scope.resumes = data;
    //   })
    // };

    //adds new resume to database
    $scope.create = function(resumes) {
      resumeResource.create(resumes, function (err, data) {
        if (err) return err;

        console.log(data);
        console.log(resumes)
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

    //issue: also adds another when save button is clicked.
    $scope.addAnotherProject = function() {
      var another = $scope.resume.projects;
      $scope.resume.projects.push({another});
    };

    //issue: also adds another when save button is clicked.
    $scope.addAnotherJob = function() {
      var another = $scope.resume.experience;
      $scope.resume.experience.push({another});
    };

    //issue: also adds another when save button is clicked.
    $scope.addAnotherInstitution = function() {
      var another = $scope.resume.education;
      $scope.resume.education.push({another});
    };

  }]);
};
