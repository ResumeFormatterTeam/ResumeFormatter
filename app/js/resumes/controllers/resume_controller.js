module.exports = function(app) {
  app.controller('ResumeController', ['$scope', '$http', 'crudResource', 'currentResume', function($scope, $http, crudResource, currentResume ){
    //controller with $resource
  // app.controller('ResumeController', ['$scope', '$http', '$resource', 'crudResource', 'currentResume', function($scope, $http, $resource, crudResource, currentResume ){

    $scope.resumes = [];
    $scope.errors = [];
    $scope.resume = currentResume();

    var defaults = {};
    $scope.newResume = angular.copy($scope.defaults);
    var resumeResource = crudResource('resumes');

    // var resumes = $resource('api/resumes/:id', null, {
    //   'update': { method:'PUT' }
    // });

    // resumes.prototype.$save = function() {
    //   if (this.id) {
    //     return this.$update();
    //   } else {
    //     return this.$create();
    //   }
    // };

    // $scope.saveEntry = function() {
    //   var resourceResume = $resource('/api/resumes/:id', {id: '@id'});
    //   var defaults = {
    //     update: { method: 'PUT', isArray: false },
    //     create: { method: 'POST' }
    //   };
    //   console.log($scope.resumes.id);
    //   resourceResume.get($scope.resumes.id)
    //   console.log($scope.resume);
    //   resume.save($scope.resume);




    // }

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
      $http.put('/api/resumes/' + resumes._id, resumes)
        .then(function(res) {
          console.log('update resume' + res);
        }, function(err) {
          $scope.errors.push('could not get resume: ' + resumes.userName);
          console.log(err.data);
        });
    };


    // //updates existing resume in database
    // $scope.update = function(resumes) {
    //   resumeResource.update(resumes, function (err, data) {
    //     if (err) return err;
    //   });
    // };

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

    //adds another Project, Job or Institution block to form
    $scope.addAnotherProject = function() {
      $scope.resume.projects.push({});
    };

    $scope.addAnotherJob = function() {
      $scope.resume.experience.push({});
    };

    $scope.addAnotherInstitution = function() {
      $scope.resume.education.push({});
    };

  }]);
};


