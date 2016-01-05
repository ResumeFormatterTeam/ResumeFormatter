module.exports = function(app) {
  require('./../../../../node_modules/sweetalert/dist/sweetalert.min.js');
  app.controller('SignupController', ['$scope', '$http', '$cookies', '$route', '$location', function($scope, $http, $cookies, $route, $location) {
    $scope.headingText = 'Create an Account';
    $scope.buttonText = 'Sign Up';

    $scope.authenticate = function(user) {
      $http.post('/api/signup', user)
        .then(function(res){
          $cookies.put('token', res.data.token);
          var cookieResume = $cookies.getObject('resume');
          var dbResume = null;
          $scope.getUser();
          $http.get('/api/resumes')
          .then(function(res){
            dbResume = res.data[0];
            $http.put('/api/resumes/' + dbResume._id, cookieResume)
            .then(function(res){
              $location.path('/resumes');
              $route.reload();
              sweetAlert("Yay!", "Account created.", "success");
            }, function(err){
              throw err;
            });
          }, function(err){
            throw err;
          })
        }, function(err) {
          sweetAlert("Oops...", "Try again! Username already exists.", "error");
          console.log(err.data);
        });
    };

    $scope.changePlaces = function() {
      $location.path('/signin');
    };
  }]);
};
