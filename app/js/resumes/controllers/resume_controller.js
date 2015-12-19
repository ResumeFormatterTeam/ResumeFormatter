
module.exports = function(app) {
  app.controller('ResumeController', ['$scope', '$http', '$cookies', 'crudResource', 'currentResume', function($scope, $http, $cookies, crudResource, currentResume ){

    $scope.resumes = [];
    $scope.errors = [];
    $scope.resume = currentResume();
    // $scope.savedResume = {};
    //need to set default fields?
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


    $scope.adjustLayoutWidth = function() {
      if ($scope.formAndResume){
        $scope.layoutWidth = 'form-and-resume-layout';
      } else {
        $scope.layoutWidth = 'full-width-centered-layout';
      }
    }



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
