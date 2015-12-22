module.exports = function(app) {
  require('./../../../../node_modules/sweetalert/dist/sweetalert.min.js');
  app.controller('SignupController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    $scope.headingText = 'Create an Account';
    $scope.buttonText = 'Sign Up';

    $scope.authenticate = function(user) {
      $http.post('/api/signup', user)
        .then(function(res){
          $cookies.put('token', res.data.token);
          $scope.getUser();
          $location.path('/resumes');
          sweetAlert("Yay!", "Account created.", "success");
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
